---
name: design-review
description: Design QA + UI Analysis สำหรับ screen หรือ flow — ใช้เมื่อ design เสร็จแล้ว ใช้เมื่อพูดว่า qa, review, design review, QA screen, เช็ค screen
---

# Design QA

ใช้เมื่อ user พูดว่า:

```
QA screen นี้ให้หน่อย
เช็ค screen นี้ก่อน handoff
ทำ design QA หน้า [name]
วิเคราะห์หน้านี้
ช่วยดู UI นี้ให้หน่อย
พร้อมส่ง dev หรือยัง
เช็คก่อน handoff
handoff ได้ยัง
```

---

## Required Context

- อ่าน `rules/DESIGN.md` — tone of voice และ brand principles
- อ่าน `tokens.json`
- Inspect target node ใน Figma ก่อนเริ่ม

---

## Pre-flight (ทำก่อน QA ทุกครั้ง)

0. **ถาม user ก่อน: "ไฟล์นี้ตาม Cariva DS ไหม?"**
   - ถ้า **ตาม** → QA ครบทุกหมวด
   - ถ้า **ไม่ตาม** → ข้ามหมวด DS Integration ทั้งหมด (token binding, font, component naming, Gate ข้อ Token) — เหลือเฉพาะ QA เชิง UX
1. ดึง children ของ node ที่ได้รับมาอัตโนมัติ
2. List ชื่อ frame/state ทั้งหมดที่พบ เช่น Default, Loading, Error, Empty, Session Expired
3. QA โดยอ้างอิง state list นี้ — ไม่ flag state ที่มีอยู่แล้วใน list ว่าขาด
4. Flag เฉพาะ state ที่ไม่พบใน list และควรมีตาม use case จริง

---

## ก่อนเริ่มวิเคราะห์

ตอบ 2 ข้อนี้กับตัวเองก่อน:

1. หน้านี้ทำอะไร? user ต้องการ outcome อะไร?
2. ข้อมูลอะไรที่ flow เข้า-ออก?

---

## QA Scope

### 1. State ที่ขาด
เทียบกับ state list จาก Pre-flight — flag เฉพาะที่ขาดจริงๆ ตาม use case เช่น Empty, Loading, Error, Success, Disabled

### 2. Edge case ของข้อมูล
ข้อความสั้นมาก / ยาวมาก, ตัวเลข 0 / ติดลบ / เกิน limit, รายการว่าง / รายการเดียว / รายการมากเกินหน้า

### 3. Error & Recovery
แต่ละ action ถ้าล้มเหลว user รู้ไหมว่าเกิดอะไร และทำอะไรได้ต่อ?

### 4. Permission & Access
มี state ที่ user บางคนเห็นไม่เหมือนกันไหม? เช่น read-only, ไม่มีสิทธิ์, บัญชีถูกล็อก

### 5. Interaction edge
กดซ้ำเร็ว, submit ขณะ loading, ออกจากหน้ากลางคัน, กดย้อนกลับหลัง action สำเร็จ

### 6. DS Integration
- Fill/stroke bound ด้วย semantic token (ไม่มี hardcode hex)
- Spacing bound ด้วย `spacing/*`
- Typography ใช้ text style `typography/*`
- Radius bound ด้วย `radius/*`
- ใช้ component จาก Cariva DS — ไม่สร้าง custom frame แทน

### 7. Layout & Alignment
- Alignment สม่ำเสมอใน section เดียวกัน
- Spacing ระหว่าง component สอดคล้องกัน
- Grid ถูกต้อง — element ไม่ตัดออกนอก container

### 8. Error state ต้องมี message
- Error state มี message บอกว่าเกิดอะไร ไม่ใช่แค่เปลี่ยนสี
- (Accessibility เชิงลึก เช่น contrast ratio, touch target ถูกเช็คตั้งแต่ระดับ component แล้ว — ไม่ต้องเช็คซ้ำระดับ screen ถ้าบังเอิญเห็นจุดที่ผิดชัดเจน note เป็น 🟢 Info ได้ แต่ไม่นับเป็นเกณฑ์ตัดสิน)

