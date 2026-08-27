> Source of truth: ../../../rules/components/crv-tooltip.md
> Figma section: Tooltips, node 4167:287

# CrvTooltip

Contextual labels on hover/focus, plus onboarding walkthrough popovers.

## Exports

- `CrvTooltip`
- `CrvTooltipWithAction`
- `CrvTooltipWithActionPanel`

## Figma Mapping

- `crv-tooltip-standard` → `CrvTooltip`
- `crv-tooltip-with-action` → `CrvTooltipWithAction` / `CrvTooltipWithActionPanel`

## CrvTooltip

| Prop | Values | Default |
|---|---|---|
| `placement` | `top`, `bottom`, `left`, `right`, `none` | `bottom` |
| `title` | ReactNode | required |

## CrvTooltipWithAction

| Prop | Values | Default |
|---|---|---|
| `placement` | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `right` | `bottom-start` |
| `step` | string | `"1/7"` |
| `content` | ReactNode | default guide copy |
| `showBack` | boolean | `true` |

Use `CrvTooltipWithActionPanel` for static previews; use `CrvTooltipWithAction` with `open` + `anchorEl` in product.

## Tokens

### Standard

- Background: `colors.onSurface.invert`
- Text: `colors.content.inverse`
- Typography: `typography.label.small` (medium weight)
- Radius: `radius/4`
- Padding: `spacing/xs` vertical, `spacing/sm` horizontal

### With action

- Surface: `colors.onSurface.default`, radius `radius/16`, width 240px
- Step pill: `colors.brand.primary.onSurface.muted` + `colors.content.secondary`
- Content: `colors.content.primary`, `typography.body.medium`
- Footer: `colors.onSurface.sunken` with `CrvButton` Back/Next

## AI Implementation Rules

1. Use `CrvTooltip` for short supplemental labels on hover/focus only.
2. Use `CrvTooltipWithAction` for multi-step onboarding walkthroughs with Back/Next.
3. Do not put long copy or actions in `CrvTooltip`.
4. Avoid hover-only `CrvTooltip` on touch-only flows; prefer explicit triggers.
5. Reuse `CrvButton` for walkthrough actions — do not style raw MUI buttons.
