# crv-checkbox-base

> Checkbox สำหรับเลือกหลายรายการพร้อมกัน — รองรับ indeterminate state สำหรับ partial selection

## โครงสร้าง Figma

- Component type: Checkbox
- Component set: `crv-checkbox-base`
- Naming pattern: `checked={true|false}, indeterminate={true|false}, state={default|focusVisible|disabled}`

## Variants

| Property | Values |
|---|---|
| `checked` | `true`, `false` |
| `indeterminate` | `true`, `false` |
| `state` | `default`, `focusVisible`, `disabled` |

> หมายเหตุ: `indeterminate=true` ใช้ร่วมกับ `checked=false` เสมอ — MUI prop `indeterminate` เป็น boolean แยกต่างหากจาก `checked`

## States

- `default` — สถานะปกติ
- `focusVisible` — แสดง focus ring เมื่อ focus ด้วย keyboard (CSS `:focus-visible`) ไม่มี MUI prop คู่กัน
- `disabled` — ไม่สามารถกดได้

## MUI Mapping

| Figma | MUI |
|---|---|
| `checked=true, indeterminate=false` | `<Checkbox checked />` |
| `checked=false, indeterminate=false` | `<Checkbox />` |
| `checked=false, indeterminate=true` | `<Checkbox indeterminate />` |
| `state=disabled` | `<Checkbox disabled />` |
| `state=focusVisible` | CSS `:focus-visible` — ไม่ใช่ prop |

## Anatomy

- **container** — frame หลัก ขนาด fixed, border radius `radius/sm`
- **icon** — checkmark หรือ dash (indeterminate) ภายใน container

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Sizing: fixed width × height
- Border radius: `radius/sm`

## Token usage

### Color — `checked=true`
| Element | Token |
|---|---|
| Background | `color/brand/primary/on-surface/default` |
| Background disabled | `color/on-surface/action/disabled` |
| Checkmark icon | `color/content/on-brand` |
| Checkmark disabled | `color/content/disabled` |

### Color — `checked=false`
| Element | Token |
|---|---|
| Background | `color/on-surface/default` |
| Border default | `color/border/default` |
| Border hover | `color/border/strong` |
| Border disabled | `color/border/disabled` |

### Color — `indeterminate=true`
| Element | Token |
|---|---|
| Background | `color/brand/primary/on-surface/default` |
| Dash icon | `color/content/on-brand` |

### Radius
- `radius/sm` — container

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Checkbox สำหรับการเลือกหลายรายการพร้อมกัน (multi-select)
- ใช้ `indeterminate=true` เมื่อเลือก item ย่อยบางส่วนแล้ว เช่น select all ที่เลือกไม่ครบ
- ใช้ label ที่อธิบายชัดเจนว่าเลือกอะไร
- จัด Checkbox เป็นกลุ่มที่มีความสัมพันธ์กัน

### ไม่ควรทำ

- ไม่ควรใช้ Checkbox เมื่อเลือกได้ทีละอย่างเดียว — ใช้ Radio Button แทน
- ไม่ควรใช้ Checkbox สำหรับ action ที่มีผลทันที — ใช้ Switch แทน
- ไม่ควรใช้โดยไม่มี label หรือ context ที่บอกว่า checkbox นี้หมายความว่าอะไร
- ไม่ควรใช้ `indeterminate=true` เป็น state เริ่มต้น

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
