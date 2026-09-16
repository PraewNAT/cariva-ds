# Changelog — Cariva Design System

---

## v1.3.1 — 2026-09-16

### 🐛 Field ที่ผิดมาตั้งแต่ต้น

- **`CrvDropdown` เส้นขอบหายไปด้านบน** — MUI ยก `.MuiOutlinedInput-notchedOutline` (ซึ่งเป็น `<fieldset>`) ขึ้นไป `top: -5px` เพื่อให้ legend ของ notch คร่อมเส้นขอบบนได้ แต่เราตั้ง `overflow: hidden` ไว้ที่ root มันเลย**ตัด 5px บนทิ้งพร้อมเส้นขอบบนทั้งเส้น** เหลือแค่ซ้าย-ขวา-ล่าง (และมุมบนมนๆ ขาดไปด้วย) · เราซ่อน legend อยู่แล้วจึงไม่ต้องยก — ตั้ง `top: 0`
- **`CrvDateTimePicker` ไอคอนท้ายช่องเยื้อง** — Figma (`crv-input-standard`) ให้ Field padding **16 เท่ากันทั้งซ้าย-ขวา** และเว้น **8** ระหว่างข้อความกับไอคอน แต่ของเดิม:
  - padding ขวาเป็น 12 (ซ้าย 16) ไม่สมมาตร
  - ปุ่มเปิด picker มี padding ของตัวเอง 8 → ดันความสูงช่องจาก 48 เป็น **56**
  - MUI ใส่ `edge="end"` ให้ปุ่มนั้น ซึ่งแถม `margin-right: -12px` มาอีก → ไอคอนไปจบที่ **4px** จากขอบ แทนที่จะเป็น 16
  - แก้ครบทั้งสามชั้น และคืนพื้นที่กดให้เป็น 40×40 ด้วย overlay เพื่อไม่ให้ไอคอนขยับ

วัดค่าที่ render จริง: สูง **48** · ข้อความห่างซ้าย **16** · ไอคอนห่างขวา **16** · ระหว่างกัน **8** — ตรงกับ Figma ทั้งสามแบบ (date / time / dateTime)

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

### 🧰 Tooling

- **`npm run tokens:generate` ไม่มีอยู่จริง** ทั้งที่ README, `tokens.ts` และ `generatedPalette.ts` สั่งให้รัน — เพิ่มแล้ว พร้อม `tokens:check`
- **`generate-tokens.js` จะลบ typography ทั้งหมดถ้ามีคนรัน** — มันเขียน `tokens.ts` ใหม่ทั้งไฟล์จาก template ที่ค้างมาตั้งแต่ มิ.ย. (ไม่มี `fontFamily.ui`/`prose`, display scale เก่า, label line-height ผิด) แก้ให้แทนที่เฉพาะ block `colors` ส่วนที่เหลือไม่แตะ
- **`export/cariva-ds-dev-export/` ค้างอยู่ที่ 2026-06-19** — ไม่มี script สร้าง ทำมือครั้งเดียวแล้วไม่มีใคร rebuild อีก เพิ่ม `npm run export:dev` / `export:check` และใส่ใน `pr-checklist`
- **`package.json` ของ DS ถูกเขียนทับด้วยของ `@agent/peer-bridge` เมื่อ 2026-06-26** (`78b5615`) ทำให้ script `test`, `test:run`, `code-connect:dry-run`, `code-connect:publish` หายไป — skill `crv-component-code` สั่งให้รัน `code-connect:publish` ทุกครั้ง แต่มันไม่มีอยู่ กู้คืนแล้ว
- **กู้ `@figma/code-connect` คืนเข้า devDependencies** (`^1.5.3`) — หายไปตอน `package.json` โดนทับ ทั้งที่ `.figma.tsx` 44 ไฟล์ยัง import อยู่
- **ผลตรวจครั้งแรกหลังแก้ทั้งหมด:** `tokens:check` ✅ · `export:check` ✅ · `test:run` ✅ 36 ไฟล์ / 199 test · `typecheck:ds` ❌ 19 error เดิมทั้งหมด ไม่มี error ใหม่จากงานรอบนี้
- **`npm run typecheck` ไม่เคยตรวจ `code/` เลยตั้งแต่วันนั้น** — `tsconfig.json` ก็ถูกเขียนทับเหมือนกัน ตอนนี้ครอบแค่ `src/` ของ peer-bridge เพิ่ม `tsconfig.ds.json` (config เดิมก่อนถูกทับ) + `npm run typecheck:ds` แยกไว้ ไม่แตะของ peer-bridge

