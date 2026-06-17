---
name: crv-component-code
description: แปลง Cariva DS component จาก Figma + .md spec → React code (Next.js 16 App Router + MUI 9 + TypeScript). อ่าน context ตามลำดับก่อน generate ทุกครั้ง สร้าง component + types + stories + test + ai-md + code-connect + barrel ครบในรอบเดียว
---

# Cariva Component Code Generator

Use when user says:

```text
สร้าง code [component]
generate code สำหรับ crv-[name]
แปลง [component] เป็น React
code crv-[name]
```

## Stack (อ้างอิงจาก product repo)

- Next.js 16.2.4 (App Router) — ทุก component ต้อง `"use client"`
- MUI 9.0.0
- TypeScript 6.0.2
- React Hook Form 7 + Yup — input components ต้อง `forwardRef`
- i18next 26 — caller ส่ง string ที่ resolve แล้ว ไม่ส่ง i18n key เข้า component
- Jest 30 + React Testing Library 16

---

## Required reading (ทำตามลำดับ ห้ามข้าม)

1. `CLAUDE.md` — confirm stack + naming convention + wrapper rules
2. `rules/core-rules.md` — prop mapping rules
3. `rules/tokens.md` — token names ที่อนุญาต (ใช้ตรวจสอบทุก token ที่จะใส่ในโค้ด)
4. `rules/typography.md` — typography tokens
5. `rules/components/{name}.md` — spec ของ component ที่กำลังจะสร้าง

ถ้าไฟล์ใดในข้อ 1–5 หาไม่เจอ → ถาม user ก่อน ห้าม assume

---

## ★ Figma Ground Truth Scan (บังคับก่อน generate — ห้ามข้าม)

**เหตุผล:** doc ใน `.md` อาจ outdated หรือผิด Figma คือ source of truth เสมอ

ถ้า figma-console MCP เปิดอยู่ → ทำทุกข้อนี้ก่อน generate:

### 1. Dump ทุก combination จาก Figma

```js
// Run ใน figma_execute — แทนที่ NODE_ID ด้วย component set ของ component นั้น
const node = await figma.getNodeByIdAsync('NODE_ID');
const variants = node.children.map(v => ({
  name: v.name,
  fills: v.fills,
  strokes: v.strokes,
  children: v.children?.map(c => ({ name: c.name, fills: c.fills, strokes: c.strokes }))
}));
console.log(JSON.stringify(variants, null, 2));
```

### 2. สร้าง ground truth table ครบทุก combination

สำหรับทุก combination ของ variant × color × state:

| combo | bg token | border token | content token |
|---|---|---|---|
| contained/primary/default | ... | ... | ... |
| contained/primary/hover | ... | ... | ... |
| ... (ทุก row) | | | |

**ห้ามข้ามหรือเดา** — ทุก row ต้องมาจาก Figma dump จริง

### 3. เทียบกับ doc

ถ้า doc ใน `rules/components/{name}.md` ผิด → **แก้ doc ก่อน** แล้วค่อย generate code  
ถ้า doc ถูกแล้ว → generate code จาก ground truth table ที่สร้างไว้ (ไม่ใช่จาก doc อย่างเดียว)

---

## Output structure

สร้างทุกไฟล์ใน `packages/react/src/components/{ComponentName}/`:

```
{ComponentName}/
├── {ComponentName}.tsx          ← component หลัก
├── {ComponentName}.types.ts     ← TypeScript types
├── {ComponentName}.stories.tsx  ← Storybook stories ครอบทุก variant
├── {ComponentName}.test.tsx     ← Jest + RTL
├── {ComponentName}.ai.md        ← copy จาก rules/components/ มาใส่ใกล้ source
├── {ComponentName}.figma.tsx    ← Figma Code Connect mapping
└── index.ts                     ← barrel export
```

Naming: Figma `cv-button-icon` → folder/component `CvButtonIcon`

---

## Code rules

### Component (.tsx)

- ขึ้นต้นไฟล์ด้วย `"use client"` ทุกครั้ง
- ใช้ `forwardRef` ทุก component ที่รับ event/input (button, input, select, tabs)
- Props interface ต้อง match Figma variant 1:1 — ชื่อ prop ตรงกับ Figma property
- ห้าม import จาก `@mui/material/*` ใน source — wrap ผ่าน theme/styled เท่านั้น (ยกเว้นใน wrapper component ที่จำเป็น)
- ห้าม hardcode hex, px, rem — ใช้ token จาก `@cariva/tokens` หรือ Tailwind preset เท่านั้น
- Label / placeholder รับเป็น `string` (caller resolve i18next เอง)

### Types (.types.ts)

- Export `interface {ComponentName}Props`
- Variant props เป็น literal union: `'small' | 'medium' | 'large'` ไม่ใช่ `string`
- ถ้า wrap MUI ให้ extend จาก MUI props ตามที่ `rules/core-rules.md` กำหนด

### Stories (.stories.tsx)

- ใช้ CSF3 format (`Meta`, `StoryObj`)
- **ต้องมี 1 story ต่อ 1 Figma variant** — เทียบกับ `rules/components/{name}.md` ทีละบรรทัด
- มี `Default` story ที่ใช้ค่า prop ตาม Figma default
- มี `AllVariants` story แสดงทุก variant พร้อมกันใน grid (สำหรับ visual review)
- ใส่ `parameters.docs.description` อธิบายสั้นๆ ต่อ story

