# crv-toast-standard

> Toast สำหรับแสดงข้อความ feedback/notification — 3 variant (Filled/Outlined/Standard) × 5 severity (error/warning/info/success/notification) รองรับ Title, Description, ปุ่ม Action และปุ่มปิด

## Figma structure

- Figma component set: `crv-toast-standard` (page Toast) — node `6413:55828`
- Code component: `CrvToast`
- Naming pattern: `Severity=Error|Warning|Info|Success|Notification, Variant=Filled|Outlined|Standard`

## Code mapping

- `Variant` → `variant` (`filled` | `outlined` | `standard`)
- `Severity` → `severity` (`error` | `warning` | `info` | `success` | `notification`)
- `Title?` / `↳ Title` → `title` · `Description?` / `↳ Description` → `description`
- `Action?` / `↳Instance` → `action` — สลับได้เฉพาะ `crv-button-standard` (text / neutral / small)
- `On Close?` → `onClose` — ส่ง handler มาเมื่อไหร่ ปุ่มปิดถึงจะแสดง
- `variant="primary"` / `"secondary"` ของเดิมยังใช้ได้ (map เป็น `filled` / `standard`) แต่ mark deprecated แล้ว

## Variants

| Property | Values |
|---|---|
| `Variant` | `Filled`, `Outlined`, `Standard` |
| `Severity` | `Error`, `Warning`, `Info`, `Success`, `Notification` |

## Variant อธิบาย

- `Filled`: พื้นทึบตาม severity — ใช้เมื่อต้องการเน้นให้เห็นชัดที่สุด
- `Outlined`: ไม่มีพื้น มีแค่เส้นขอบ 1px — ใช้บนพื้นขาวเมื่อต้องการน้ำหนักเบา
- `Standard`: พื้นอ่อน + เส้นขอบ 1px + เงา — ใช้เมื่อต้องการแจ้งเตือนแบบนุ่มนวล ไม่รบกวน layout

## Sizes

| ขนาด | หมายเหตุ |
|---|---|
| width 320 | ใน Figma กว้างคงที่ ส่วนในโค้ดยืดตาม container |

## Anatomy

- Severity icon (24px) — Filled/Outlined ใช้ไอคอนแบบเส้น (`error-outline`, `report-problem`, `info` outlined, `check-circle-outline`) · Standard ใช้แบบทึบ (`error`, `warning`, `info`, `check-circle` rounded)
- `{Title}` — `typography/label/large`
- `{Description}` — `typography/label/medium` (ซ่อนได้)
- Action — `crv-button-standard` text / neutral / small (ซ่อนได้)
- Close — `crv-button-icon` ghost / neutral / small + icon `close` (ซ่อนได้)
- Layout: horizontal · padding `spacing/xs` บน-ล่าง, `spacing/lg` ซ้าย-ขวา · radius `radius/12`

## Token usage

| Element | Token |
|---|---|
| Filled พื้น | `color/status/{severity}/on-surface/default` |
| Filled text / icon / ปุ่ม | `color/content/inverse` |
| Outlined เส้นขอบ (1px) | `color/status/{severity}/border/strong` |
| Standard พื้น | `color/status/{severity}/on-surface/subtle` |
| Standard เส้นขอบ (1px) | `color/status/{severity}/border/default` |
| Standard เงา | `shadow/status/{severity}` |
| Outlined / Standard icon | `color/status/{severity}/content/default` |
| Title | `color/content/primary` · Description `color/content/secondary` |
| Notification | พื้น/เส้นขอบ `color/neutral/*` · icon `color/brand/primary/on-surface/default` · Filled ใช้ `color/bg/white` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- เลือก `severity` ให้ตรงความหมาย — error เมื่อผิดพลาด, success เมื่อสำเร็จ, warning เมื่อต้องระวัง, info เมื่อให้ข้อมูล
- ใช้ `Notification` สำหรับข้อความระบบที่ไม่ใช่ status
- ใช้ `Variant=Filled` เมื่อต้องการเน้น · `Variant=Standard` เมื่อต้องการ subtle
- ส่ง `onClose` เมื่อต้องการให้ผู้ใช้ปิดเองได้

### ไม่ควรทำ

- อย่าใช้ `severity=error` แสดง warning
- อย่าใส่ปุ่ม Action มากกว่า 1 ปุ่ม
- อย่าวาง toast ซ้อนกันหลายอันโดยไม่มีลำดับความสำคัญ

## MUI mapping

- `CrvToast` → `MuiAlert` (severity `notification` map เป็น `info` ภายใน) + `CrvButtonIcon` สำหรับปุ่มปิด

## Needs designer review

- `crv-button-standard` ใน Figma ใช้ `color=neutral` สำหรับปุ่ม Action แต่ `CrvButton` ในโค้ดยังไม่มีสี `neutral` (มีแค่ `primary` / `error`)
- ปุ่ม Action และปุ่มปิดบน `Variant=Filled` ต้องตั้งสีทับเป็น `color/content/inverse` เพราะ `crv-button-standard` / `crv-button-icon` ยังไม่มีสีแบบขาวบนพื้นสี
- `Warning` + `Info` แบบ Filled: ตัวหนังสือขาวบนพื้นได้ contrast 3.2:1 และ 4.1:1 (ต่ำกว่า WCAG AA 4.5:1) — Design System Owner รับทราบแล้ว
