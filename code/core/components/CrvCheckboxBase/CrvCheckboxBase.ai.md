> Source of truth: ../../../rules/components/crv-checkbox-base.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-base.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `color` | `primary`, `error` | `primary` |

## Layout (Figma 3815:5417)

| Part | Spec |
|---|---|
| Size | 16×16 |
| Radius | radius/4 (4px) |
| Unchecked border | border/default · error: status/error/border/strong |
| Unchecked border focusVisible **and hover** | border/system · error: border/error, fill on-surface/default |
| Checked fill | brand/primary/on-surface/default · error: status/error/on-surface/default |
| Checked fill focusVisible **and hover** | brand/primary/on-surface/pressed · error: status/error/on-surface/pressed |
| Mark color | content/inverse |
| Disabled fill | on-surface/action/disabled (colour is ignored when disabled) |

## Notes

- `focusVisible` is CSS-only (`:focus-visible`), not a prop.
- Figma has no separate `hover` variant (15 total): hover reuses `state=focusVisible`, so pointer and keyboard land on one look. `disabled` stays flat on hover.
- `focusVisible` / hover also carries the halo — `glow/primary` or `glow/error` (`0 0 4px` at 36%) on the control root, which is what makes the error state readable.
- Use `CrvCheckbox` when label/description are needed.
