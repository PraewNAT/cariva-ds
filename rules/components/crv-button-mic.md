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

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้สำหรับ**การเลือก input ของเสียงเท่านั้น**
- เปิด `active` ขณะมีเสียงเข้า — แอนิเมชันเคารพ `prefers-reduced-motion`

### ไม่ควรทำ

- อย่าใช้เป็น dropdown ทั่วไป
- อย่าให้ชื่ออุปกรณ์ขึ้นบรรทัดใหม่ — ยาวเกินให้ตัดด้วย `…`

## MUI mapping

- `CrvButtonMic` → `ButtonBase` + waveform ที่วาดเอง
