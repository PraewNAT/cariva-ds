> Source of truth: ../../../rules/components/crv-rating.md
> Figma node: `<Rating>` component set, 4887:7022 (Rating page 4887:4952)
> Workflow: ../../../rules/figma-to-code-workflow.md

# CrvRating

Star rating for satisfaction scores (1–5, half-star supported). Wraps MUI `Rating`.

## Exports

- `CrvRating`

## Figma Mapping

- `<Rating>` → `CrvRating`
- `Size=Small|Medium*|Large` → `size="small"|"medium"|"large"`
- `Disabled=True` → `readOnly={true}` (display-only; all stars use disabled color)
- `Disabled=False` → interactive rating

## Props

| Prop | Values | Default |
|---|---|---|
| `size` | `small`, `medium`, `large` | `medium` |
| `readOnly` | boolean | `false` |
| `value` / `defaultValue` | 0–5 (0.5 steps) | — |
| `precision` | `0.5`, `1` | `0.5` |
| `max` | number | `5` |

## Token usage

| Role | Token |
|---|---|
| Active star | `colors.accent.amber.A03` |
| Empty star | `colors.border.default` |
| Hover star | `colors.accent.amber.A03` |
| Read-only / disabled display | `colors.border.default` (`#cbd5e1`) |

## AI Implementation Rules

1. Use `readOnly` for display-only scores — do not leave interactive when the user cannot change the value.
2. Do not use Rating for medical severity — use `CrvTag` status colors instead.
3. Prefer `size="medium"` in cards and list rows; `small` in dense tables.
4. Pair with a text label when the score meaning is not obvious (e.g. "4.5 / 5").
5. Fixed 5 stars — do not change `max` unless product explicitly requires it.
