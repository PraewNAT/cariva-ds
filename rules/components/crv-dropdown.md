# crv-dropdown

> Dropdown สำหรับให้ผู้ใช้เลือกหนึ่งตัวเลือกจากรายการ — รองรับ label, helper text, และ error state

## โครงสร้าง Figma

- Component type: Dropdown / Select
- Component set: `crv-dropdown`
- Naming pattern: `state={default|focus|filled|disabled}, error={true|false}, size={small|medium}`

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `focus`, `filled`, `disabled` |
| `error` | `true`, `false` |
| `size` | `small`, `medium` |

## States

- `default` — สถานะปกติ ยังไม่มี interaction
- `focus` — กำลัง focus (dropdown กำลังเปิด)
- `filled` — มีค่าถูกเลือกแล้ว
- `disabled` — ไม่สามารถกดได้
- `error=true` — validation ไม่ผ่าน แสดง error message

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / focus / filled / disabled |
| `error` | variant | true / false |
| `size` | variant | small / medium |
| `labelVisible` | boolean | แสดง/ซ่อน label |
| `helperTextVisible` | boolean | แสดง/ซ่อน helper text |
| `errorMessageVisible` | boolean | แสดง/ซ่อน error message |
| `label` | text | ข้อความ label |
| `content` | text | ข้อความที่แสดงใน field (placeholder หรือค่าที่เลือก) |
| `helperText` | text | ข้อความช่วยเหลือด้านล่าง |
| `errorMessage` | text | ข้อความแสดงข้อผิดพลาด |

## Anatomy

- **Label** — ข้อความ label เหนือ field (H:fill)
- **Field** — frame หลักของ dropdown (H:fill, V:hug) ประกอบด้วย:
  - **Placeholder / content** — ข้อความที่เลือกหรือ placeholder (H:fill)
  - **chevron-down** — icon ลูกศรด้านขวา
- **Help text** — ข้อความช่วยเหลือหรือ error message ด้านล่าง

## Layout behavior

- Direction: vertical
- Gap: `spacing/md` (ระหว่าง Label, Field, Help text)
- Padding H (Field): `spacing/lg` (16px)
- Padding V (Field): `spacing/md` (12px)
- Gap ภายใน Field: `spacing/lg`
- Sizing: H:fixed (component), Field H:fill
- ระยะห่างระหว่าง Field กับ Dropdown list: 4px
- Border radius: `radius/full` (pill shape)

## Token usage

### Color
| Element | Token |
|---|---|
| Label | `color/content/primary` |
| Placeholder | `color/content/placeholder` |
| Chevron icon | `color/content/secondary` |
| Helper text | `color/content/secondary` |
| Background | `color/on-surface/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border focus | `color/border/system` |
| Border error | `color/border/error` |
| Border disabled | `color/border/disabled` |

### Typography
- `typography/label/medium` — label text
- `typography/body/large` — content / placeholder (medium size)
- `typography/body/small` — helper text / error message
- Font family: `font-family/sans` (Product Style collection)

### Spacing
- Padding H: `spacing/lg`
- Padding V: `spacing/md`
- Gap (Field): `spacing/lg`
- Gap (component): `spacing/md`

### Border
- `border-width/1` — ทุก state

### Radius
- `radius/full` — Field (pill shape)

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Dropdown สำหรับตัวเลือกที่มี 2 รายการขึ้นไปที่ผู้ใช้ต้องเลือกหนึ่งอย่าง
- ใช้ label ที่อธิบายชัดเจนว่าเลือกอะไร เช่น "จังหวัด", "ประเภทผู้ใช้"
- ใช้ placeholder ที่บอก action ชัด เช่น "เลือกจังหวัด" แทน "กรุณาเลือก"
- ใช้ `error=true` พร้อม error message เมื่อ validation ไม่ผ่าน
- เรียงลำดับตัวเลือกอย่างมีเหตุผล เช่น เรียงตามตัวอักษร หรือตามความถี่ใช้งาน

### ไม่ควรทำ

- ไม่ควรใช้ Dropdown สำหรับ Yes/No หรือ On/Off — ใช้ Switch หรือ Checkbox แทน
- ไม่ควรซ้อน Dropdown ใน Dropdown โดยไม่จำเป็น
- ไม่ควรใช้ข้อความใน option ยาวจนตัดออกไป

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
