# crv-checkbox-standard

> Checkbox พร้อม label และ description — ใช้ในฟอร์มและกลุ่มตัวเลือก

## โครงสร้าง Figma

- Component type: Checkbox
- Component set: `crv-checkbox-standard`
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

- **crv-checkbox-base** — control 16×16
- **Content** — label + description (vertical, gap `spacing/sm`)
- Root gap (checkbox → content): `spacing/md`

## Layout

| `type` | Cross-axis align | Control slot | Notes |
|---|---|---|---|
| `default` | top | 16×16, top-aligned | label optical offset +1px |
| `groupItem` | center | 16×16, centered ในแถว 22px | ไม่แสดง description |

## Type behavior

| `type` | Behavior |
|---|---|
| `default` | checkbox + label + description |
| `groupItem` | checkbox + label only (no description) |

## Token usage

| Element | Token |
|---|---|
| Label | typography/label/medium, content/primary |
| Label (`color=error`) | color/status/error/content/default |
| Description | typography/body/medium, content/secondary |

## MUI Mapping

| Figma | React |
|---|---|
| `crv-checkbox-base` instance | `<CrvCheckboxBase />` |
| Full standard | `<CrvCheckbox />` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `type=groupItem` ใน checkbox group
- ใช้ `color=error` เมื่อ label สื่อ validation / destructive consent

### ไม่ควรทำ

- ไม่ควรใช้ checkbox โดยไม่มี label ที่มองเห็นได้
- ไม่ควรใช้ `descriptionVisible` กับ `type=groupItem`