### Test (.test.tsx)

ครอบ 4 หมวดเท่านั้น ห้าม over-test:

1. **Render** — component render ไม่ crash ทุก variant หลัก
2. **Props pass-through** — prop ที่ส่งเข้าไปแสดงผลถูก (label, placeholder, value)
3. **Event** — onClick / onChange / onBlur ถูกเรียกครบ
4. **State** — disabled, loading, error states behave ตามคาด

ห้ามทำ:
- Visual regression (ใช้ Storybook + Chromatic ทีหลัง)
- Snapshot test
- Test MUI internal behavior (เชื่อว่า MUI ทำงานถูก)

### AI doc (.ai.md)

- Copy ทั้งหมดจาก `rules/components/{name}.md` มาวางตรงๆ
- เพิ่ม header สั้นๆ ด้านบน:
  ```
  > Source of truth: ../../../../rules/components/{name}.md
  > This file is a mirror for AI handoff. Do not edit directly.
  ```

### Figma Code Connect (.figma.tsx)

- ใช้ `@figma/code-connect`
- Map Figma variant prop → component prop ตรงๆ
- ใส่ `example` ครอบ default usage
- ระบุ Figma node URL ถ้ารู้ ถ้าไม่รู้ใส่ `// TODO: node URL` แล้วแจ้ง user ในสรุปท้าย task

### Barrel (index.ts)

```ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName.types'
```

---

## Verification (ทำก่อนจบ task — ห้ามข้าม)

1. ทุก variant ใน `rules/components/{name}.md` มี story ใน `.stories.tsx` ตรงกัน — list cross-check
2. ทุก token ที่ใช้ในโค้ดมีอยู่จริงใน `rules/tokens.md`
3. ไม่มี hardcoded hex/px/rem ใน `.tsx`
4. `.ai.md` ตรงกับ `rules/components/{name}.md` ทุกตัวอักษร (ห้าม drift)
5. Component มี `"use client"` ที่บรรทัดแรก
6. ถ้าเป็น form component (input/select/tabs) ต้อง `forwardRef`

### ★ Visual Verify — ห้าม claim "done" ก่อนทำครบ

7. **Storybook ต้องรัน** — ถ้า dev server ยังไม่รัน ให้ report ให้ user รัน
8. **Screenshot AllVariants story** — ใช้ computer-use หรือ browser MCP ถ่ายภาพ
9. **Screenshot Figma component set** — ใช้ `figma_take_screenshot` หรือ `figma_get_component_image`
10. **เทียบทีละ combination** — report จุดต่างที่พบ (ถ้าไม่มีจุดต่าง ให้ระบุว่า "verified: no diff")
11. **ห้าม report done ถ้ายังไม่ได้ทำข้อ 8–10** — ถ้า Storybook ยังไม่เปิด ให้บอก user ชัดๆ ว่าต้องรัน dev server ก่อน visual verify

12. **บังคับ publish Code Connect** — รัน `npm run code-connect:publish` จาก project root ทุกครั้งหลังสร้าง/แก้ `.figma.tsx` (token อ่านจาก `.env.local` อัตโนมัติ). ถ้าไม่มี token ให้รายงาน error ชัดเจน ห้ามข้ามขั้นตอนนี้
13. รายงานท้าย task: ระบุไฟล์ที่สร้าง + variant count + token count + Code Connect publish result + visual verify result + caveats

---

## Stop conditions

หยุดและถาม user ก่อน ห้าม assume ถ้า:

- `rules/components/{name}.md` ไม่มี → แนะนำให้ run skill `component-doc` ก่อน
- Token ที่อ้างถึงใน .md ไม่มีใน `rules/tokens.md` → token drift, ต้อง sync ก่อน (skill `token-sync`)
- Figma variant ไม่ตรงกับ doc (เมื่อ MCP เปิด) → ต้อง audit ก่อน (skill `audit`)
- Component นี้อยู่ในกลุ่ม custom (ai-bubble, ai-streaming, ai-suggest) → ไม่ wrap MUI, ต้องคุย pattern ก่อน

---

## Example invocation flow

```text
User: สร้าง code crv-button

AI:
1. อ่าน CLAUDE.md
2. อ่าน rules/core-rules.md
3. อ่าน rules/tokens.md
4. อ่าน rules/typography.md
5. อ่าน rules/components/crv-button.md
6. ★ Figma scan — dump ทุก combination จาก component set node
7. ★ สร้าง ground truth table ครบทุก variant × color × state
8. ★ เทียบกับ doc — ถ้าผิด แก้ doc ก่อน
9. Generate 7 ไฟล์ใน code/components/CrvButton/ จาก ground truth table
10. cross-check variants, tokens, no hardcoded values
11. ★ Screenshot AllVariants (Storybook) + Screenshot Figma — เทียบรูป report จุดต่าง
12. รายงาน: "สร้าง CrvButton ครบ 7 ไฟล์ — 18 variants, 8 tokens, visual verify: no diff"
```
