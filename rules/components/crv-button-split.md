# crv-button-split

> ปุ่มที่มี action หลัก 1 อย่าง พร้อมปุ่มเปิดตัวเลือกอื่นที่แยกจาก action นั้น

## Figma structure

- Figma component set: `crv-button-split` (page Button) — node `5981:34184`
- Code component: `CrvButtonSplit`
- Naming pattern: `color=primary|error, state=default|hover|pressed|disabled, size=small|medium|large`

## Code mapping

- `color` → `color` · `size` → `size` · `state=disabled` → `disabled`
- `children` → `children` (label ของ action หลัก) · `startIconVisible`/`startIcon` → `startIcon`
- ฝั่งซ้ายกด → `onClick` · ฝั่งขวากด → `onTriggerClick` · ต้องใส่ `triggerLabel` เสมอ

## Anatomy

- `action` (FRAME): icon + label ของ action หลัก — padding ตามสเกลกลางของปุ่ม (ดู `crv-button-standard`)
- `divider` (LINE): เส้นคั่น 1px
- `trigger` (FRAME): icon เปิดเมนู — สี่เหลี่ยมจัตุรัสเหมือน `crv-button-icon` padding 8 / 8 / 12 ตามขนาด
- ทั้งก้อนใช้ radius `radius/full` พื้นเดียวกัน

## Token usage

| Element | Token |
|---|---|
| พื้น | `color/{brand/primary,status/error}/on-surface/default|hover|pressed` |
| เส้นคั่น | `color/{brand/primary,status/error}/border/strong` (disabled → `color/border/disabled`) |
| Label / icon | `color/content/on-brand` (disabled → `color/content/disabled`) |
| Disabled | พื้น `color/on-surface/action/disabled` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้เมื่อ action หลักมีตัวเลือกย่อยที่เป็นเรื่องเดียวกัน เช่น "บันทึก" กับ "บันทึกเป็นแบบร่าง"
- ใส่ `triggerLabel` ให้สื่อความหมาย เพราะฝั่งขวาไม่มีข้อความ

### ไม่ควรทำ

- อย่าเอาไปใช้ยัด 2 action ที่ไม่เกี่ยวกัน
- อย่าซ่อน action ที่สำคัญที่สุดไว้ในเมนู — ตัวที่ใช้บ่อยที่สุดต้องอยู่ฝั่งซ้าย

## MUI mapping

- `CrvButtonSplit` → `Box` + `ButtonBase` 2 ตัว (ไม่ใช่ `ButtonGroup` ของ MUI เพราะ Figma ใช้พื้นเดียวกันทั้งก้อน)
