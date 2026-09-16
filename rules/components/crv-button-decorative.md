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

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้กับ **Action หลักที่เกี่ยวข้องกับการทำงานของ AI เท่านั้น**
- ใช้ปุ่มนี้ปุ่มเดียวในหนึ่งพื้นที่ — จุดประสงค์คือให้เด่น

### ไม่ควรทำ

- อย่าใช้เป็นปุ่ม primary ทั่วไปแทน `crv-button-standard`
- อย่าเปลี่ยนสีไล่เฉด หรือเอาสี status มาใส่

## MUI mapping

- `CrvButtonDecorative` → `MuiButton` (`variant="contained"`) + gradient จาก token
