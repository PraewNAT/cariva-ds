# crv-checkbox-standard

> Checkbox พร้อม label และ description — ใช้ในฟอร์มและกลุ่มตัวเลือก

## โครงสร้าง Figma

- Component type: Checkbox
- Component set: `crv-checkbox-standard`
- Naming pattern: `disabled={true|false}, color={primary|error}, labelPlacement={end|start}` (6 variants)

## Variants

| Property | Values |
|---|---|
| `disabled` | `true`, `false` |
| `color` | `primary`, `error` |
| `labelPlacement` | `end`, `start` |

<!-- updated 2026-09-28 -->
> ไม่มี `type` — แถวแบบ compact คือ `descriptionVisible=false` ไม่ใช่ variant แยก (ฝั่งโค้ดถอด prop `type` ออกแล้วเช่นกัน)
> `disabled` กลบ `color` — ไม่มี `disabled=true, color=error`

## Text props

| Property | Default (Figma) |
|---|---|
| `label` | Accept terms and conditions |
| `labelVisible` | true |
| `description` | You agree to our Terms of Service and Privacy Policy. |
| `descriptionVisible` | true |

## Anatomy

- **Checkbox** — line box สูง 20px (`typography/lineHeight/label/medium`) ครอบ `crv-checkbox-base` 16×16 ที่จัดกึ่งกลางแนวตั้ง
- **Content** — label + description (vertical, gap `spacing/sm`)
- Root gap (checkbox → content): `spacing/md`

<!-- updated 2026-09-28 -->
## Layout

- Cross-axis align: `flex-start` ทุก variant — line box 20px ทำให้ checkbox ตรงบรรทัดแรกของ label เอง ไม่ต้อง offset ด้วยมือ
- `labelPlacement=start` สลับลำดับด้วย `row-reverse` เท่านั้น ระยะทุกอย่างเท่าเดิม

## Token usage

| Element | Token |
|---|---|
| Label | typography/label/medium, content/primary |
| Label (`color=error`) | color/status/error/content/default |
| Label / description (`disabled`) | color/content/disabled |
| Description | typography/body/medium, content/secondary |
| Control (`color=error`) | `crv-checkbox-base` `color=error` — กล่องเป็นสีแดงด้วย ไม่ใช่แค่ label |

## MUI Mapping

| Figma | React |
|---|---|
| `crv-checkbox-base` instance | `<CrvCheckboxBase />` |
| Full standard | `<CrvCheckbox />` |


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

- เขียน label เป็นประโยคที่ "ติ๊ก = จริง" เช่น *รับทราบและยินยอมให้เก็บข้อมูล*
- ใช้ `description` กับข้อมูลประกอบที่ไม่กระทบการตัดสินใจ เช่น อ้างอิงเอกสาร
- ใช้ `labelPlacement=start` เฉพาะเมื่อ checkbox ต้องชิดขวาตามกริดของหน้า เช่นคอลัมน์ขวาสุดในตาราง
- ใช้ `descriptionVisible={false}` สำหรับแถวใน checkbox group
- ใช้ `color=error` ตอน validation ไม่ผ่าน — กล่องกับ label แดงพร้อมกัน แล้ววางข้อความ error ใต้ field เอง
- `indeterminate` ใช้กับตัวที่เป็นหัวของรายการย่อยเท่านั้น เช่น select all ที่เลือกไม่ครบ

### ไม่ควรทำ

- อย่าเขียน label เป็นคำถาม (*"ต้องการรับข่าวสารไหม?"*) — ติ๊กแล้วไม่รู้ว่าตอบว่าอะไร
- อย่าใช้ label เชิงปฏิเสธ (*"ไม่ต้องการรับข่าวสาร"*) — ติ๊กเพื่อปฏิเสธคือกับดัก
- อย่าเอา `description` ไปใส่ข้อความ error — สีเป็น `content/secondary` ไม่ใช่สีสถานะ
- ไม่ควรใช้ checkbox โดยไม่มี label ที่มองเห็นได้
- ไม่ควรคาดหวังว่า `color=error` จะเห็นผลตอน `disabled` — disabled กลบสีทั้งหมด
