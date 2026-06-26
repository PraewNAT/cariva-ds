---
name: cariva-ds-doc-coverage
description: เช็คว่า component crv-* ทุกตัวใน Figma มี doc (.md) และโค้ด (code/components/) ครบไหม รายงาน 3 layer: Figma → doc → code
---

# Component Doc Coverage

ใช้เมื่อ user พูดว่า:

```
เช็ค doc coverage
component ไหนยังไม่มี doc
component ไหนยังไม่มีโค้ด
run doc coverage
run automation 2
```

---

## 3-Layer Coverage Model

```
Figma components  →  rules/components/*.md  →  code/components/Crv*/
     (design)              (doc)                     (implementation)
```

รายงานครบทั้ง 3 layer เพื่อรู้ว่า component แต่ละตัวอยู่ที่ขั้นไหน

---

## Steps

### Layer 1: Figma components

1. หา component set ทั้งหมดที่ชื่อขึ้นต้น `crv-` ใน Figma ทุก page ด้วย `figma_execute`:
   ```js
   await figma.loadAllPagesAsync();
   // walk ทุก page, เก็บ COMPONENT_SET และ COMPONENT ที่ name.startsWith('crv-')
   // ข้าม page ที่ขึ้นต้นด้วย (w)
   // deduplicate by name
   ```

### Layer 2: Doc files

2. List ไฟล์ทั้งหมดใน `rules/components/crv-*.md`
3. Cross-reference Figma vs doc:
   - มีใน Figma แต่ไม่มี `.md` → **Missing doc**
   - มี `.md` แต่ไม่มีใน Figma → **Orphaned doc**

### Layer 3: Code

4. List folders ทั้งหมดใน `code/components/Crv*/`
5. Cross-reference doc vs code:
   - มี `.md` แต่ไม่มี folder → **Not implemented**
   - มี folder แต่ไม่มี `.md` → **Undocumented code**
6. ถ้ามี folder ให้เช็คว่าครบ 7 ไฟล์ไหม: `.tsx`, `.types.ts`, `.stories.tsx`, `.test.tsx`, `.ai.md`, `.figma.tsx`, `index.ts`

---

## Report Format

### Coverage Matrix

| Component | Figma | Doc (.md) | Code | ไฟล์ครบ |
|---|---|---|---|---|
| `crv-button-standard` | ✅ | ✅ | ✅ | 7/7 |
| `crv-link` | ✅ | ✅ | ✅ | 7/7 |
| `crv-xyz` | ✅ | ✅ | ❌ | — |
| `crv-abc` | ✅ | ❌ | ❌ | — |

### Summary

```
Figma components:     X
Documented (doc):     Y/X  (Z%)
Implemented (code):   W/X  (V%)
Code complete (7/7):  U/W
```

### Action Items

| Priority | Component | Action |
|---|---|---|
| 🔴 High | `crv-abc` | สร้าง doc + code |
| 🟡 Med | `crv-xyz` | implement code |
| 🟢 Low | `crv-old.md` | review orphaned doc |

---

## Rules

- Match โดยเทียบ component name กับ filename: `crv-button-standard` → `crv-button-standard.md` → `CrvButtonStandard/`
- Component ที่รวมอยู่ในไฟล์เดียวกัน (เช่น `crv-avatar-group` อยู่ใน `crv-avatar.md`) ให้ถือว่า covered
- `crv-browser-scroll` — ข้ามตาม audit ignore list
- ถ้า Figma MCP ไม่เปิด → ข้าม Layer 1 ทำได้แค่ Layer 2→3 แล้วแจ้ง user
- Report only — ไม่สร้างหรือลบไฟล์
