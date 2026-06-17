# Stepper

> แสดงความคืบหน้าของ multi-step flow — รองรับ horizontal, vertical และ mobile

## Figma structure

- Component set: `crv-stepper-icon`, `crv-stepper-base`, `crv-mobile-stepper`, `crv-stepper`
- Code components: `CrvStepperIcon`, `CrvStep`, `CrvStepper`, `CrvMobileStepper`
- Page node: `4714:6228`
- Naming pattern (stepper-base): `text={left|center}, state={Inactive|Active|Complete|Error|Warning|Info|Success}`
- Naming pattern (stepper): `smallScreen={true|false}, optional={true|false}, text={left|center}, alignment={Horizontal|Vertical}`
- Naming pattern (mobile-stepper): `progressType={Dots|Text|Progress}`

## Code mapping

- `crv-stepper-icon` → `CrvStepperIcon`
- `crv-stepper-base` → `CrvStep`
- `crv-stepper` → `CrvStepper`
- `crv-mobile-stepper` → `CrvMobileStepper`
- `showOptional` maps to Figma `optional=true`
- `textAlign="center"` maps to Figma `text=Center` / `alternativeLabel`

## Variants

### crv-stepper-icon
| Property | Values |
|---|---|
| `state` | `Default`, `Done` |

### crv-stepper-base (`<Step>`)
| Property | Values |
|---|---|
| `state` | `Inactive`, `Active`, `Complete`, `Error`, `Warning`, `Info`, `Success` |
| `text` | `left`, `center` |

### crv-mobile-stepper (`<MobileStepper>`)
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

### crv-mobile-stepper
| Property | Type | Notes |
|---|---|---|
| `progressType` | variant | Dots = จุด, Text = ตัวเลข, Progress = progress bar |

## Token usage

### Color
| Element | Token |
|---|---|
| Step Active / Primary BG | `color/brand/primary/on-surface/default` |
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
- ใช้ `crv-mobile-stepper` บน mobile แทน `crv-stepper` เต็ม
- ใช้ `optional=true` กับ step ที่ผู้ใช้ข้ามได้

### ไม่ควรทำ

- อย่าใช้ stepper กับ flow ที่มีแค่ 1-2 ขั้นตอน
- อย่าข้าม step โดยไม่อัปเดต state ให้ถูกต้อง
- อย่าใช้ `crv-stepper` แบบ Horizontal บน mobile — ใช้ `crv-mobile-stepper` แทน

## MUI mapping

- `CrvStepperIcon` → custom 24px step icon
- `CrvStep` → `MuiStep` + `MuiStepLabel` + `CrvStepIcon`
- `CrvStepper` → `MuiStepper`
- `CrvMobileStepper` → custom layout with `CrvButton` + dots/text/`LinearProgress`

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
