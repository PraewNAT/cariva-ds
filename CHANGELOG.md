# Changelog — Cariva Design System

---

## v1.3.0 — 2026-09-09

### 🏷️ เปลี่ยนชื่อ (มี deprecated alias ให้ ไม่ break ของเดิม)

| เดิม | ใหม่ | เหตุผล |
|---|---|---|
| `crv-stepper-icon` | `crv-stepper-marker` | มันไม่ใช่ icon แล้ว — มีทั้งแบบตัวเลขและแบบ icon คำว่า marker ครอบคลุมทั้งสอง |
| `crv-mobile-stepper` | `crv-stepper-compact` | ชื่อเดิมผูกกับอุปกรณ์ ทั้งที่ใช้ได้ทุกที่ที่พื้นที่จำกัด (dialog, side panel) และ `crv-stepper` มี `smallScreen` จัดการเรื่อง device อยู่แล้ว |
| `CrvStepperIcon` | `CrvStepperMarker` | ตามชื่อ Figma |
| `CrvMobileStepper` | `CrvStepperCompact` | ตามชื่อ Figma |
| `getMobileStepperSx` และเพื่อน | `getStepperCompactSx` ฯลฯ | internal style helper |

`CrvStepperIcon`, `CrvMobileStepper`, `CrvStepperIconProps`, `CrvStepperIconState`, `CrvMobileStepperProps`, `CrvMobileStepperProgressType` ยัง export อยู่ในฐานะ deprecated alias — โค้ดเดิมไม่พัง

### 🔧 ปรับโครงสร้าง

- **รื้อ `crv-stepper-marker` ใหม่ทั้งชุด** — แยกเป็น 2 แกน `content` (`number` / `icon`) × `status` (`Default`, `Active`, `Done`, `Error`, `Warning`, `Info`, `Success`) รวม 14 variants
- **ลบ layer `Ellipse 1` ออกทั้ง 14 variants** — ย้าย fill (พร้อม variable binding) ขึ้นไปที่ frame ของ component เอง ซึ่งมี `cornerRadius: 9999` + `clipsContent` อยู่แล้ว แล้วเปลี่ยนเป็น auto-layout จัดกึ่งกลาง หน้าตาเหมือนเดิมทุก pixel แต่ลด 14 layer และเลิกมีวงกลมสองชั้นซ้อนกัน
- **ล้าง `padding: 7px` ที่ค้างอยู่** ในทั้ง 7 variants ฝั่ง `number` — เป็นค่าค้างที่ไม่มีผล (layoutMode เดิมเป็น `NONE`) และไม่มี 7 ใน spacing scale
- **`crv-stepper-base` ใช้ `crv-stepper-marker` ทั้ง 14 marker** — เดิมเป็น component จาก DS อื่น พร้อม swap glyph ให้ตรง state (Done/Success → `check`, Error → `close`, Warning → `priority-high`, Info → `info`)
- **`crv-stepper` ทั้ง 12 variants ประกอบจาก `crv-stepper-base`** — เดิมปั้นมือด้วย frame + component จาก DS อื่น ตอนนี้เหลือ remote instance 0 ตัว ขนาด set คงเดิม 2078×916 (variant แนวตั้ง 3 ตัวแคบลง 1px ตามขนาดจริงของ base)
- **`crv-stepper-compact` เปลี่ยนมาใช้ `crv-button-standard`** แทนปุ่มจาก DS อื่น ทั้ง 6 ปุ่ม

### 🐛 แก้ bug

- **`Inactive` กับ `Active` เคยหน้าตาเหมือนกันเป๊ะ** — เพิ่ม `status=Active` ให้ `crv-stepper-marker` (พื้น `color/brand/primary/on-surface/muted` เลข `color/brand/primary/on-surface/default`) ตอนนี้แยกออกจาก `Default` ชัดเจน
- **step 2 ใน `crv-stepper` เป็น `Inactive` ผิด 9 variants** และเลข step ค้างเป็น "1" อีก 4 จุด — แก้ให้ทุก variant เป็น Complete → Active(2) → Inactive(3) เหมือนกันหมด

### ⚠️ ยังค้าง

