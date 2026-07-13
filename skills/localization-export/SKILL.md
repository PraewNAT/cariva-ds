---
name: localization-export
description: ดึงข้อความทั้งหมดจาก Figma screen/flow มาจัดหมวดหมู่และ export/update เป็น Excel สำหรับทีม localization — ใช้เมื่อพูดว่า export ข้อความ, ดึงข้อความไป localization, ทำ localization sheet, อัปเดต localization
---

# Localization Export

ใช้เมื่อ user พูดว่า:

```
ดึงข้อความไป localization
export ข้อความ [ชื่อ] node-id=[id]
ทำ localization sheet
อัปเดต localization [ชื่อ] node-id=[id]
```

---

## Pre-flight

1. **ถามชื่อ Product ก่อนเสมอ** — ทั้งตอน export ครั้งแรกและตอน update ทุกครั้ง (ไม่เดาว่ามีไฟล์เดียวจึงข้ามได้ — ถามให้ชัวร์เสมอว่าจะไปแก้ไฟล์ไหน)
2. ไฟล์ output: `localization/localization-[product].xlsx`
   - ถ้ายังไม่มีไฟล์นี้ → โหมด Export (สร้างใหม่)
   - ถ้ามีไฟล์นี้อยู่แล้ว → โหมด Update (ดูหัวข้อ "โหมด Update" ด้านล่าง)
3. รับ node-id (frame/flow/page ที่ต้องการดึงข้อความ)
4. เดินโครงสร้างหา TEXT layer ที่ **visible เท่านั้น**
5. กรอง mock data ออก — ข้อความที่เป็นค่าตัวอย่างที่ user กรอกในฟอร์ม (ไม่ใช่ static copy ของระบบ) ไม่เอาเข้า sheet ไหนเลย ถ้าไม่แน่ใจว่าเป็น mock data หรือ copy จริง ให้ถาม

---

## Sheet Structure

### กลุ่ม Cross-cutting (ใช้ซ้ำได้ทุก feature)

| Sheet | เก็บอะไร | Key format |
|---|---|---|
| CTA | ปุ่ม/action ทั่วไป | `cta.[description]` |
| Toast | ข้อความแจ้งเตือนเด้งแล้วหาย | `toast.[type].[description]` |
| Form Validation | error ใต้ field ที่ใช้ซ้ำได้ทุกฟอร์ม | `validation.[description]` |
| Empty State | ข้อความตอนไม่มีข้อมูล | `empty.[description]` |
| Navigation | เมนู/sidebar/breadcrumb | `nav.[description]` |
| Table/List Controls | คำที่ใช้ในตาราง/list ทุกหน้า | `table.[description]` |

### กลุ่ม Feature-specific

| Sheet | เก็บอะไร | Key format |
|---|---|---|
| [ชื่อ feature] | header, body, error เฉพาะของ feature นั้น | `[feature].[type].[description]` |

---

## กฎการจัดกลุ่ม (เช็คตามลำดับ — เจอข้อไหนก่อนใช้ข้อนั้น ไม่ต้องเช็คต่อ)

1. เป็น component Toast/Snackbar/Notification (ลอยจาก layout หลัก, โผล่ชั่วคราว) → **Toast**
2. เป็น label ของ Button/IconButton/Link ที่กดแล้วเกิด action → **CTA**
3. อยู่ใต้ field เป็น helper/error text **และ**ข้อความเป็นกฎทั่วไปไม่ผูก business logic เฉพาะ → **Form Validation**
   - ถ้า error มีเนื้อหาเฉพาะทางธุรกิจ (เช่น ระบุเงื่อนไข/ตัวเลข/ชื่อ feature) → ข้าม ไปข้อ 7 (Feature) แทน
