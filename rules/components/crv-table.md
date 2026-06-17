# Table — Design Specification

> Design spec ของ component family `Table` ใน Cariva Core Design System
> Source: Figma page **Table 🚧 🚧** (`node-id=4582-9184`) · สถานะ: 🚧 work in progress
> ภาษา: ไทยปนอังกฤษ (ชื่อ token / property / variant เป็นอังกฤษ)

---

## 1. Overview

Table ใช้แสดงข้อมูลแบบตาราง (data table) ประกอบจาก component ย่อยแบบ slot-based — header cell + body cell ที่รับ content ชนิดต่าง ๆ ผ่าน slot, คั่นแถวด้วย divider, และมี footer สำหรับ pagination

**หลักการออกแบบ**
- ประกอบจาก component ย่อย ไม่ใช่ table ก้อนเดียว → ยืดหยุ่นต่อ column/content ที่ต่างกัน
- ค่าสี / spacing / radius ทั้งหมด bind กับ **variable token** ไม่ hardcode
- พฤติกรรมที่เป็น scroll/sticky (fixed column) ทำที่ **code** — Figma จำลองด้วย visual affordance

---

## 2. Component Inventory (สถานะปัจจุบัน)

| Component | Type | Node ID | Variants / Properties |
|---|---|---|---|
| `crv-table-head` | Component Set | `4582:11202` | `size`, `compact` + props: `label`, `checkBoxVisible`, `leftSortVisible`, `rightSortVisible` |
| `crv-table-cell` | Component Set | `4582:11271` | `size`, `state`, `alternate` + slot `customContent` |
| `crv-tableText-cell` | Component | `4705:20105` | `descriptionVisible` |
| `crv-table-scroll-shadow` | Component Set | `4824:674` | `side` |
| `crv-table-footer` | Component | `4829:33634` | — (static) |

> `crv-table-row` เคยมีช่วงหนึ่งแต่ถูกลบออก — zebra striping ย้ายไปทำที่ `crv-table-cell` (`alternate`) แทน

---

## 3. `crv-table-head`

หัวคอลัมน์ของตาราง — map MUI `TableCell` (head)

### Variants
| Property | Type | Values |
|---|---|---|
| `size` | variant | `small`, `default` |
| `compact` | variant (boolean) | `false`, `true` |
| `label` | text | ข้อความหัวคอลัมน์ (default `"Head"`) |
| `checkBoxVisible` | boolean | แสดง `crv-checkbox-base` นำหน้า (default `false`) |
| `leftSortVisible` | boolean | ไอคอน sort `arrow-downward` ซ้าย |
| `rightSortVisible` | boolean | ไอคอน sort `arrow-downward` ขวา |

### Dimensions & Spacing
| size | Height | Padding | Min-width |
|---|---|---|---|
| `small` | 36 | `px = spacing/lg (16)`, `py = 7` | 120 |
| `default` | 54 | `spacing/lg (16)` ทุกด้าน | 120 |
| `compact=true · small` | 36 | กึ่งกลาง | **36×36 fixed square** |
| `compact=true · default` | 54 | กึ่งกลาง | **54×54 fixed square** |

- Direction: horizontal · gap `spacing/sm (8)` · counter-align center
- `compact=false` → primary-align start (label ชิดซ้าย)
- `compact=true` → primary-align center, **ซ่อน label**, **fixed square** (width = height, `primaryAxisSizingMode = FIXED`, `layoutGrow = 0`) สำหรับ icon-only / checkbox-only (เช่น select-all column, action header)
  - small → `36×36` · default → `54×54` — ทั้ง **preview ในตัว set และ instance เป็น square**
  - หมายเหตุ: เดิม compact variant ถูก GRID layout ยืดเป็น 120 ใน preview — แก้แล้วด้วยการตั้ง `layoutGrow = 0` + fixed size

