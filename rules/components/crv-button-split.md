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

<!-- updated 2026-09-29 -->
## เลือกใช้ปุ่มตัวไหน

| สถานการณ์ | ใช้ |
|---|---|
| action ทั่วไปที่มีข้อความ — เริ่มจากตัวนี้เสมอ | `crv-button-standard` |
| พื้นที่แคบและความหมายชัดจากไอคอน เช่น toolbar, แถวตาราง | `crv-button-icon` |
| พาไปที่อื่น หรือ action ที่ไม่เปลี่ยนข้อมูล | `crv-link` |
| ระหว่างรอผลของ action | `crv-button-standard` prop `loading` |
| action หลักของฟีเจอร์ AI — หน้าละปุ่มเดียว | `crv-button-decorative` |
| เลือกอุปกรณ์เสียง (ไม่ใช่ปุ่มอัด) | `crv-button-mic` |
| action หลักหนึ่งอันที่มีวิธีทำอื่นซ่อนหลัง chevron | `crv-button-split` |
| หลายตัวเลือกที่ไม่มีตัวหลัก | ❌ ใช้ `crv-menu` หรือ `crv-dropdown` |
| เปิด/ปิดที่มีผลทันที | ❌ ใช้ `crv-switch` |

### กฎร่วมทุกปุ่ม

- 1 action group มี `contained/primary` ได้ปุ่มเดียว
- ลำดับความสำคัญด้วย variant: `contained` > `elevated` > `outlined` > `text`
- ข้อความปุ่มเป็นคำกริยาที่บอกผลลัพธ์ ไม่ใช่ "OK" / "ยืนยัน"
- size ตามความหนาแน่นของพื้นที่: `large` หน้าหลัก · `medium` ทั่วไป · `small` ในตาราง
- `color=error` เฉพาะ action ที่ย้อนกลับยาก ไม่ใช่เพื่อเรียกร้องความสนใจ

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้เมื่อ action หลักมีตัวเลือกย่อยที่เป็นเรื่องเดียวกัน เช่น "บันทึก" กับ "บันทึกเป็นแบบร่าง"
- ใส่ `triggerLabel` ให้สื่อความหมาย เพราะฝั่งขวาไม่มีข้อความ
- ให้ฝั่งซ้ายเป็นตัวเลือกที่ผู้ใช้เลือกบ่อยที่สุด
- ใช้ `color=error` เมื่อ action หลักเป็นการลบหรือย้อนกลับยาก

### ไม่ควรทำ

- อย่าเอาไปใช้ยัด 2 action ที่ไม่เกี่ยวกัน
- อย่าซ่อน action ที่สำคัญที่สุดไว้ในเมนู — ตัวที่ใช้บ่อยที่สุดต้องอยู่ฝั่งซ้าย
- ไม่ใช้เมื่อมีตัวเลือกเดียว — ใช้ `crv-button-standard` แทน
- ไม่ใช้แทนเมนูทั่วไป — ถ้าไม่มี action หลักที่ชัดเจน ใช้ `crv-menu`

## MUI mapping

- `CrvButtonSplit` → `Box` + `ButtonBase` 2 ตัว (ไม่ใช่ `ButtonGroup` ของ MUI เพราะ Figma ใช้พื้นเดียวกันทั้งก้อน)
