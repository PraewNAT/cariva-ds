# crv-checkbox-base

> Checkbox สำหรับเลือกหลายรายการพร้อมกัน — รองรับ indeterminate state สำหรับ partial selection

## โครงสร้าง Figma

- Component type: Checkbox
- Component set: `crv-checkbox-base`
- Naming pattern: `checked={true|false}, indeterminate={true|false}, state={default|focusVisible|disabled}, color={primary|error}`

## Variants

| Property | Values |
|---|---|
| `checked` | `true`, `false` |
| `indeterminate` | `true`, `false` |
| `state` | `default`, `focusVisible`, `disabled` |
| `color` | `primary`, `error` |

<!-- updated 2026-09-28 -->
> `disabled` กลบ `color` — ไม่มี `state=disabled, color=error` ในเซ็ต (15 variants ไม่ใช่ 24: ตัด `checked=true + indeterminate=true` 6 ตัวที่เป็นไปไม่ได้ และ `disabled + error` 3 ตัวที่หน้าตาเท่ากับ primary)

> หมายเหตุ: `indeterminate=true` ใช้ร่วมกับ `checked=false` เสมอ — MUI prop `indeterminate` เป็น boolean แยกต่างหากจาก `checked`

## States

- `default` — สถานะปกติ
- `focusVisible` — **ใช้กับทั้ง hover และ keyboard focus** (CSS `:hover` และ `:focus-visible`) ไม่มี MUI prop คู่กัน · base ไม่มี variant `hover` แยก เพราะหน้าตาเหมือนกัน
  - ทุก variant ของ state นี้มี effect style **`glow/primary`** (`color=primary`) หรือ **`glow/error`** (`color=error`) — `0 0 4px` ที่ 36% ของสีตัวเอง · เป็นตัวที่ทำให้ state อ่านออก เพราะลำพังการเปลี่ยนเฉดขอบ (แดง #ef4444 → #dc2626) มองแทบไม่ต่าง
- `disabled` — ไม่สามารถกดได้

## MUI Mapping

| Figma | MUI |
|---|---|
| `checked=true, indeterminate=false` | `<Checkbox checked />` |
| `checked=false, indeterminate=false` | `<Checkbox />` |
| `checked=false, indeterminate=true` | `<Checkbox indeterminate />` |
| `state=disabled` | `<Checkbox disabled />` |
| `state=focusVisible` | CSS `:focus-visible` — ไม่ใช่ prop |
| `color=error` | `<Checkbox color="error" />` |

## Anatomy

- **container** — frame หลัก ขนาด fixed, border radius `radius/sm`
- **icon** — checkmark หรือ dash (indeterminate) ภายใน container

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Sizing: fixed width × height
- Border radius: `radius/sm`

## Token usage

<!-- updated 2026-09-28 -->
### Color — `checked=true` / `indeterminate=true`
| Element | `color=primary` | `color=error` |
|---|---|---|
| Background | `color/brand/primary/on-surface/default` | `color/status/error/on-surface/default` |
| Background `focusVisible` / hover | `color/brand/primary/on-surface/pressed` | `color/status/error/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` | เหมือน primary |
| Check / dash icon | `color/content/on-brand` | `color/content/on-brand` |
| Icon disabled | `color/content/disabled` | เหมือน primary |

### Color — `checked=false`
| Element | `color=primary` | `color=error` |
|---|---|---|
| Background | โปร่งใส (`color/on-surface/default` เมื่อ focus) | เหมือน primary |
| Border default | `color/border/default` | `color/status/error/border/strong` |
| Border `focusVisible` / hover | `color/border/system` | `color/border/error` |
| Border disabled | `color/border/disabled` | เหมือน primary |

### Effect
| State | Effect style |
|---|---|
| `focusVisible` / hover · `color=primary` | `glow/primary` — `0 0 4px 0` สี `#1789fa` 36% |
| `focusVisible` / hover · `color=error` | `glow/error` — `0 0 4px 0` สี `#dc2626` 36% |
| `default` / `disabled` | ไม่มีเงา |

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

<!-- updated 2026-09-28 -->
- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม — `hover` ใช้หน้าตาเดียวกับ `state=focusVisible` จึงไม่ต้องมี variant แยกใน Figma
