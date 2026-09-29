# crv-checkbox-group

> กลุ่ม checkbox พร้อมหัวข้อและคำอธิบาย — ใช้เลือกหลายรายการที่เกี่ยวข้องกัน

## โครงสร้าง Figma

- Component type: Checkbox Group
- Component set: `crv-checkbox-group`
- Naming pattern: `color={primary|error}, disabled={true|false}`

## Variants

| Property | Values |
|---|---|
| `color` | `primary`, `error` |
| `disabled` | `true`, `false` |

<!-- updated 2026-09-28 -->
> มี 3 variants ไม่ใช่ 4 — ไม่มี `color=error, disabled=true` เพราะ `disabled` กลบ `color`

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

<!-- updated 2026-09-28 -->
## Anatomy

- **Header Content** — label + description (gap `spacing/sm`)
- **Options Content** — 6× `crv-checkbox-standard` (`descriptionVisible=false`), gap `spacing/md`, padding-top `spacing/md`
- **checkBoxSlot** — slot ท้ายกลุ่ม รับ `crv-checkbox-standard` เพิ่มเองได้เกิน 6 แถว

> `errorMessage` / `errorMessageVisible` ถูกถอดออกจาก Figma แล้ว — เคยประกาศไว้แต่ไม่เคยผูกกับเลเยอร์ไหน ข้อความ validation ให้วางไว้นอกกลุ่ม

## Token usage

| Element | Token |
|---|---|
| Group label (`color=primary`) | typography/label/medium, content/primary |
| Group label (`color=error`) | typography/label/medium, status/error/content/default |
| Group label (`disabled`) | content/disabled |
| Description | typography/body/medium, content/secondary |
| Item checkbox | `crv-checkbox-standard` (`descriptionVisible=false`) |
| Item label (`color=error`) | status/error/content/default |
| Unchecked item border (`color=error`) | status/error/border/strong |

## MUI Mapping

| Figma | React |
|---|---|
| Group container | `<CrvCheckboxGroup />` |
| Each item | `<CrvCheckbox descriptionVisible={false} />` |


<!-- updated 2026-09-28 -->
## เลือกใช้ตัวไหน

| สถานการณ์ | ใช้ |
|---|---|
| คำถามเดียว ตอบใช่/ไม่ใช่ อันเดียว เช่น ยอมรับเงื่อนไข | `crv-checkbox-standard` |
| หนึ่งแถวใน table หรือ list ที่ layout เป็นของหน้าอยู่แล้ว | `crv-checkbox-standard` (`descriptionVisible={false}`) |
| คำถามเดียว ตัวเลือก 2–6 อันที่เป็นพวกเดียวกัน | `crv-checkbox-group` |
| ตัวเลือกที่ต้องอ่าน 1–2 บรรทัดก่อนเลือก หรือเลือกผิดแล้วมีผล | `crv-checkbox-card` |
| เลือกได้อันเดียว | ❌ ใช้ Radio Button |
| กดแล้วมีผลทันทีไม่ต้อง save | ❌ ใช้ Switch |
| ตัวเลือกเกิน 7 อัน | ❌ ใช้ Dropdown หรือ Autocomplete |

> เส้นแบ่งระหว่าง group กับ card: **แถวใน group ไม่มี description** ถ้าตัวเลือกต้องมีคำอธิบายรายตัว นั่นคือ card

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้เมื่อตัวเลือก **2–6 อัน** มาจากคำถามเดียวกันจริงๆ เช่น sidebar preferences
- label กลุ่มเป็นหัวข้อ (คำนาม) ไม่ใช่คำสั่ง — คำสั่งไว้ที่ `description`
- เกิน 6 แถวให้ต่อผ่าน `checkBoxSlot` ไม่ใช่วาง group ซ้อนสองอัน
- ปิดทั้งกลุ่มด้วย `disabled` เมื่อยังไม่ถึงเงื่อนไข ดีกว่าปิดทีละแถวให้ผู้ใช้เดาเอง
- ใช้ `color=error` กับ validation ระดับกลุ่ม เช่น "ต้องเลือกอย่างน้อย 1 รายการ" แล้ววางข้อความ error ใต้กลุ่มเอง
- จัดกลุ่มด้วย `role="group"` และ label ที่อธิบายชัดเจน

### ไม่ควรทำ

- อย่าผสมคำถามคนละเรื่องไว้กลุ่มเดียวเพราะมันอยู่ใกล้กันในหน้า
- อย่าพยายามใส่คำอธิบายรายแถว — ถ้าจำเป็นนั่นคือ `crv-checkbox-card`
- อย่ารอให้ component แสดงข้อความ error เอง — ไม่มี `errorMessage` แล้ว
- อย่าทำ select all ด้วยแถวแรกของกลุ่ม — select all คู่กับ `indeterminate` อยู่ที่หัวตาราง (`crv-table-head` `compact`)
- ไม่ควรใช้ checkbox group สำหรับ single yes/no — ใช้ `CrvCheckbox` แทน
- ไม่ควรใช้ radio behavior (เลือกได้ทีละอย่าง) ในกลุ่มนี้
- อย่าใช้เมื่อตัวเลือกยาวเกิน 7 อัน — กลายเป็นกำแพง scan ยาก
