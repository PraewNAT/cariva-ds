> Source of truth: ../../../rules/components/crv-input-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-input-standard.md` for the full spec (variants, sizes, tokens, do/don't).

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small` \| `medium` | `medium` |
| `labelVisible` | `boolean` | `true` |
| `secondaryLabelVisible` | `boolean` | `false` |
| `startAdornment` | `ReactNode` | — (none) |
| `startAdornmentVisible` | `boolean` | infer จาก `startAdornment` |
| `helperTextVisible` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Sizes (field min-height × V padding)

| Size | Height | V padding | Input typography | Label typography |
|---|---|---|---|---|
| medium | 48 | spacing/md (12) | body/large (16/24) | label/medium (14/22) |
| small | 38 | spacing/sm (8) | body/medium (14/22) | label/small (12/18) |

## Rules

- Label ≠ placeholder — always provide `label` unless `labelVisible={false}` with `aria-label`
- Always pair `error={true}` with `errorMessage`
- Use `secondaryLabel` for optional fields (e.g. "optional")
- Focus/error borders are 2px (`color/border/system`, `color/border/error`)
