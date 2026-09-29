# crv-button-mic

> ปุ่มเลือกอุปกรณ์รับเสียง พร้อมคลื่นเสียงแสดงสถานะ

## Figma structure

- Figma component set: `crv-button-mic` (page Button) — node `5862:33778`
- Code component: `CrvButtonMic`
- Naming pattern: `state=default|hover|pressed`

## Code mapping

- ชื่ออุปกรณ์ → `label` · คลื่นเสียงขยับ → `active` · ซ่อนคลื่นเสียง → `showWaveform={false}`

## Anatomy

- `waveform` — 5 แท่ง สูง 8/12/16/12/8 กว้าง 4 เว้น 2
- `icon/mic` (16px) · `label` · `icon/chevron` (16px)
- Layout: horizontal · gap `spacing/xs` · padding `spacing/sm` · radius `radius/12` · สูง 32

## Token usage

| Element | Token |
|---|---|
| คลื่นเสียง | `color/status/active/on-surface/default` |
| Label + icon | `color/content/secondary` · `typography/label/small` |
| Hover / pressed | `color/on-surface/action/hover` · `color/on-surface/action/pressed` |

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

- ใช้สำหรับ**การเลือก input ของเสียงเท่านั้น**
- เปิด `active` ขณะมีเสียงเข้า — แอนิเมชันเคารพ `prefers-reduced-motion`
- ใช้ chevron ฝั่งขวาเปิดรายการอุปกรณ์เสียง
- วางไว้ใกล้ช่องที่รับผลลัพธ์เสียง เช่น ช่องพิมพ์ข้อความ

### ไม่ควรทำ

- อย่าใช้เป็น dropdown ทั่วไป
- อย่าให้ชื่ออุปกรณ์ขึ้นบรรทัดใหม่ — ยาวเกินให้ตัดด้วย `…`
- ไม่ใช้เป็นปุ่มสั่งเริ่ม/หยุดอัดเสียง — ปุ่มนี้ไว้เลือก input เท่านั้น
- ไม่ปรับขนาดเอง — กว้าง 200×32 คงที่
- ไม่ซ่อน label เหลือแต่ไอคอน — ใช้ `crv-button-icon` แทน

## MUI mapping

- `CrvButtonMic` → `ButtonBase` + waveform ที่วาดเอง