### 9. Copy & Tone
- ตรงไปตรงมา ระบุเฉพาะเจาะจง
- Error message บอกว่าเกิดอะไรและทำอะไรได้ต่อ
- Placeholder เป็น hint — ไม่ใช้แทน label
- ไม่มี placeholder content (Lorem ipsum, "Label", "Description")

### 10. คำถามก่อน dev รับงาน
สิ่งที่ยังไม่ชัดและต้องถาม designer หรือ PM ก่อน

### 11. Naming
- ตรวจแค่ระดับชื่อ page/frame หลัก (ระดับ state ที่ handoff ให้ dev) — ชื่อสื่อความหมาย ไม่ใช่ "Frame 123" หรือ "Untitled"
- ไม่ตรวจ layer ย่อยข้างในแต่ละ frame

---

## วิธีอธิบายทุก finding (สำคัญ)

เขียนให้ designer ที่ไม่ได้ทำงานกับ code เข้าใจได้ทันที — ห้ามใช้ศัพท์ dev/technical โดยไม่แปล:

- ห้ามพูดแค่ "ไม่ bound token" หรือ "ผิด spec" เฉยๆ — ต้องบอกว่า **ทำไมมันสำคัญในเชิง design** เช่น สื่อความหมายผิด, ดูไม่สอดคล้องกับหน้าอื่น, ผู้ใช้อาจสับสน
- อธิบาย token/ค่าทาง technical (เช่น `radius/sm`, hex code) เป็นข้อมูลอ้างอิงท้ายประโยคเท่านั้น ไม่ใช่ประเด็นหลักของ finding
- ใช้รูปแบบ: **[สิ่งที่เห็น] → [ทำไมมันไม่ควรเป็นแบบนี้ในเชิง design/UX] → (อ้างอิง token ในวงเล็บถ้าจำเป็น)**
  - ตัวอย่างแทนที่จะพูดว่า: "ปุ่ม Back ไม่ bound `radius/sm` (8px)"
  - ให้พูดว่า: "ปุ่ม Back เป็นทรงกลมมน (pill) ต่างจากปุ่มมาตรฐานทั้งระบบที่เป็นมุมมน — จะดูเหมือนเป็นปุ่มคนละชุดกัน (spec ปุ่มมาตรฐานใช้ radius 8px)"
- ถ้า finding เกี่ยวกับ token/color ให้อธิบายเป็น "สีนี้ควรใช้ตอน..." แทนชื่อตัวแปร ตรงๆ

## Handoff Readiness Gate

หลังวิเคราะห์ครบทุกข้อ สรุปเป็น checklist pass/fail — ตอบคำถามเดียว: **"ส่ง dev ได้หรือยัง?"**
ใช้ผลจาก QA Scope ที่วิเคราะห์ไปแล้ว — ไม่ต้องตรวจซ้ำ

| Gate | เกณฑ์ผ่าน | ผล |
|---|---|---|
| Naming | ชื่อ page/frame หลัก (ระดับ state) สื่อความหมาย | ✅/❌ |
| Token | ไม่มี hardcode hex/px — bound token ครบ *(ข้ามถ้าไฟล์ไม่ตาม Cariva DS)* | ✅/❌ |
| States | มีครบทุก state ตาม use case (จาก Pre-flight list) | ✅/❌ |
| Edge cases | มี empty / loading / error รองรับ | ✅/❌ |
| Text overflow | ทุกจุดที่แสดงข้อความจาก user หรือระบบ กำหนดแล้วว่าถ้ายาวเกินจะเป็นยังไง (truncate / ขึ้นบรรทัดใหม่ / scroll) และ layout ไม่พังเมื่อข้อความยาวสุด | ✅/❌ |
| Copy | ไม่มี placeholder content, error message ครบ | ✅/❌ |
| ข้อมูลสำหรับ dev | behavior/เงื่อนไขที่ Figma ไม่ได้บอก ถูกส่งต่อแล้ว (annotation ใน Figma, handoff doc, หรือแจ้ง PO ไปเขียนใน req แล้ว) — ถ้าไม่แน่ใจให้ list คำถามที่ dev น่าจะถาม แล้วให้ user ยืนยันว่าครอบคลุมแล้ว | ✅/❌ |
| คำถามค้าง | ไม่มีคำถามที่ต้องรอ PM/designer ตอบ | ✅/❌ |

