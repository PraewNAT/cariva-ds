# crv-card

> Content card แสดงรูป + tag + header + description + ปุ่ม action รองรับ 3 layout: vertical, horizontal (รูปซ้าย/ขวา/พื้นหลัง) และ small

## Figma structure

- Section: Card (`4536:123343`)
- `crv-card-vertical` (COMPONENT_SET `4657:31022`) — `button=1|2`, `showTag`, `showImg`, `showButton`, `slot`
- `crv-card-horizontal` (COMPONENT_SET `4570:20745`) — `type=default-left|default-right|imgAbsolute`, `showTag`, `showTopMessage`, `showDescription`, `ShowImg`, `slot`
- `crv-card-small-horizontal` (COMPONENT `4570:20655`) — thumbnail + text
- Code component: `CrvCard` (รวมทุก layout ไว้ component เดียว)

## Code mapping

- `crv-card-vertical` → `orientation="vertical"` (รูปด้านบน, ปุ่ม 1–2 ปุ่มใน `actions`)
- `crv-card-horizontal type=default-right` → `orientation="horizontal" imagePosition="right"`
- `crv-card-horizontal type=default-left` → `orientation="horizontal" imagePosition="left"`
- `crv-card-horizontal type=imgAbsolute` → `orientation="horizontal" imagePosition="absolute"` (รูปเป็นพื้นหลัง, ปุ่ม full-width)
- `crv-card-small-horizontal` → `orientation="small"` (thumbnail 56px + tag + header + description, ไม่มีปุ่ม/top message)
- `showTag`→`showTag`, `showTopMessage`→`showTopMessage`, `showDescription`→`showDescription`, `showImg`/`ShowImg`→`showImage`, `showButton`→ ใส่/ไม่ใส่ `actions`
- tag ใช้ `CrvTag color="success"`, ปุ่มใช้ `CrvButton`

---

## Anatomy

- **Surface**: พื้นขาว, border 1px `color/border/default`, มุมโค้ง (16 หรือ 12), `overflow: hidden`
- **Image area**: vertical = แถบเต็มกว้างด้านบน (ratio 16:9), horizontal = ครึ่งด้านซ้าย/ขวา, small = thumbnail 56×56, imgAbsolute = พื้นหลังเต็มใบ
- **Body**: tag → top message (horizontal) → header → description → actions
- header+description จัดกลุ่มชิดกัน (gap 2px; small = 0)

---

## Token usage

| Role | Token |
|---|---|
| Surface | `color/on-surface/default` (`#ffffff`) |
| Border | `color/border/default` (`#cbd5e1`, `3714:47`) |
| Radius | `radius/16` (vertical, horizontal), `radius/12` (small) |
| Padding | `spacing/lg` (16); small = `12 / 16` |
| Body gap | `spacing/lg` (16); content group `spacing/sm` (8) |
| Header | heading/medium (20/28), `color/content/primary`, semibold |
| Description | body/medium (14/22), `color/content/secondary` |
| Top message | body/small (12/18), `color/content/secondary` |
| Image placeholder | `color/on-surface/sunken` (`#f1f5f9`) |
| Tag | `crv-tag-standard` → `CrvTag color="success"` (`#047857`) |

> ไม่มี shadow — ใช้ border 1px อย่างเดียว

---

## Do / Don't

### Do

- ใส่รูปจริงผ่าน `image` (เช่น `<img>`); placeholder เป็นแค่ fallback
- vertical ใช้ปุ่มได้ 1–2 ปุ่ม, horizontal ใช้ปุ่มเดียว, small ไม่มีปุ่ม
- ใช้ `imagePosition="absolute"` เมื่อต้องการรูปเป็นพื้นหลังและปุ่ม full-width

### Don't

- อย่าใส่ shadow/elevation — Figma ใช้ border เท่านั้น
- อย่าใส่ `topMessage` ใน `small` (ถูก ignore)
- อย่าเปลี่ยนสี tag จาก success ถ้า design ไม่ได้ระบุ

---

## Needs designer review

- imgAbsolute: code วางรูปเป็น background เต็มใบ + ปุ่ม full-width — ตรวจกับ designer ว่าตรงสัดส่วนรูป/ตำแหน่ง content ที่ต้องการ
- ขนาด thumbnail ของ small (56px) อิงจาก leftSlot ใน Figma — ยืนยันกับ designer ถ้าต้องปรับ
