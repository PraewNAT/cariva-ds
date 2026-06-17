---
name: cariva-ds-token-sync
description: เช็คว่า rules/tokens.md ตรงกับ Figma Semantic Colors variables ไหม รายงาน token ที่ drift พร้อม suggested fix
---

# Token Sync Check

ใช้เมื่อ user พูดว่า:

```
run token sync
เช็ค token
token drift ไหม
run automation 1
```

---

## Steps

1. อ่าน Semantic Colors variables จาก Figma file `XgxprkSY5mGbzIIwlmscCt` ด้วย `figma_execute`
   ```js
   const allVars = await figma.variables.getLocalVariablesAsync();
   const collections = await figma.variables.getLocalVariableCollectionsAsync();
   const semanticCol = collections.find(c => c.name === 'Semantic Colors');
   const semanticVars = allVars.filter(v => v.variableCollectionId === semanticCol.id);
   ```
2. อ่าน `plugins/cariva-design-system/rules/tokens.md`
3. เทียบชื่อ token และ alias ทุกตัว
4. รายงานผล

---

## Report Format

- `PASS` — ตรงกันทั้งหมด
- `FAIL` — แสดง table:

| Token | Figma (จริง) | Doc (เก่า) |
|---|---|---|
| `token/name` | alias จริง | alias ใน doc |

พร้อม suggested patch สำหรับ `rules/tokens.md`

---

## Rules

- Figma variables = source of truth เสมอ
- Report only — ไม่แก้ไขไฟล์ถ้าไม่ได้รับอนุมัติ
