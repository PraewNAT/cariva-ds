> Source of truth: ../../../rules/components/crv-button-icon.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-button-icon.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `contained` \| `outlined` \| `ghost` | `contained` |
| `color` | `primary` \| `error` | `primary` |
| `size` | `small` \| `medium` \| `large` | `medium` |
| `disabled` | `boolean` | `false` |
| `aria-label` | `string` | **required** |
| `children` | `ReactNode` (icon) | — |

## Sizes

| Size | Width × Height | Icon size |
|---|---|---|
| small | 32 × 32 | 20 |
| medium | 40 × 40 | 20 |
| large | 48 × 48 | 24 |

## Rules

- `aria-label` is required — TypeScript enforces it
- Use `ghost` (transparent) as default — not `text` (icon button uses `ghost`, not `text` like standard button)
- Add tooltip when icon meaning may be ambiguous
- `color="error"` for destructive only (delete, remove)
