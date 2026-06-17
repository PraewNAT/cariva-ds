# crv-badge

> Overlay indicator วางทับบน icon หรือ avatar เพื่อแสดง notification count หรือ status

## Figma structure

- Component type: Badge (overlay)
- Component set: `crv-badge`
- Naming pattern: `variant=dot|standard, color=primary|error|success|warning|info|default`

## Variants

| Property | Values |
|---|---|
| `variant` | `dot`, `standard` |
| `color` | `primary`, `error`, `success`, `warning`, `info`, `default` |

## Sizes

| Variant | Size | Description |
|---|---|---|
| `dot` | 8×8px | จุดสี — บอกว่ามีของใหม่ ไม่แสดงตัวเลข |
| `standard` | 20×20px | วงกลมพร้อมตัวเลข — แสดงจำนวน |

## Properties

| Property | Type | Values / Notes |
|---|---|---|
| `variant` | variant | `dot` \| `standard` |
| `color` | variant | `primary` \| `error` \| `success` \| `warning` \| `info` \| `default` |
| `badgeContent` | text | ตัวเลขที่แสดงใน `variant=standard` — default: `"1"` |

## Anatomy

- **badge frame** — วงกลม/จุด, fill สี, radius `radius/full`
- **label** — text node ใน `variant=standard` เท่านั้น — `typography/label/small`, fill `color/content/inverse`

## Layout behavior

- Direction: –
- Sizing: fixed (dot 8×8, standard 20×20)
- Radius: `radius/full`
- Placement:
  - `crv-button-icon` / avatar วงกลม → `overlap=circular`, anchor top-right (badge ทับ icon)
  - icon สี่เหลี่ยม → `overlap=rectangular`, anchor top-right
  - avatar online status → ใช้ `CrvAvatar` prop `badge={true}` (มุมล่างขวา) — **ไม่ใช่** `CrvBadge`

## Token usage

- Color (fill):
  - `color=primary` → `color/brand/primary/on-surface/default`
  - `color=error` → `color/status/error/on-surface/default`
  - `color=success` → `color/status/success/on-surface/default`
  - `color=warning` → `color/status/warning/on-surface/default`
  - `color=info` → `color/status/info/on-surface/default`
  - `color=default` → `color/on-surface/sunken`
- Color (text):
  - `color=default` → `color/content/primary`
  - อื่น ๆ → `color/content/inverse`
- Typography: `typography/label/small` (standard only)
- Radius: `radius/full`

## MUI mapping

- `crv-badge` → wrap `MuiBadge`
- `variant=dot` → MUI Badge `variant="dot"`
- `variant=standard` → MUI Badge `variant="standard"`
- `color` → ใช้ MUI `color` prop หรือ `sx` เพื่อ map กับ semantic token

## Do / Don't

### Do

- ใช้ `variant=dot` เมื่อต้องการแจ้งว่ามีการอัปเดต/notification ใหม่ โดยไม่จำเป็นต้องแสดงจำนวน
- ใช้ `variant=standard` เมื่อต้องการแสดงจำนวน เช่น unread message, cart items
- วาง badge ทับบน icon หรือ avatar เสมอ — ไม่ใช้เป็น standalone element
- เลือก `color` ให้สื่อ context เช่น `error` สำหรับ alert, `primary` สำหรับ notification ทั่วไป

### Don't

- อย่าใช้ `crv-badge` แทน `crv-tag` — badge ไว้ overlay, tag ไว้แสดง label แบบ standalone
- อย่าใช้ `crv-badge` แทน `CrvAvatar badge` สำหรับ online status — online dot อยู่มุมล่างขวา, notification badge อยู่มุมบนขวา
- อย่าแสดงตัวเลขมากกว่า 2-3 หลักโดยไม่ truncate เช่น ควรแสดง "99+" แทน "999"

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยัน
