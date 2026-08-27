> Source of truth: ../../../rules/components/crv-dropdown.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-dropdown.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small` \| `medium` | `medium` |
| `labelVisible` | `boolean` | `true` |
| `placeholder` | `string` | `'Select...'` |
| `options` | `{ value, label }[]` | required |
| `helperTextVisible` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessageVisible` | `boolean` | `true` |

## Rules

- ใช้เมื่อมี 3–7 ตัวเลือก (2 = Switch/Checkbox, 7+ = Autocomplete)
- Placeholder บอก action: "เลือกจังหวัด" ไม่ใช่ "กรุณาเลือก"
- Always pair `error={true}` with `errorMessage`
