> Source of truth: ../../../rules/components/crv-date-time-picker.md

# CrvDateTimePicker

MUI X picker wrappers for date, time, and date-time input. Keep picker behavior native to MUI X; only align field typography, popup typography, and semantic colors with Cariva DS tokens.

## Exports

- `CrvDatePicker`
- `CrvTimePicker`
- `CrvDateTimePicker`

## Rules

- Font family: `font-family/sans` (IBM Plex Sans Thai)
- Field content:
  - `small`: `typography/body/medium`
  - `medium`: `typography/body/large`
- Labels and picker headers use label styles.
- Use only semantic color tokens from `tokens.ts`.
- Use MUI X `DatePicker`, `TimePicker`, and `DateTimePicker` for interaction behavior.
- Do not fork calendar/time picker logic unless the Figma spec requires a custom internal panel.