### 🆕 Button ที่ขาดไป — ตอนนี้มีในโค้ดครบแล้ว

Figma มี 7 ปุ่ม แต่โค้ดมีแค่ 4 และ 2 ตัวที่มีก็ขาด axis:

- **`CrvButton` เพิ่ม `color="neutral"` และ `variant="elevated"`** — neutral ใช้ได้กับ outlined / text / elevated เท่านั้น (ตรงกับ Figma ที่ไม่มี contained neutral) บังคับด้วย type ไม่ให้เผลอใช้ผิด · elevated = พื้นขาว + เงา `shadow/sm` → hover `shadow/xl` → pressed `shadow/md`
- **`CrvButtonIcon` เพิ่ม `color="neutral"`** ครบทั้ง contained / outlined / ghost
- **`CrvButtonDecorative` (ใหม่)** — ปุ่มไล่เฉดสำหรับ action ของ AI, 3 ขนาด + glow ตอน hover
- **`CrvButtonMic` (ใหม่)** — ปุ่มเลือกไมโครโฟน พร้อมคลื่นเสียง 5 แท่งที่ขยับได้ (เคารพ `prefers-reduced-motion`)
- **`CrvButtonSplit` (ใหม่)** — action หลัก + ปุ่มเปิดตัวเลือกอื่น ใช้พื้นเดียวกันทั้งก้อนตาม Figma (ไม่ใช่ `ButtonGroup` ของ MUI) บังคับใส่ `triggerLabel` เพราะฝั่งขวาไม่มีข้อความ
- ทั้ง 3 ตัวใหม่มีครบชุด: types, styles, stories, test, `.ai.md`, doc ใน `rules/components/` และ Code Connect (ตรวจ dry-run ผ่านแล้วทั้งหมด)
- **เพิ่ม `code/core/theme/shadows.ts`** — เดิมเงาถูก hardcode กระจายตาม component ตอนนี้มี token `shadows.sm|default|md|lg|xl|2xl|inner` ตรงกับ effect style ใน Figma
- **sync token เพิ่ม 6 ตัว**: `color/brand/decorative/gradient/{from,via,to}` และ `color/status/active/*` ซึ่งมีใน Figma แต่ไม่เคยถูก export

### 🔍 ตรวจกับ Figma อีกรอบแล้วเจอ 4 จุดไม่ตรง

