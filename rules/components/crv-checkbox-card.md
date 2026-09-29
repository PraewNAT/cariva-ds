# crv-checkbox-card

> Checkbox ในการ์ด — กดได้ทั้งใบ ใช้เมื่อตัวเลือกต้องมีน้ำหนักและมีคำอธิบายของตัวเอง

## โครงสร้าง Figma

- Component type: Checkbox
- Component set: `crv-checkbox-card` (node 6697:362)
- Naming pattern: `checked={false|true}, state={default|hover|disabled}, color={primary|error}`

## Variants

| Property | Values |
|---|---|
| `checked` | `false`, `true` |
| `state` | `default`, `hover`, `disabled` |
| `color` | `primary`, `error` |

> ไม่มี `state=disabled, color=error` — `disabled` กลบ `color` ทั้งเซ็ต เหมือน `crv-checkbox-standard` และ `crv-checkbox-base`

## Text props

| Property | Default (Figma) |
|---|---|
| `label` | Accept terms and conditions |
| `labelVisible` | true |
| `description` | You agree to our Terms of Service and Privacy Policy. |
| `descriptionVisible` | true |

## Anatomy

- **Card** — frame ทั้งใบคือ hit target, padding `spacing/lg` (16), gap `spacing/md` (12), radius `radius/16`
- **Checkbox** — line box 20px สูงเท่า `typography/lineHeight/label/medium` ครอบ control 16×16
- **Content** — label + description (vertical, gap `spacing/sm`)

## Token usage

| Element | `checked=false` | `checked=true` |
|---|---|---|
| Card background (primary) | `color/on-surface/default` | `color/brand/primary/on-surface/subtle` |
| Card background (error) | `color/on-surface/default` | `color/status/error/on-surface/subtle` |
| Card border (primary) | `color/border/default` | `color/brand/primary/border/default` |
| Card border (error) | `color/status/error/border/strong` | `color/status/error/border/strong` |
| Label (primary) | `color/content/primary` | `color/content/primary` |
| Label (error) | `color/status/error/content/default` | `color/status/error/content/default` |
| Description | `color/content/secondary` | `color/content/secondary` |

### `state=hover` — เปลี่ยนที่ effect ไม่ใช่สี

fill กับ border เหมือน `state=default` ทุกประการ ต่างกันที่เงา

| `checked` | Effect style | ค่า |
|---|---|---|
| `false` | `shadow/sm` | `0 1px 2px 0` สี `#1e3a8a` 25% — การ์ดที่ยังไม่เลือกจะ "ลอย" ขึ้น |
| `true` (primary) | `glow/primary` | `0 0 4px 0` สี `#1789fa` 36% วาดหลัง node — การ์ดที่เลือกแล้วจะ "เรือง" สีตัวเอง |
| `true` (error) | `glow/error` | `0 0 4px 0` สี `#dc2626` 36% |

> `state=disabled` ไม่มี hover

### `state=disabled`

| Element | Token |
|---|---|
| Card background | `color/on-surface/default` |
| Card border | `color/border/disabled` |
| Label + description | `color/content/disabled` |
| Control | `crv-checkbox-base` `state=disabled` |

## MUI Mapping

| Figma | React |
|---|---|
| Card | `<CrvCheckboxCard />` |
| Control | `<CrvCheckboxBase />` |
| `state=disabled` | `disabled` |
| `color=error` | `color="error"` |


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

- ใช้กับตัวเลือกที่ "เลือกผิดแล้วมีผล" และต้องอ่านก่อน เช่น แผนการรักษา ระดับความยินยอม ขอบเขตการแชร์ข้อมูล
- ให้การ์ดกว้างเต็ม container แล้วเรียงแนวตั้งหรือกริด 2 คอลัมน์ — ความกว้างมาจาก layout ไม่ใช่จากตัว component
- `label` คือชื่อตัวเลือก · `description` คือได้อะไร/เสียอะไร 1–2 บรรทัด
- เหมาะกับจอสัมผัส — ทั้งใบ 78px เป็น hit target เทียบกับกล่อง 16px
- ใช้ `color=error` เฉพาะใบที่ validation ไม่ผ่านจริง ไม่ใช่ทาทั้งชุด

### ไม่ควรทำ

- อย่าใช้เกิน ~5 ใบในหน้าจอเดียว — 78px ต่อใบกินพื้นที่เร็ว เกินนั้นใช้ `crv-checkbox-group`
- อย่าใช้แทน radio เมื่อเลือกได้อันเดียว — การ์ดหน้าตาเชิญให้เลือกหลายอัน
- ไม่ควรวางปุ่มหรือ link ที่กดได้ไว้ในการ์ด — ทั้งใบเป็น hit target ของ checkbox อยู่แล้ว
- อย่าใช้กับตัวเลือกคำเดียวที่ไม่มีคำอธิบาย — เปลืองพื้นที่ 4 เท่าเทียบกับ group
- อย่าผสม card กับ standard ในคำถามเดียวกัน — ผู้ใช้จะอ่านว่าเป็นคนละระดับความสำคัญ

## Needs designer review

- variant `state=hover` ใช้ fill `color/bg/white` ส่วน `state=default` ใช้ `color/on-surface/default` — ค่าเดียวกัน (`#ffffff`) แต่คนละ token ควรเลือกใช้ตัวเดียวให้ตรงกัน (ไม่มีผลต่อภาพ)
