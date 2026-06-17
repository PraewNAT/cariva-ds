# crv-radio-standard

> Radio พร้อม label และ description — ใช้ในฟอร์มและกลุ่มตัวเลือก

## โครงสร้าง Figma

- Component type: Radio
- Component set: `crv-radio-standard`
- Node: `3815:5910`
- Naming pattern: `type={default|groupItem}, disabled={true|false}, color={primary|error}, labelPlacement={end|start}`

## Variants

| Property | Values |
|---|---|
| `type` | `default`, `groupItem` |
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

- **Radio Base** — instance ของ `crv-radio-base` (16×16)
- **Content** — label + description (vertical, gap `spacing/sm`)
- Root gap (radio → content): `spacing/md` (12px)

## Layout

| `type` | Cross-axis align | Control slot | Notes |
|---|---|---|---|
| `default` | top | 16×16, top-aligned | label optical offset +1px |
| `groupItem` | center | 16×16, centered ในแถว 22px | ไม่แสดง description |

## Type behavior

| `type` | Behavior |
|---|---|
| `default` | radio + label + description |
| `groupItem` | radio + label only (no description) |

## Token usage

| Element | Token |
|---|---|
| Label | typography/label/medium (14/22, medium), content/primary |
| Label (`color=error`) | color/status/error/content/default |
| Description | typography/body/medium (14/22, regular), content/secondary |

> `color=error` เปลี่ยนเฉพาะ label — Radio Base instance ใน Figma ไม่เปลี่ยนตาม color variant

## MUI Mapping

| Figma | React |
|---|---|
| `crv-radio-base` instance | `<CrvRadioBase />` |
| Full standard | `<CrvRadio />` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `type=groupItem` ใน radio group
- ใช้ `color=error` เมื่อ label สื่อ validation

### ไม่ควรทำ

- ไม่ควรใช้ radio โดยไม่มี label ที่มองเห็นได้
- ไม่ควรใช้ `descriptionVisible` กับ `type=groupItem`
- ไม่ควรเปลี่ยนสี control ด้วย `color=error`