- **`CrvButton` ยังไม่มี story ของ `elevated` / `neutral`** — เพิ่มโค้ดแล้วแต่ลืมเปิดให้เห็นใน Storybook เพิ่ม `ElevatedPrimary/Error/Neutral`, `OutlinedNeutral`, `TextNeutral`, ตาราง `ElevatedStates`, `NeutralColor` และใส่ตัวเลือกใหม่ใน control panel · `AllVariants` รวม elevated ด้วยแล้ว
- **ไล่เฉดของ `CrvButtonDecorative` ผิดทิศ** — ของเดิมเขียนเป็นวงรีสว่างที่ก้นปุ่ม แต่ Figma ไล่จากน้ำเงินเข้มตรงกลางออกไปสว่างที่ขอบซ้าย-ขวา (ถอดจาก `gradientTransform` ได้เป็นวงรี 50% ของความกว้าง × 129.76% ของความสูง จุดกึ่งกลางปุ่ม) แก้ตามค่าจริง และเพิ่ม `opacity: 0.85` ตอน pressed ตามที่ Figma ทำ
- **เส้นขอบ `standard` ของ toast หนา 2px ทั้งที่ Figma ใช้ 1px** — ทุก variant ใน Figma เป็น 1px เท่ากันหมด แก้แล้วทั้ง status และ notification
- **`color/status/{severity}/border/default` ใน `tokens.json` ไม่ตรงกับ variable จริง** — บันทึกไว้เป็นเฉด `300` แต่ variable ใน Figma alias ไปที่ `100` ทำให้เส้นขอบ toast เข้มกว่าที่ออกแบบไว้มาก แก้เป็นค่าจาก variable จริง (`#fee2e2` / `#fef3c7` / `#e0f2fe` / `#d1fae5`) พร้อมอัปเดต `rules/DESIGN.md`
- **พื้นหลัง `outlined` ของ toast เป็น `transparent` แต่ Figma ใช้ `color/bg/white`** — แก้ให้ตรง ไม่งั้นวางบนพื้นสีเข้มแล้วอ่านไม่ออก

### 📏 สเกลขนาดปุ่ม — รวมไว้ที่เดียว และแก้ที่เพี้ยนมานาน

ไล่เช็คทุก component set ใน Figma แล้วพบว่า **ปุ่มทุกตัวใช้สเกลเดียวกันเป๊ะ** แต่โค้ดจำไว้ผิดมาตลอดและกระจายอยู่ 5 ไฟล์

| Size | สูง | Padding V | Padding H | Gap | Icon |
|---|---|---|---|---|---|
| `small` | 32 | 8 | 12 | 4 | 16 |
| `medium` | **36** | 8 | 16 | 8 | 20 |
| `large` | 48 | 12 | 24 | 12 | 24 |

- **เพิ่ม `code/core/theme/buttonSizing.ts`** เป็นที่เดียวที่เก็บสเกลนี้ — `CrvButton`, `CrvButtonIcon`, `CrvLink`, `CrvButtonDecorative`, `CrvButtonSplit` ดึงไปใช้ทั้งหมด (export ออกจาก `code/core` แล้ว พร้อม `shadows` / `statusShadow` ที่เพิ่มรอบก่อนแต่ลืม export)
- **`medium` สูง 40 มาตลอด ทั้งที่ Figma เป็น 36** — ผิดพร้อมกันทั้ง `CrvButton`, `CrvButtonIcon` และ `CrvLink`
- **padding ซ้าย-ขวาถูก fix ไว้ที่ 16 ทุกขนาด** — ที่จริงต่างกันตามขนาด (12 / 16 / 24) เหมือนที่ padding บน-ล่างต่างกันอยู่แล้ว
- **`gap` ถูก fix ไว้ที่ 8 ทุกขนาด** — ที่จริงเป็น 4 / 8 / 12
- **`small` มี padding บน-ล่าง 4 แทนที่จะเป็น 8** — ทำให้ปุ่มเล็กสูงไม่ถึง 32
- **icon ของปุ่ม small เป็น 20 แทน 16** (`CrvButtonIcon`) และ icon ใน `CrvLink` fix ไว้ที่ 20 ทุกขนาด
- ตรวจค่าที่เบราว์เซอร์คำนวณจริงแล้ว **ทั้ง 5 component ตรงกับ Figma ครบทุกขนาด**
- อัปเดตตารางขนาดใน `rules/components/crv-button-{standard,icon,split}.md`, `crv-link.md` และ `.ai.md` ที่เกี่ยวข้องให้ตรงด้วย

### 🧹 เก็บของค้างใน Figma

