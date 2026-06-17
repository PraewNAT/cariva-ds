# crv-input-horizontal

> Input field แนวนอน (label อยู่ซ้าย, field อยู่ขวา) — เหมาะกับ form ที่กว้างหรือ detail view ที่ต้องการ scan ข้อมูลเร็ว

## โครงสร้าง Figma

- Component type: Input
- Component set: `crv-input-horizontal`
- Naming pattern: `state={default|hover|filled|focused|focusedFilled|error|disabled}, size={small|medium}`

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `hover`, `filled`, `focused`, `focusedFilled`, `error`, `disabled` |
| `size` | `small`, `medium` |

## States

- `default` — สถานะปกติ
- `hover` — cursor อยู่บน field
- `filled` — มีค่าใน field แต่ไม่ได้ focus
- `focused` — กำลัง focus แต่ยังไม่มีค่า
- `focusedFilled` — กำลัง focus และมีค่าอยู่แล้ว
- `error` — ค่าไม่ถูกต้อง แสดง error message
- `disabled` — ไม่สามารถกรอกได้

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / hover / filled / focused / focusedFilled / error / disabled |
| `size` | variant | small / medium |
| `startAdornmentVisible` | boolean | แสดง/ซ่อน icon ซ้ายของ field |
| `startAdornment` | instance swap | icon component ที่ใช้ใน adornment |
| `helperTextVisible` | boolean | แสดง/ซ่อน helper text |
| `placeholder` | text | ข้อความ placeholder |
| `value` | text | ค่าที่แสดงใน field |

> หมายเหตุ: `crv-input-horizontal` ไม่มี `secondaryLabelVisible` — label เป็น fixed width column ไม่รองรับ secondary label

## Anatomy

- **label** — ข้อความ label ด้านซ้าย (H:fixed, V:fixed) — เป็น column width คงที่
- **Field** — frame ช่องกรอกด้านขวา (H:fixed, V:hug) ประกอบด้วย:
  - **startAdornment** — icon ซ้ายของ field (optional)
  - **content** — ข้อความที่กรอก / placeholder (H:fill)
- **help-text** — ข้อความช่วยเหลือ
- **error-message** — ข้อความแสดงข้อผิดพลาด (state=error)

## Layout behavior

- Direction: horizontal (label + field เรียงซ้าย-ขวา)
- Alignment: center vertical — **label ต้องอยู่กึ่งกลางแนวตั้งของ field เสมอ** ไม่ว่า field จะสูงแค่ไหน
- Padding H (Field): `spacing/md` (12px)
- Padding V (Field): `spacing/md` (medium), `spacing/sm` (small)
- Gap: `spacing/md`
- Label: H:fixed (fixed width column)
- Field: H:fixed, V:hug
- Border radius: `radius/full` (pill / 9999px)

## Token usage

### Color
| Element | Token |
|---|---|
| Content / value | `color/content/primary` |
| Placeholder | `color/content/placeholder` |
| Content disabled | `color/content/disabled` |
| Background default | `color/on-surface/default` |
| Background disabled | `color/on-surface/action/disabled` |
| Error text | `color/status/error/content/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border focused | `color/border/system` |
| Border error | `color/border/error` |
| Border disabled | `color/border/disabled` |

### Typography
- `typography/body/large/font-size` — size medium
- `typography/body/medium/font-size` — size small
- `typography/label/medium/font-size` — label text medium
- `typography/label/small/font-size` — label text small
- Font family: `font-family/sans` (Product Style collection)

### Spacing
- Padding H: `spacing/md`
- Padding V: `spacing/md` (medium), `spacing/sm` (small)
- Gap: `spacing/md`, `spacing/sm`

### Border
- `border-width/1` — default, hover, filled, disabled
- `border-width/2` — focused, error

### Radius
- `radius/full` — Field

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ใน form ที่มีพื้นที่กว้างพอและต้องการแสดง label กับ input ในแนวเดียวกัน
- ใช้ใน read-only form หรือ detail view ที่เน้นการ scan ข้อมูลเร็ว
- ทำให้ label width สม่ำเสมอกันในกลุ่ม form เดียวกัน

### ไม่ควรทำ

- ไม่ควรใช้ในหน้าจอขนาดเล็กหรือ mobile — ใช้ `crv-input-standard` แทน
- ไม่ควรผสม `crv-input-horizontal` กับ `crv-input-standard` ใน form กลุ่มเดียวกัน
- ไม่ควรใช้ label ยาวจนดันช่อง input ให้แคบเกินไป
- ไม่ควรปรับ alignment ของ label ให้ชิดบนหรือชิดล่าง — label ต้องอยู่กึ่งกลางแนวตั้งของ field เสมอ

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