4. อยู่ใน component Table/DataGrid/Pagination/Toolbar → **Table/List Controls**
5. อยู่ใน Sidebar/Navbar/Menu/Breadcrumb → **Navigation**
6. เป็นข้อความ "ไม่มีข้อมูล" ของ list/table ว่าง → **Empty State**
7. ไม่เข้าเงื่อนไขไหนเลย → **Feature sheet** ตามชื่อ page/frame ที่ข้อความนั้นอยู่

**กฎเสริม:**
- เช็ค key ซ้ำก่อนเสมอไม่ว่าจะ sheet ไหน — ข้อความเดียวกันเป๊ะ ใช้ key เดิม ไม่สร้างซ้ำ
- ถ้าเข้าได้มากกว่า 1 เงื่อนไขและไม่ชัดเจนว่าควรเลือกอันไหน → หยุดถาม user ไม่เดาเอง
- Key ห้ามใช้เลขนับ (`_1 _2 _3`) — ต้องใช้ short-description ที่สื่อความหมายเฉพาะเสมอ

---

## Output Columns (ทุก sheet ใช้โครงเดียวกัน)

| Key | Type | TH | EN | Context |
|---|---|---|---|---|
| `login.error.locked` | error | บัญชีถูกระงับชั่วคราว 5 นาที | Login has been temporarily disabled for 5 minutes | หน้า Login หลังกรอกผิด 3 ครั้ง |

- **Context** = หน้า/สถานการณ์ที่ข้อความนี้โผล่ (ช่วยนักแปลไม่แปลผิดความหมาย)
- ถ้าไฟล์ Figma มีแค่ภาษาเดียว → เว้นอีกคอลัมน์ว่างไว้ให้แปลทีหลัง ไม่เดาแปลเอง

---

## โหมด Update (เมื่อพบไฟล์ `localization-[product].xlsx` เดิมอยู่แล้ว)

1. ยืนยันชื่อ Product จาก Pre-flight แล้ว — ไม่ต้องถามซ้ำ
2. Scan node ใหม่ตามปกติ แล้วเทียบกับ key ที่มีอยู่แล้วในไฟล์:
   - **ข้อความเดิม ไม่เปลี่ยน** → ข้าม ไม่แตะ
   - **Key เดิมแต่เนื้อหาเปลี่ยน** (แก้ copy) → อัปเดตเฉพาะคอลัมน์ TH/EN ของแถวนั้น ไม่ลบ key ทิ้ง (เผื่อ dev ยังอ้างอิง key เดิมในโค้ด)
   - **ข้อความใหม่ที่ไม่เคยมี** → เพิ่มแถวใหม่ต่อท้าย sheet ที่เกี่ยวข้อง (ใช้กฎจัดกลุ่มด้านบน)
   - **Key ที่มีในไฟล์แต่หาไม่เจอใน Figma แล้ว** → ไม่ลบทิ้งอัตโนมัติ ให้ mark ว่า "ไม่พบใน Figma แล้ว — ต้องการลบไหม?" แล้วถาม user ก่อนทุกครั้ง
3. รายงานสรุปท้าย: เพิ่มกี่แถว, แก้กี่แถว, พบ key ที่อาจไม่ใช้แล้วกี่แถว

---

## Export

Export/update เป็น .xlsx ผ่าน skill `xlsx`

---

## Rules

- ไม่แก้ไข Figma ระหว่างทำ — export อย่างเดียว
- ไม่เดา TH/EN ถ้าไฟล์มีแค่ภาษาเดียว — เว้นว่างไว้
- ไม่เดาว่าข้อความเป็น mock data หรือ copy จริงถ้าไม่ชัดเจน — ถามก่อน
- ก่อนตั้ง key ใหม่ ต้องเช็ค key ที่มีอยู่แล้วในไฟล์ก่อนเสมอ (กันสร้างซ้ำ)
- ไม่ลบ key ที่หายไปจาก Figma โดยไม่ถาม user ก่อน
- ถามชื่อ Product ทุกครั้งทั้ง export และ update — ไม่เดาจากบริบท
