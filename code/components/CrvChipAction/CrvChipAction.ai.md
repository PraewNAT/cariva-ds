> Source of truth: ../../../rules/components/crv-chip-action.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-chip-action.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `label` | `string` | `Chip` |
| `thumbnailVisible` | `boolean` | `false` |
| `deleteVisible` | `boolean` | `false` |
| `size` | `small`, `medium` | `medium` |
| `color` | `default`, `primary` | `default` |
| `variant` | `filled`, `outlined` | `filled` |
| `disabled` | `boolean` | `false` |

## Sizes

| Size | Height |
|---|---:|
| `small` | 24px |
| `medium` | 32px |

## Notes

- `state=hover/pressed/focusVisible` are CSS-only — not props.
- `deleteVisible=true` requires `onDelete`.
- `thumbnailVisible=true` renders `CrvAvatar` size `small` (24px).
- Do not use for non-interactive labels — use `crv-tag` instead.
