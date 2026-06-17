# crv-link

> ปุ่มสำหรับ navigation และ action emphasis ต่ำ — ดูเหมือน hyperlink ไม่มี background

## โครงสร้าง Figma

- Component type: Link
- Component set: `crv-link`
- Naming pattern: `state={default|hover|pressed|disabled}, size={small|medium|large}`

## Variants

| Property | Values |
|---|---|
| `state` | `default`, `hover`, `pressed`, `disabled` |
| `size` | `small`, `medium`, `large` |

> crv-link ไม่มี `variant` หรือ `color` prop — มี style เดียว

## Sizes

| Size | Height |
|---|---|
| `small` | 36px |
| `medium` | 40px |
| `large` | 48px |

## States

- `default` — สถานะปกติ มี underline
- `hover` — เมื่อ cursor อยู่บน link
- `pressed` — ขณะกด
- `disabled` — ไม่สามารถกดได้

## Properties

| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / hover / pressed / disabled |
| `size` | variant | small / medium / large |

## Anatomy

- **container** — frame auto-layout horizontal, transparent background
- **label** — ข้อความ link, มี underline decoration

## Layout behavior

- Direction: horizontal
- Alignment: center / center
- Sizing: hug content ทั้ง 2 แกน
- Background: transparent ทุก state

## Token usage

### Color
| Element | Token |
|---|---|
| Label default | `color/content/link/default` |
| Label hover | `color/content/link/hover` |
| Label pressed | `color/content/link/pressed` |
| Label disabled | `color/content/link/disabled` |

### Typography
- `typography/label/large` — size large
- `typography/label/medium` — size medium  
- `typography/label/small` — size small

> Typography ใช้ label style เหมือน button แต่ไม่มี background

## ตัวอย่างที่มีในไฟล์

- แสดงทุก state × size บน canvas ใน section เดียวกับ button

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Link สำหรับการนำทาง เปิดหน้าอื่น ไปยัง section อื่น หรือดูข้อมูลเพิ่มเติม
- ใช้ Link สำหรับ action ที่ต้องการ emphasis ต่ำ
- ใช้ข้อความที่อธิบายปลายทางหรือ action ได้ชัดเจน เช่น "ดูรายละเอียด", "เรียนรู้เพิ่มเติม", "กลับไปหน้าเข้าสู่ระบบ", "รีเซ็ตรหัสผ่าน"
- ทำให้ Link มีลักษณะที่ผู้ใช้สังเกตได้ว่ากดได้ และสอดคล้องกันทั้ง product

### ไม่ควรทำ

- ไม่ควรใช้ Link สำหรับ action หลักของ form เช่น submit หรือ save — ใช้ `crv-button-standard` แทน
- ไม่ควรใช้ Link สำหรับ action อันตราย เช่น ลบ ปิดใช้งาน หรือนำออก
- ไม่ควรใช้ข้อความกำกวม เช่น "คลิกที่นี่"
- ไม่ควร style Link ให้เหมือน Primary Button เว้นแต่มีการกำหนดเป็น button-style link ไว้ชัดเจน
- ไม่ควรใช้ Link กับ action ที่เปลี่ยนแปลงข้อมูลโดยไม่มีการยืนยันที่ชัดเจน
- ไม่ควรซ่อน action สำคัญไว้ในรูปแบบ Link ที่ emphasis ต่ำเกินไป

## Needs designer review

- Underline decoration — ควรซ่อนใน state ใดบ้าง (Needs designer review)

## หมายเหตุ

- `crv-link` ไม่มี `color=error` — หากต้องการ destructive link ให้ใช้ `crv-button-standard` variant=`text`, color=`error` แทน
