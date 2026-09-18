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
| `animated` | boolean | `true` |

## Tokens

- Surface: `color/brand/decorative/gradient/from` + radial wash through `via` → `to`
- Label/icon: `color/content/on-brand`, hover/pressed `color/content/inverse`
- Hover glow: `glow/primary` · radius `radius/full` · label `typography/label/small|medium|large` (ตาม size)
- Disabled: `color/on-surface/action/disabled` + `color/content/disabled`, no gradient

## AI Implementation Rules

1. Use only for the primary action of an AI feature — never as a general primary button.
2. One per screen area; it is meant to stand out.
3. Do not recolour the gradient or swap in status colours.
4. Leave `animated` on. Set `animated={false}` only to calm a dense area or a row
   of several decorative buttons — never for accessibility, which
   `prefers-reduced-motion` already handles.

## Motion

The aurora is code-only — Figma has no animation for this component, so the
resting frame is what the two match on. Two blurred pseudo-element layers of
radial blobs drift against each other at 3s and 4.25s, painted from the same
three decorative tokens so the navy core survives. Only `transform` animates.
The label and icon glow in `brand/decorative/gradient/to` (text-shadow on the
text, drop-shadow on the icon); hover adds a tight full-strength layer under the
soft one.
`animated={false}`, `prefers-reduced-motion: reduce` and `disabled` each fall
back to the static Figma gradient, with no glow.
