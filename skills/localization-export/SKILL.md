---
name: localization-export
description: ดึงข้อความทั้งหมดจาก Figma screen/flow มาเช็คความพร้อมสำหรับแปลภาษา (i18n readiness) จัดหมวดหมู่ export/update เป็น Excel และแปลภาษาให้ด้วย AI (ต้องมีคนตรวจสอบก่อนใช้จริง) — ใช้เมื่อพูดว่า export ข้อความ, ดึงข้อความไป localization, ทำ localization sheet, อัปเดต localization, แปล localization
---

# Localization Export

ใช้เมื่อ user พูดว่า:

```
ดึงข้อความไป localization
export ข้อความ [ชื่อ] node-id=[id]
ทำ localization sheet
อัปเดต localization [ชื่อ] node-id=[id]
แปล localization ให้หน่อย
แปลภาษาที่ยังไม่มีให้หน่อย
```

---

## Pre-flight

1. **ถามชื่อ Product ก่อนเสมอ** — ทั้งตอน export ครั้งแรกและตอน update ทุกครั้ง (ไม่เดาว่ามีไฟล์เดียวจึงข้ามได้ — ถามให้ชัวร์เสมอว่าจะไปแก้ไฟล์ไหน)
2. ไฟล์ output: `localization/localization-[product].xlsx`
   - ถ้ายังไม่มีไฟล์นี้ → โหมด Export (สร้างใหม่)
   - ถ้ามีไฟล์นี้อยู่แล้วและ user สั่ง export/update ปกติ → โหมด Update (ดูหัวข้อ "โหมด Update" ด้านล่าง)
   - ถ้า user สั่ง "แปล" ตรงๆ → โหมด Translate (ดูหัวข้อ "โหมด Translate" ด้านล่าง) — ไม่ต้อง scan Figma ใหม่
3. รับ node-id (frame/flow/page ที่ต้องการดึงข้อความ)
4. เดินโครงสร้างหา TEXT layer ที่ **visible เท่านั้น** — ต้อง**เดินแบบไม่จำกัดความลึก (full-depth) ตั้งแต่รอบแรกเสมอ** ไม่ใช้ scan แบบจำกัด depth แล้วค่อยถามว่าจะ "ลึกขึ้นไหม" ทีหลัง เพื่อไม่ให้มีข้อความตกหล่นจาก node ที่ซ้อนลึก (เช่น dialog ที่ซ้อนอยู่ในหลายชั้น)
5. กรอง mock data ออก — ข้อความที่เป็นค่าตัวอย่างที่ user กรอกในฟอร์ม (ไม่ใช่ static copy ของระบบ) ไม่เอาเข้า sheet ไหนเลย ถ้าไม่แน่ใจว่าเป็น mock data หรือ copy จริง ให้ถาม
6. เช็ค **i18n Readiness** ระหว่างเดินโครงสร้างเดียวกัน (ดูหัวข้อด้านล่าง) — ผลเช็คนี้กระทบวิธีตั้ง key ในขั้นถัดไปโดยตรง จึงต้องทำก่อนจัดหมวดหมู่

---

## i18n Readiness Check (ทำระหว่าง scan รอบเดียวกับตอนดึงข้อความ)

ตรวจแต่ละ text layer ที่เจอ:

1. **Text container ยืดได้ไหม** — ถ้า text อยู่ใน frame ที่ fix width/height (ไม่ใช่ auto-layout hug/fill) → flag ว่าเสี่ยงข้อความแปลแล้วล้น โดยเฉพาะจุดพื้นที่จำกัด (ปุ่ม, tab, badge, chip)
2. **ข้อความปนตัวแปร/ข้อมูลจริง** — เช่น "Total : 100 Items" ต้องแยกส่วนที่เป็น static ("Total :", "Items") ออกจากส่วน dynamic ("100") ก่อนตั้ง key — **ห้ามเอาทั้งสตริงที่มีตัวเลข/ชื่อจริงปนมาเป็น key เดียว** เพราะแปลไม่ได้จริงและพังเวลาเปลี่ยนค่า
3. **ความยาว TH vs EN ต่างกันมากในจุดพื้นที่จำกัด** — ถ้าเห็นว่าอีกภาษายาวกว่าอีกภาษาชัดเจน (ปุ่ม/tab/badge ที่แคบ) → flag ไว้เตือน
4. **Format ตัวเลข/วันที่/สกุลเงิน hardcode** — ถ้าเจอ format ตายตัว (เช่น "31/12/2026") ในจุดที่ควรปรับตามภาษา → flag ไว้