- `CrvStepperMarker` ใน code รองรับแค่ `state='default' | 'done'` แต่ Figma มี `status` 7 ค่า + แกน `content` — Code Connect map เฉพาะ `Default` / `Done`
- `crv-stepper-base` `state=Info`: `text=Left` ใช้ `color/brand/primary/on-surface/default` แต่ `text=Center` ใช้ `color/status/info/on-surface/default`
- `crv-stepper-desktop` ยังเป็น instance จาก DS อื่น — เป็นที่เดียวที่เหลือ `padding: 7` (2 จุด) และ `Ellipse 1` (1 จุด) ในหมวด Stepper
- `export/cariva-ds-dev-export/` ยังเป็น snapshot ชื่อเก่า — รอ regenerate

---

## v1.2.0 — 2026-09-07

### 🐛 แก้ bug

- **สี icon ในปุ่มทุกตัวผิดทั้งระบบ (Figma)** — VECTOR ข้างใน icon instance ทุกตัว (459 node ใน 7 component set / 288 variants) ถูก bind กับ `color/content/secondary` เหมือนกันหมด ทำให้ icon ขึ้นเป็นสีเทาไม่ว่าปุ่มจะสีอะไร เช่นปุ่ม contained พื้นน้ำเงินได้ลูกศรเทาแทนที่จะเป็นขาว แก้เป็น **icon ใช้ token เดียวกับ `label` ของ variant นั้น** rebind รวม 804 fill ครอบคลุม `crv-button-standard`, `crv-button-icon`, `crv-button-loading`, `crv-link`, `crv-button-decorative`, `crv-button-mic`, `crv-button-split`
  (`crv-button-mic` ยังเป็น `color/content/secondary` — ถูกต้องแล้วเพราะ label ของมันใช้ token นี้)
- **`crv-fab` เป็นบั๊กเดียวกัน** — icon ทั้ง 24 variants bind `color/content/secondary` ทำให้ FAB พื้นน้ำเงินได้ไอคอนเทา FAB ไม่มี label เลยอิงจากสีพื้นแบบเดียวกับ `crv-button-icon`: primary default → `color/content/on-brand`, primary hover/pressed → `color/content/inverse`, neutral ทุก state → `color/neutral/content/default`, disabled → `color/content/disabled`
- **doc และ token ในโค้ดไม่ตรงกับ Figma ตั้งแต่ v1.1.0** — sync ให้ตรงแล้วทั้งหมด:

  | รายการ | เดิม | แก้เป็น (ตาม Figma) |
  |---|---|---|
  | `color/content/secondary` | `#475569` slate/600 | `#64748b` slate/500 |
  | `typography/label/medium` line-height | 22 | 20 |
  | `typography/label/small` line-height | 18 | 16 |
  | `typography/label/xsmall` line-height | 14 | 16 |
  | `typography/display/large` | 64/72 · 40/48 | 60/72 · 48/48 |
  | `typography/display/small` | 40/48 · 32/40 | 36/48 · 30/40 |
  | ชื่อ font-family | `sans` / `serif` | `ui` / `prose` |
  | `typography/prose/*` | ไม่มีในเอกสาร/โค้ด | เพิ่มครบ 3 ขนาด |

  แก้ที่ `rules/DESIGN.md`, `tokens.json`, `code/core/tokens.ts`
  ⚠️ **line-height ของ `label` กระทบทุก component ที่ใช้ label style** (ปุ่ม, tab, chip, menu ฯลฯ) — ค่าเดิมถูกคัดลอกมาจาก `body` โดยไม่ตั้งใจ ควร regression test ก่อน release

### 🆕 เพิ่มใหม่

- **เติมตัวอย่างใน Figma doc ให้ครบ 65 จุด ใน 12 หน้า** — เดิม doc หลายอันอธิบาย variant ไว้แต่ไม่มีตัวอย่างให้ดู
  Progress (16), Toast (8), Tag (7), Button icon neutral (3), Stepper (4), Card (2), Tabs (2), Avatar (1), Switch (1)
  กติกา: ใส่ครบทุกแกนที่เห็นความต่างทางสายตา (variant/color/type/severity) ส่วนแกนตำแหน่ง (`labelPlacement`, `placement`, `breakpoint`) ใส่ตัวแทน 1 อัน
- **เพิ่ม doc section ใหม่ 7 อัน** ให้ component ที่ไม่เคยถูก document เลย พร้อมตัวอย่างจริง — `crv-button-decorative`, `crv-button-mic`, `crv-button-split`, `crv-sidebar-rail`, `crv-checkbox-standard`, `crv-checkbox-group`, `crv-radio-standard`
  ⚠️ ทุก section ยังไม่มี Do/Don't — ใส่ placeholder ไว้ รอ Design System Owner เขียน
