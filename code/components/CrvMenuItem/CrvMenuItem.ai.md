> Source of truth: ../../../rules/components/crv-menu-item.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-menu-item.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `default` \| `checkbox` | `default` |
| `leftIconVisible` | `boolean` (Figma `closeLefticon`) | `true` |
| `rightIconVisible` | `boolean` (Figma `closeRighticon`) | `true` |
| `selected` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Layout

- Height: 40px
- Padding: 8/16
- Gap: 12px
- Label: 14/22, weight 500

## Usage in dropdowns

```tsx
<CrvMenuItem leftIconVisible={false} rightIconVisible={false} value="bkk">
  กรุงเทพมหานคร
</CrvMenuItem>
```
