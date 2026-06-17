> Source of truth: ../../../rules/components/crv-fab.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-fab.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `neutral` | `primary` |
| `size` | `small`, `medium`, `large` | `medium` |
| `disabled` | `boolean` | `false` |
| `aria-label` | `string` | **required** |
| `children` | `ReactNode` (icon) | — |

## Sizes

| Size | Width × Height | Icon size |
|---|---|---|
| small | 40 × 40 | 20 |
| medium | 56 × 56 | 24 |
| large | 64 × 64 | 28 |

## Rules

- `aria-label` is required — TypeScript enforces it
- One FAB per page for the primary floating action
- `color=neutral` uses white fill + 1px border; `color=primary` is filled brand blue
- Do not use FAB for destructive actions
