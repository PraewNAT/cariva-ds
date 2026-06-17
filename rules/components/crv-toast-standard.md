# crv-toast-standard

> Toast banner สำหรับแสดงข้อความ feedback/notification รองรับ 2 variant (primary/secondary) และ 4 severity (error/info/success/warning)

## Figma structure

- Component type: Toast
- Figma component set: `crv-toast-standard` (page Toast)
- Code component: `CrvToast`
- Naming pattern: `variant=primary|secondary, severity=error|info|success|warning`

## Code mapping

- Use `CrvToast` for Figma `crv-toast-standard`.
- `variant="primary"` maps to Figma filled toast surfaces.
- `variant="secondary"` maps to Figma tinted toast surfaces.
- `showAction` maps to Figma `showAction`.
- `actionIcon` maps to Figma `actionIcon`.
- Pass toast copy via `children` (Figma `{Title}`).

## Variants

| Property | Values |
|---|---|
| `variant` | `primary`, `secondary` |
| `severity` | `error`, `info`, `success`, `warning` |

## Variant อธิบาย

- `variant=primary`: filled background เข้ม — ใช้เมื่อต้องการเน้น toast ให้ชัดเจน
- `variant=secondary`: tinted background อ่อน — ใช้เมื่อต้องการ toast แบบ subtle ไม่รบกวน layout

## Sizes

| ขนาด | หมายเหตุ |
|---|---|
| width=320, height=40 | Fixed — ความกว้างปรับตาม container ใน product |

## Anatomy

- Severity icon (INSTANCE): icon ซ้ายสุด แสดง severity — `ErrorOutline`, `InfoOutlined`, `CheckCircleOutlined`, `WarningAmberRounded`
- `Text` (FRAME): กลุ่ม text content
  - `{Title}` (TEXT): ข้อความหลัก
- `ClearRounded` (INSTANCE): close icon
- `On Close Container` (FRAME): พื้นที่สำหรับ close button
  - `<IconButton>` (INSTANCE): ปุ่มปิด — shared component `Size=Small, Color=Inherit, State=Enabled`

## Layout behavior

- Direction: horizontal
- Padding: `spacing/sm` (8px) ทุกด้าน
- Gap: `spacing/sm` (8px)
- Sizing: FIXED width, height hug content
- Radius: `radius/8`

## Token usage

### primary variant

| Severity | Background token | Icon/text color |
|---|---|---|
| `error` | `color/status/error/on-surface/default` | `color/content/inverse` |
| `info` | `color/status/info/on-surface/default` | `color/content/inverse` |
| `success` | `color/status/success/on-surface/default` | `color/content/inverse` |
| `warning` | `color/status/warning/on-surface/default` | `color/content/inverse` |

### secondary variant

| Severity | Background token | Icon color | Text color |
|---|---|---|---|
| `error` | `color/status/error/on-surface/muted` | `color/status/error/on-surface/default` | `color/content/primary` |
| `info` | `color/status/info/on-surface/muted` | `color/brand/primary/on-surface/default` | `color/content/primary` |
| `success` | `color/status/success/on-surface/subtle` | `color/status/success/on-surface/default` | `color/content/primary` |
| `warning` | `color/status/warning/on-surface/muted` | `color/status/warning/on-surface/default` | `color/content/primary` |

- Spacing: `spacing/sm` (padding + gap)
- Radius: `radius/8`
- Close button: shared `<IconButton>` — radius = `radius/full`

## Do / Don't

### Do

- ใช้ `severity` ให้ตรงกับความหมาย — `error` เมื่อเกิดข้อผิดพลาด, `success` เมื่อสำเร็จ, `warning` เมื่อต้องระวัง, `info` เมื่อให้ข้อมูลทั่วไป
- ใช้ `variant=primary` เมื่อต้องการเน้น toast ให้ชัดเจน (filled background)
- ใช้ `variant=secondary` เมื่อต้องการแสดง toast แบบ subtle ไม่รบกวน layout

### Don't

- อย่าใช้ `severity=error` เพื่อแสดงข้อความ warning — เลือก severity ให้ตรงความหมายเสมอ
- อย่าแสดง toast หลายอันซ้อนกันโดยไม่มีลำดับความสำคัญ
- อย่าใช้ toast แทน inline alert สำหรับข้อความที่ต้องการให้ผู้ใช้อ่านค้างในหน้า

## Needs designer review

- ยังไม่มี variant ที่รองรับ description text (multi-line) — ปัจจุบันมีเฉพาะ `{Title}` บรรทัดเดียว
