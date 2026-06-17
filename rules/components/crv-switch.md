# crv-switch

> Toggle switch สำหรับ setting ที่มีผลทันทีเมื่อกด — label + description

## โครงสร้าง Figma

- Component type: Switch
- Component set: `crv-switch`
- Node: `3875:1672`
- Naming pattern: `disabled={true|false}, color={primary|error}, labelPlacement={end|start}`

## Variants

| Property | Values |
|---|---|
| `disabled` | `true`, `false` |
| `color` | `primary`, `error` |
| `labelPlacement` | `end`, `start` |

## Text props

| Property | Default (Figma) |
|---|---|
| `label` | Accept terms and conditions |
| `labelVisible` | true |
| `description` | You agree to our Terms of Service and Privacy Policy. |
| `descriptionVisible` | true |

## Anatomy

- **crv-switch-base** — medium toggle (44×24)
- **Content** — label + description (vertical, gap `spacing/sm`)

## Layout

| Part | Spec |
|---|---|
| Switch → content gap | spacing/lg (16px) |
| Label → description gap | spacing/sm (8px) |
| Cross-axis align | top (`flex-start`) |
| Label optical offset | +1px top |

## Token usage

| Element | Token |
|---|---|
| Label | typography/label/medium, content/primary |
| Label (`color=error`) | color/status/error/content/default |
| Description | typography/body/medium, content/secondary |
| Switch checked track | color/brand/primary/on-surface/default |

> `color=error` เปลี่ยนเฉพาะ label — switch base instance ใน Figma ไม่เปลี่ยนตาม color variant

## MUI Mapping

| Figma | React |
|---|---|
| `crv-switch-base` instance | `<CrvSwitchBase />` |
| Full standard | `<CrvSwitch />` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Switch สำหรับ setting ที่มีผลทันทีเมื่อกด
- ใช้ `color=error` เมื่อ setting อาจมีผลกระทบรุนแรง
- ใช้ `labelPlacement=start` ใน settings list

### ไม่ควรทำ

- ไม่ควรใช้ Switch สำหรับการเลือกจากหลาย option — ใช้ Radio หรือ Dropdown
- ไม่ควรใช้ Switch แทน Checkbox ใน form ที่ต้องกด Submit
- ไม่ควรเปลี่ยนสี control ด้วย `color=error`
