# Cariva Design System

Design system สำหรับทีม Cariva — ประกอบด้วย tokens, skills, และ rules สำหรับใช้งานร่วมกับ Claude Code

[![Documentation](https://img.shields.io/badge/Documentation-cariva--ds.vercel.app-blue?style=for-the-badge)](https://cariva-ds.vercel.app/)

---

## เริ่มต้นใช้งาน

วาง prompt นี้ใน Claude Code เพื่อติดตั้ง:

```
ช่วยติดตั้ง Cariva Design System จาก repo นี้ให้หน่อย:
https://github.com/PraewNAT/cariva-ds

โดย:
1. ถามฉันก่อนว่าอยากติดตั้งไว้ที่ path ไหน
2. clone repo ไปไว้ที่ path นั้น
3. รัน npm install
4. เปิด Claude Code ในโฟลเดอร์นั้น
5. อ่าน CLAUDE.md และบอกฉันว่าต้องทำอะไรต่อ
```

เปิด Claude Code ในโฟลเดอร์ที่ clone มา — ระบบจะถาม role ให้เลือกอัตโนมัติ

## สร้าง prototype จากหน้าจอใน Figma

สำหรับโปรเจกต์ vibe-code ใหม่ที่ **ไม่ใช่งานของ Cariva DS เอง** (เช่น MIRA) — เติม 3 ช่องแล้ววางใน Claude Code:

```
อ่าน skills/create-project/SKILL.md ให้จบก่อน แล้วค่อยเปิด Figma link นี้

Figma: [วาง link ที่มี node-id]
ชื่อโปรเจกต์: [ชื่อ]
โฟลเดอร์ปลายทาง: [ชื่อโฟลเดอร์ว่างที่แนบไว้ในเซสชันนี้]
```

**เช็ค 3 ข้อนี้ก่อนพิมพ์** ไม่งั้น AI จะหยุดถามกลางทาง:

1. **แนบโฟลเดอร์ว่างเข้าเซสชันด้วย** (กด `+`) แยกจากโฟลเดอร์ `cariva-ds` — AI ห้ามเขียนโปรเจกต์ใหม่ลงในโฟลเดอร์ DS เด็ดขาด ถ้าไม่แนบมาจะหยุดรอทันที
2. **node-id ต้องเป็น frame หน้าจอเต็ม** (เช่น 1440 หรือ 375px) ไม่ใช่ component เดี่ยว — ถ้าเป็น component เดี่ยว AI จะตีความว่าเป็นงานแก้ DS ไม่ใช่โปรเจกต์ใหม่
3. **เปิดไฟล์นั้นค้างไว้ใน Figma Desktop** และติดตั้ง `gh` พร้อม login แล้ว (`brew install gh` + `gh auth login`)

> 💡 AI จะถามยืนยันก่อนสร้าง repo จริงเสมอ ถ้าอยากดูหน้าตาก่อนค่อยตัดสินใจ ให้ตอบว่า **"เดี๋ยวค่อยสร้าง ขอดูผลลัพธ์ก่อน"** — AI จะ scaffold ในเครื่องแล้วเปิด preview ให้ดูโดยยังไม่แตะ git

ถ้าเป็น**เวอร์ชันใหม่ของโปรเจกต์เดิม** ไม่ต้องใช้เทมเพลตนี้ — เปิด Claude Code ในโฟลเดอร์โปรเจกต์นั้นแล้วสั่งงานได้เลย ระบบจะถามเรื่องแท็บเวอร์ชันให้เองตอน commit

### โครงสร้าง sidebar ของโปรเจกต์ที่ scaffold ออกมา

เป็น 2 ชั้นแบบเดียวกับ sidebar ของ Claude — **กลุ่ม = โปรเจกต์** ข้างในเป็น **เวอร์ชัน** ของแต่ละครั้ง:

```
▾ MIRA                      2
    Overview
    26 Aug 14:02            [ℹ️]
▾ MIRA — Recording flow     1
    Overview
```

**1 repo เก็บได้หลายโปรเจกต์** — ถ้าอยากลอง prototype แนวใหม่ที่ไม่ได้ทำต่อจากของเดิม ไม่ต้องเปิด repo ใหม่ AI จะถามให้เองว่าจะขึ้นเป็น**กลุ่มโปรเจกต์ใหม่ใน repo เดิม** (ใช้ deploy ลิงก์เดิม เห็นของเก่าได้ด้วย) หรือ**แยก repo ใหม่** ไอคอน `ℹ️` ท้ายแถวคือสรุปสิ่งที่เปลี่ยนของเวอร์ชันนั้น (AI เขียนให้ตอน commit) เวอร์ชันแรกของแต่ละกลุ่มไม่มีไอคอนนี้เพราะไม่มีอะไรให้เทียบ

## โครงสร้าง

```
cariva-ds/
├── skills/        # AI skills สำหรับ design workflow
├── rules/         # Design principles และ guidelines
├── tokens.json    # Semantic tokens (source of truth จาก Figma)
├── CLAUDE.md      # Role system และ skill definitions
├── CHANGELOG.md   # บันทึกการเปลี่ยนแปลง
└── index.html     # Documentation website
```

## Roles

| Role | สิทธิ์ |
|---|---|
| **Design System Owner** | ใช้ skill ทั้งหมด + แก้ไขไฟล์ได้ |
| **UX/UI Designer** | ใช้ skill ทั้งหมด + อ่านไฟล์อย่างเดียว |
