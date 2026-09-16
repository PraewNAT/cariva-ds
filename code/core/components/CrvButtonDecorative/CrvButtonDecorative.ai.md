> Source of truth: ../../../rules/components/crv-button-decorative.md
> Figma node: crv-button-decorative, 5844:33868

# CrvButtonDecorative

Gradient button for AI actions.

## Exports

- `CrvButtonDecorative`

## Variants

| Prop | Values | Default |
|---|---|---|
| `size` | `small`, `medium`, `large` | `medium` |
| `startIcon` / `endIcon` | ReactNode | — |
| `disabled` | boolean | `false` |

## Tokens

- Surface: `color/brand/decorative/gradient/from` + radial wash through `via` → `to`
- Label/icon: `color/content/on-brand`, hover/pressed `color/content/inverse`
- Hover glow: `glow/primary` · radius `radius/full` · label `typography/label/medium`
- Disabled: `color/on-surface/action/disabled` + `color/content/disabled`, no gradient

## AI Implementation Rules

1. Use only for the primary action of an AI feature — never as a general primary button.
2. One per screen area; it is meant to stand out.
3. Do not recolour the gradient or swap in status colours.
