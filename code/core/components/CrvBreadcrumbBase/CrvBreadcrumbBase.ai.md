> Source of truth: ../../../rules/components/crv-breadcrumb.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-breadcrumb.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `text` | `string` | `"breadcrumb"` |
| `type` | `default`, `dropdown`, `ellipsis`, `active` | `default` |
| `href` | `string` | — |

## Layout (Figma 3875:5059)

| Type | Spec |
|---|---|
| Text types | label/medium 14/22, height 22px |
| Link color | brand/primary/on-surface/default |
| Hover color | brand/primary/content/strong (CSS `:hover`) |
| Active color | content/primary |
| Dropdown gap | spacing/xs (4px), chevron 16px |
| Ellipsis | 32×32, padding sm, more-horiz 16px |
