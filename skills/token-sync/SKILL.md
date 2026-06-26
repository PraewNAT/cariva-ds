---
name: cariva-ds-token-sync
description: เช็คว่า Figma variables ตรงกับ tokens.json และโค้ดใน code/components/ ไหม รายงาน drift พร้อม fix อัตโนมัติ 3 layer
---

# Token Sync Check

ใช้เมื่อ user พูดว่า:

```
run token sync
เช็ค token
token drift ไหม
สีในโค้ดไม่ตรงฟิกม่า
อัปเดตสี
run automation 1
```

---

## 3-Layer Model

```
Figma variables  ←  source of truth
      ↓
tokens.json  ←  layer 2 (usage rules + resolved values)
      ↓
code/components/ ←  layer 3 (implementation)
```

Drift เกิดได้ที่ทุก layer — ต้องเช็คครบทั้ง 3 ชั้น

---

## Steps

### Layer 1 → Layer 2: Figma vs tokens.md

1. ดึง Semantic variables จาก Figma ด้วย `figma_execute`:

   ```js
   const allVars = await figma.variables.getLocalVariablesAsync('COLOR');
   const collections = await figma.variables.getLocalVariableCollectionsAsync();
   const foundCol = collections.find(c => c.name === 'Foundation');
   const semCol = collections.find(c => c.name === 'Semantic');

   const idToName = {};
   const foundVars = allVars.filter(v => v.variableCollectionId === foundCol.id);
   foundVars.forEach(v => { idToName[v.id] = v.name; });

   const semVars = allVars.filter(v => v.variableCollectionId === semCol.id);
   return semVars.map(v => {
     const val = v.valuesByMode[semCol.defaultModeId];
     const resolved = val?.type === 'VARIABLE_ALIAS' ? idToName[val.id] : null;
     return { name: v.name, resolvedTo: resolved };
   });
   ```

2. อ่าน `tokens.json` — เอา column "Light" ของทุก token มาเทียบ
3. สร้าง diff table Layer 1 vs Layer 2

### Layer 2 → Layer 3: tokens.md vs code

4. สแกน `code/components/` ทุกไฟล์ `.tsx` หา `colors.` patterns:

   ```bash
   grep -rn "colors\." code/components/ --include="*.tsx"
   ```

5. Map `colors.x.y.z` → token name ตาม convention:
   - `colors.content.disabled` → `color/content/disabled`
   - `colors.content.link.disabled` → `color/content/link/disabled`
   - `colors.onSurface.action.hover` → `color/on-surface/action/hover`
   - `colors.brand.primary.onSurface.default` → `color/brand/primary/on-surface/default`

6. เทียบว่า token ที่ใช้ใน `.tsx` มีอยู่ใน `tokens.json` และค่า resolved ตรงกับ Figma

---

## Report Format

### Summary

```
Layer 1→2 (Figma vs tokens.md): X drift / Y tokens checked
Layer 2→3 (tokens.md vs code):  X drift / Y usages checked
```

### Layer 1→2 Drift Table

| Token | Figma resolves to | tokens.md says | Action |
|---|---|---|---|
| `color/xxx` | `color/blue/600` | `color/blue/500` | Update tokens.md |

### Layer 2→3 Drift Table

| File:Line | Code uses | Should use | Action |
|---|---|---|---|
| `CrvLink.tsx:62` | `colors.content.disabled` | `colors.content.link.disabled` | Fix code |

---

## Fix Actions (ต้องขออนุมัติก่อนแก้ทุกครั้ง)

- **Layer 1→2 drift** → แก้ `tokens.json` ให้ตรง Figma
- **Layer 2→3 drift** → แก้ `.tsx` ให้ใช้ token ที่ถูก + แก้ `.ai.md` ให้ sync

## Update tokens.json (ทำหลัง Layer 1→2 fix)

เมื่อ `tokens.json` อัปเดตแล้ว ให้ regenerate `tokens.json` จาก Figma ด้วย:

```js
// figma_execute — export semantic + foundation ทั้งหมด
const allVars = await figma.variables.getLocalVariablesAsync('COLOR');
const collections = await figma.variables.getLocalVariableCollectionsAsync();
// resolve aliases → foundation name + hex
// write output to tokens.json
```

`tokens.json` format:
```json
{
  "foundation": { "color/blue/600": "#2563eb" },
  "semantic": { "color/brand/primary/content/default": { "alias": "color/blue/600", "value": "#2563eb" } }
}
```

## Git Snapshot (ทำหลัง fix เสมอ)

หลัง user อนุมัติและแก้ไฟล์แล้ว ให้ commit เพื่อเก็บ audit trail:

```bash
git add tokens.json tokens.json code/components/
git commit -m "token-sync: fix drift found on $(date +%Y-%m-%d)

- Layer 1→2: X tokens updated in tokens.json
- Layer 2→3: Y usages fixed in code/components/"
```

ถ้ารันแบบ report-only (ไม่มี fix) ให้ข้าม step นี้

---

## Rules

- Figma variables = source of truth เสมอ — ถ้า Figma กับ doc ขัดกัน Figma ชนะ
- Report only — ไม่แก้ไฟล์ถ้า user ยังไม่อนุมัติ
- ถ้า token ใน `.tsx` ไม่มีใน `tokens.json` → flag เป็น "unknown token" อย่าเดาค่า
- ถ้า Figma MCP ไม่เปิด → ทำได้แค่ Layer 2→3 แล้วแจ้ง user
