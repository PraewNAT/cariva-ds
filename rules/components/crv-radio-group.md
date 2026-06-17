# crv-radio-group

> กลุ่ม Radio Button สำหรับเลือกทีละหนึ่งตัวเลือก — รองรับ label, description, error และควบคุมจำนวน option ได้สูงสุด 6 ตัว

## โครงสร้าง Figma

- Component type: Radio Group
- Component set: `crv-radio-group` (node `3815:5863`)
- Naming pattern: `color={primary|error}, disabled={true|false}`

## Variants

| Property | Values |
|---|---|
| `color` | `primary`, `error` |
| `disabled` | `true`, `false` |

## Properties

| Property | Type | Notes |
|---|---|---|
| `color` | variant | primary / error |
| `disabled` | variant | true / false |
| `labelVisible` | boolean | แสดง/ซ่อน label |
| `label` | text | ข้อความ label |
| `descriptionVisible` | boolean | แสดง/ซ่อน description |
| `description` | text | คำอธิบายเพิ่มเติม |
| `errorMessageVisible` | boolean | แสดง/ซ่อน error message |
| `errorMessage` | text | ข้อความแสดงข้อผิดพลาด |
| `radio01Visible` – `radio06Visible` | boolean | ควบคุมจำนวน radio option ที่แสดง (สูงสุด 6 ตัว) |

## Anatomy

- **Label** — ข้อความ label ของกลุ่ม
- **Description** — คำอธิบายเพิ่มเติมของกลุ่ม
- **Radio options** — รายการ radio button (radio01–radio06) เรียงแนวตั้ง
- **Error message** — ข้อความแสดงข้อผิดพลาด (color=error)

## Layout behavior

- Direction: vertical
- Sizing: hug content

## Token usage

### Color — `primary`
| Element | Token |
|---|---|
| Radio selected | `color/brand/primary/on-surface/default` |
| Radio border | `color/border/default` |
| Label | `color/content/primary` |
| Description | `color/content/secondary` |
| Disabled | `color/content/disabled` |

### Color — `error`
| Element | Token |
|---|---|
| Radio border | `color/border/error` |
| Error message | `color/status/error/content/default` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ Radio Button เมื่อผู้ใช้ต้องเลือกทีละหนึ่งอย่างจากตัวเลือกที่มี
- ใช้เมื่อต้องการให้ผู้ใช้เห็นตัวเลือกทั้งหมดพร้อมกันก่อนตัดสินใจ
- ใช้ `color=error` พร้อม error message เมื่อไม่ได้เลือกในกรณีที่ required
- ใช้ description เพื่ออธิบายเพิ่มเติมเมื่อชื่อ option เพียงอย่างเดียวไม่ชัดพอ
- เรียงตัวเลือกอย่างมีเหตุผล เช่น จากบ่อยใช้ไปน้อยใช้ หรือตามตรรกะของ flow

### ไม่ควรทำ

- ไม่ควรใช้ Radio Button เมื่อเลือกได้หลายรายการ — ใช้ Checkbox แทน
- ไม่ควรใช้ Radio Button สำหรับ On/Off — ใช้ Switch แทน
- ไม่ควรตั้งค่า default ที่ไม่มี option ใดถูกเลือกเมื่อมีตัวเลือก default ที่ชัดเจน

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
