# crv-input-standard

> Input field แนวตั้ง (label อยู่บน field) — รองรับ icon ซ้าย, helper text, error message, และ secondary label สำหรับ optional

## โครงสร้าง Figma

- Component type: Input
- Component set: `crv-input-standard`
- Naming pattern: `state={default|hover|filled|focused|focusedFilled|error|disabled}, size={small|medium}`

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `hover`, `filled`, `focused`, `focusedFilled`, `error`, `disabled` |
| `size` | `small`, `medium` |

## States

- `default` — สถานะปกติ ยังไม่มี interaction
- `hover` — cursor อยู่บน field
- `filled` — มีค่าใน field แต่ไม่ได้ focus
- `focused` — กำลัง focus แต่ยังไม่มีค่า
- `focusedFilled` — กำลัง focus และมีค่าอยู่แล้ว
- `error` — ค่าไม่ถูกต้อง แสดง error message ด้านล่าง
- `disabled` — ไม่สามารถกรอกได้

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / hover / filled / focused / focusedFilled / error / disabled |
| `size` | variant | small / medium |
| `labelVisible` | boolean | แสดง/ซ่อน label หลัก |
| `secondaryLabelVisible` | boolean | แสดง/ซ่อน secondary label (เช่น "optional") |
| `startAdornmentVisible` | boolean | แสดง/ซ่อน icon ซ้าย |
| `startAdornment` | instance swap | icon component ที่ใช้ใน adornment |
| `helperTextVisible` | boolean | แสดง/ซ่อน helper text ด้านล่าง |
| `placeholder` | text | ข้อความ placeholder |
| `value` | text | ค่าที่แสดงใน field |

## Anatomy

- **Label** — frame auto-layout horizontal ประกอบด้วย:
  - **label** — ข้อความ label หลัก (H:fill)
  - **label/secondary** — ข้อความรอง เช่น "optional"
- **Field** — frame หลักของช่องกรอก ประกอบด้วย:
  - **startAdornment** — icon ซ้าย (optional)
  - **content** — ข้อความที่กรอก / placeholder (H:fill)
- **help-text** — ข้อความช่วยเหลือด้านล่าง (H:fill)
- **error-message** — ข้อความแสดงข้อผิดพลาด (แสดงเฉพาะ state=error)

## Layout behavior

- Direction: vertical
- Alignment: start
- Gap: `spacing/xs` (4px ระหว่าง Label, Field, helper text)
- Padding H (Field): `spacing/lg` (16px)
- Padding V (Field): `spacing/md` (medium), `spacing/sm` (small)
- Field sizing: H:fill, V:hug
- Border radius: `Product Style / radius/input md` (medium), `Product Style / radius/input sm` (small)

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
- Padding H (Field): `spacing/lg`
- Padding V (Field): `spacing/md` (medium), `spacing/sm` (small)
- Gap (Label ↔ Field ↔ helper): `spacing/xs`
- Gap (inside Label frame): `spacing/md`
- Gap (inside Field frame): `spacing/sm`

### Border
- `border-width/1` — default, hover, filled, focused, disabled
- `border-width/2` — focused, error (border หนาขึ้น)

### Radius
- `Product Style / radius/input md` — Field size medium
- `Product Style / radius/input sm` — Field size small

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `state=error` พร้อม helper text ที่อธิบายสาเหตุและวิธีแก้ไขเสมอ เช่น "อีเมลไม่ถูกต้อง กรุณากรอกใหม่"
- ใช้ label ที่อธิบายชัดเจนว่าต้องกรอกอะไร
- ใช้ `secondaryLabel` สำหรับ optional field แทนการไม่ระบุ
- ใช้ `startAdornment` เมื่อต้องการบอก format ของข้อมูล เช่น icon หรือ prefix
- ใช้ `state=disabled` เมื่อ field ยังไม่พร้อมให้กรอก

### ไม่ควรทำ

- ไม่ควรใช้ placeholder เป็น label — เมื่อผู้ใช้เริ่มพิมพ์จะอ่านไม่เห็น
- ไม่ควรแสดง error โดยไม่มี helper text บอกสาเหตุ
- ไม่ควรซ่อน label ทั้งหมดโดยไม่มีข้อมูลอื่นที่บอกได้ว่า field นี้คืออะไร
- ไม่ควรใช้ `crv-input-standard` ในพื้นที่แนวนอนที่คับแคบ — ใช้ `crv-input-horizontal` แทน

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
