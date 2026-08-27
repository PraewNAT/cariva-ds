> Source of truth: ../../../rules/components/crv-radio-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-radio-standard.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `type` | `default`, `groupItem` | `default` |
| `color` | `primary`, `error` | `primary` |
| `labelPlacement` | `end`, `start` | `end` |
| `label` | `string` | Accept terms and conditions |
| `description` | `string` | Terms + Privacy copy |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `value` | `string` | — |

## Layout (Figma 3815:5910)

| Part | Spec |
|---|---|
| Radio → content gap | spacing/md (12px) |
| Label → description gap | spacing/sm (8px) |
| `default` align | control top-aligned with content |
| `groupItem` align | control vertically centered with label |
| Label optical offset | +1px top on default |