- เพิ่ม variant property **`size`** ให้ `crv-tabs-standard-base` (`4724:141435`) — `large` (เดิม) และ `small` (ใหม่) รวม 8 variants
  `small`: สูง 32px · icon 16 · `typography/label/small` (12/16) · padding `spacing/sm` · gap `spacing/xs`
- `CrvTabsStandard` รับ prop **`size?: 'small' | 'large'`** (default `large`) — เดิมไม่มี size เลย
- เพิ่ม `typography.fontFamily.ui` / `.prose` ใน `code/core/tokens.ts` (`.sans` / `.serif` ยังใช้ได้แต่ mark deprecated แล้ว ยังไม่ได้ migrate 101 จุดที่เรียกใช้)

### ✏️ เปลี่ยนแปลง

- `crv-tabs-standard` เปลี่ยนจาก **COMPONENT เดี่ยว → COMPONENT_SET** ที่มี variant `size` เพื่อให้สลับขนาดได้จาก dropdown
  Node ID ของ set คือ **`6086:59`** (variant `size=large` ยังเป็น node เดิม `4838:9365` — instance ที่ใช้อยู่ไม่พัง)
- อัปเดต Code Connect ของ `CrvTabsStandard` ให้ชี้ set ใหม่ พร้อม map `size`

### 📌 ควรรู้ก่อนใช้งาน

- ถ้ามีที่ไหน reference `crv-tabs-standard` ด้วย node id `4838:9365` ให้เปลี่ยนเป็น `6086:59`
- `tabs` ของ `crv-tabs-standard` เป็น **SLOT** — `size` คุมเฉพาะ tab เริ่มต้นที่มากับ component ถ้าใส่ `crv-tabs-standard-base` instance เองต้องตั้ง `size` ที่ instance นั้นด้วย (ยังไม่ได้ทดสอบเคสนี้)
- `size=small` ของ tabs ผูก font-size/line-height กับ variable `typography/label/small/*` ตรงๆ ไม่ได้ใช้ text style เพราะ font `Aktiv Grotesk Thai` โหลดไม่ได้ใน environment ที่แก้ — เลยคง typeface เดิมไว้ให้ตรงกับ `size=large`
- `color/content/secondary` กับ `color/content/placeholder` ตอนนี้เป็นค่าเดียวกัน (`slate/500` `#64748b`) — **ยืนยันแล้วว่าตั้งใจ**
- **เส้นขอบ component set มีมาตรฐานแล้ว** — `#ae00ff` · weight 1 · align OUTSIDE · dash 6/4 (ไม่รวม cornerRadius ซึ่งแต่ละ component ใช้ต่างกันได้) อ้างอิงจาก `crv-button-standard`
  เดิมทั้งไฟล์มี 8 แบบปนกัน ปรับ 21 sets ที่ไม่ตรงแล้ว ตอนนี้ component set ทั้ง 72 อันเหมือนกันหมด (ไม่นับ `Icon/*` 1,076 อันซึ่งเป็นคนละ library)
- **`crv-menu-item` state disabled** — icon เคยค้างที่ `color/content/secondary` ทั้งที่ label เป็น `color/content/disabled` แก้ให้ตรงกันแล้ว 2 variants
  ส่วนอีก 6 variants ที่ icon (`content/secondary`) อ่อนกว่า label (`content/primary`) **ไม่ได้แก้** — เป็น pattern ลดน้ำหนัก leading icon ที่น่าจะตั้งใจ ถ้าไม่ใช่ค่อยแจ้ง

---

## v1.1.0 — 2026-08-31

### 🆕 เพิ่มใหม่
- เพิ่ม text style `typography/prose/large`, `typography/prose/medium`, `typography/prose/small` — ใช้สำหรับเนื้อหาอ่านยาวต่อเนื่อง (ข้อความตอบ AI, บทความ) ขนาด/line-height เท่ากับ `body/*` เป๊ะ ต่างกันแค่ font-family
- เพิ่ม 9 variables รองรับ `prose/*` (`font-size`, `line-height`, `font-weight` × 3 ไซส์)