ตัวอย่างที่ Text overflow ต้องจับ: ชื่อ user ยาวดันปุ่มหลุดนอกจอ, input ไม่มี counter จำกัดตัวอักษร, notification ยาว 3 บรรทัดแล้ว card พัง, ภาษาไทยไม่มีเว้นวรรคตัดบรรทัดแปลก

### เกณฑ์ตัดสิน

พูดสั้นๆ: **Info = ส่งได้, Warning/Critical = ยังส่งไม่ได้**

- ไม่เจอปัญหาเลย → 🟢 **READY** — ส่ง dev ได้เลย
- เจอแค่ปัญหาเล็ก (🟢 Info) → 🟡 **READY WITH NOTES** — ส่งได้ แต่แนบข้อสังเกตไปให้ dev
- เจอปัญหาจริง (🔴 หรือ 🟡) → 🔴 **NOT READY** — ต้องแก้ก่อน list สิ่งที่ต้องแก้เรียงตามหมวด

---

## Report Format

Severity:
- 🔴 **Critical** — dev implement ผิดแน่นอนถ้าไม่แก้
- 🟡 **Warning** — visual drift หรือ UX ที่ควรแก้ก่อน handoff
- 🟢 **Info** — ข้อสังเกตที่ไม่กระทบ implementation

แต่ละ finding ระบุ: node name / ปัญหา / สิ่งที่ควรเป็น

**ทุกรายงานต้องใช้ template นี้เป๊ะ ห้ามสลับลำดับ ห้ามข้ามหัวข้อ** — ถ้าหมวดไหนไม่มี finding ให้ยังโชว์หัวข้อไว้พร้อมเขียน "ไม่พบปัญหา" แทนการข้ามไปเฉยๆ:

```markdown
## Design QA: [ชื่อ screen/flow]
*(ตาม Cariva DS / ไม่ตาม Cariva DS)*

**หน้านี้ทำอะไร:** ...
**States ที่พบ:** ...

### 🔴 Critical
[list หรือ "ไม่พบปัญหา"]

### 🟡 Warning
[จัดกลุ่มตามหมวดหมู่เสมอ เช่น Copy, Interaction/Loading state, Edge case, DS Integration — ใส่หัวข้อกลุ่มสั้นๆ นำหน้าแต่ละกลุ่ม ไม่โยนเป็น list เดียวรวมกัน / หรือ "ไม่พบปัญหา"]

### 🟢 Info
[list หรือ "ไม่พบปัญหา"]

### ✅ ผ่าน
- [สิ่งที่ถูกต้อง]

---

## Handoff Readiness Gate
| Gate | ผล |
|---|---|
[ตาราง Gate ทั้งหมดจากด้านบน]

## ผลตัดสิน: 🟢/🟡/🔴 [READY / READY WITH NOTES / NOT READY] — X Critical, Y Warning, Z Info

[สรุป 1-2 บรรทัด: ต้องแก้อะไรก่อนสุด — ต้องมีทุกครั้ง]
```

---

## Rules

- ไม่แก้ไข Figma ระหว่าง QA — report เท่านั้น
- ถ้าไม่แน่ใจเรื่อง copy ให้ flag 🟢 Info แทนการตัดสินใจเอง
- ถ้า UI มีหลายหน้าให้วิเคราะห์ทีละหน้า
- ถ้า context ไม่ชัดให้ระบุใน section 10 อย่าเดาเอง
- ก่อน flag finding ที่กระทบรุนแรง (โดยเฉพาะ 🔴 Critical เช่น ข้อมูลรั่ว, security, privacy) ต้องดู screenshot จริงของ frame นั้นเทียบก่อนสรุปเสมอ — ห้ามสรุปจาก data tree/JSON อย่างเดียว เพราะ layer บางอย่าง (เช่น icon toggle แสดง/ซ่อนรหัสผ่าน) อาจไม่โผล่ในการ scan โครงสร้างที่จำกัดความลึก ถ้า scan ไม่ถึงให้ขุดลึกเพิ่มหรือถ่าย screenshot ก่อน ไม่ใช่ฟันธงจากสิ่งที่ไม่เจอ
