> Source of truth: ../../../rules/components/crv-chip-action.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-chip-action.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `label` | `string` | `Chip` |
| `thumbnailVisible` | `boolean` | `false` |
| `thumbnailInitials` | `string` | `OP` |
| `thumbnailIcon` | `ReactNode` | — |
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
- `thumbnailVisible=true` renders `CrvAvatar` size `xSmall` (18px) on a small chip and `small` (24px) on a medium chip — `content=icon` with `thumbnailIcon` when given, otherwise `content=text` with `thumbnailInitials`.
- Do not use for non-interactive labels — use `crv-tag` instead.
