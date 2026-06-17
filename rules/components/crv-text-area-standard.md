# crv-text-area-standard

> Input หลายบรรทัดสำหรับข้อความยาว — รองรับ scroll state และขยายตามเนื้อหา

## โครงสร้าง Figma

- Component type: Text Area
- Component set: `crv-text-area-standard`
- Naming pattern: `state={default|hover|filled|filledScrollable|focused|focusedFilled|error|disabled}, size={small|medium}`

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `hover`, `filled`, `filledScrollable`, `focused`, `focusedFilled`, `error`, `disabled` |
| `size` | `small`, `medium` |
| `multiline` | `true` (fixed — ไม่มี option อื่น) |

## States

- `default` — สถานะปกติ
- `hover` — cursor อยู่บน field
- `filled` — มีข้อความแต่ไม่ได้ focus
- `filledScrollable` — มีข้อความเกินความสูง field — แสดง scroll indicator
- `focused` — กำลัง focus แต่ยังไม่มีข้อความ
- `focusedFilled` — กำลัง focus และมีข้อความอยู่แล้ว
- `error` — ข้อมูลไม่ถูกต้อง แสดง error message
- `disabled` — ไม่สามารถกรอกได้

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | ดูตาราง States ด้านบน |
| `size` | variant | small / medium |
| `multiline` | variant | `true` (fixed) |
| `secondaryLabelVisible` | boolean | แสดง/ซ่อน secondary label |
| `helperTextVisible` | boolean | แสดง/ซ่อน helper text |
| `placeholder` | text | ข้อความ placeholder |
| `value` | text | ข้อความที่แสดงใน field |

## Anatomy

- **Label** — frame auto-layout horizontal ประกอบด้วย:
  - **label** — ข้อความ label หลัก (H:fill)
  - **label/secondary** — ข้อความรอง เช่น "optional" (H:hug, V:hug)
- **Field** — frame ช่องกรอก (H:fill, V:hug) ประกอบด้วย:
  - **content** — ข้อความที่กรอก / placeholder (H:fill, **V:fill** — ขยายในแนวตั้ง)
  - **crv-browser-scroll** — scroll indicator instance (แสดงเฉพาะ `filledScrollable`)
- **help-text** — ข้อความช่วยเหลือ (H:fill)
- **error-message** — ข้อความแสดงข้อผิดพลาด (state=error, H:fill)

## Layout behavior

- Direction: vertical
- Alignment: start
- Gap: `spacing/sm`
- Padding H (Field): `spacing/md`
- Padding V (Field): `spacing/md` (medium), `spacing/sm` (small)
- content text: V:fill (ขยายตามความสูง Field)
- Border radius: `radius/md` (Field), `radius/xl` (ใน scroll state)

## Token usage

### Color
| Element | Token |
|---|---|
| Content / value | `color/content/primary` |
| Placeholder | `color/content/placeholder` |
| Content disabled | `color/content/disabled` |
| Secondary content | `color/content/secondary` |
| Background default | `color/on-surface/default` |
| Background disabled | `color/on-surface/action/disabled` |
| Scroll track | `color/slate/100` |
| Scroll thumb | `color/slate/500` |
| Error text | `color/status/error/content/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border focused | `color/border/system` |
| Border error | `color/border/error` |
| Border disabled | `color/border/disabled` |

### Typography
- `typography/body/large/font-size` — size medium
- `typography/body/medium/font-size` — size small
- `typography/label/medium/font-size` — label medium
- `typography/label/small/font-size` — label small
- Font family: `font-family/sans` (Product Style collection)

### Spacing
- Padding H: `spacing/md`
- Padding V: `spacing/md` (medium), `spacing/sm` (small)
- Gap: `spacing/sm`, `spacing/md`

### Border
- `border-width/1` — default, hover, filled, disabled
- `border-width/2` — focused, error

### Radius
- `radius/md` — Field ปกติ
- `radius/xl` — ใช้ใน filledScrollable state

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้สำหรับข้อความยาว หลายบรรทัด เช่น หมายเหตุ คำอธิบาย หรือ feedback
- ใช้ `state=filledScrollable` เมื่อมีการจำกัดความสูงของ textarea
- แสดง character count ใน helper text เมื่อมีการจำกัดจำนวนตัวอักษร

### ไม่ควรทำ

- ไม่ควรใช้ Text Area สำหรับข้อมูลที่มีรูปแบบชัดเจน เช่น email, เบอร์โทร, วันที่ — ใช้ `crv-input-standard` แทน
- ไม่ควรตั้งความสูงเริ่มต้นเล็กเกินไปจนผู้ใช้ไม่รู้ว่ากรอกได้หลายบรรทัด
- ไม่ควรแสดง error โดยไม่มี helper text บอกสาเหตุ

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
