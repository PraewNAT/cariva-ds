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
```

---

## Required Context

- อ่าน `rules/DESIGN.md` — tone of voice และ brand principles
- อ่าน `tokens.json`
- Inspect target node ใน Figma ก่อนเริ่ม

---

## Pre-flight (ทำก่อน QA ทุกครั้ง)

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

### 8. Accessibility
- Contrast ratio ผ่าน WCAG AA (normal text 4.5:1, large/icon 3:1)
- Touch target ≥ 44×44px (mobile)
- ไม่ใช้สีอย่างเดียวสื่อความหมาย — มี label หรือ icon ประกอบ
- Error state มี message ไม่ใช่แค่เปลี่ยนสี

### 9. Copy & Tone
- ตรงไปตรงมา ระบุเฉพาะเจาะจง
- Error message บอกว่าเกิดอะไรและทำอะไรได้ต่อ
- Placeholder เป็น hint — ไม่ใช้แทน label
- ไม่มี placeholder content (Lorem ipsum, "Label", "Description")

### 10. คำถามก่อน dev รับงาน
สิ่งที่ยังไม่ชัดและต้องถาม designer หรือ PM ก่อน

---

## Report Format

Severity:
- 🔴 **Critical** — dev implement ผิด หรือ accessibility fail
- 🟡 **Warning** — visual drift หรือ UX ที่ควรแก้ก่อน handoff
- 🟢 **Info** — ข้อสังเกตที่ไม่กระทบ implementation

แต่ละ finding ระบุ: node name / ปัญหา / สิ่งที่ควรเป็น

ถ้าหมวดไหนผ่านหมด บอก `PASS`

จบด้วย: `PASS` / `NEEDS FIXES` พร้อมจำนวน finding แต่ละ severity

---

## Rules

- ไม่แก้ไข Figma ระหว่าง QA — report เท่านั้น
- ถ้าไม่แน่ใจเรื่อง copy ให้ flag 🟢 Info แทนการตัดสินใจเอง
- ถ้า UI มีหลายหน้าให้วิเคราะห์ทีละหน้า
- ถ้า context ไม่ชัดให้ระบุใน section 10 อย่าเดาเอง
