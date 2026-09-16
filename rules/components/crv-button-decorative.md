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

- แสงออโรราไหลอยู่เบื้องหลัง label — เลเยอร์เบลอ 2 ชั้นเคลื่อนสวนกันที่ **6 วินาที** กับ **8.5 วินาที** (คาบไม่หารกันลงตัว จังหวะจึงไม่ซ้ำรอบให้เห็น)
- ใช้แค่ 3 token เดิม (`from` / `via` / `to`) ไม่มีสีใหม่ · blob สีกรมอยู่ชั้นล่างเพื่อรักษาแกนสีเข้มตาม Figma
- อยู่บน pseudo-element `z-index: -1` ใน stacking context ของปุ่มเอง — ไม่เพิ่ม DOM และไม่บังตัวอักษร
- animate เฉพาะ `transform` เท่านั้น ไม่มี repaint
- **หยุดนิ่งเมื่อ**: `animated={false}` · `prefers-reduced-motion: reduce` · `disabled`

> `animated={false}` ไว้ใช้ตอนหน้าจอแน่นหรือมีปุ่มนี้หลายตัวเรียงกัน — ไม่ใช่เรื่อง accessibility เพราะ `prefers-reduced-motion` จัดการให้อยู่แล้ว

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้กับ **Action หลักที่เกี่ยวข้องกับการทำงานของ AI เท่านั้น**
- ใช้ปุ่มนี้ปุ่มเดียวในหนึ่งพื้นที่ — จุดประสงค์คือให้เด่น

### ไม่ควรทำ

- อย่าใช้เป็นปุ่ม primary ทั่วไปแทน `crv-button-standard`
- อย่าเปลี่ยนสีไล่เฉด หรือเอาสี status มาใส่

## MUI mapping

- `CrvButtonDecorative` → `MuiButton` (`variant="contained"`) + gradient จาก token
