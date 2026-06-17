> Source of truth: ../../../rules/components/crv-radio-group.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-radio-group.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `disabled` | `boolean` | `false` |
| `label` | `string` | Sidebar |
| `description` | `string` | Sidebar helper copy |
| `errorMessage` | `string` | OTP validation copy |
| `options` | `CrvRadioGroupOption[]` | 6 default sidebar items |
| `value` | `string` | — |
| `defaultValue` | `string` | `''` |
| `onChange` | `(value: string) => void` | — |

## Notes

- Single selection only — use `RadioGroup` internally.
- Items render as `CrvRadio` with `type="groupItem"`.
