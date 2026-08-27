> Source of truth: ../../../rules/components/crv-input-otp.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-input-otp.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `value` | single digit string | `''` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 4315:749)

| Part | Spec |
|---|---|
| Size | 40×40 |
| Radius | radius/12 (12px fixed) |
| Border default | border/default 1px |
| Border focus | border/system 2px |
| Border disabled | border/disabled |
| Value text | body/large, content/primary |

## Notes

- `focused` / `focusedFilled` are CSS `:focus-within`, not props.
