# crv-switch-base

> ตัว toggle เปล่า — ใช้ใน `crv-switch` หรือ settings row ที่ไม่มี label ใน component เดียวกัน

## โครงสร้าง Figma

- Component type: Switch
- Component set: `crv-switch-base`
- Node: `3875:1752`
- Naming pattern: `checked={true|false}, state={default|focusVisible|disabled}, size={small|medium}`

## Variants

| Property | Values |
|---|---|
| `checked` | `true`, `false` |
| `state` | `default`, `focusVisible`, `disabled` |
| `size` | `small`, `medium` |

## Sizes

| Size | Track | Thumb | Padding |
|---|---|---|---|
| `medium` | 44 × 24 | 20 | 2px |
| `small` | 36 × 20 | 16 | 2px |

## Anatomy

- **track** — pill background (`radius/full`)
- **thumb** — white circle, 2px inset from track edge, drop shadow

## Token usage

| State | Track | Thumb |
|---|---|---|
| unchecked / default | color/border/default | color/content/on-brand + shadow |
| checked / default | color/brand/primary/on-surface/default | color/content/on-brand + shadow |
| focusVisible / unchecked | color/brand/primary/on-surface/default | color/content/on-brand + shadow |
| disabled / unchecked | color/on-surface/action/disabled | color/content/on-brand + shadow |
| disabled / checked | color/brand/primary/on-surface/muted | color/content/on-brand + shadow, thumb อยู่ตำแหน่ง checked |

## MUI Mapping

| Figma | React |
|---|---|
| `crv-switch-base` | `<CrvSwitchBase />` — custom button + track/thumb (ไม่ใช้ MUI Switch theme) |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `size=medium` ใน `crv-switch` standard
- ใช้ `size=small` ใน dense settings หรือ table row

### ไม่ควรทำ

- ไม่ควรใช้ switch base โดยไม่มี accessible name (`aria-label` หรือ associated label)
