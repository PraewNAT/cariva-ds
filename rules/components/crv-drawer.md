# Drawer

> Panel ที่ slide เข้าจากขอบหน้าจอ สำหรับ secondary navigation หรือ content ที่เปิด/ปิดได้ — wraps MUI Drawer

## Figma structure

- Component type: Drawer / Navigation Panel
- Component: `crv-drawer` (node `4497:77989`)
- Page: `Drawer` (canvas `4497:77575`)

## Properties

| Property | Type | Notes |
|---|---|---|
| `contentSlot` | SLOT | รับ content ที่แสดงใน drawer panel |

## Anatomy

- **contentSlot** — SLOT container, fill `color/on-surface/default`, width = 320px
  - Padding top/bottom: `spacing/xl` (24px)
  - เติม `crv-menu-item` หรือ content อื่นๆ ผ่าน slot

## Layout behavior

- Direction: vertical (ขึ้นอยู่กับ content ที่ใส่ใน slot)
- Width: **320px** (fixed)
- Padding: `spacing/xl` (24px) top/bottom
- Sizing: height ปรับตาม content ใน slot
- Placement: slide จากขอบซ้าย/ขวา/ล่างของหน้าจอ (ควบคุมผ่าน MUI anchor prop ใน code)

## Token usage

| Element | Token |
|---|---|
| Drawer surface | `color/on-surface/default` |
| Padding top/bottom | `spacing/xl` (24px) |

## MUI mapping

- `<Drawer>` → MUI `Drawer`
- `contentSlot` → MUI Drawer `children`
- Anchor (left/right/top/bottom) → MUI Drawer `anchor` prop — ไม่ expose ใน Figma
- Open/close state → MUI Drawer `open` prop — ไม่ expose ใน Figma

## Usage with Backdrop

ใน Figma example ใช้ร่วมกับ `Backdrop` component เพื่อแสดง overlay ด้านหลัง drawer:

```
<Backdrop /> ← overlay layer
<Drawer>
  <crv-menu-item />
  ...
</Drawer>
```

ใน code ควรใช้ MUI Drawer ที่มี backdrop built-in (`variant="temporary"`) พร้อม `getOverlayBackdropSx()` จาก `crv-overlay` (4722:90374)

## Do / Don't

### Do

- ใช้ Drawer สำหรับ secondary navigation หรือ panel ที่เปิด/ปิดได้ โดยไม่ต้อง navigate ออกจากหน้าหลัก เช่น side menu, filter panel
- ใส่ `crv-menu-item` ใน `contentSlot` เพื่อแสดงรายการ navigation
- ใช้ร่วมกับ backdrop overlay เสมอเมื่อเปิด drawer ใน mobile

### Don't

- อย่าใส่ content ที่ซับซ้อนหรือยาวมากจน user ต้อง scroll มาก — ถ้า content หนัก ควรใช้ full page แทน
- อย่าใช้ Drawer แทน Modal เมื่อต้องการ block interaction กับ content หลักแบบ hard — Drawer เหมาะกับ soft overlay
- อย่าซ้อน Drawer หลายชั้น

## Needs designer review

- `<Drawer>` ไม่มี variant สำหรับ anchor direction (left/right/bottom) — ควบคุมผ่าน MUI `anchor` prop ใน code เท่านั้น
