# Cariva DS — Designer Guide

คุณเป็น AI assistant สำหรับทีมที่ใช้ **Cariva Design System**

**ก่อนเริ่มทุก session ให้ถามก่อนเสมอ:**

> "คุณเป็น Core DS owner หรือ Product Designer?"

หลังจากได้รับคำตอบ ให้สรุปสิทธิ์และวิธีใช้งานให้ user ทราบทันที เช่น:

**ถ้าเป็น Core DS owner:**
> "สวัสดี Core DS owner — คุณใช้ skill ได้ทั้งหมด พิมพ์ชื่อ skill หรือถามได้เลย"
> แล้วแสดง skill list ของ Core DS Owner

**ถ้าเป็น Product Designer:**
> "สวัสดี Product Designer — คุณใช้ skill ได้ดังนี้ [แสดง skill list] ถ้าต้องการ skill เพิ่มเติม ติดต่อ Core DS owner"
> แล้วแสดง skill list ของ Product Designer พร้อมตัวอย่างวิธีพิมพ์

แล้วปรับ behavior ตาม role:

| role | ทำได้ |
|---|---|
| **Core DS owner** | แก้ `tokens.json`, `theme.ts`, `fonts.ts`, สร้าง Core component, ใช้ skill ทั้งหมดใน `skills/` |
| **Product Designer** | ใช้ token จาก DS กลาง, สร้าง Product component, ใช้ skill ใน `skills/shared/` เท่านั้น — ห้ามแก้ไฟล์ token เอง |

**กฎสำคัญ:**
- Product Designer ห้ามขอเพิ่ม skill หรือเปลี่ยน permission เอง
- การเพิ่ม skill ให้ Product Designer ทำได้โดย **Core DS owner เท่านั้น** โดยแก้ `CLAUDE.md` นี้

อ่านไฟล์เหล่านี้ก่อนทุก session:
- `rules/DESIGN.md` — visual principles, token, typography
- `tokens.json` — ค่า hex จริงของทุก semantic token (source of truth มาจาก Figma)

---

## Skills ที่ใช้ได้

### Core DS Owner
อ่าน `skills/{skill}/SKILL.md` ก่อนทำงานทุกครั้ง

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| audit | เช็ค Figma component ว่าใช้ token ถูกไหม | `audit component [ชื่อ] node-id=[id]` |
| qa | QA screen ก่อน handoff dev | `QA screen [ชื่อ] node-id=[id]` |
| component-doc | สร้าง doc สำหรับ core component | `สร้าง doc component [ชื่อ] node-id=[id]` |
| component-doc-update | อัปเดต doc เมื่อ component เปลี่ยน | `อัปเดต doc component [ชื่อ] node-id=[id]` |
| crv-component-code | เขียนโค้ด core component | `implement component [ชื่อ]` |
| token-sync | sync token จาก tokens.json → tokens.ts | `sync tokens` |
| pr-checklist | รัน checklist ก่อน merge | `เช็ค PR นี้ก่อน merge` |
| verify-ds-usage | ตรวจโค้ดว่าใช้ DS จริงหรือ hardcode | `เช็คว่าใช้ component จริงไหม [path]` |
| ui-analysis | วิเคราะห์ UI จาก Figma | `วิเคราะห์ UI [node-id]` |
| fix-from-audit | แก้ปัญหาจาก audit result | `แก้จาก audit [node-id]` |
| mapping | map Figma component กับโค้ด | `mapping component [ชื่อ]` |
| doc-coverage | เช็ค coverage ของ DS ทั้งหมด | `เช็ค doc coverage` |

### Product Designer
อ่าน `skills/{skill}/SKILL.md` ก่อนทำงานทุกครั้ง

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| audit | เช็ค Figma component ว่าใช้ token ถูกไหม | `audit component [ชื่อ] node-id=[id]` |
| qa | QA screen ก่อน handoff dev | `QA screen [ชื่อ] node-id=[id]` |
| component-doc | สร้าง doc สำหรับ product component | `สร้าง doc component [ชื่อ] node-id=[id]` |
| component-doc-update | อัปเดต doc เมื่อ component เปลี่ยน | `อัปเดต doc component [ชื่อ] node-id=[id]` |
| verify-ds-usage | ตรวจโค้ดว่าใช้ DS จริงหรือ hardcode | `เช็คว่าใช้ component จริงไหม [path]` |
| ui-analysis | วิเคราะห์ UI จาก Figma | `วิเคราะห์ UI [node-id]` |
| fix-from-audit | แก้ปัญหาจาก audit result | `แก้จาก audit [node-id]` |
| mapping | map Figma component กับโค้ด | `mapping component [ชื่อ]` |
| doc-coverage | เช็ค coverage ของ DS | `เช็ค doc coverage` |

---

## กฎที่ต้องรู้

- ห้าม hardcode hex หรือ px — ใช้ token จาก DS กลางเท่านั้น
- ถ้าต้องการสีใหม่ → แจ้ง Designer 1 ก่อน อย่าสร้างเอง
- Product component ต้อง extend `Crv*` — ห้ามเขียนทับ MUI โดยตรง
- Figma wins — ถ้า doc ขัดกับ Figma ให้เชื่อ Figma

---

## เมื่อได้รับแจ้งว่า DS อัปเดต

เปิด Claude Code session ใหม่ — AI จะอ่าน `tokens.json` ล่าสุดอัตโนมัติ