- **`crv-button-split` แก้แล้วฝั่ง Figma** — ตรวจครบทั้ง 24 variants: `size=small` frame นอกสูง 32 เท่ากับลูกข้างในแล้ว (เดิม 36 ชนกับ medium) และ padding ของ `trigger` ขนาด medium สมมาตร 8 ทุกด้านแล้ว ตรงกับที่โค้ดเขียนไว้พอดี ไม่ต้องแก้โค้ดเพิ่ม
- **`crv-stepper-desktop` ถูกลบไปแล้ว** — ทั้งหน้า Stepper ไม่เหลือ `padding: 7` หรือ `Ellipse 1` (ที่เหลือคือ `Ellipse 5` ซึ่งเป็นจุด dot ของ `crv-stepper-compact` ตามดีไซน์)
- **`crv-stepper-base` state=Info ตรงกันแล้ว** ทั้ง `text=Left` และ `text=Center` ใช้ `color/status/info/on-surface/default`
- **เงาของ Notification ในโค้ดผิด** — Figma ใช้ `shadow/md` (navy) สำหรับ `filled` และ `shadow/status/notification` (navy โปร่ง 3 ชั้น) สำหรับ `standard` แต่โค้ดย้อมเงาด้วยสี brand ทั้งคู่ · แก้แล้ว พร้อมลบ `statusShadow` ที่เขียนซ้ำไว้ใน `crvToastStyles.ts` ให้ใช้ตัวเดียวจาก `theme/shadows.ts`
- **แก้ doc ของ Toast ใน Figma** — คำอธิบาย `Variant=Outlined` เขียนว่า "ไม่มีพื้น" ทั้งที่จริงใช้ `color/bg/white`, คำอธิบาย `Variant=Standard` ยังเขียนเส้นขอบ 2px และ Do/Don't ยังเรียกตัวเองว่า "alert" ทั้งที่ component นี้คือ Toast (ข้อห้าม "อย่าใช้ alert แทน Toast" จึงขัดกันเอง) เขียนใหม่ทั้งสามจุด

### 🔵 Stepper marker — สีผิดทุก state และขาดไป 5 status

เปิดดูใน Storybook แล้วไม่ตรงกับ Figma เลย ทั้งที่ `rules/components/crv-stepper.md` เขียนค่าที่ถูกไว้ตั้งแต่แรก — โค้ดไม่เคยทำตาม

| status | โค้ดเดิม | Figma |
|---|---|---|
| `default` | พื้น `content/disabled` + เลขสีขาว | พื้น `bg/solid` + เลข `content/secondary` |
| `active` | พื้นน้ำเงินทึบ + เลขขาว (เหมือน done) | พื้น `brand/primary/on-surface/muted` + เลข `brand/primary/on-surface/default` |
| `error` / `warning` / `info` / `success` | **พื้นโปร่งใส** + ไอคอนสีสถานะ | วงกลมทึบสีสถานะ + ไอคอนขาว |

- **`CrvStepperMarker` มีแค่ 2 status จาก 7** และไม่มีแกน `content` เลย — ตอนนี้ตรงกับ Figma 1:1 (`status` 7 ค่า × `content` 2 ค่า = 14 variants) prop `state` เดิมยังใช้ได้ในฐานะ deprecated
- **ไอคอนคนละตัวกับ Figma** — เดิมใช้ `Error` / `WarningAmber` / `Info` / `CheckCircle` ซึ่งเป็น glyph ที่มีวงกลมในตัวอยู่แล้ว เลยกลายเป็นวงกลมซ้อนวงกลม · Figma ใช้ `close`, `priority-high`, `info` (outlined), `check` แบบ rounded วางบนวงกลมสีเปล่าๆ
- พบว่า `content=icon` ใน component set ใส่ `panorama-fish-eye` ไว้เป็น **placeholder** — ไอคอนจริงมาจาก `crv-stepper-base` ที่ swap เข้าไปตาม state บันทึกไว้ใน rules แล้ว โค้ดทำตามโครงนี้ (marker ไม่ผูกไอคอนกับ status เอง)
- Storybook แสดงครบทั้ง 14 variants แล้ว (เดิมมีแค่ 2) · Code Connect map แกนใหม่ครบ ตรวจ parse ผ่าน
- **เพิ่ม `CrvStepper.test.tsx` (16 test)** ล็อกตารางสีไว้ทั้งหมด — drift แบบนี้จะไม่เงียบอีก

