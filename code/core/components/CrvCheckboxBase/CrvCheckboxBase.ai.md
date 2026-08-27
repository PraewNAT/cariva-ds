> Source of truth: ../../../rules/components/crv-checkbox-base.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-base.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 3815:5417)

| Part | Spec |
|---|---|
| Size | 16×16 |
| Radius | radius/4 (4px) |
| Unchecked border | border/default |
| Checked fill | brand/primary/on-surface/default |
| Mark color | content/inverse |
| Disabled fill | on-surface/action/disabled |

## Notes

- `focusVisible` is CSS-only (`:focus-visible`), not a prop.
- Use `CrvCheckbox` when label/description are needed.
