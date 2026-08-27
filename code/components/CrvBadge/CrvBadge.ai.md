> Source of truth: ../../../rules/components/crv-badge.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-badge.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `dot`, `standard` | `dot` |
| `color` | `primary`, `error`, `success`, `warning`, `info`, `default` | `primary` |
| `badgeContent` | `ReactNode` | `"1"` |
| `children` | anchor element | hidden anchor |
| `overlap` | `rectangular`, `circular` | `rectangular` |

## Placement

| Anchor | overlap | anchorOrigin | Use case |
|---|---|---|---|
| `crv-button-icon` | `circular` | top-right | notification — ทับ icon |
| square icon | `rectangular` | top-right | notification |
| avatar count | `circular` | top-right | unread count |
| avatar online | — | bottom-right | use `CrvAvatar badge` |

## Layout (Figma 4518:82967)

| Variant | Size |
|---|---|
| `dot` | 8×8 |
| `standard` | min 20×20, padding 2px × 4px |

| Part | Spec |
|---|---|
| Radius | radius/full |
| Label | label/small 12/18 medium |
| Text (non-default colors) | content/inverse |
| Text (`color=default`) | content/primary |
| Background (`color=default`) | on-surface/sunken |