### ✏️ Stepper — สี title ของ Inactive และ Optional ที่ไม่เคยถูก style เลย

- **แก้ใน Figma: `state=Inactive` ให้ `Step title` เป็น `color/content/primary`** เท่ากับ state อื่น (เดิมเป็น `content/secondary` ทำให้จางกว่าคำว่า Optional ข้างล่างมันเอง) ตอนนี้ทั้ง 14 variants ใช้สีเดียวกันระหว่าง title กับ Optional เสมอ · sync เข้าโค้ดแล้ว
- **`Optional` ไม่เคยรับ style ที่เขียนไว้เลย** — กฎในโค้ดชี้ไปที่ `.MuiStepLabel-optional` แต่ MUI v7 วางข้อความนั้นเป็น text node เปล่าๆ ไม่มี class ให้จับ ทั้ง block เลยเป็น dead code มาตลอด · ครอบด้วย `<span class="crv-step-optional">` เองแล้ว
- ผลที่ตามมาจากข้อบน: **`Optional` ใช้ขนาดผิด** — เดิมตั้งใจให้เป็น `body/small` (12/18) แต่ Figma ใช้ `caption/caption` (12/16) และ**ไม่มีระยะห่าง**จาก title (โค้ดใส่ margin-top 2px ไว้) ตอนนี้ตรงแล้ว
- **น้ำหนักฟอนต์ของ Step title ผิด** — Figma ใช้ `typography/label/medium` ซึ่งเป็น **Medium (500)** โค้ดใช้ Regular (400)

### ✨ อนิเมชันของ `CrvButtonDecorative` — แสงออโรราไหล

ทำตามแนวคิด "Colorful Buttons" (fluid aurora backdrop) จาก freefrontend แต่**เขียนขึ้นใหม่ด้วย token ของเราเอง** ไม่ได้ก๊อปโค้ดต้นฉบับ และไม่ใช้สีนอกชุด

- เลเยอร์เบลอ 2 ชั้นของ blob วงกลมนุ่มๆ เคลื่อนสวนกันที่ **6s** กับ **8.5s** — คาบไม่หารกันลงตัว จังหวะจึงเหลื่อมกันจนไม่เห็นรอบซ้ำ
- **ใช้แค่ 3 token เดิม** (`brand/decorative/gradient/{from,via,to}`) · วาง blob สีกรมไว้ชั้นล่างสุดเพื่อ**รักษาแกนสีเข้มตาม Figma** ไม่ให้ปุ่มซีดกลายเป็นฟ้าทั้งใบ
- ต้นฉบับใช้ `<div>` 12 ตัว — ของเราอยู่บน pseudo-element 2 ตัวที่ `z-index: -1` ใน stacking context ของปุ่มเอง **ไม่เพิ่ม DOM เลยสักตัว** และตัวอักษรไม่ต้องแย่งลำดับการซ้อน
- **animate เฉพาะ `transform`** อยู่บน compositor ล้วน ไม่มี repaint ต่อเฟรม
- หยุดนิ่งเมื่อ `animated={false}`, `prefers-reduced-motion: reduce` หรือ `disabled` — ทุกกรณีตกกลับไปเป็นไล่เฉดนิ่งตาม Figma เป๊ะ
- เพิ่ม prop `animated` (default `true`) ไว้ปิดตอนหน้าจอแน่นหรือมีปุ่มนี้หลายตัวเรียงกัน
- story ใหม่ `Animated` + test 7 ตัว · **หมายเหตุ: Figma ไม่มีอนิเมชันของ component นี้ เฟรมหยุดนิ่งคือจุดที่สองฝั่งตรงกัน** บันทึกไว้ใน `rules/components/crv-button-decorative.md` แล้ว

