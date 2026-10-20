> Source of truth: ../../../rules/components/crv-input-horizontal.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-input-horizontal.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small` \| `medium` | `medium` |
| `label` | `string` | required |
| `labelWidth` | `number` (px) | **80** (Figma label column) |
| `helperTextVisible` | `boolean` | `false` |
| `startAdornment` | `ReactNode` | — (none) |
| `startAdornmentVisible` | `boolean` | infer จาก `startAdornment` |
| `error` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout

- Label ซ้าย + field ขวา — label อยู่กึ่งกลางแนวตั้งของ field เสมอ
- Helper/error text อยู่ใต้ field column (ไม่ใต้ label)
- ใช้ `labelWidth` เดียวกันใน form group — default 80 ตรงกับคอลัมน์ label ใน Figma · label ที่ยาวกว่านั้นจะตัดบรรทัดในคอลัมน์ตัวเอง ไม่ดัน field

## Rules

- ไม่มี `secondaryLabel` — ใช้ `crv-input-standard` แทนถ้าต้องการ
- ไม่แนะนำบน mobile — ใช้ `CrvInput` แทน
- Always pair `error={true}` with `errorMessage`
