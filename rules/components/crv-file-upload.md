# crv-file-upload

> Dropzone สำหรับลากหรือเลือกไฟล์ — พร้อม crv-file-upload-item สำหรับแสดงสถานะของแต่ละไฟล์

## โครงสร้าง Figma

- Component type: File Upload
- Component set: `crv-file-upload` (dropzone), `crv-file-upload-item` (สถานะไฟล์แต่ละไฟล์)
- Naming pattern:
  - `crv-file-upload`: `state={default|hover|dragging|error|disabled}`
  - `crv-file-upload-item`: `state={idle|uploading|complete|error}`

## Variants

### crv-file-upload
| Property | Values |
|---|---|
| `state` | `default`, `hover`, `dragging`, `error`, `disabled` |

### crv-file-upload-item
| Property | Values |
|---|---|
| `state` | `idle`, `uploading`, `complete`, `error` |

## States

**crv-file-upload:**
- `default` — สถานะปกติ รอผู้ใช้ลากหรือคลิก
- `hover` — cursor อยู่บน dropzone
- `dragging` — ผู้ใช้กำลังลากไฟล์เข้ามา
- `error` — ไฟล์ไม่ถูกต้อง เช่น ขนาดเกิน หรือประเภทไม่รองรับ
- `disabled` — ไม่สามารถอัปโหลดได้

**crv-file-upload-item:**
- `idle` — ไฟล์รอการอัปโหลด
- `uploading` — กำลังอัปโหลด แสดง progress
- `complete` — อัปโหลดสำเร็จ
- `error` — อัปโหลดล้มเหลว

## Anatomy

**crv-file-upload:**
- **container** — frame หลัก border dashed, border radius `radius/md`
- **icon** — upload icon ตรงกลาง
- **label** — ข้อความหลัก เช่น "ลากไฟล์มาวางที่นี่"
- **description** — ข้อความรองบอกข้อจำกัด เช่น "PNG, JPG สูงสุด 10MB"

**crv-file-upload-item:**
- **icon** — ไอคอนประเภทไฟล์
- **filename** — ชื่อไฟล์
- **progress / status** — แสดงความคืบหน้าหรือสถานะ
- **action** — ปุ่มลบหรือ retry

## Layout behavior

- Direction: vertical, center/center
- Padding: `spacing/xl`
- Gap: `spacing/sm`
- Border radius: `radius/md`

## Token usage

### Color — crv-file-upload
| Element | Token |
|---|---|
| Background | `color/on-surface/default` |
| Border default | `color/border/default` |
| Border hover/dragging | `color/border/system` |
| Border error | `color/border/error` |
| Border disabled | `color/border/disabled` |
| Icon | `color/content/secondary` |
| Label | `color/content/primary` |
| Description | `color/content/secondary` |

### Typography
- `typography/label/medium` — label text
- `typography/body/small` — description text
- Font family: `font-family/sans` (Product Style collection)

### Spacing
- Padding: `spacing/xl`
- Gap: `spacing/sm`

### Radius
- `radius/md` — dropzone container

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ File Upload เมื่อต้องการให้ผู้ใช้แนบไฟล์เป็นส่วนหนึ่งของ workflow เช่น อัปโหลดเอกสาร รูปภาพ
- แสดงประเภทและขนาดไฟล์ที่รองรับให้ชัดเจนใน dropzone เช่น "PNG, JPG สูงสุด 10MB"
- ใช้ `crv-file-upload-item` แสดงความคืบหน้าของการอัปโหลดทุกไฟล์
- ใช้ `state=error` พร้อมข้อความบอกสาเหตุ เช่น "ไฟล์ใหญ่เกินกำหนด" หรือ "ประเภทไฟล์ไม่รองรับ"

### ไม่ควรทำ

- ไม่ควรใช้โดยไม่บอกข้อจำกัดของไฟล์ เช่น ประเภทหรือขนาดสูงสุด
- ไม่ควรปล่อยให้ผู้ใช้รอโดยไม่มี feedback ระหว่างอัปโหลด — ต้องแสดง `state=uploading`
- ไม่ควรลบไฟล์ที่อัปโหลดแล้วโดยไม่มีการยืนยัน
- ไม่ควรใช้ File Upload สำหรับ action ที่ไม่เกี่ยวกับการแนบไฟล์

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
