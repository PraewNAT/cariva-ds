---
name: rename-frame
description: Batch rename screen/page frame ใน Figma ให้ตรง naming convention ของ Cariva DS — ใช้เมื่อพูดว่า rename frame, จัดชื่อ frame, ตั้งชื่อ frame ให้ถูก, rename screen
---

# Rename Frame — Cariva Design System

Use when the user says:

```text
rename frame [page/section name]
rename-frame [page/section name]
จัดชื่อ frame ใน [page name]
ตั้งชื่อ frame ให้ถูก [page/section]
```

## Scope

- ทำงานกับ **screen/page frame เท่านั้น** — top-level frame ที่เป็นหน้าจอ ไม่ใช่ component
- ทำงานเป็น **batch ต่อ page หรือ section** เท่านั้น — ไม่รับ node-id เดี่ยว ถ้า user ให้ node-id เดี่ยวมา ให้ถามว่าจะสแกนทั้ง page/section ที่ node นั้นอยู่ไหม
- ถ้า node ที่เจอเป็น `COMPONENT`, `COMPONENT_SET`, หรือ `INSTANCE` → ข้ามและไม่แตะ แจ้งว่าต้องใช้ skill `audit`/`map-fix` แทน (naming convention คนละแบบ: `crv-{name}` kebab-case)

## Required Context

อ่านก่อนทุกครั้ง:
- `rules/core-rules.md` — section "Screen/Page Frame Naming Convention"

## Naming Convention

```text
{Flow}/{Screen Name}          Title Case, เช่น Auth/Login, Dashboard/Overview
{Flow}/{Screen Name} - {State} เช่น Auth/Login - Error, Auth/Login - Loading
```

- `/` ใช้ group flow ใน Figma layer outline อัตโนมัติ — ห้ามใส่ space รอบ `/`
- Flow มาจากชื่อ section/page ที่ frame อยู่ ถ้าไม่ชัดเจนให้ถาม user ก่อน ห้ามเดา
- Screen Name แปลงจากชื่อ frame เดิม → Title Case, ตัดคำที่ไม่มีความหมาย (เช่น "Copy", "Frame 12", ตัวเลข auto-generated)
- ถ้ามีตัวเลข/ชื่อ auto-generated ล้วน (เช่น "Frame 4821") และเดา Screen Name จากเนื้อหาไม่ได้ → ถาม user แทนการเดา

## Workflow

1. Confirm scope — page name หรือ section name ที่จะสแกน (ถ้า user ไม่ได้ระบุ ให้ถามก่อน)
2. Inspect เฉพาะ **top-level children** ของ page/section นั้น — ห้ามลงลึกเข้าไปใน frame (นั่นคือ layer ภายในของ screen เอง ไม่ใช่ screen อื่น)
3. คัดกรอง: เก็บเฉพาะ `FRAME` type ที่ไม่ใช่ instance ของ component และไม่ใช่ decorative/divider frame (เช่นชื่อที่เป็น `---...`)
4. สร้างตารางเทียบ: ชื่อปัจจุบัน → ชื่อที่เสนอ ตาม convention ด้านบน — ถ้า frame ไหนชื่อตรง convention อยู่แล้ว ให้ mark "ไม่ต้องแก้"
5. แสดงตารางให้ user ยืนยัน **ครั้งเดียวสำหรับทั้ง batch** ก่อนแก้จริง — ห้าม rename ทีละตัวโดยไม่ถาม
6. เมื่อ confirm แล้ว rename ทุก frame ที่ต้องแก้ผ่าน Figma tool ในครั้งเดียว (หรือแบ่งเป็นชุดย่อยถ้าจำนวนมาก)
7. Screenshot หรือ list ชื่อหลัง rename เพื่อ verify แล้วรายงานผล

## Report Format

```
## Rename Frame: [page/section name]

| Node ID | ชื่อเดิม | ชื่อใหม่ | สถานะ |
|---|---|---|---|
| 123:456 | Login Page | Auth/Login | ✅ renamed |
| 123:789 | Test 1 | — | ⏭️ skip (component/instance, ไม่ใช่ scope นี้) |
| 123:900 | Frame 4821 | — | ❓ ต้องถาม Screen Name |

### ต้องถามเพิ่ม
- [รายการที่เดา Screen Name ไม่ได้]
```

## Rules

- ห้ามเดา Flow name ถ้าไม่ชัดเจนจาก context ของ page/section
- ห้าม rename component, component set, หรือ instance — คนละ convention (ดู `rules/core-rules.md` ส่วน Naming Convention เดิม)
- ห้ามแก้ layer ภายใน screen (เช่น sub-frame, group ย่อยในหน้า) — เฉพาะ top-level screen frame เท่านั้น
- ยืนยันก่อนแก้เสมอ ห้าม batch-apply โดยไม่ให้ user เห็นตารางก่อน
- ถ้า user บอกว่า "ไม่ต้องถาม rename ไปเลย" ให้ยังคงแสดงตารางสรุปหลังทำเสร็จ (เพื่อ audit trail) แต่ข้ามการถามยืนยันก่อน
