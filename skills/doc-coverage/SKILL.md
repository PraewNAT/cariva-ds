---
name: cariva-ds-doc-coverage
description: เช็คว่า component crv-* ทุกตัวใน Figma มี doc file ใน rules/components/ แล้วหรือยัง และหา doc ที่ไม่มี component แล้ว
---

# Component Doc Coverage

ใช้เมื่อ user พูดว่า:

```
เช็ค doc coverage
component ไหนยังไม่มี doc
run doc coverage
run automation 2
```

---

## Steps

1. หา component set ทั้งหมดที่ชื่อขึ้นต้น `crv-` ใน Figma ทุก page ด้วย `figma_execute`
   ```js
   await figma.loadAllPagesAsync();
   // walk ทุก page, เก็บ COMPONENT_SET และ COMPONENT ที่ name.startsWith('crv-')
   // ข้าม page ที่ขึ้นต้นด้วย (w)
   // deduplicate by name
   ```
2. List ไฟล์ทั้งหมดใน `plugins/cariva-design-system/rules/components/`
3. Cross-reference:
   - มีใน Figma แต่ไม่มี `.md` → **Missing doc**
   - มี `.md` แต่ไม่มีใน Figma → **Orphaned doc**
4. รายงานผล

---

## Report Format

**Missing docs** (ต้องสร้าง):
| Component | Page |
|---|---|
| `crv-name` | Page name |

**Orphaned docs** (ต้อง review):
| File | หมายเหตุ |
|---|---|
| `name.md` | ไม่มี component ใน Figma |

**Summary:** `X/Y components documented`

---

## Rules

- Match โดยเทียบ component name กับ filename: `crv-button-standard` → `crv-button-standard.md`
- Component ที่ชื่อ map ไปไฟล์เดียวกันได้ (เช่น `crv-avatar-group` อยู่ใน `crv-avatar.md`) ให้ถือว่า covered
- `crv-browser-scroll` — ข้ามตาม audit ignore list
- Report only — ไม่สร้างหรือลบไฟล์
