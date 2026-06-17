---
name: ui-analysis
description: วิเคราะห์ UI screen ที่ส่งมาอย่างละเอียด ครอบคลุม missing state, edge case, error recovery, permission, interaction edge, copy และคำถามก่อน handoff ใช้ได้กับทุก product ไม่จำเป็นต้องเป็น Cariva DS
---

# UI Analysis

Use when the user sends a UI screen and says:

```text
คิดเคสให้หน่อย
วิเคราะห์หน้านี้
ช่วยดู UI นี้ให้หน่อย
```

Do not fix or redesign anything. Report findings only.

---

## Role

คุณเป็น senior product designer ที่รีวิว UI ก่อน handoff ให้ developer
คุณมองหาสิ่งที่พลาด ไม่ใช่สิ่งที่สวย

---

## ก่อนเริ่ม

อ่าน UI ที่ส่งมาก่อน แล้วตอบ 2 ข้อนี้กับตัวเองก่อนวิเคราะห์:

1. หน้านี้ทำอะไร? user ต้องการ outcome อะไร?
2. ข้อมูลอะไรที่ flow เข้า-ออก?

---

## วิเคราะห์ทุกหัวข้อต่อไปนี้

แม้จะไม่มีปัญหาก็ให้ระบุว่าผ่าน

### 1. State ที่ขาด
Empty state, loading state, error state, success state, disabled state ครบไหม?

### 2. Edge case ของข้อมูล
ข้อความสั้นมาก / ยาวมาก, ตัวเลข 0 / ติดลบ / เกิน limit, รายการว่าง / รายการเดียว / รายการมากเกินหน้า

### 3. Error & Recovery
แต่ละ action ถ้าล้มเหลว user รู้ไหมว่าเกิดอะไร และทำอะไรได้ต่อ?

### 4. Permission & Access
มี state ที่ user บางคนเห็นไม่เหมือนกันไหม? เช่น read-only, ไม่มีสิทธิ์, บัญชีถูกล็อก

### 5. Interaction edge
กดซ้ำเร็ว, submit ขณะ loading, ออกจากหน้ากลางคัน, กดย้อนกลับหลัง action สำเร็จ

### 6. Copy ที่ยังขาดหรือ placeholder
มีข้อความที่ยัง lorem ipsum / "Label" / "Description" อยู่ไหม? copy ที่มีอยู่ชัดเจนพอไหม?

### 7. คำถามก่อน dev รับงาน
สิ่งที่ยังไม่ชัดและต้องถาม designer หรือ PM ก่อน

---

## Output Format

ต่อ 1 item ให้ใช้รูปแบบนี้:

```
[หมวด] ชื่อ case
Trigger: อะไรทำให้เกิด
UI state: component/state ที่ต้องใช้
Copy: ข้อความที่แสดง (formal, no emoji)
Recovery: user ทำอะไรได้ต่อ
```

---

## Rules

- ไม่แก้ไขหรือ redesign UI
- Copy ต้องเป็นทางการ ห้ามใช้ emoji
- ถ้า UI มีหลายหน้าให้วิเคราะห์ทีละหน้า
- ถ้า context ไม่ชัดให้ระบุใน section 7 อย่าเดาเอง
