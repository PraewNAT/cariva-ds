> Source of truth: ../../../rules/components/crv-radio-base.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-radio-base.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `color` | `primary`, `error` | `primary` (label only at standard level — base visuals ignore it) |

## Layout (Figma 3848:6592)

| Part | Spec |
|---|---|
| Size | 16×16 |
| Dot | 10×10 |
| Radius | radius/full |
| Checked fill | on-surface/default (white) + 1px primary ring + primary dot |
| Unchecked ring | 1px border/default |
| Focus unchecked | 1px border/system |
| Focus checked | 2px border/system |
| Disabled fill | on-surface/action/disabled |
