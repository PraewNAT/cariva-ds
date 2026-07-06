# Cariva Design System

Design system สำหรับทีม Cariva — ประกอบด้วย tokens, skills, และ rules สำหรับใช้งานร่วมกับ Claude Code

📖 **Documentation:** [cariva-ds.vercel.app](https://cariva-ds.vercel.app/)

---

## เริ่มต้นใช้งาน

```bash
git clone https://github.com/PraewNAT/cariva-ds
```

เปิด Claude Code ในโฟลเดอร์ที่ clone มา — ระบบจะถาม role ให้เลือกอัตโนมัติ

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