### ✏️ เปลี่ยนแปลง
- เปลี่ยนชื่อ token `font-family/sans` → **`font-family/ui`**
- เปลี่ยนชื่อ token `font-family/serif` → **`font-family/prose`**
  (ค่าฟอนต์แต่ละ mode เหมือนเดิมทุกอย่าง เปลี่ยนแค่ชื่อให้สื่อความหมายตรงขึ้น)
- แก้ font-family ของ `typography/body/large·medium·small` — เดิมผูกผิดเป็น `prose` แก้เป็น `ui` ให้ถูกต้อง (ดู 🐛 ด้านล่าง)
- ปรับขนาด `typography/display/large`: Desktop 64px → 60px, Mobile 40px → 48px
- ปรับขนาด `typography/display/small`: Desktop 40px → 36px, Mobile 32px → 30px
- ปรับ `typography/label/xsmall` line-height (Mobile): 14px → 16px — ให้ตรง ratio เดิมและปลอดภัยกับสระ/วรรณยุกต์ไทยที่ font-size เล็กสุดในระบบ
- ปรับ `color/content/secondary`: `#475569` → **`#64748b`** — ให้ต่างจาก `content/primary` ชัดเจนขึ้น ยังผ่าน WCAG AA (contrast ~4.76:1)

### 🐛 แก้ bug
- `body/*` text style เคยผูก font-family ผิด (ใช้ `prose` แทน `ui`) ทำให้ **help-text และ placeholder ในทุก input component** (crv-input-standard, crv-input-horizontal, crv-text-area-standard) แสดงผลด้วยฟอนต์ผิด — แก้ไขแล้ว

### 📌 ควรรู้ก่อนใช้งาน
- ถ้ามีที่ไหน reference ชื่อ token `font-family/sans` หรือ `font-family/serif` ตรงๆ (เช่นในโค้ด หรือ plugin อื่น) ต้องเปลี่ยนเป็น `font-family/ui` / `font-family/prose` ตามชื่อใหม่
- ปุ่ม (`crv-button-standard`) ยังมีปัญหาเรื่อง label size ผิด (small/medium ควรเป็น `label/medium` แต่ยังเป็น `label/large`) — ยังแก้ไม่ได้เพราะ font `Aktiv Grotesk Thai` โหลดไม่ได้ใน environment ปัจจุบัน รอตัดสินใจเรื่อง font ต่อ

---

## v1.0.1 — 2026-08-28

### 🐛 แก้ bug

- แก้ `CrvDropdown` — field ขนาด `size="small"`/`size="medium"` ไม่ apply จริง เรนเดอร์เป็นค่า default ของ MUI (สูง 57px, ตัวหนังสือ 16px) ทุกที่ที่ใช้แทนที่จะเป็นขนาดตาม Figma (`small` 38px/14px, `medium` 48px/16px) — สาเหตุคือ MUI `Select` clone `input` element แล้วเอา `sx` ของ `Select` เองทับ `sx` ที่ตั้งไว้บน `<OutlinedInput>` ทั้งก้อน ย้าย style ขนาด/สี/border ทั้งหมดไปรวมไว้ที่ `sx` ของ `Select` แทน
- เช็ค `CrvPagination` (ใช้ `CrvDropdown` ภายใน) แล้ว — ไม่โดนบั๊กเดียวกัน เพราะ customize ผ่าน prop `sx` สาธารณะของ `CrvDropdown` (ลงที่ `FormControl` ไม่ใช่ `Select` โดยตรง)

---

## v1.0.0 — 2026-07-06

### 🆕 Initial Release

**Components**

| Component | หมายเหตุ |
|---|---|
| `crvButton` | Primary action button |
| `crvButtonIcon` | Icon-only button |
| `crvInput` | Text input field |
| `crvCheckbox` | Checkbox input |
| `crvSelect` | Dropdown select |
| `crvTabs` | Tab navigation (Standard) |
| `crvTabsPills` | Tab navigation แบบ pill |
| `crvTabsFolder` | Tab navigation ชั้นนอกสุด |
| `crvTagStandard` | Status/category label |
| `crvAvatar` | User avatar |
| `crvBreadcrumb` | Breadcrumb navigation |
| `crvPagination` | Pagination control |
| `crvSidebar` | Sidebar navigation |
| `crvMenuItem` | Sidebar menu item |
| `crvTableCell` | Table cell |
| `crvTableHead` | Table header cell |
| `crvCard` | Content card container |
