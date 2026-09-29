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

| Size | Dimensions | Icon slot (content=icon) | Icon padding | Initials | Text padding |
|---|---|---|---|---|---|
| `large` | 40×40 | 24 (`icon/size/6`) | 8 | label/medium 14/20 | 8 |
| `medium` | 32×32 | 20 (`icon/size/5`) | 6 | label/small 12/16 | 4 |
| `small` | 24×24 | 16 (`icon/size/4`) | 4 | label/xsmall 10/16 | 4 |
| `xSmall` | 20×20 | 12 (`icon/size/3`) | 4 | label/xsmall 10/16 | 2 |

Icon size and padding are identical for `badge=false` and `badge=true`.

| Part | Spec |
|---|---|
| Initials | label scale per size (ตารางด้านบน), weight medium, content/primary |
| Background (text/icon) | on-surface/sunken |
| Online badge | `CrvBadge` dot + success, 8×8 + 2px subtle ring, bottom-right |
| Shape | radius/full |
