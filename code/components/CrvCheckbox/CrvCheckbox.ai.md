> Source of truth: ../../../rules/components/crv-checkbox-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-standard.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `type` | `default`, `groupItem` | `default` |
| `color` | `primary`, `error` | `primary` |
| `labelPlacement` | `end`, `start` | `end` |
| `label` | `string` | Accept terms and conditions |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Terms + Privacy copy |
| `descriptionVisible` | `boolean` | `true` |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout (Figma 3815:5291)

| Part | Spec |
|---|---|
| Checkbox → content gap | spacing/md (12px) |
| Label → description gap | spacing/sm (8px) |
| `default` align | control top-aligned with content |
| `groupItem` align | control vertically centered with label |
| Label optical offset | +1px top on default |

## Notes

- `color=error` styles the label text; checkbox base stays primary.
- Base control spec: `rules/components/crv-checkbox-base.md`.
