> Source of truth: ../../../rules/components/crv-text-area-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-text-area-standard.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small` \| `medium` | `medium` |
| `secondaryLabelVisible` | `boolean` | `false` |
| `helperTextVisible` | `boolean` | `false` |
| `minRows` | `number` | 4 |
| `maxRows` | `number` | — (scroll when set) |
| `error` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Sizes (field min-height)

| Size | Height | Padding | Radius | Typography |
|---|---|---|---|---|
| medium | 120 | spacing/md (12) | radius/12 | body/large (16/24) |
| small | 104 | V spacing/sm, H spacing/md | radius/8 | body/medium (14/22) |

## Rules

- ใช้สำหรับข้อความหลายบรรทัด — ไม่ใช่ email/เบอร์โทร
- ตั้ง `maxRows` เมื่อต้องการ scroll (filledScrollable)
- Always pair `error={true}` with `errorMessage`
