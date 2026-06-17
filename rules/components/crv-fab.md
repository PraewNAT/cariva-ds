# crv-fab

> Floating Action Button สำหรับ action หลักที่สำคัญที่สุดของหน้า — ลอยอยู่เหนือ content

## โครงสร้าง Figma

- Component type: Floating Action Button
- Component set: `crv-fab`
- Naming pattern: `size={small|medium|large}, color={primary|neutral}, state={default|hover|pressed|disabled}`

## Variants

| Property | Values |
|---|---|
| `size` | `small`, `medium`, `large` |
| `color` | `primary`, `neutral` |
| `state` | `default`, `hover`, `pressed`, `disabled` |

## Sizes

| Size | Width × Height |
|---|---|
| `small` | 40 × 40px |
| `medium` | 56 × 56px |
| `large` | 64 × 64px |

## States

- `default` — สถานะปกติ
- `hover` — cursor อยู่บนปุ่ม
- `pressed` — ขณะกด
- `disabled` — ไม่สามารถกดได้

## Anatomy

- **container** — frame สี่เหลี่ยมจัตุรัส auto-layout center/center, border radius `radius/full` (วงกลม)
- **icon** — icon ตรงกลาง

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Width = Height (square) — fixed ตาม size
- Border radius: `radius/full` (9999px) — วงกลม
- Padding: 0 (sizing ใช้ fixed width/height)

## Token usage

### Color — `primary`
| Element | Token |
|---|---|
| Background default | `color/brand/primary/on-surface/default` |
| Background hover | `color/brand/primary/on-surface/hover` |
| Background pressed | `color/brand/primary/on-surface/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Icon | `color/content/on-brand` |
| Icon disabled | `color/content/disabled` |

### Color — `neutral`
| Element | Token |
|---|---|
| Background default | `color/on-surface/default` |
| Background hover | `color/on-surface/action/hover` |
| Background pressed | `color/on-surface/action/pressed` |
| Background disabled | `color/on-surface/action/disabled` |
| Icon | `color/content/secondary` |
| Icon disabled | `color/content/disabled` |

### Radius
- `radius/full` — ทุก variant (วงกลม)

### Border
- `border-width/1` — ทุก variant

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ FAB สำหรับ action หลักที่สำคัญที่สุดของหน้า เช่น เพิ่มรายการ สร้าง กล้อง
- วาง FAB ในตำแหน่งที่เข้าถึงได้ง่าย มักอยู่มุมล่างขวาของหน้า
- ใช้ไอคอนที่เข้าใจได้ทันทีว่า action คืออะไร
- ใช้ `color=primary` สำหรับ action หลัก และ `color=neutral` เมื่อต้องการลด emphasis

### ไม่ควรทำ

- ไม่ควรใช้ FAB มากกว่า 1 ปุ่มในหน้าเดียวกัน
- ไม่ควรใช้ FAB สำหรับ action ที่ใช้บ่อยแต่ไม่ใช่ action หลัก — ใช้ `crv-button-icon` แทน
- ไม่ควรใช้ FAB สำหรับ action อันตราย เช่น ลบหรือยกเลิก
- ไม่ควรซ่อน FAB ด้วยเนื้อหาอื่นหรือวางในตำแหน่งที่กดยาก

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