### Tokens
| Element | Token |
|---|---|
| Background | `color/on-surface/subtle` (#f8fafc) |
| Label | `typography/label/medium` (14 / lh 22 / Medium) · `color.content.primary` (#0f172a) |
| Sort icon | `arrow-downward` 18px |
| Checkbox | `crv-checkbox-base` 16px · border `color.border.default` (#cbd5e1) · `radius/4` |

---

## 4. `crv-table-cell`

ช่องข้อมูล (body cell) — รับ content ผ่าน slot — map MUI `TableCell`

### Variants
| Property | Type | Values |
|---|---|---|
| `size` | variant | `small`, `default` |
| `state` | variant | `default`, `hover`, `disabled` |
| `alternate` | variant (boolean) | `false`, `true` |
| `customContent` | slot | content ภายใน cell (default = `crv-tableText-cell`) |

### Dimensions & Spacing
| size | Min-height | Padding | Min-width |
|---|---|---|---|
| `small` | 36 | `px = spacing/lg (16)`, `py = spacing/xs (4)` | 120 |
| `default` | 54 | `spacing/lg (16)` ทุกด้าน | 120 |

- Direction: horizontal · gap `spacing/md (12)` · items center

### Background by variant (bind กับ token)
| Variant | Background token |
|---|---|
| `state=default, alternate=false` | `color/transparent` (โปร่งใส → เห็นพื้นแถว) |
| `alternate=true` | `color/on-surface/subtle` (#f8fafc) — zebra striping |
| `state=hover` | `color/on-surface/action/hover` (#f1f5f9) |
| `state=disabled` | disabled token |

> `alternate=true` มีเฉพาะคู่กับ `state=default` (size small/default) — hover/disabled ไม่ต้องสลับสี

### Content ที่ใส่ใน slot ได้ (จาก example)
`crv-tableText-cell` · `crv-checkbox-base` · `crv-avatar` · `crv-avatar-group` · `crv-tag-color` · `crv-linear-progress` · `crv-button-icon` · ข้อความ/ไอคอนอื่น ๆ

### Square column (checkbox / action) — ไม่มี variant `compact`
`crv-table-cell` **ไม่มี** variant `compact` (ไม่จำเป็น) — ทำ square ที่ระดับ **instance**:
1. `instance.minWidth = null` (ปลด min-width 120)
2. resize `width = height` (เช่น `48×48`) ให้ตรงกับ `crv-table-head` `compact=true`

> วิธีนี้ใช้กับคอลัมน์ checkbox (select) หรือ action ที่ต้องการให้แคบ/square เท่า header — ดู example คอลัมน์ action (61px) ใน Figma doc card

---

## 5. `crv-tableText-cell` (base content)

ข้อความหลัก + คำอธิบาย ภายใน cell

| Property | Type | Default |
|---|---|---|
| `descriptionVisible` | boolean | `true` |

| Element | Token |
|---|---|
| Main | `typography/body/medium` (14 / lh 22 / Regular) · `color.content.primary` (#0f172a) |
| Description | `typography/caption` (12 / lh 16 / Regular) · `color.content.secondary` (#334155) |

- Direction: vertical · hug

---

## 6. `crv-table-scroll-shadow` (fixed / pinned column)

Visual affordance ของ pinned column ตอน scroll แนวนอน

| Property | Values |
|---|---|
| `side` | `left`, `right` |

- `side=left` → คอลัมน์ pin ซ้าย · เงาทอดไปทางขวา (gradient ดำ ~14% → transparent)
- `side=right` → คอลัมน์ pin ขวา (เช่น action column) · เงาทอดไปทางซ้าย
- รูปร่าง: แถบแนวตั้งกว้าง ~16 · ใช้วางที่เส้น freeze แล้ว stretch สูงเต็ม body

### หลักการ Fixed Column
1. คอลัมน์ที่ pin ต้องมีพื้นหลัง **ทึบ** (กัน content scroll ทะลุ)
2. วาง `crv-table-scroll-shadow` ที่เส้น freeze + เส้น edge บาง ๆ
3. **พฤติกรรม sticky scroll ทำที่ code** (`position: sticky` + `left/right`) — Figma จำลองด้วยเงาเท่านั้น

---

## 7. `crv-table-footer`

footer ของตาราง — map MUI `TablePagination` · ขนาด `1286 × 80`

- **ซ้าย**: range text `1-10 of N`
- **กลาง**: pagination (prev / page numbers / `…` / next)
- **ขวา**: `Go to` + dropdown

> ปัจจุบันเป็น **static component** (ยังไม่มี property) — *Needs designer review*: ควรมี property `count` / `currentPage` / `rowsPerPage` เพื่อใช้งานจริง

---

## 8. Composition — Table Container

โครงตารางที่ประกอบเสร็จ:

```
Table Container          (radius border-radius/container md = 16, clip, ไม่มี border)
├─ Header Row            (crv-table-head ×N — จับ size ให้ตรงกับ cell)
├─ divider-horizontal    (คั่นด้วย component divider — ไม่ใช่ border)
├─ Body Row              (crv-table-cell ×N พร้อม content ใน slot)
├─ divider-horizontal
├─ Body Row …
└─ crv-table-footer      (เต็มความกว้าง สูง 80)
```

**กติกาการประกอบ**
- **คั่นแถวด้วย `divider-horizontal` component** ไม่ใส่ border ที่ container
- Container radius = `border-radius/container md` (16) — bind variable, ทั้ง 4 มุม, `clipsContent = true`
- จับคู่ `size` ของ head กับ cell ให้ตรงกันทั้งตาราง
- คอลัมน์ checkbox / action → ใช้ head `compact=true` (square)

### Column / Row sizing (จาก example)
- Row height (size=small) = 48 · min-width คอลัมน์ = 120 · คอลัมน์ action แคบ override `minWidth` ได้

---

## 9. Behaviors & Patterns สรุป

| Pattern | ทำที่ | วิธี |
|---|---|---|
| Zebra striping (สลับสีแถว) | `crv-table-cell` | `alternate=true` ทุก cell ของแถวที่ต้องการ → bg `on-surface/subtle` |
| Row hover / disabled | `crv-table-cell` | `state=hover` / `state=disabled` |
| Sort indicator | `crv-table-head` | `leftSortVisible` / `rightSortVisible` (แสดง/ซ่อนไอคอน) |
| Icon-only / checkbox-only header | `crv-table-head` | `compact=true` + checkbox/sort → square |
| Fixed / pinned column | container + `crv-table-scroll-shadow` | opaque bg + scroll-shadow ที่ freeze line · sticky = code |
| Row divider | container | `divider-horizontal` component คั่น (ไม่ใช้ border) |
| Pagination | `crv-table-footer` | วางท้ายตาราง |

---

## 10. Design Tokens (สรุปที่ใช้)

| กลุ่ม | Tokens |
|---|---|
| Surface | `color/on-surface/default`, `color/on-surface/subtle` (#f8fafc), `color/on-surface/action/hover` (#f1f5f9), `color/transparent` |
| Content | `color.content.primary` (#0f172a), `color.content.secondary` (#334155) |
| Border | `color.border.default` (#cbd5e1) |
| Spacing | `spacing/xs` (4), `spacing/sm` (8), `spacing/md` (12), `spacing/lg` (16) |
| Radius | `radius/4` (4), `border-radius/container md` (16) |
| Typography | `typography/label/medium`, `typography/body/medium`, `typography/caption` |

---

## 11. Needs Designer Review

- `crv-table-footer` ยังเป็น static — ควรมี property count / page / rows-per-page
- ยังไม่มี **selected-row** state
- Sort ยังเป็นแค่แสดง/ซ่อนไอคอน — ยังไม่มี state ทิศทาง `asc` / `desc` และคอลัมน์ active
- ยังไม่มี table container เป็น **component เดียว** (ตอนนี้ประกอบเอง)
- Square body cell (checkbox/action) ทำผ่าน instance override (`minWidth=null` + resize) — ยังไม่มี variant `compact` ใน `crv-table-cell` (ตั้งใจ ไม่จำเป็น)
- Page ยังเป็นสถานะ 🚧 work in progress

---

## 12. Related

- Figma doc card (visual usage, Do/Don't, examples): `📄 Table Doc` (node `4758:23`) บน page Table — มีตัวอย่างครบ: zebra, compact header, fixed column + scroll-shadow, footer
- Doc workflow skills: `skills/component-doc`, `skills/component-doc-update`

> หมายเหตุ: ไฟล์นี้รวม design spec + usage ไว้ในไฟล์เดียว (เดิมแยก usage rules ไว้คนละไฟล์ — ยุบรวมแล้ว)
