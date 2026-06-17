# crv-linear-progress / crv-circular-progress

> Progress indicator สำหรับแสดงสถานะการทำงานของ process รองรับทั้ง linear bar และ circular spinner พร้อม variant determinate, indeterminate, buffer และ 4 สี

## Figma structure

- Component type: Progress
- Section: `Progress` (`4457:16647`)
- Component sets:
  - `crv-linear-progress` (`4456:16573`) — progress bar แนวนอน
  - `crv-circular-progress` (`4456:16646`) — progress spinner วงกลม
- Naming pattern:
  - linear: `variant=determinate|indeterminate|buffer, color=primary|error|success|warning`
  - circular: `variant=determinate|indeterminate, size=small|medium|large, color=primary|error|success|warning`

## Variants

### crv-linear-progress

| Property | Values |
|---|---|
| `variant` | `determinate`, `indeterminate`, `buffer` |
| `color` | `primary`, `error`, `success`, `warning` |

### crv-circular-progress

| Property | Values |
|---|---|
| `variant` | `determinate`, `indeterminate` |
| `size` | `small`, `medium`, `large` |
| `color` | `primary`, `error`, `success`, `warning` |

## Sizes

### crv-linear-progress

| ขนาด | หมายเหตุ |
|---|---|
| width=240, height=4 | Fixed height 4px — ความกว้างปรับตาม container ใน product |

### crv-circular-progress

| Size | ขนาด |
|---|---|
| `small` | 24×24 |
| `medium` | 40×40 |
| `large` | 56×56 |

## Variants อธิบาย

- `determinate`: แสดง progress % ที่แน่นอน — `fill` frame แสดงสัดส่วนที่เสร็จแล้ว
- `indeterminate`: ไม่รู้ระยะเวลา — animation วิ่งต่อเนื่อง
- `buffer` (linear เท่านั้น): แสดงทั้ง `fill` (loaded) และ `buffer` (buffered) พร้อมกัน

## Anatomy

### crv-linear-progress

- Component frame: track (background bar) — radius = `radius/full`, height = 4px
  - `fill` (FRAME): ส่วนที่ progress แล้ว — fill ตาม color
  - `buffer` (FRAME, เฉพาะ `variant=buffer`): ส่วน buffer — fill ตาม color muted

### crv-circular-progress

- Component frame: วงกลม
  - `track` (ELLIPSE): วงนอก background — fill ตาม color subtle
  - `fill` (ELLIPSE): ส่วนที่ progress แล้ว — fill ตาม color

## Token usage

### primary

| Layer | Token |
|---|---|
| track / track background | `color/brand/primary/on-surface/subtle` |
| fill | `color/brand/primary/on-surface/default` |
| buffer (linear) | `color/brand/primary/on-surface/muted` |

### error

| Layer | Token |
|---|---|
| track / track background | `color/status/error/on-surface/subtle` |
| fill | `color/status/error/on-surface/default` |
| buffer (linear) | `color/status/error/on-surface/muted` |

### success

| Layer | Token |
|---|---|
| track / track background | `color/status/success/on-surface/subtle` |
| fill | `color/status/success/on-surface/default` |
| buffer (linear) | `color/status/success/on-surface/muted` |

### warning

| Layer | Token |
|---|---|
| track / track background | `color/status/warning/on-surface/subtle` |
| fill | `color/status/warning/on-surface/default` |
| buffer (linear) | `color/status/warning/on-surface/muted` |

- Radius (linear track): `radius/full`
- Typography: ไม่มี text node

## Do / Don't

### Do

- ใช้ `variant=determinate` เมื่อรู้ progress % ที่แน่นอน เช่น upload, download
- ใช้ `variant=indeterminate` เมื่อไม่รู้ระยะเวลา เช่น loading data, waiting for API
- ใช้ `variant=buffer` เมื่อต้องการแสดงทั้ง loaded และ buffered พร้อมกัน เช่น video streaming
- เลือก `color` ให้ตรงกับ semantic — `error` เมื่อเกิดปัญหา, `success` เมื่อสำเร็จ, `warning` เมื่อต้องระวัง

### Don't

- อย่าใช้ `color=error` แสดง progress ปกติเพียงเพราะต้องการสีแดง
- อย่าใช้ `crv-circular-progress` ในพื้นที่แคบที่ควรใช้ linear แทน เช่น inline text
- อย่าแสดง progress bar โดยไม่มี feedback อื่นประกอบเมื่อ process ใช้เวลานานกว่า 10 วินาที

## Needs designer review

- `crv-linear-progress` ใช้ width=240 fixed — ควร fill container ใน product จริง
- `crv-circular-progress` ยังไม่มี `variant=buffer` — Needs designer review ว่าต้องการหรือไม่
