> Source of truth: ../../../rules/components/crv-checkbox-group.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-checkbox-group.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `disabled` | `boolean` | `false` |
| `label` | `string` | Sidebar |
| `labelVisible` | `boolean` | `true` |
| `description` | `string` | Sidebar helper copy |
| `descriptionVisible` | `boolean` | `true` |
| `errorMessage` | `string` | OTP validation copy |
| `errorMessageVisible` | `boolean` | `true` |
| `options` | `CrvCheckboxGroupOption[]` | 6 default sidebar items |
| `value` | `string[]` | — |
| `defaultValue` | `string[]` | `[]` |
| `onChange` | `(value: string[]) => void` | — |

## Default options (Figma Checkbox 01–06)

Recents, Home, Applications, Desktop, Downloads, Documents

## Notes

- Items render as `CrvCheckbox` with `type="groupItem"`.
- Error message shows when `color="error"` and `errorMessageVisible`.
