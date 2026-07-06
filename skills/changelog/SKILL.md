---
name: changelog
description: Generate changelog เมื่อ component หรือ token เปลี่ยน — ใช้เมื่อพูดว่า changelog, สรุปการเปลี่ยนแปลง, อัปเดต changelog, มีอะไรเปลี่ยนบ้าง
---

# Changelog

ใช้เมื่อ user พูดว่า:

```
changelog
สรุปการเปลี่ยนแปลง
อัปเดต changelog [component/token ที่เปลี่ยน]
มีอะไรเปลี่ยนบ้างใน [ชื่อ]
```

---

## Pre-flight

1. ถามว่าเปลี่ยนอะไร — component, token, หรือทั้งคู่
2. ถามว่า version อะไร (ถ้าไม่ระบุ ใช้ทั้งสองแบบ: `v1.0.0` + วันที่)
3. อ่าน `CHANGELOG.md` ที่มีอยู่ก่อน — ถ้าไม่มีให้สร้างใหม่

---

## Version Format

ใช้ทั้งสองแบบพร้อมกัน:

```
## v1.2.0 — 2026-07-06
```

- **Semantic version** (`v[major].[minor].[patch]`):
  - `major` — เปลี่ยนแบบ breaking เช่น ลบ token, เปลี่ยนชื่อ component
  - `minor` — เพิ่ม feature ใหม่ เช่น เพิ่ม variant, เพิ่ม token
  - `patch` — แก้ bug หรือปรับ visual เล็กน้อย

- ถ้า user ไม่ระบุ version ให้ถามว่า "นี่คือ major / minor / patch?"

---

## Changelog Entry Format

```md
## v[x.y.z] — [YYYY-MM-DD]

### 🆕 เพิ่มใหม่
- เพิ่ม variant `size="lg"` ใน `CrvButton`

### ✏️ เปลี่ยนแปลง
- เปลี่ยนชื่อ token `brand.blue` → `brand.primary`
- ปรับ padding ของ `CrvCard` จาก 16px → 24px

### 🗑️ ลบออก
- ลบ `CrvChip` variant `outlined-dashed` — ใช้ `outlined` แทน

### 🐛 แก้ bug
- แก้ `CrvInput` error state ที่ border ไม่เปลี่ยนสี

### ⚠️ Breaking Change
- เปลี่ยน prop `color="danger"` → `color="error"` ใน `CrvButton`
  — dev ต้องอัปเดต codebase ทั้งหมด
```

ใส่เฉพาะหัวข้อที่มีการเปลี่ยนแปลงจริง — ไม่ต้องใส่หัวข้อว่าง

---

## ภาษา

- อธิบายเป็น**ภาษาไทย**เป็นหลัก
- ชื่อ component, token, prop, variant, size — ใช้**ภาษาอังกฤษ**ทับศัพท์
- ตัวอย่าง: "เพิ่ม variant `size="lg"` ใน `CrvButton`" ✅ ไม่ใช่ "เพิ่มขนาดใหญ่" ❌

---

## บันทึกลงไฟล์

1. เพิ่ม entry ใหม่ **ด้านบนสุด** ของ `CHANGELOG.md`
2. ถ้าไม่มีไฟล์ → สร้างใหม่ที่ root ของโปรเจกต์
3. แจ้ง user ว่าบันทึกที่ไหน

---

## Rules

- ไม่แก้ entry เก่า — เพิ่มแค่ entry ใหม่ด้านบน
- Breaking change ต้องระบุชัดว่า dev ต้องทำอะไร
- ถ้าไม่รู้ว่า major/minor/patch ให้ถามก่อน อย่าเดา
- entry หนึ่งต่อหนึ่ง PR หรือหนึ่ง release — ไม่รวมหลาย release เป็น entry เดียว