### 🔄 Code

- **`CrvToast` เขียนใหม่ให้ตรงกับ `crv-toast-standard` ตัวใหม่** — เดิมเป็น `variant=primary|secondary` + severity 4 แบบ ไม่มี Description และปุ่ม Action ส่วน Code Connect ยังชี้ไป component ที่ถูกลบไปแล้ว
  - `variant`: `filled` | `outlined` | `standard` (ค่าเดิม `primary` / `secondary` ยังใช้ได้ map เป็น `filled` / `standard` และ mark deprecated)
  - `severity`: เพิ่ม `notification` (พื้น/เส้นขอบ neutral + ไอคอน brand)
  - เพิ่ม `title`, `description`, `action` และ `onClose` — ปุ่มปิดจะแสดงเมื่อส่ง `onClose` เท่านั้น และใช้ `CrvButtonIcon` ของ DS แทน `IconButton` ของ MUI
  - ไอคอนตรงกับ Figma: Filled/Outlined ใช้แบบเส้น, Standard ใช้แบบทึบ
  - เงา `shadow/status/*` ทำเป็น box-shadow 3 ชั้นจาก token ของแต่ละ severity
  - Code Connect ชี้ไป node ใหม่ `6413:55828` พร้อม map ครบทุก property
  - เพิ่ม `CrvToast.test.tsx` (19 test) และเขียน story ใหม่ครบ 15 combination
- **เพิ่ม `color/neutral/*` 9 token ลง `tokens.json`** — มีใน Figma มาตลอดแต่ไม่เคยถูก sync ทำให้เขียนสี Notification โดยไม่ hardcode ไม่ได้

### 🎨 Icon

- **ไอคอนทั้งไลบรารีเชื่อม Code Connect แล้ว — 1,076 จาก 1,077 ชุด × 5 style** เดิม Dev Mode แสดงไอคอนเป็น instance ที่ไม่มีชื่อ ตอนนี้โชว์เป็น `<ArrowBackRounded />` ตาม style ที่เลือกใน Figma สร้างด้วย `npm run icons:connect` ซึ่งดึงรายชื่อจาก Figma เอง ไอคอนใหม่ไม่ต้อง map มือ ข้ามแค่ `flags` เพราะเป็นชุดธงชาติ ไม่ใช่ไอคอน
- **`chevron-up` / `chevron-down` → `ExpandLess` / `ExpandMore`** เทียบ path แล้วตรงกันทั้ง filled และ rounded — `chevron-down` ถูกใช้ 25 จุดใน Button, Breadcrumb, Accordion, Dropdown
- **เพิ่ม `code/core/icons/`** — ไอคอน 9 ชุด × 5 style ที่ Figma ใช้แต่ MUI ไม่มี: 8 ชุดถูกตัดออกจาก MUI ตั้งแต่ v5 (`eco`, `polymer`, `amp-stories`, `exposure-*`) และ `dock-to-right` ที่มาจาก Material Symbols สร้างจาก vector ใน Figma ด้วย `npm run icons:custom` ใช้ `createSvgIcon` ของ MUI สีตาม `currentColor` เหมือนไอคอนอื่น มี test ครอบทั้ง 45 ตัว
- **`Component 1` / `Component 2` → `picture-in-picture` / `picture-in-picture-alt`** (Design System Owner แก้ใน Figma) — ชุดเดิม style filled/outlined สลับกันระหว่างสองชุด ชุดใหม่ถูกต้องครบ 5 style
- **จัด 4 ชุดให้เข้ากับไลบรารี** — `picture-in-picture`, `picture-in-picture-alt`, `arrow-circle-up`, `dock-to-right` เปิด "Include stroke in layout" ไว้ ทำให้ set ใหญ่กว่าตัวอื่น 2px และสีเส้นประไม่ตรง ตอนนี้ครบ 1,076 ชุดเหมือนกันหมด
- `CrvLink` Code Connect เคยแสดง `startIconVisible` ซึ่งไม่มีใน `CrvLink` ตอนนี้แสดง `startIcon={<ไอคอนจริง />}`; `CrvTableTextCell` และ `CrvDrawer` เคยถูกข้ามตอน publish เพราะมีเงื่อนไขในตัวอย่าง แก้แล้ว; `CrvButton` ชี้ไปที่ section แทน component set มาตั้งแต่ มิ.ย. แก้แล้ว

