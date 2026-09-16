> Source of truth: ../../../rules/components/crv-toast-standard.md
> Figma node: crv-toast-standard, 6413:55828

# CrvToast

Toast for feedback and notification messages.

## Exports

- `CrvToast`

## Figma Mapping

- Figma component set `crv-toast-standard` (Toast page) → `CrvToast`
- `Variant` → `variant`, `Severity` → `severity`
- `Title?` / `↳ Title` → `title`, `Description?` / `↳ Description` → `description`
- `Action?` / `↳Instance` → `action` (a `CrvButton` text/small)
- `On Close?` → `onClose`

## Variants

| Prop | Values | Default |
|---|---|---|
| `variant` | `filled`, `outlined`, `standard` | `standard` |
| `severity` | `error`, `warning`, `info`, `success`, `notification` | `error` |
| `title` | ReactNode | — |
| `description` | ReactNode | — |
| `action` | ReactNode | — |
| `onClose` | handler — renders the close button | — |

`variant="primary"` and `"secondary"` still resolve (to `filled` / `standard`) but are deprecated.

## Tokens

- Padding `spacing/lg` (16) horizontal, `spacing/xs` (4) vertical · radius `radius/12` · icon 24px
- Title `typography/label/large` · description `typography/label/medium`
- filled → `status/{severity}/on-surface/default` + `content/inverse`
- outlined → `status/{severity}/border/strong` 1px + `content/primary` / `content/secondary`
- standard → `status/{severity}/on-surface/subtle` + `border/default` 2px + `shadow/status/{severity}`
- notification → `neutral/*` surfaces and borders, `brand/primary` icon

## AI Implementation Rules

1. Match `severity` to meaning — never use `error` for a warning.
2. `notification` is for neutral system messages, not status feedback.
3. Pass `onClose` to make a toast dismissible; the close button appears only then.
4. Put one action at most in `action`, as a `CrvButton variant="text" size="small"`.
5. On `variant="filled"` the action button needs a light colour — the DS button has no on-colour variant yet.
6. Do not invent severities or variants without updating Figma first.