**Output ของ readiness check:** แสดงเป็นส่วนแยกต่างหากในรายงานก่อนตาราง Excel เช่น:

```
## i18n Readiness
🟡 "Total : 100 Items" (Table Footer) — ตัวเลขปนกับ static text ควรแยก key
🟡 ปุ่ม "Login" (คงที่ 42px) — ถ้าแปลเป็นคำยาว เช่น "เข้าสู่ระบบ" ต้องเช็คว่า container ยืดได้ไหม
✅ จุดอื่นไม่พบปัญหา
```

- ไม่ต้องมี rule ตรวจ RTL (right-to-left) เพราะทีมนี้ใช้แค่ไทย/อังกฤษ

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

| Key | Type | TH | EN | Context | Status |
|---|---|---|---|---|---|
| `login.error.locked` | error | บัญชีถูกระงับชั่วคราว 5 นาที | Login has been temporarily disabled for 5 minutes | หน้า Login หลังกรอกผิด 3 ครั้ง | Confirmed |

- **Context** = หน้า/สถานการณ์ที่ข้อความนี้โผล่ (ช่วยนักแปลไม่แปลผิดความหมาย)
- **Status** = `Confirmed` (ข้อความมาจาก Figma จริง ทั้ง TH/EN) หรือ `AI Draft — Needs Review` (ยังไม่มีคนแปล/ตรวจสอบ)
- ถ้าไฟล์ Figma มีแค่ภาษาเดียว → **เว้นอีกคอลัมน์ว่างไว้ก่อน** (ไม่แปลตอน export/update) ตั้ง Status เป็นว่าง/`Not Translated` — รอสั่ง "แปล localization ให้หน่อย" แยกทีหลัง (ดูโหมด Translate)

**Dropdown (Data Validation) — ต้องใส่ทุกครั้งตอนสร้างไฟล์ใหม่ (โหมด Export) โดยไม่ต้องถาม:**
- คอลัมน์ **Status** ทุก sheet ข้อมูล → dropdown list: `Not Translated`, `AI Draft — Needs Review`, `Confirmed`
- คอลัมน์ **Severity** ใน sheet "i18n Readiness" → dropdown list: `Warning`, `Info`, `Pass`, `Resolved`
- ตั้ง range ของ dropdown ให้ครอบคลุมเผื่อแถวที่จะเพิ่มทีหลังจากโหมด Update (ไม่ใช่แค่แถวที่มีข้อมูล ณ ตอน export)

**Conditional Formatting — ต้องใส่ทุกครั้งตอนสร้างไฟล์ใหม่ (โหมด Export) โดยไม่ต้องถาม:**
- ทุก sheet ข้อมูล: ถ้าคอลัมน์ **Type = "error"** → ตัวหนังสือทั้งแถวเป็นสีแดง (`#DC2626`) เพื่อให้ scan เห็นง่ายว่าแถวไหนเป็น error message
- ใช้ conditional formatting (ไม่ตั้งสีตายตัว) เพื่อให้ครอบคลุมแถวใหม่ที่เพิ่มทีหลังจากโหมด Update ด้วย

---

## โหมด Update (เมื่อพบไฟล์ `localization-[product].xlsx` เดิมอยู่แล้ว)

1. ยืนยันชื่อ Product จาก Pre-flight แล้ว — ไม่ต้องถามซ้ำ
2. Scan node ใหม่ตามปกติ แล้วเทียบกับ key ที่มีอยู่แล้วในไฟล์:
   - **ข้อความเดิม ไม่เปลี่ยน** → ข้าม ไม่แตะ
   - **Key เดิมแต่เนื้อหาเปลี่ยน** (แก้ copy) → อัปเดตเฉพาะคอลัมน์ TH/EN ของแถวนั้น ไม่ลบ key ทิ้ง (เผื่อ dev ยังอ้างอิง key เดิมในโค้ด)
   - **ข้อความใหม่ที่ไม่เคยมี** → เพิ่มแถวใหม่ต่อท้าย sheet ที่เกี่ยวข้อง (ใช้กฎจัดกลุ่มด้านบน)
   - **Key ที่มีในไฟล์แต่หาไม่เจอใน Figma แล้ว** → ไม่ลบทิ้งอัตโนมัติ ให้ mark ว่า "ไม่พบใน Figma แล้ว — ต้องการลบไหม?" แล้วถาม user ก่อนทุกครั้ง