### 🎨 Token

- **Status border tokens ครบชุด — `color/status/{error,warning,info,success}/border/default|strong`** เดิมมีไม่ครบและไม่เป็นแพทเทิร์นเดียวกัน (error มีแค่ `strong`, info ไม่มีเลย, success/warning มีแค่ `default` แต่ใช้ step 700/600 ซึ่งเข้มเท่าพื้นทึบ) ตอนนี้ตามแพทเทิร์นเดียวกับ border ตระกูลอื่นทั้งหมด: `default` = hue/300, `strong` = hue/500 ตั้ง scope เป็น stroke อย่างเดียว
  - เปลี่ยนค่า 2 ตัว: `success/border/default` emerald/700 → **emerald/300**, `warning/border/default` amber/600 → **amber/300** — ตรวจทั้งไฟล์ Figma และโค้ดแล้ว ไม่มีที่ไหนใช้สองตัวนี้
  - `error/border/strong` (red/500) มีใน Figma มาตลอดแต่ไม่เคยถูก sync ลง `tokens.json` — เพิ่มแล้ว
  - แก้กฎข้อ 7 ใน `rules/DESIGN.md` ที่เคยห้ามสร้าง status border token (Design System Owner อนุมัติ)
- **Effect style ใหม่ `shadow/status/{error,warning,info,success,notification}`** — เงานุ่ม 3 ชั้น (y 8/−2/2, blur 8/8/4, spread 0/2/0, 6%/4%/12%) สีตาม `status/*/on-surface/default`; `notification` ใช้สีฐานเดียวกับ `shadow/*` (`#1e3a8a`) ให้เข้ากับพื้น neutral

### 🔔 Alert (แทน `crv-toast-standard` — Figma เท่านั้น ยังไม่มีในโค้ด)

- **ย้าย `<Alert>` (`6413:55828`) จาก MUI kit มาใช้ของ DS ทั้งหมด** — 15 variants: `Severity` (Error, Warning, Info, Success, Notification) × `Variant` (Filled, Outlined, Standard) ไม่เหลือ component, ตัวแปร หรือ style จาก library อื่นเลย
  - ไอคอน → ไลบรารีเรา 24px เทียบรูปทรงกับของเดิมทีละเส้น (warning แบบเส้นใช้ `report-problem` outlined ตามค่า default ของ MUI Alert)
  - ปุ่ม Action → `crv-button-standard` text/neutral/small, ปุ่มปิด → `crv-button-icon` ghost/neutral/small + `close`; ช่องสลับปุ่ม Action รับเฉพาะ `crv-button-standard`
  - สี, เส้นขอบ (`status/*/border/default|strong`), text style `label/large` + `label/medium`, spacing ทั้งหมด, `radius/12`, padding บน-ล่าง `spacing/xs`
  - **เพิ่ม `Severity=Notification`** ตามสีของ toast notification เดิม: ไอคอน/ปุ่มปิด `brand/primary`, พื้นและเส้นขอบเป็น neutral — Filled `bg/white` + `shadow/md`, Outlined `neutral/border/strong`, Standard `neutral/on-surface/subtle` + `neutral/border/default`
