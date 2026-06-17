> Source of truth: ../../../rules/components/crv-avatar.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-avatar.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `circular` | `circular` |
| `content` | `image`, `text`, `icon` | `text` |
| `size` | `large`, `medium`, `small`, `xSmall` | `large` |
| `badge` | `boolean` | `false` |
| `initials` | `string` | `"OP"` |
| `src` | `string` | — |
| `icon` | `ReactNode` | `PersonOutlineIcon` |

## Layout (Figma 4315:10055)

| Size | Dimensions |
|---|---|
| `large` | 40×40 |
| `medium` | 32×32 |
| `small` | 24×24 |
| `xSmall` | 18×18 |

| Part | Spec |
|---|---|
| Initials | body/small 12/18 medium, content/primary |
| Background (text/icon) | on-surface/sunken |
| Online badge | `CrvBadge` dot + success, 8×8 + 2px subtle ring, bottom-right |
| Shape | radius/full |
