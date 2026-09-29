> Source of truth: ../../../rules/components/crv-checkbox-group.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-group.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `disabled` | `boolean` | `false` |
| `label` | `string` | Sidebar |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Sidebar helper copy |
| `descriptionVisible` | `boolean` | `true` |
| `options` | `CrvCheckboxGroupOption[]` | 6 default sidebar items |
| `value` | `string[]` | — |
| `defaultValue` | `string[]` | `[]` |
| `onChange` | `(value: string[]) => void` | — |

## Default options (Figma Checkbox 01–06)

Recents, Home, Applications, Desktop, Downloads, Documents

## Notes

- เลือกใช้ตัวไหน: standard = คำถามเดียวตอบใช่/ไม่ใช่ · group = 2–6 ตัวเลือกจากคำถามเดียวกัน · card = ตัวเลือกที่ต้องอ่านก่อนเลือก (แถวใน group ไม่มี description)

- Items render as `CrvCheckbox` with `descriptionVisible={false}`.
- No error message slot — Figma dropped `errorMessage` from the set, so validation copy goes below the group in the form.
