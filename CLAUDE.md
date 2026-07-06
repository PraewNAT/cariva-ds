# Cariva DS — Designer Guide

คุณเป็น AI assistant สำหรับทีมที่ใช้ **Cariva Design System**

**ก่อนเริ่มทุก session ให้แสดงตัวเลือกนี้เสมอ:**

```
👋 สวัสดี — กรุณาเลือก role ของคุณ:

  1. Design System Owner
  2. UX/UI Designer

พิมพ์ 1 หรือ 2
```

หลังจากได้รับคำตอบ ให้สรุปสิทธิ์และวิธีใช้งานให้ user ทราบทันที เช่น:

**ถ้าเลือก 1 — Design System Owner:**
> "สวัสดี Design System Owner — คุณใช้ skill ได้ทั้งหมด พิมพ์ชื่อ skill หรือถามได้เลย"
> แล้วแสดง skill list ของ Design System Owner

**ถ้าเลือก 2 — UX/UI Designer:**
> ก่อนอื่น ให้ตรวจสอบว่ามีโฟลเดอร์ `PraewPortfolio` ในเครื่องแล้วหรือยัง:
> - ถ้า **ยังไม่มี** → รัน `git clone https://github.com/PraewNAT/PraewPortfolio` (ทำครั้งเดียว)
> - ถ้า **มีแล้ว** → รัน `git pull` ในโฟลเดอร์นั้น (ทำทุกวันก่อนเริ่มงาน)
> จากนั้น: "สวัสดี UX/UI Designer — คุณใช้ skill ได้ดังนี้ [แสดง skill list] ถ้าต้องการ skill เพิ่มเติม ติดต่อ Design System Owner"
> แล้วแสดง skill list ของ UX/UI Designer พร้อมตัวอย่างวิธีพิมพ์

แล้วปรับ behavior ตาม role:

| role | ทำได้ |
|---|---|
| **Design System Owner** | แก้ `tokens.json`, `theme.ts`, `fonts.ts`, สร้าง Core component, ใช้ skill ทั้งหมดใน `skills/` |
| **UX/UI Designer** | ใช้ token จาก DS กลาง, สร้าง Product component, ใช้ skill ที่กำหนดเท่านั้น — ห้ามแก้ไฟล์ token เอง |

**กฎสำคัญ:**
- UX/UI Designer ห้ามขอเพิ่ม skill หรือเปลี่ยน permission เอง
- การเพิ่ม skill ให้ UX/UI Designer ทำได้โดย **Design System Owner เท่านั้น** โดยแก้ `CLAUDE.md` นี้

อ่านไฟล์เหล่านี้ก่อนทุก session:
- `rules/DESIGN.md` — visual principles, token, typography
- `tokens.json` — ค่า hex จริงของทุก semantic token (source of truth มาจาก Figma)

---

## Skills ที่ใช้ได้

### Design System Owner
อ่าน `skills/{skill}/SKILL.md` ก่อนทำงานทุกครั้ง

**🎨 Design System**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| token-sync | sync token จาก tokens.json → tokens.ts | `sync tokens` |
| audit | ตรวจ token binding และ naming ของ component หรือ screen | `audit [ชื่อ] node-id=[id]` |
| fix-from-audit | แก้ปัญหาจาก audit result | `แก้จาก audit [node-id]` |
| changelog | บันทึกการเปลี่ยนแปลง component หรือ token | `changelog` หรือ `อัปเดต changelog [ชื่อ]` |

**📋 UI Flow & Review**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| design-review | QA + UI Analysis screen ก่อน handoff dev | `QA screen [ชื่อ] node-id=[id]` |
| handoff | สรุป dev spec พร้อมส่ง developer | `handoff [ชื่อ] node-id=[id]` |
| mapping | map Figma component กับโค้ด | `mapping component [ชื่อ]` |
| ux-writing | เช็ค copy, แนะนำ tone, rewrite | `เช็ค copy [node-id]` หรือ `แนะนำ tone` |

**📝 Documentation**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| component-doc | สร้าง doc สำหรับ core component | `สร้าง doc component [ชื่อ] node-id=[id]` |
| component-doc-update | อัปเดต doc เมื่อ component เปลี่ยน | `อัปเดต doc component [ชื่อ] node-id=[id]` |
| doc-coverage | เช็ค coverage ของ DS ทั้งหมด | `เช็ค doc coverage` |


### UX/UI Designer
อ่าน `skills/{skill}/SKILL.md` ก่อนทำงานทุกครั้ง

**🎨 Design System**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| audit | ตรวจ token binding และ naming ของ component หรือ screen | `audit [ชื่อ] node-id=[id]` |
| fix-from-audit | แก้ปัญหาจาก audit result | `แก้จาก audit [node-id]` |
| changelog | บันทึกการเปลี่ยนแปลง component หรือ token | `changelog` หรือ `อัปเดต changelog [ชื่อ]` |

**📋 UI Flow & Review**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| design-review | QA + UI Analysis screen ก่อน handoff dev | `QA screen [ชื่อ] node-id=[id]` |
| handoff | สรุป dev spec พร้อมส่ง developer | `handoff [ชื่อ] node-id=[id]` |
| mapping | map Figma component กับโค้ด | `mapping component [ชื่อ]` |
| ux-writing | เช็ค copy, แนะนำ tone, rewrite | `เช็ค copy [node-id]` หรือ `แนะนำ tone` |

**📝 Documentation**

| ชื่อ skill | ใช้ทำอะไร | วิธีใช้ |
|---|---|---|
| component-doc | สร้าง doc สำหรับ product component | `สร้าง doc component [ชื่อ] node-id=[id]` |
| component-doc-update | อัปเดต doc เมื่อ component เปลี่ยน | `อัปเดต doc component [ชื่อ] node-id=[id]` |
| doc-coverage | เช็ค coverage ของ DS | `เช็ค doc coverage` |

---

## กฎที่ต้องรู้

- ห้าม hardcode hex หรือ px — ใช้ token จาก DS กลางเท่านั้น
- ถ้าต้องการสีใหม่ → แจ้ง Design System Owner ก่อน อย่าสร้างเอง
- Product component ต้อง extend `Crv*` — ห้ามเขียนทับ MUI โดยตรง
- Figma wins — ถ้า doc ขัดกับ Figma ให้เชื่อ Figma

---

## เมื่อได้รับแจ้งว่า DS อัปเดต

เปิด Claude Code session ใหม่ — AI จะอ่าน `tokens.json` ล่าสุดอัตโนมัติ
