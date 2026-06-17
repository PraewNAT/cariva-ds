# crv-button-icon

> ปุ่ม icon ที่ไม่มีข้อความ — ใช้ในพื้นที่แคบหรือต้องการ compact action เช่น toolbar, table, card

## โครงสร้าง Figma

- Component type: Icon Button
- Component set: `crv-button-icon`
- Naming pattern: `variant={contained|outlined|ghost}, color={primary|error}, state={default|hover|pressed|disabled}, size={small|medium|large}`

## Variants

| Property | Values |
|---|---|
| `variant` | `contained`, `outlined`, `ghost` |
| `color` | `primary`, `error` |
| `state` | `default`, `hover`, `pressed`, `disabled` |
| `size` | `small`, `medium`, `large` |

> หมายเหตุ: `crv-button-icon` ใช้ `ghost` แทน `text` ต่างจาก `crv-button-standard`

## Sizes

| Size | Width × Height | Icon size |
|---|---|---|
| `small` | 32 × 32px | 20px |
| `medium` | 40 × 40px | 20px |
| `large` | 48 × 48px | 24px |

## States

- `default` — สถานะปกติ
- `hover` — เมื่อ cursor อยู่บนปุ่ม
- `pressed` — ขณะกด
- `disabled` — ปุ่มไม่สามารถกดได้

## Properties

| Property | Type | Notes |
|---|---|---|
| `variant` | variant | contained / outlined / ghost |
| `color` | variant | primary / error |
| `state` | variant | default / hover / pressed / disabled |
| `size` | variant | small / medium / large |

## Anatomy

- **container** — frame หลัก สี่เหลี่ยมจัตุรัส auto-layout center/center, border radius `radius/full`
- **icon** — icon ตรงกลาง, ขนาดตาม size

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Width = Height (square) — fixed ตาม size
- Border radius: `Product Style / radius/interactive` → rounded mode = `radius/full` (วงกลม), sharp mode = `radius/12`

## Token usage

### Color — `contained/primary`
| Element | Token |
|---|---|
| Background default | `color/brand/primary/on-surface/default` |
| Background hover | `color/brand/primary/on-surface/hover` |
| Background pressed | `color/brand/primary/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Icon | `color/content/on-brand` |
| Icon disabled | `color/content/disabled` |

### Color — `contained/error`
| Element | Token |
|---|---|
| Background default | `color/status/error/on-surface/default` |
| Background hover | `color/status/error/on-surface/hover` |
| Background pressed | `color/status/error/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Icon | `color/content/on-brand` |
| Icon disabled | `color/content/disabled` |

### Color — `outlined/primary`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/on-surface/action/hover` (slate/100) |
| Background pressed | `color/on-surface/action/pressed` (slate/200) |
| Background disabled | transparent |
| Border default | `color/border/default` (slate/300) |
| Border hover | none (ลบออกเมื่อ hover) |
| Border pressed | none (ลบออกเมื่อ pressed) |
| Border disabled | none |
| Icon default | `color/content/secondary` (slate/700) |
| Icon hover | `color/content/secondary` (slate/700) |
| Icon disabled | `color/content/disabled` |

### Color — `outlined/error`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/status/error/on-surface/subtle` (red/50) |
| Background pressed | `color/status/error/on-surface/muted` (red/100) |
| Background disabled | transparent |
| Border default | `color/border/error` (red/600) |
| Border hover | none (ลบออกเมื่อ hover) |
| Border pressed | none (ลบออกเมื่อ pressed) |
| Border disabled | none |
| Icon default | `color/status/error/content/default` (red/600) |
| Icon pressed | `color/status/error/content/strong` (red/700) |
| Icon disabled | `color/content/disabled` |

### Color — `ghost/primary`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/brand/primary/on-surface/subtle` (blue/50) |
| Background pressed | `color/brand/primary/on-surface/muted` (blue/100) |
| Background disabled | transparent |
| Icon default | `color/brand/primary/content/default` (blue/600) |
| Icon disabled | `color/content/disabled` |

### Color — `ghost/error`
| Element | Token |
|---|---|
| Background default | transparent |
| Background hover | `color/status/error/on-surface/subtle` (red/50) |
| Background pressed | `color/status/error/on-surface/muted` (red/100) |
| Background disabled | transparent |
| Icon default | `color/status/error/content/default` (red/600) |
| Icon pressed | `color/status/error/content/strong` (red/700) |
| Icon disabled | `color/content/disabled` |

### Spacing
- Padding: `radius/full` ทำให้ padding เป็น 0 — sizing ใช้ fixed width/height แทน

### Radius
- `radius/full` — ทุก variant (วงกลม)

### Border
- `border-width/1` — variant `outlined` เท่านั้น

## ตัวอย่างที่มีในไฟล์

- แสดงทุก combination ของ variant × color × state × size บน canvas
- แบ่ง primary และ error ออกเป็น 2 กลุ่ม

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Icon Button สำหรับ action ที่ต้องการพื้นที่น้อย และไอคอนมีความหมายชัดเจน
- ใช้ใน toolbar, table, card หรือ control ขนาดเล็ก
- ใส่ accessible label (`aria-label`) ให้ทุกปุ่ม
- เพิ่ม tooltip เมื่อความหมายของไอคอนไม่ชัดเจนพอ
- ใช้ไอคอนที่ผู้ใช้คุ้นเคย เช่น edit, delete, search, close, download, more options
- ใช้ขนาด icon และ touch target ให้สอดคล้องกับ Design System

### ไม่ควรทำ

- ไม่ควรใช้ Icon Button กับ action สำคัญที่ผู้ใช้ต้องอ่านข้อความเพื่อเข้าใจ
- ไม่ควรใช้ไอคอนที่ตีความยาก หรือเป็นแค่ decorative icon มาเป็น action
- ไม่ควรใช้ Icon Button โดยไม่มี accessible label
- ไม่ควรใช้สีของไอคอนเพียงอย่างเดียวในการสื่อความหมาย
- ไม่ควรใช้หลายไอคอนที่ความหมายใกล้เคียงกันในบริเวณเดียวกันจนทำให้สับสน
- ไม่ควรสร้างขนาด Icon Button ใหม่เอง

## Needs designer review

- Icon size ของ `small` และ `medium` (ยืนยันว่า 20px ทั้งคู่หรือไม่)
