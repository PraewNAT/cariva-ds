---
name: handoff
description: สรุป dev spec จาก Figma screen หรือ flow ก่อนส่งให้ developer — ใช้เมื่อพูดว่า handoff, สรุป spec, ส่ง dev, เตรียมส่ง dev
---

# Handoff

ใช้เมื่อ user พูดว่า:

```
handoff หน้านี้ให้หน่อย
สรุป spec ส่ง dev
เตรียม handoff [screen name] node-id=[id]
```

---

## Pre-flight

1. ดึง children ของ node อัตโนมัติ
2. List frame/state ทั้งหมดที่พบ
3. สรุป spec ครอบคลุมทุก state

---

## Output

สร้าง **2 ชุด** แยกกันเสมอ:

---

## 📋 ชุดที่ 1 — Dev Spec

### 1. Overview
- หน้านี้ทำอะไร? user ต้องการ outcome อะไร?
- Flow: มาจากไหน → ไปไหนต่อ?

### 2. Components
List ทุก DS component ที่ใช้ในหน้านี้:

| Component | Variant / Props | หมายเหตุ |
|---|---|---|
| CrvButton | variant="contained" color="primary" | Submit form |
| CrvInput | label, placeholder, error state | ... |

- ถ้ามี component ที่ไม่ได้มาจาก DS ให้ flag ⚠️

### 3. Tokens
สรุป token ที่ใช้จริงในหน้านี้:

| ประเภท | Token | ใช้ที่ไหน |
|---|---|---|
| Color | `colors.brand.primary` | Primary button background |
| Spacing | `spacing.md` | Gap ระหว่าง input fields |
| Typography | `typography.body2` | Form label |
| Radius | `radius.sm` | Card border radius |

### 4. States
List ทุก state ที่ design ไว้:

| State | Node ที่อ้างอิง | หมายเหตุสำหรับ dev |
|---|---|---|
| Default | - | - |
| Loading | - | Disable ปุ่ม + แสดง spinner |
| Error | - | แสดง errorMessage ใต้ field |
| Success | - | Redirect ไปหน้า X |
| Empty | - | แสดง empty state พร้อม CTA |

### 5. Interactions
- อธิบาย behavior ทีละ action เช่น:
  - กดปุ่ม Submit → validate form → ถ้า pass: call API → แสดง loading → redirect
  - กด Cancel → ย้อนกลับหน้าก่อนหน้า โดยไม่ save

### 6. Accessibility
- Touch target ที่ต้องระวัง
- Aria label ที่ต้องใส่เพิ่ม
- Error message ต้องมี text ไม่ใช่แค่เปลี่ยนสี

### 7. คำถามก่อน dev เริ่มงาน
- สิ่งที่ยังไม่ชัดและต้องถาม designer หรือ PM ก่อน

---

## 🧪 ชุดที่ 2 — QA Checklist

### States ที่ต้องเช็ค
- [ ] State ครบตามที่ design กำหนดไหม (list จาก section 4)
- [ ] แต่ละ state ดูถูกต้องตาม Figma ไหม

### Edge Cases
- [ ] ข้อมูลยาวมาก / สั้นมาก
- [ ] Field ว่าง → ระบบ handle ยังไง
- [ ] ตัวเลข 0 / ติดลบ / เกิน limit
- [ ] รายการว่าง / รายการเดียว / รายการเยอะมาก

### Error & Recovery
- [ ] Error message แสดงถูก field ไหม
- [ ] Error message บอก "เกิดอะไร + ทำอะไรต่อ" ไหม
- [ ] กด retry แล้ว error หายไหม

### Interaction
- [ ] กดซ้ำเร็ว → ระบบ handle ไหม (double submit)
- [ ] กด submit ขณะ loading → ปุ่ม disable ไหม
- [ ] กดย้อนกลับกลางคัน → data หายหรือเปล่า

### Accessibility
- [ ] Contrast ผ่าน WCAG AA ไหม
- [ ] Screen reader อ่าน error ได้ไหม
- [ ] Touch target ≥ 44x44px ไหม (mobile)

### คำถามก่อน QA เริ่ม
- สิ่งที่ยังไม่ชัดจากฝั่ง dev หรือ designer

---

## Export เป็น PDF

หลังแสดง output ครบ 2 ชุดแล้ว ให้ถามเสมอว่า:

> "อยากให้ export เป็น PDF ไหม? ถ้าใช่ บอกด้วยว่าจะบันทึกไว้ที่ไหน"

ถ้า user ยืนยัน:
1. สร้างไฟล์ HTML ที่มี styling สะอาดพร้อม print
2. Export เป็น PDF โดยใช้ browser print-to-PDF หรือ tools ที่มีในระบบ
3. บันทึกไฟล์ตาม path ที่ user ระบุ
4. แจ้ง user ว่าบันทึกที่ไหน ชื่อไฟล์อะไร

ชื่อไฟล์: `handoff-[screen-name]-[YYYY-MM-DD].pdf`

---

## Rules

- ไม่แก้ไข Figma ระหว่างทำ handoff — สรุปอย่างเดียว
- ถ้า node ไม่มี token binding ให้ flag ⚠️ ไม่ใช่เดาค่า
- ถ้า state ใดไม่ชัดเจนให้ระบุใน "คำถาม" ของแต่ละชุด อย่าสรุปเอง
- Output เป็น markdown ที่ dev และ QA copy ไปใช้ได้เลย
- สร้างทั้ง 2 ชุดทุกครั้ง — ห้ามส่งแค่ชุดเดียว
- ถามก่อน export PDF ทุกครั้ง — ห้าม export โดยไม่ถาม