- ปุ่มบนพื้นทึบ (Filled) ตั้งสีทับเป็น `content/inverse` เพราะปุ่มใน DS ยังไม่มีสีแบบขาวบนพื้นสี
- **ตั้งชื่อเป็น `crv-toast-standard` แทนตัวเดิม** (Design System Owner ลบตัวเก่า `4165:5387` แล้ว) และอัปเดต `Doc — crv-toast-standard` (เดิมชื่อ `crv-alert-standard`): เนื้อหาใหม่ทั้งหมด, ส่วน Variant เป็น 3 คอลัมน์, ตัวอย่างครบทั้ง 15 variant + ตัวอย่างที่เปิดทุกส่วน, แทนตัวอย่าง 13 ชิ้นที่ยังชี้ไป component ที่ถูกลบ
- แก้ bug ที่เกิดตอนเพิ่ม Notification: variant ที่ก็อปมาไม่ได้ต่อกับ property (toggle Action / ปุ่มปิด / Title / Description และช่องสลับปุ่ม) ตอนนี้ทั้ง 15 variant ต่อเหมือนกันหมด
- ⚠️ **`CrvToast.figma.tsx` ยังชี้ไปที่ `4165:5387` ซึ่งถูกลบแล้ว** — publish Code Connect รอบหน้าจะ fail จนกว่าจะอัปเดตโค้ด `CrvToast` ให้ตรง

### ⚠️ ยังค้าง

- `CrvStepperMarker` ใน code รองรับแค่ `state='default' | 'done'` แต่ Figma มี `status` 7 ค่า + แกน `content` — Code Connect map เฉพาะ `Default` / `Done`
- `crv-stepper-base` `state=Info`: `text=Left` ใช้ `color/brand/primary/on-surface/default` แต่ `text=Center` ใช้ `color/status/info/on-surface/default`
- ~~`crv-stepper-desktop` ยังเป็น instance จาก DS อื่น — เป็นที่เดียวที่เหลือ `padding: 7` (2 จุด) และ `Ellipse 1` (1 จุด) ในหมวด Stepper~~ → **เคลียร์แล้ว 2026-09-16** component ถูกลบออกจาก Figma ทั้งหน้า Stepper ไม่เหลือทั้งสองอย่างแล้ว
- **type error เดิม 19 จุด** ที่ `typecheck:ds` เจอ — ทั้งหมดมีอยู่ก่อนแล้ว (เทียบกับ `d828de9` ตรงกันทุกจุด) ส่วนใหญ่อยู่ใน `*.stories.tsx` เช่น `CrvModal` ขาด prop `open` 5 จุด, `CrvSidebar.stories.tsx` เรียก `colors.bg.page` ที่ไม่มีแล้ว, `CrvTabs.stories.tsx` 2 จุด และ 1 จุดใน `CrvLink.figma.tsx`
- **`CrvStepper` ไม่มี test** — `test:run` ผ่านทั้ง 36 ไฟล์ แต่ไม่มีไฟล์ไหนครอบ Stepper
- **`npm audit` รายงาน 10 ช่องโหว่** (critical 1, high 2) ใน dependency — ยังไม่แก้ เพราะ `audit fix --force` จะอัปเกรดข้าม major version
- **Code Connect ยัง publish/dry-run ไม่ได้** — ต้องมี `FIGMA_ACCESS_TOKEN` ใน `.env.local` ซึ่งยังไม่มีในเครื่อง
- **เวอร์ชัน MUI ขัดกันเอง 3 ที่** — `package.json` `^7.1.0`, `code/core/CLAUDE.md` บอก v9, README ของ export บอก `^6.1.6` และ `@mui/x-date-pickers` ถูกลดจาก `^8.29.0` → `^7.23.3` ตอนโดนทับ ต้องให้ dev ยืนยันว่าใช้เวอร์ชันไหน

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
