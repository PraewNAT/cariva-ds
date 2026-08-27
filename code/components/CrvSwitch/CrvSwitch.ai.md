> Source of truth: ../../../rules/components/crv-switch.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-switch.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `labelPlacement` | `end`, `start` | `end` |
| `label` | `string` | Accept terms and conditions |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Terms + Privacy copy |
| `descriptionVisible` | `boolean` | `true` |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 3875:1672)

| Part | Spec |
|---|---|
| Switch → content gap | spacing/lg (16px) |
| Label → description gap | spacing/sm (8px) |
| Control | crv-switch-base medium (44×24) |
| Alignment | top-aligned |

## Notes

- `color=error` styles the label only; switch base stays primary when checked.
- Base spec: `rules/components/crv-switch-base.md`.
