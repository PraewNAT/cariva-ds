> Source of truth: ../../../rules/components/crv-input-otp.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-input-otp.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `length` | 4–8 | `6` |
| `label` | `string` | Label |
| `labelVisible` | `boolean` | `true` |
| `helperText` | `string` | OTP helper copy |
| `helperTextVisible` | `boolean` | `true` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | OTP validation copy |
| `disabled` | `boolean` | `false` |
| `value` | `string` | — |
| `defaultValue` | `string` | `''` |
| `onChange` | `(value: string) => void` | — |
| `onComplete` | `(value: string) => void` | — |

## Layout (Figma 4315:1164)

| Part | Spec |
|---|---|
| Vertical gap | spacing/md (12px) |
| Slot gap | spacing/md (12px) |
| Slots | 6× `CrvInputOtpBase` |
| Label | label/medium, content/primary |
| Helper | body/medium, content/secondary |
| Error message | body/medium, status/error/content/default |

## Notes

- Use `CrvInputOtp` as the primary component.
- `error={true}` เปลี่ยนเฉพาะ help-text เป็น error color — label ยังเป็น `content/primary`.
- Slot radius intentionally uses primitive `radius/12`, not `radius/interactive`.
