# crv-checkbox-group

> กลุ่ม checkbox พร้อมหัวข้อ คำอธิบาย และ error message — ใช้เลือกหลายรายการที่เกี่ยวข้องกัน

## โครงสร้าง Figma

- Component type: Checkbox Group
- Component set: `crv-checkbox-group`
- Naming pattern: `color={primary|error}, disabled={true|false}`

## Variants

| Property | Values |
|---|---|
| `color` | `primary`, `error` |
| `disabled` | `true`, `false` |

## Text props

| Property | Default (Figma) |
|---|---|
| `label` | Sidebar |
| `labelVisible` | true |
| `description` | Select the items you want to display in the sidebar. |
| `descriptionVisible` | true |
| `errorMessage` | Your one-time password must be 6 characters. |
| `errorMessageVisible` | true |

## Item visibility props

| Property | Maps to |
|---|---|
| `checkbox01Visible` | Recents |
| `checkbox02Visible` | Home |
| `checkbox03Visible` | Applications |
| `checkbox04Visible` | Desktop |
| `checkbox05Visible` | Downloads |
| `checkbox06Visible` | Documents |

## Anatomy

- **Header Content** — label + description (gap `spacing/sm`)
- **Options Content** — 6× `crv-checkbox-standard` (`type=groupItem`), gap `spacing/md`, padding-top `spacing/md`
- **Error message** — แสดงเมื่อ `color=error` และ `errorMessageVisible=true`

## Token usage

| Element | Token |
|---|---|
| Group label (`color=primary`) | typography/label/medium, content/primary |
| Group label (`color=error`) | typography/label/medium, status/error/content/default |
| Group label (`disabled`) | content/disabled |
| Description | typography/body/medium, content/secondary |
| Item checkbox | `crv-checkbox-standard` (`type=groupItem`) |
| Item label (`color=error`) | status/error/content/default |
| Unchecked item border (`color=error`) | border/error |
| Error message | typography/body/medium, status/error/content/default |

## MUI Mapping

| Figma | React |
|---|---|
| Group container | `<CrvCheckboxGroup />` |
| Each item | `<CrvCheckbox type="groupItem" />` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้เมื่อมี checkbox หลายตัวที่เกี่ยวข้องกัน เช่น sidebar preferences
- ใช้ `color=error` พร้อม `errorMessage` เมื่อ validation ไม่ผ่าน
- จัดกลุ่มด้วย `role="group"` และ label ที่อธิบายชัดเจน

### ไม่ควรทำ

- ไม่ควรใช้ checkbox group สำหรับ single yes/no — ใช้ `CrvCheckbox` แทน
- ไม่ควรใช้ radio behavior (เลือกได้ทีละอย่าง) ในกลุ่มนี้
