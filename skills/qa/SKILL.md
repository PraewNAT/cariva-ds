---
name: cariva-ds-qa
description: Design QA สำหรับ screen หรือ flow — เช็คว่าพร้อม handoff ให้ dev ไหม ครอบคลุมทั้ง DS integration, component correctness, layout, states, accessibility, และ copy
---

# Design QA

ใช้เมื่อ user พูดว่า:

```
QA screen นี้ให้หน่อย
เช็ค screen นี้ก่อน handoff
ทำ design QA หน้า [name]
```

---

## Required Context

- Read `plugins/cariva-design-system/CLAUDE.md`
- Read `plugins/cariva-design-system/rules/design.md` — tone of voice และ brand principles
- Read `plugins/cariva-design-system/rules/tokens.md`
- Read `plugins/cariva-design-system/rules/accessibility-and-ai.md`
- Inspect target screen/frame ใน Figma ก่อนเริ่ม

---

## QA Scope (เช็คทั้ง 6 หมวด)

### 1. DS Integration
ตรวจเหมือน audit — ทำกับทุก component ใน screen

- Fill/stroke bound ด้วย semantic token (ไม่มี hardcode hex)
- Spacing (padding, gap) bound ด้วย `spacing/*`
- Typography ใช้ text style `typography/*`
- Radius bound ด้วย `radius/*`
- ไม่ใช้ primitive token โดยตรงในส่วนที่ควรใช้ semantic

### 2. Component Correctness
- ใช้ component จาก Cariva DS ไหม — ไม่สร้าง custom frame แทน component ที่มีอยู่แล้ว
- Instance ของ component ตรงกับ use case ไหม (เช่น ไม่ใช้ `crv-tag` แทน `crv-badge`)
- Variant และ state ถูกต้องกับ context ไหม (เช่น `state=disabled` ตอนที่ action ยังใช้ไม่ได้)

### 3. Layout & Alignment
- Alignment สม่ำเสมอใน section เดียวกัน
- Spacing ระหว่าง component สอดคล้องกัน — ไม่มีระยะห่างที่ดูผิดปกติ
- Grid ถูกต้อง — element ไม่ตัดออกนอก container

### 4. States ครบ
- มีครบทุก state ที่จำเป็น:
  - **Empty state** — ถ้า screen แสดงข้อมูล list หรือ content
  - **Loading state** — ถ้า screen มี async data
  - **Error state** — ถ้า screen มี form หรือ action
  - **Success state** — ถ้า screen มี action ที่ผลลัพธ์ต้องแสดง feedback
- Disabled state ของ action ที่ยังไม่พร้อมถูก set ไว้ไหม

### 5. Accessibility
- Contrast ratio ผ่าน WCAG AA ไหม:
  - Normal text: 4.5:1
  - Large text / icon: 3:1
- Touch target ≥ 44×44px (สำหรับ mobile)
- ไม่ใช้สีอย่างเดียวสื่อความหมาย — มี label หรือ icon ประกอบด้วย
- Error state มี message หรือ icon ไม่ใช่แค่เปลี่ยนสี

### 6. Copy & Tone
อ้างอิง `rules/design.md` — tone of voice ของ Cariva:

- ตรงไปตรงมา ไม่วกวน ("Save changes" ไม่ใช่ "Would you like to save?")
- ระบุเฉพาะเจาะจง ไม่คลุมเครือ ("3 items require review" ไม่ใช่ "Some things need attention")
- Error message บอกว่าเกิดอะไรขึ้นและทำอะไรได้ต่อ
- ไม่ใช้ filler words หรือ emoji ใน UI copy
- Placeholder เป็น hint/example เท่านั้น — ไม่ใช้แทน label

---

## Report Format

รายงานแยกเป็น 6 หมวด พร้อม severity:

- 🔴 **Critical** — dev implement ผิด หรือ accessibility fail
- 🟡 **Warning** — visual drift หรือ UX ที่ควรแก้ก่อน handoff
- 🟢 **Info** — ข้อสังเกตที่ไม่กระทบ implementation

แต่ละ finding ระบุ:
- Node name / node ID
- ปัญหาที่พบ
- สิ่งที่ควรเป็น

ถ้าหมวดไหนผ่านหมด ให้บอก `PASS` แทนการแสดง list ว่าง

---

## Rules

- ทำ QA กับ **screen หรือ frame** ไม่ใช่ component set ที่อยู่ใน library page
- ไม่แก้ไข Figma ระหว่าง QA — report เท่านั้น
- ถ้า screen ยังมี placeholder content (Lorem ipsum, dummy data) — flag เป็น 🟡 Warning
- ถ้าไม่แน่ใจเรื่อง copy ให้ flag เป็น 🟢 Info แทนการตัดสินใจเอง
- จบ report ด้วยสรุป: `PASS` / `NEEDS FIXES` พร้อมจำนวน finding แต่ละ severity
