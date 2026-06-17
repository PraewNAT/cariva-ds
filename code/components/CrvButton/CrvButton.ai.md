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

| Size | Height | V padding | H padding |
|---|---|---|---|
| small | 32 | spacing/xs (4) | spacing/lg (16) |
| medium | 40 | spacing/sm (8) | spacing/lg (16) |
| large | 48 | spacing/md (12) | spacing/lg (16) |

## Rules

- 1 contained primary per action group
- `color="error"` for destructive only (Delete, Disable, Remove)
- Always pair `loading` with disabling re-click — handled internally
- Label must be specific verb+noun ("บันทึกการเปลี่ยนแปลง" not "OK")
