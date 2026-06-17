# crv-autocomplete

> Input field ที่กรองตัวเลือกจากการพิมพ์ — ใช้เมื่อรายการมีจำนวนมากจนเลื่อน Dropdown ได้ยาก

## โครงสร้าง Figma

- Component type: Autocomplete / Combobox
- Component set: `crv-autocomplete`
- Naming pattern: `size={small|medium}, state={default|hover|focused|filled}, disabled={true|false}, error={true|false}`
- Dropdown list ใช้ `crv-menu-item` เป็น building block

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `hover`, `focused`, `filled` |
| `disabled` | `true`, `false` |
| `error` | `true`, `false` |
| `size` | `small`, `medium` |

## States

- `default` — สถานะปกติ ยังไม่มี interaction
- `hover` — cursor อยู่บน field
- `focused` — กำลัง focus และ dropdown list กำลังแสดง
- `filled` — มีค่าถูกเลือกแล้ว
- `disabled=true` — ไม่สามารถกรอกหรือเลือกได้
- `error=true` — validation ไม่ผ่าน แสดง error message

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / hover / focused / filled |
| `disabled` | variant | true / false |
| `error` | variant | true / false |
| `size` | variant | small / medium |
| `helperTextVisible` | boolean | แสดง/ซ่อน helper text ด้านล่าง |

## Anatomy

- **Label** — ข้อความ label เหนือ field
- **Field** — frame ช่องกรอก ประกอบด้วย:
  - **content / placeholder** — ข้อความที่พิมพ์หรือ placeholder (H:fill)
  - **icon** — icon ด้านขวา (search หรือ chevron)
- **Dropdown list** — รายการตัวเลือกที่กรองตามที่พิมพ์ (ใช้ `crv-menu-item`)
- **error-message** — ข้อความแสดงข้อผิดพลาด (error=true)

## Layout behavior

- Direction: vertical
- Gap: `spacing/md`
- Padding H (Field): `spacing/lg`
- Padding V (Field): `spacing/md`
- Border radius: `radius/full` (pill shape)
- Field: H:fill, V:hug
- ระยะห่างระหว่าง Field กับ Dropdown list: 4px

## Token usage

### Color
| Element | Token |
|---|---|
| Content / value | `color/content/primary` |
| Placeholder | `color/content/placeholder` |
| Content disabled | `color/content/disabled` |
| Background | `color/on-surface/default` |
| Background disabled | `color/on-surface/action/disabled` |
| Error message | `color/status/error/content/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border focused | `color/border/system` |
| Border error | `color/border/error` |
| Border disabled | `color/border/disabled` |

### Typography
- `typography/body/large/font-size` — content / placeholder (medium)
- `typography/body/small/font-size` — error message
- Font family: `font-family/sans` (Product Style collection)

### Spacing
- Padding H: `spacing/lg`
- Padding V: `spacing/md`
- Gap: `spacing/md`

### Radius
- `radius/full` — Field (pill shape)

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Autocomplete เมื่อรายการตัวเลือกมีจำนวนมาก จนเลื่อน Dropdown ได้ยาก เช่น รายชื่อโรงพยาบาล จังหวัด หรือ ICD code
- ใช้เมื่อผู้ใช้จำชื่อตัวเลือกได้บางส่วนและต้องการพิมพ์เพื่อกรอง
- แสดง `error=true` พร้อม error message เมื่อผู้ใช้กรอกค่าที่ไม่ตรงกับตัวเลือกใดเลย
- แสดง feedback เมื่อค้นหาแล้วไม่พบผลลัพธ์ เช่น "ไม่พบรายการที่ค้นหา"

### ไม่ควรทำ

- ไม่ควรใช้ Autocomplete แทน Dropdown เมื่อรายการมีน้อย — ใช้ `crv-dropdown` แทน
- ไม่ควรใช้ Autocomplete สำหรับ free-text ที่ไม่มี option ชัดเจน — ใช้ `crv-input-standard` แทน
- ไม่ควรปล่อยให้ผู้ใช้กรอกค่าใดก็ได้โดยไม่ validate ว่าตรงกับ option
- ไม่ควรแสดง option มากเกินไปโดยไม่มีการกรองเริ่มต้น

## หมายเหตุ

- Dropdown list ของ Autocomplete ใช้ `crv-menu-item` เป็น building block — ดู doc `crv-menu-item.md` สำหรับ variant `checked` (multi-select)

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
