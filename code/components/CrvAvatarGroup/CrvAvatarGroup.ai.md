> Source of truth: ../../../rules/components/crv-avatar.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-avatar.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `large`, `medium`, `small`, `xSmall` | `large` |
| `max` | `2`, `3`, `4`, `5` | `2` |
| `children` | `CrvAvatar[]` | required |

## Layout (Figma 4457:63950)

| Size | Overlap |
|---|---|
| `large`, `medium` | -12px |
| `small` | -8px |
| `xSmall` | -4px |

| Part | Spec |
|---|---|
| Avatar border | 2px on-surface/default |
| Overflow pill | same size as avatar, on-surface/action/selected bg |
| Overflow text | large 14px, others 12px, content/secondary, medium weight |
| Visible slots | `max - 1` avatars + optional +N pill |
