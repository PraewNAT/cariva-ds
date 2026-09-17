# crv-avatar

> แสดง profile image, initials, หรือ icon ของผู้ใช้ในรูปทรงกลม — รองรับ online badge และการจัดกลุ่ม avatar หลายคน

## โครงสร้าง Figma

- Component type: Avatar
- Component set: `crv-avatar` (avatar เดี่ยว), `crv-avatar-group` (กลุ่ม avatar)
- Naming pattern:
  - `crv-avatar`: `variant=circular, content={image|text|icon}, size={xSmall|small|medium|large}, badge={false|true}`
  - `crv-avatar-group`: `size={xSmall|small|medium|large}, max={2|3|4|5}`

## Variants

### crv-avatar
| Property | Values |
|---|---|
| `variant` | `circular` |
| `content` | `image`, `text`, `icon` |
| `size` | `xSmall`, `small`, `medium`, `large` |
| `badge` | `false`, `true` |

### crv-avatar-group
| Property | Values |
|---|---|
| `size` | `xSmall`, `small`, `medium`, `large` |
| `max` | `2`, `3`, `4`, `5` |

## Sizes
<!-- updated 2026-09-17 -->

| Size | Dimensions | Icon (content=icon) | Icon padding |
|---|---|---|---|
| `large` | 40×40px | 24px — `icon/size/6` | 8px |
| `medium` | 32×32px | 20px — `icon/size/5` | 6px |
| `small` | 24×24px | 16px — `icon/size/4` | 4px |
| `xSmall` | 18×18px | 12px — `icon/size/3` | 3px |

`content=icon` ใช้ขนาด icon และ padding **เดียวกันทั้ง `badge=false` และ `badge=true`** — badge แค่ซ้อนทับที่มุมขวาล่าง ไม่ทำให้ icon ใหญ่ขึ้น

## Properties

### crv-avatar
| Property | Type | Default | Notes |
|---|---|---|---|
| `variant` | variant | `circular` | circular เท่านั้น |
| `content` | variant | `text` | image / text / icon |
| `size` | variant | `large` | xSmall / small / medium / large |
| `badge` | variant | `false` | แสดง online badge มุมขวาล่าง |
| `initials` | text | `"OP"` | ข้อความ initials เมื่อ content=text |

### crv-avatar-group
| Property | Type | Notes |
|---|---|---|
| `size` | variant | ขนาดของ avatar ทุกตัวในกลุ่ม |
| `max` | variant | จำนวน avatar สูงสุดที่แสดง ก่อนแสดง +N |

## Anatomy

**crv-avatar:**
- **container** — frame หลัก ทรงกลม `radius/full`
- **image** — รูปภาพ profile (content=image)
- **initials** — ข้อความย่อชื่อ (content=text)
- **icon** — icon ผู้ใช้ (content=icon) — layer `min-width` › `person` (instance swap ได้) ขนาดผูก `icon/size/*` จัดกึ่งกลาง · โครงสร้างนี้เหมือนกันทั้ง `badge=false` และ `badge=true` <!-- updated 2026-09-17 -->
- **border** — วงแหวนรอบ container ใช้ `color/on-surface/default`
- **`<CrvBadge>`** — online dot มุมขวาล่าง via `crv-badge` (`variant=dot`, `color=success`) เมื่อ `badge=true`

**crv-avatar-group:**
- รวม crv-avatar หลายตัวเรียงซ้อนกัน พร้อม overflow label "+N"

## Layout behavior

- Shape: circular เท่านั้น
- Sizing: fixed width × height ตาม size
- Border radius: `radius/full` (9999px)
- Badge position: มุมขวาล่างของ container

## Token usage

### Color
| Element | Token |
|---|---|
| Border | `color/on-surface/default` |
| Badge (online) | `color/status/success/on-surface/default` |
| Icon (content=icon) | `color/content/secondary` |

### Radius
- `radius/full` — ทุก element ที่เป็นวงกลม

### Size
- Icon: `icon/size/6` (large) · `icon/size/5` (medium) · `icon/size/4` (small) · `icon/size/3` (xSmall)

### Spacing
- Badge gap: `spacing/md` (12px)

## MUI Mapping

| Figma | MUI |
|---|---|
| `content=image` | `<Avatar src="..." />` |
| `content=text` + `initials` | `<Avatar>OP</Avatar>` |
| `content=icon` | `<Avatar><PersonIcon /></Avatar>` |
| `badge=true` | `<CrvBadge variant="dot" color="success" overlap="circular">` + `<CrvAvatar />` |
| `crv-avatar-group` | `<AvatarGroup max={N}>...</AvatarGroup>` |
| `size=large` | `sx={{ width: 40, height: 40 }}` |
| `size=medium` | `sx={{ width: 32, height: 32 }}` |
| `size=small` | `sx={{ width: 24, height: 24 }}` |
| `size=xSmall` | `sx={{ width: 18, height: 18 }}` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `content=image` เมื่อมีรูป profile จริง — ให้ความรู้สึก personal มากที่สุด
- ใช้ `content=text` + initials 2 ตัวอักษร เมื่อไม่มีรูป เช่น "OP", "JD"
- ใช้ `content=icon` เป็น fallback เมื่อไม่มีทั้งรูปและชื่อ
- ใช้ `badge=true` เฉพาะเมื่อต้องการสื่อสถานะ online จริงๆ
- ใช้ `crv-avatar-group` เมื่อต้องแสดงกลุ่มผู้ร่วมงาน หรือผู้ที่กำลัง view อยู่

### ไม่ควรทำ

- ไม่ควรใช้ badge เพื่อแสดง notification count — ใช้ `crv-badge` แทน
- ไม่ควรใช้ initials มากกว่า 2 ตัวอักษร
- ไม่ควรสร้าง shape ใหม่นอกจาก circular
- ไม่ควรใช้ `crv-avatar-group` โดยไม่มี overflow label เมื่อมี avatar เกิน max ที่กำหนด

## Needs designer review

- Badge state เพิ่มเติม (offline, busy, away) — ยังไม่มี รอ decision ก่อน
