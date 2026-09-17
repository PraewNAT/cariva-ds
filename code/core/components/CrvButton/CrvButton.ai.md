> Source of truth: ../../../rules/components/crv-button-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-button-standard.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `contained` \| `outlined` \| `text` | `contained` |
| `color` | `primary` \| `error` | `primary` |
| `size` | `small` \| `medium` \| `large` | `medium` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `startIcon` | `ReactNode` | — |
| `endIcon` | `ReactNode` | — |

## Sizes (height × V padding)

| Size | Height | V padding | H padding | Gap | Icon | Label |
|---|---|---|---|---|---|---|
| small | 32 | spacing/sm (8) | spacing/md (12) | spacing/xs (4) | 16 | typography/label/small (12/16) |
| medium | 36 | spacing/sm (8) | spacing/lg (16) | spacing/sm (8) | 20 | typography/label/medium (14/20) |
| large | 48 | spacing/md (12) | spacing/xl (24) | spacing/md (12) | 24 | typography/label/large (16/24) |

ค่าทั้งหมดมาจาก `theme/buttonSizing.ts` — แก้ที่เดียวแล้วปุ่มทุกตัวขยับตาม

`variant="outlined"`: H padding หัก 1px ให้ border — stroke ใน Figma อยู่นอก frame ไม่กินพื้นที่ ความกว้างรวมจึงเท่ากับ Figma

## Rules

- 1 contained primary per action group
- `color="error"` for destructive only (Delete, Disable, Remove)
- Always pair `loading` with disabling re-click — handled internally
- Label must be specific verb+noun ("บันทึกการเปลี่ยนแปลง" not "OK")
