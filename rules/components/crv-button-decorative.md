# crv-button-decorative

> ปุ่มไล่เฉดสี สำหรับ action ของฟีเจอร์ AI โดยเฉพาะ

## Figma structure

- Figma component set: `crv-button-decorative` (page Button) — node `5844:33868`
- Code component: `CrvButtonDecorative`
- Naming pattern: `state=default|hover|pressed|disabled, size=small|medium|large`

## Code mapping

- `size` → `size` · `state=disabled` → `disabled`
- `children` → `children` · `startIconVisible`/`startIcon` → `startIcon` · `endIconVisible`/`endIcon` → `endIcon`

## Variants

| Property | Values |
|---|---|
| `size` | `small` (32), `medium` (36), `large` (48) |
| `state` | `default`, `hover`, `pressed`, `disabled` |

## Token usage

| Element | Token |
|---|---|
| พื้น | `color/brand/decorative/gradient/from` + ไล่เฉดรัศมีผ่าน `via` → `to` |
| Label / icon | `color/content/on-brand` (hover/pressed → `color/content/inverse`) |
| เงา hover | `glow/primary` |
| มุมโค้ง | `radius/full` · ตัวอักษร `typography/label/medium` |
| Disabled | พื้น `color/on-surface/action/disabled` · ตัวอักษร `color/content/disabled` (ไม่มีไล่เฉด) |

## Motion (มีเฉพาะในโค้ด)

Figma ไม่มีอนิเมชันของ component นี้ — **เฟรมหยุดนิ่งคือจุดที่ Figma กับโค้ดตรงกัน** ส่วนการเคลื่อนไหวเป็นของฝั่งโค้ดล้วน

- แสงออโรราไหลอยู่เบื้องหลัง label — เลเยอร์เบลอ 2 ชั้นเคลื่อนสวนกันที่ **3 วินาที** กับ **4.25 วินาที** (คาบไม่หารกันลงตัว จังหวะจึงไม่ซ้ำรอบให้เห็น)
- ใช้แค่ 3 token เดิม (`from` / `via` / `to`) ไม่มีสีใหม่ · blob สีกรมอยู่ชั้นล่างเพื่อรักษาแกนสีเข้มตาม Figma
- อยู่บน pseudo-element `z-index: -1` ใน stacking context ของปุ่มเอง — ไม่เพิ่ม DOM และไม่บังตัวอักษร
- animate เฉพาะ `transform` เท่านั้น ไม่มี repaint
- label กับ icon เรืองแสงสี `brand/decorative/gradient/to` — ปกติ glow นุ่ม (text 6px · icon 3px) · **hover** เพิ่มชั้น glow แน่นเต็มสีใต้ชั้นนุ่ม ให้สว่างขึ้นชัดเจน (ถ่างแค่ blur จะดูจางลงแทน)
- **หยุดนิ่งเมื่อ**: `animated={false}` · `prefers-reduced-motion: reduce` · `disabled` (`animated={false}` กับ `disabled` ไม่มี glow ด้วย)

> `animated={false}` ไว้ใช้ตอนหน้าจอแน่นหรือมีปุ่มนี้หลายตัวเรียงกัน — ไม่ใช่เรื่อง accessibility เพราะ `prefers-reduced-motion` จัดการให้อยู่แล้ว

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

- ใช้กับ **Action หลักที่เกี่ยวข้องกับการทำงานของ AI เท่านั้น**
- ใช้ปุ่มนี้ปุ่มเดียวในหนึ่งพื้นที่ — จุดประสงค์คือให้เด่น
- ใช้ `size=large` เมื่อเป็น entry point หลักของฟีเจอร์ · `small`/`medium` เมื่ออยู่ใน card หรือ toolbar
- ใส่ไอคอนนำหน้า label เพื่อสื่อว่าเป็นฟีเจอร์ AI
- ใช้ข้อความที่บอกผลลัพธ์ตรงๆ เช่น "สรุปด้วย AI" ไม่ใช่ "เริ่ม"

### ไม่ควรทำ

- อย่าใช้เป็นปุ่ม primary ทั่วไปแทน `crv-button-standard`
- อย่าเปลี่ยนสีไล่เฉด หรือเอาสี status มาใส่
- ไม่ใช้กับ action รองของ AI feature — ใช้ `outlined` หรือ `text` แทน
- ไม่ใช้ใน dense UI เช่น table row หรือ list item

## MUI mapping

- `CrvButtonDecorative` → `MuiButton` (`variant="contained"`) + gradient จาก token
