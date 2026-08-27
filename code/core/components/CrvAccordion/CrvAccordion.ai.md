> Source of truth: ../../../rules/components/crv-accordion-standard.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-accordion-standard.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `title` | `string` | required |
| `expanded` | `boolean` | uncontrolled |
| `defaultExpanded` | `boolean` | `false` |
| `showIcon` | `boolean` | `true` |
| `icon` | `ReactNode` | `ErrorOutlineIcon` |

## Layout (Figma 4167:191)

| Part | Spec |
|---|---|
| Container radius | `containerSm` (12px) |
| Padding collapsed | 12px all sides |
| Padding expanded | 12px horizontal + bottom; trigger py 12 |
| Trigger gap | 16px |
| Content gap | 8px below trigger |
| Title | heading/small 16/24 semibold |
| Content | body/large 16/24, secondary |
| Chevron | 24px; up when collapsed, down when expanded |
| Icon wrapper | 38×38, radius 8, primary muted bg |
