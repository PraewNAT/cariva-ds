> Source of truth: ../../../rules/components/crv-toast-standard.md
> Figma node: crv-toast-standard, 4165:5387

# CrvToast

Toast banner for feedback and notification messages.

## Exports

- `CrvToast`

## Figma Mapping

- Figma component set `crv-toast-standard` (Toast page) → `CrvToast`

## Variants

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary`, `secondary` | `primary` |
| `severity` | `error`, `info`, `success`, `warning` | `error` |
| `showAction` | boolean | `true` |
| `actionIcon` | ReactNode | `CloseRoundedIcon` |

## Tokens

- Padding + gap: `spacing/sm` (8px)
- Radius: `radius/8`
- Typography: `typography/body/medium`
- Primary: filled semantic surface + `colors.content.inverse` text/icon
- Secondary: muted/subtle semantic surface + semantic icon + `colors.content.primary` text

## AI Implementation Rules

1. Use `CrvToast` for toast/feedback messages mapped from the Toast page in Figma.
2. Match `severity` to meaning — never use `error` for warnings.
3. Prefer `variant="secondary"` when the message should stay visible but not dominate the layout.
4. Use `showAction={false}` only when dismissal is handled elsewhere.
5. Do not invent new severities or variants without updating Figma tokens first.
