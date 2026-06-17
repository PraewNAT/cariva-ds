# crv-input-otp

> Input สำหรับกรอกรหัส OTP หรือ PIN — แบ่งเป็นช่องแยกต่อหลัก

## โครงสร้าง Figma

- Component type: OTP Input
- Component set: `crv-input-otp-base` (ช่องเดี่ยว), `crv-input-otp-standard` (กลุ่มช่องทั้งหมด)
- Naming pattern:
  - `crv-input-otp-base`: `state={default|disabled|filled|focused|focusedFilled}`
  - `crv-input-otp-standard`: `state={default|error}`

## Variants

### crv-input-otp-base
| Property | Values |
|---|---|
| `state` | `default`, `disabled`, `filled`, `focused`, `focusedFilled` |

### crv-input-otp-standard
| Property | Values |
|---|---|
| `state` | `default`, `error` |

## States

**crv-input-otp-base:**
- `default` — ช่องว่าง ยังไม่มี interaction
- `focused` — กำลัง focus อยู่ที่ช่องนี้
- `filled` — มีตัวเลขกรอกแล้ว
- `focusedFilled` — focus และมีตัวเลขอยู่แล้ว
- `disabled` — ไม่สามารถกรอกได้

**crv-input-otp-standard:**
- `default` — label `content/primary`, help-text `content/secondary`
- `error` — label ยังคง `content/primary`, help-text แสดง `errorMessage` ด้วย `status/error/content/default` (slot border ไม่เปลี่ยน)

## Properties

### crv-input-otp-standard
| Property | Type | Notes |
|---|---|---|
| `state` | variant | default / error |
| `label` | text | ข้อความ label |
| `helperText` | text | ข้อความช่วยเหลือ |
| `errorMessage` | text | ข้อความแสดงข้อผิดพลาด |

## Anatomy

**crv-input-otp-base:**
- **Input OTP Slot Base** (INSTANCE) — ช่องกรอก 40×40px, border radius `radius/12`
- **Value** — ตัวเลขที่กรอก

**crv-input-otp-standard:**
- **label** (TEXT) — ข้อความ label บนสุด
- **Frame 1** — row ของ `crv-input-otp-base` instances เรียงแนวนอน
- **help-text** (TEXT) — ข้อความด้านล่าง (helper / error)

## Layout behavior

- Direction: vertical (standard) / horizontal (กลุ่มช่อง)
- ขนาดช่อง: 40 × 40px (fixed)
- Gap (standard): `spacing/md` (12px)
- Border radius: `radius/12` (12px)

## Token usage

### Color — `state=default`
| Element | Token |
|---|---|
| Label | `color/content/primary` |
| Help text | `color/content/secondary` |
| Slot border | `color/border/default` |
| Slot background | `color/on-surface/default` |
| Slot value | `color/content/primary` |

### Color — `state=error`
| Element | Token |
|---|---|
| Label | `color/content/primary` |
| Help text (`errorMessage`) | `color/status/error/content/default` |
| Slot border | `color/border/default` (ไม่เปลี่ยนเป็น error border) |
| Slot background | `color/on-surface/default` |
| Slot value | `color/content/primary` |

### Color — slot focus (`crv-input-otp-base`)
| Element | Token |
|---|---|
| Border | `color/border/system` (2px) |
| Caret (empty focus) | `color/brand/primary/content/default` |

### Color — slot disabled (`crv-input-otp-base`)
| Element | Token |
|---|---|
| Border | `color/border/disabled` |
| Value | `color/content/disabled` |

### Typography
| Element | Token |
|---|---|
| Label | `typography/label/medium` (14/22, medium) |
| Help text / error message | `typography/body/medium` (14/22, regular) |
| Slot value | `typography/body/large` (16/24, regular) |

### Radius
- `radius/12` — slot ทุกช่อง

---

## Design Decision — Border Radius

**ใช้ `radius/12` (primitive) ไม่ใช้ `radius/interactive` (semantic)**

- `radius/interactive` เป็น semantic token ที่ responsive ตาม theme mode:
  - Round theme → aliases `radius/full` (9999) = กลมมาก
  - Square theme → aliases `radius/12` = 12px
- OTP slot ต้องการ radius คงที่ประมาณ 12px ทุก theme — ไม่ต้องการให้กลมมากเมื่อเปลี่ยน theme
- จึงใช้ `radius/12` โดยตรงเพื่อให้ความกลมสม่ำเสมอทุก theme mode

## Do / Don't

### Do

- ใช้ `crv-input-otp-standard` เป็น component หลักเสมอ
- ใช้ `state=error` เมื่อ OTP ที่ user กรอกไม่ถูกต้อง
- วาง slot ทั้งหมดเรียงต่อกันในแนวนอน ระยะห่างสม่ำเสมอ

### Don't

- อย่าเปลี่ยน border radius ของ OTP slot เอง — ใช้ `radius/12` ที่ defined ไว้เท่านั้น (ตั้งใจไม่ใช้ `radius/interactive` เพราะต้องการความกลมคงที่ทุก theme)
- อย่าใช้จำนวน slot น้อยกว่า 4 หรือมากกว่า 8
