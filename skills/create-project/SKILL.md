---
name: create-project
description: สร้าง repo ใหม่สำหรับโปรเจกต์ vibe-code ใหม่จริงๆ (ไม่ใช่เวอร์ชันของโปรเจกต์เดิม) — scaffold Next.js + MUI + sidebar shell จาก Cariva DS แล้วต่อ Vercel deploy ให้
---

# Create Project — Cariva DS

ใช้เมื่อ user พูดว่า:

```text
สร้างโปรเจกต์ใหม่ [ชื่อ]
create project [ชื่อ]
เริ่มโปรเจกต์ใหม่ [ชื่อ]
```

## ก่อนเริ่มเสมอ — ถาม 1 คำถามนี้ก่อน

**"อันนี้เป็นโปรเจกต์ใหม่จริงๆ หรือเป็นเวอร์ชันใหม่ของโปรเจกต์ที่มีอยู่แล้วครับ?"**

- ถ้าเป็นเวอร์ชันใหม่ของของเดิม → ไม่ต้องทำอะไรตาม skill นี้ แค่ทำงานต่อในโปรเจกต์นั้นตามปกติ (ระบบจะถามเรื่องแท็บใหม่ตอน commit เอง ผ่าน skill `add-version-tab`)
- ถ้าเป็นโปรเจกต์ใหม่จริง → ทำต่อตาม step ด้านล่าง

## Safety check ก่อน scaffold

ก่อนสร้างอะไรทั้งหมด **เช็ค working directory ปัจจุบันก่อนเสมอ** ว่ามี sidebar shell (จาก `create-project` เดิม) อยู่แล้วหรือไม่:

- ถ้าเจอว่าที่นี่เป็นโปรเจกต์ที่มี sidebar shell อยู่แล้ว → **หยุดทันที** แจ้ง user ว่า "ที่นี่มีโปรเจกต์อยู่แล้วนะครับ (เจอ sidebar shell) ต้องการสร้างโปรเจกต์ใหม่แยกออกไปจริงไหม หรือหมายถึงเวอร์ชันใหม่ของโปรเจกต์นี้?" — ห้าม scaffold ทับเงียบๆ
- ถ้า directory ว่างหรือไม่มีโปรเจกต์เดิม → ทำต่อได้ปกติ

## Steps

1. **เช็ค `gh` พร้อมใช้งานไหม**
   - รัน `gh --version` — ถ้าไม่พบ ให้สอน:
     ```bash
     brew install gh
     gh auth login
     ```
   - รัน `gh auth status` — ถ้ายังไม่ login ให้สอนแค่ `gh auth login`
   - หยุดรอจนกว่า user จะติดตั้ง/login เสร็จก่อนไปขั้นต่อไป ห้ามข้ามขั้นนี้

2. ถามชื่อโปรเจกต์ (ใช้ตั้งชื่อ repo — แปลงเป็น kebab-case)

3. สร้าง repo ใหม่บน GitHub ของ user ปัจจุบัน — **ถามยืนยันก่อนสร้างจริงเสมอ**:
   ```bash
   gh repo create {project-name} --private
   ```

4. Scaffold โปรเจกต์:
   - Next.js (App Router) + MUI
   - Vendor component/token ที่จำเป็นจาก Cariva DS (`code/`) เข้าไปในโปรเจกต์ใหม่ตรงๆ — **ห้าม publish DS เป็น npm package** และห้าม `npm install` จาก package ที่ยังไม่ได้ publish (ทีมเคยตัดสินใจเลิกทำ npm publish แล้ว)

5. สร้าง **sidebar shell** ด้วย `CrvSidebar` จริง (ไม่ใช่ mockup) พร้อม 1 แท็บเริ่มต้น — ตั้งชื่อแท็บว่า "Overview" หรือชื่อที่ user ระบุ

6. Commit แรก + push

7. แนะนำขั้นตอนต่อ Vercel (import repo ผ่าน vercel.com) — ช่วยรันให้ถ้าเป็นไปได้ ไม่งั้นแนะนำขั้นตอนให้ user ทำเอง

8. สรุปให้ user: repo link, สถานะ deploy, ขั้นตอนที่เหลือ (ถ้ามี)

## Rules

- ไม่ทำถ้า user บอกว่าเป็นเวอร์ชันใหม่ของของเดิม — ส่งต่อให้ทำงานปกติแทน
- ถามยืนยันก่อนสร้าง repo จริงเสมอ (สร้าง repo ใหม่ทุกครั้งที่เรียก skill นี้ ไม่ reuse ของเดิม)
- ห้าม scaffold ทับโปรเจกต์ที่มีอยู่แล้วในนั้น (ดู Safety check ด้านบน)
- ไม่ publish Cariva DS เป็น npm package — vendor โค้ดเข้าไปตรงๆ เท่านั้น
