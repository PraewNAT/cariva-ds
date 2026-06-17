# crv-chip-action

> Interactive chip ที่ user โต้ตอบได้ — กดเลือก, ลบ, หรือ filter — wraps MUI Chip

## Figma structure

- Component type: Chip (interactive)
- Component set: `crv-chip-action`
- Naming pattern: `size=small|medium, color=default|primary, state=default|hover|pressed|focusVisible|disabled, variant=filled|outlined`

## Variants

| Property | Values |
|---|---|
| `variant` | `filled`, `outlined` |
| `color` | `default`, `primary` |
| `size` | `small`, `medium` |
| `state` | `default`, `hover`, `pressed`, `focusVisible`, `disabled` |

## Properties

| Property | Type | Values / Notes |
|---|---|---|
| `label` | text | ข้อความใน chip — default: `"Chip"` |
| `thumbnailVisible` | boolean | แสดง/ซ่อน avatar/thumbnail ด้านซ้าย — default: false |
| `deleteVisible` | boolean | แสดง/ซ่อนปุ่ม × สำหรับลบ chip — default: false |

## Sizes

| Size | Height | Padding |
|---|---:|---|
| `small` | 24px | `spacing/xs` (4px) ทุกด้าน |
| `medium` | 32px | `spacing/xs` (4px) ทุกด้าน |

## Anatomy

- `crv-avatar` — thumbnail instance (แสดงเมื่อ `thumbnailVisible=true`)
- `Typography` — frame ครอบ text label
  - `Chip` — TEXT node, `typography/label/small`
- `CancelFilled` — icon instance สำหรับ delete (แสดงเมื่อ `deleteVisible=true`)

## Layout behavior

- Direction: horizontal
- Padding: `spacing/xs` ทุกด้าน (bound)
- Radius: `radius/interactive`
- Sizing: hug content

## Token usage

### Color
| Variant + Color | Fill | Text |
|---|---|---|
| `filled, color=default` | `color/on-surface/subtle` | `color/content/primary` |
| `filled, color=primary` | `color/brand/primary/on-surface/default` | `color/content/primary` |
| `outlined` | transparent (no fill) | `color/content/primary` |

### Typography
- `typography/label/small`

### Spacing
- Padding: `spacing/xs`

### Radius
- `radius/interactive`

## MUI mapping

- `crv-chip-action` → MUI `Chip`
- `variant=filled` → MUI Chip `variant="filled"`
- `variant=outlined` → MUI Chip `variant="outlined"`
- `color=primary` → MUI Chip `color="primary"`
- `state=disabled` → MUI Chip `disabled={true}`
- `state=hover/pressed/focusVisible` → CSS pseudo-classes — ห้ามส่งเป็น prop
- `thumbnailVisible=true` → MUI Chip `avatar={<Avatar />}`
- `deleteVisible=true` → MUI Chip `onDelete` + `deleteIcon`

## Do / Don't

### Do

- ใช้ `crv-chip-action` สำหรับ element ที่ user โต้ตอบได้ เช่น filter ที่กดเลือก/ยกเลิกได้, tag ที่ลบได้, หรือ selection ใน multi-select
- ใช้ `deleteVisible=true` เมื่อ chip แสดงรายการที่ user สามารถนำออกได้ เช่น tag ที่แปะเอง, skill ใน profile
- ใช้ `thumbnailVisible=true` เมื่อต้องการ visual context เพิ่มเติม เช่น avatar ของคนใน tag

### Don't

- อย่าใช้ `crv-chip-action` แทน `crv-tag` เมื่อ element ไม่ interactive — ถ้า user แค่ดูไม่ได้กด ให้ใช้ `crv-tag` แทน
- อย่าใช้ chip เป็น navigation หรือ button หลัก — ใช้ `crv-button` แทน

## Needs designer review

- `variant=outlined` stroke token ไม่พบ fill/stroke binding ที่ชัดเจนในระดับ variant frame — ควรตรวจสอบว่าขอบมาจาก mechanism ใด