3. **เช็ค sheet "i18n Readiness" ทุกครั้งที่ update ด้วย** — ไม่ใช่แค่ sheet ข้อมูล:
   - ถ้าปัญหาที่เคย flag ไว้ (เช่น typo, ข้อความปนตัวแปร) ไม่พบใน Figma อีกต่อไปแล้ว (แก้แล้ว) → mark แถวนั้นเป็น **Resolved** อัตโนมัติ พร้อมโน้ตว่าเดิมเป็นอะไร
   - ถ้าเจอปัญหาใหม่จากข้อความที่เพิ่ม/แก้ → เพิ่มแถวใหม่ใน sheet นี้ตามปกติ
4. รายงานสรุปท้าย: เพิ่มกี่แถว, แก้กี่แถว, พบ key ที่อาจไม่ใช้แล้วกี่แถว, resolve ปัญหา i18n ไปกี่ข้อ

---

## โหมด Translate (สั่งแยกทีหลัง เช่น "แปล localization ให้หน่อย")

1. ถามชื่อ Product → เปิดไฟล์ `localization/localization-[product].xlsx` ที่มีอยู่แล้ว (ไม่มีไฟล์ → แจ้งว่ายังไม่เคย export ให้ export ก่อน)
2. หาแถวที่คอลัมน์ TH หรือ EN ยังว่างอยู่ (Status = ว่าง/`Not Translated`)
3. แปลให้ด้วย AI ตาม tone จาก `rules/DESIGN.md` — เติมลงคอลัมน์ที่ขาด
4. เปลี่ยน Status ของแถวนั้นเป็น **`AI Draft — Needs Review`** เสมอ — **ห้ามตั้งเป็น `Confirmed`** เพราะยังไม่มีคนตรวจ
5. รายงานสรุปท้าย: แปลไปกี่แถว พร้อมเตือนว่า "คำแปลชุดนี้มาจาก AI ต้องมีคนตรวจสอบก่อนส่งใช้งานจริง"

---

## Export

Export/update เป็น .xlsx ผ่าน skill `xlsx` — ต้องใส่ dropdown (Data Validation) และ conditional formatting (error = ตัวหนังสือแดง) ตามที่ระบุใน "Output Columns" ทุกครั้งที่สร้างไฟล์ใหม่

---

## Rules

- ไม่แก้ไข Figma ระหว่างทำ — export อย่างเดียว
- ไม่เดา TH/EN ถ้าไฟล์มีแค่ภาษาเดียว — เว้นว่างไว้
- ไม่เดาว่าข้อความเป็น mock data หรือ copy จริงถ้าไม่ชัดเจน — ถามก่อน
- ก่อนตั้ง key ใหม่ ต้องเช็ค key ที่มีอยู่แล้วในไฟล์ก่อนเสมอ (กันสร้างซ้ำ)
- โหมด Update ต้อง sync sheet "i18n Readiness" ด้วยทุกครั้ง — ห้ามปล่อยปัญหาที่แก้แล้วค้างเป็น Warning
- Scan ต้องเป็น full-depth เสมอตั้งแต่รอบแรก ห้าม scan แบบจำกัดความลึกแล้วค่อยถามขอ scan ซ้ำทีหลัง
- ไม่ลบ key ที่หายไปจาก Figma โดยไม่ถาม user ก่อน
- ถามชื่อ Product ทุกครั้งทั้ง export และ update — ไม่เดาจากบริบท
- ข้อความที่ปนตัวแปร/ข้อมูลจริง (เช่นมีตัวเลขต่อท้าย) ห้ามตั้งเป็น key เดียวรวมกับส่วน dynamic เสมอ — ต้องแยกก่อน
- คำแปลที่ AI ทำใน โหมด Translate ต้อง mark Status เป็น `AI Draft — Needs Review` เสมอ ห้ามตั้งเป็น `Confirmed` เอง
