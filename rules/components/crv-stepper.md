# Stepper

> แสดงความคืบหน้าของ multi-step flow — รองรับ horizontal, vertical และแบบ compact

## Figma structure

- Component set: `crv-stepper-marker`, `crv-stepper-base`, `crv-stepper-compact`, `crv-stepper`
- Code components: `CrvStepperMarker`, `CrvStep`, `CrvStepper`, `CrvStepperCompact`
- Building blocks: `crv-stepper-marker`, `crv-stepper-base` — ห้ามหยิบไปวางใน product โดยตรง
- Page node: `4714:6228`
- Naming pattern (stepper-marker): `content={number|icon}, status={Default|Active|Done|Error|Warning|Info|Success}`
- Naming pattern (stepper-base): `text={left|center}, state={Inactive|Active|Complete|Error|Warning|Info|Success}`
- Naming pattern (stepper): `smallScreen={true|false}, optional={true|false}, text={left|center}, alignment={Horizontal|Vertical}`
- Naming pattern (stepper-compact): `progressType={Dots|Text|Progress}`

## Code mapping

- `crv-stepper-marker` → `CrvStepperMarker`
- `crv-stepper-base` → `CrvStep`
- `crv-stepper` → `CrvStepper`
- `crv-stepper-compact` → `CrvStepperCompact`
- `showOptional` maps to Figma `optional=true`
- `textAlign="center"` maps to Figma `text=Center` / `alternativeLabel`

## Variants

### crv-stepper-marker
| Property | Values |
|---|---|
| `content` | `number`, `icon` |
| `status` | `Default`, `Active`, `Done`, `Error`, `Warning`, `Info`, `Success` |

สีของ marker ตั้งที่ fill ของ frame ตัวเอง (`cornerRadius: 9999`) ไม่มี layer วงกลมซ้อนข้างใน

### crv-stepper-base (`<Step>`)
| Property | Values |
|---|---|
| `state` | `Inactive`, `Active`, `Complete`, `Error`, `Warning`, `Info`, `Success` |
| `text` | `left`, `center` |

### crv-stepper-compact
| Property | Values |
|---|---|
| `progressType` | `Dots`, `Text`, `Progress` |

### crv-stepper (`<Stepper>`)
| Property | Values |
|---|---|
| `alignment` | `Horizontal`, `Vertical` |
| `text` | `left`, `center` |
| `smallScreen` | `true`, `false` |
| `optional` | `true`, `false` |

## Properties

### crv-stepper-base
| Property | Type | Notes |
|---|---|---|
| `state` | variant | สถานะของแต่ละ step |
| `text` | variant | การจัดวาง label — left หรือ center |
| `optional` | boolean | แสดง/ซ่อน optional label |
| `stepTitleContent` | text | ข้อความ title ของ step |
| `optionalContent` | text | ข้อความ optional label |

### crv-stepper
| Property | Type | Notes |
|---|---|---|
| `alignment` | variant | Horizontal = แนวนอน, Vertical = แนวตั้ง |
| `text` | variant | การจัดวาง label ของ step |
| `smallScreen` | variant | ใช้ layout สำหรับหน้าจอเล็ก |
| `optional` | variant | แสดง optional label ใน steps |

### crv-stepper-compact
| Property | Type | Notes |
|---|---|---|
| `progressType` | variant | Dots = จุด, Text = ตัวเลข, Progress = progress bar |

## Token usage

### Color
| Element | Token |
|---|---|
| Marker Complete / Done BG | `color/brand/primary/on-surface/default` |
| Marker Active BG | `color/brand/primary/on-surface/muted` |
| Marker Active number | `color/brand/primary/on-surface/default` |
| Marker Default BG | `color/bg/solid` |
| Marker Default number | `color/content/secondary` |
| Step Complete icon | `color/content/on-brand` |
| Step Inactive BG | `color/on-surface/default` |
| Step Inactive text | `color/content/disabled` |
| Step title default | `color/content/secondary` |
| Step title active | `color/content/primary` |
| Connector line | `color/border/default` |
| Error state | `color/status/error/on-surface/default` |
| Warning state | `color/status/warning/on-surface/default` |
| Success state | `color/status/success/on-surface/default` |
| Info state | `color/status/info/on-surface/default` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `state=Active` สำหรับ step ที่กำลังดำเนินการอยู่
- ใช้ `state=Complete` เมื่อ step เสร็จสมบูรณ์
- ใช้ `alignment=Horizontal` สำหรับ flow ที่มีขั้นตอนน้อย (3-5 steps)
- ใช้ `alignment=Vertical` เมื่อ step มีคำอธิบายยาวหรือมีหลายขั้นตอน
- ใช้ `crv-stepper-compact` เมื่อพื้นที่จำกัด — mobile, dialog, side panel — แทน `crv-stepper` เต็ม
- ใช้ `optional=true` กับ step ที่ผู้ใช้ข้ามได้

### ไม่ควรทำ

- อย่าใช้ stepper กับ flow ที่มีแค่ 1-2 ขั้นตอน
- อย่าข้าม step โดยไม่อัปเดต state ให้ถูกต้อง
- อย่าใช้ `crv-stepper` แบบ Horizontal บน mobile — ใช้ `crv-stepper-compact` แทน
- อย่าหยิบ `crv-stepper-marker` หรือ `crv-stepper-base` ไปวางใน product โดยตรง — ใช้ `crv-stepper` หรือ `crv-stepper-compact`

## MUI mapping

- `CrvStepperMarker` → custom 24px step marker
- `CrvStep` → `MuiStep` + `MuiStepLabel` + `CrvStepIcon`
- `CrvStepper` → `MuiStepper`
- `CrvStepperCompact` → custom layout with `CrvButton` + dots/text/`LinearProgress`

## Needs designer review

- `CrvStepperMarker` ใน code รองรับแค่ `state='default' | 'done'` ส่วน Figma มี `status` 7 ค่าและแกน `content` — ต้องตัดสินใจว่าจะขยาย props ให้ตรงหรือไม่
- `crv-stepper-base` state=Info: `text=Left` ใช้ `color/brand/primary/on-surface/default` แต่ `text=Center` ใช้ `color/status/info/on-surface/default` — ต้องเลือกอันเดียว
- `crv-stepper-desktop` ยังเป็น instance จาก DS อื่น — รอตัดสินใจว่าจะรื้อหรือลบ
