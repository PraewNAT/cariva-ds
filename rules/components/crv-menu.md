# crv-menu / crv-menu-item

> Menu container และ menu item สำหรับแสดง list of options ที่ผู้ใช้เลือกได้ รองรับทั้ง default item และ checkbox item

## Figma structure

- Component type: Menu
- Component set (item): `crv-menu-item`
- Component (container): `crv-menu` (single component, ไม่มี variant set)
- Naming pattern: `variant=default|checkbox, state=default|hover, selected=false|true, disabled=false|true`

## Variants

### crv-menu-item

| Property | Values |
|---|---|
| `variant` | `default`, `checkbox` |
| `state` | `default`, `hover` |
| `selected` | `false`, `true` |
| `disabled` | `false`, `true` |

### crv-menu

ไม่มี variant — เป็น single COMPONENT ที่ใช้ `crv-menu-item` เป็น children

## Sizes

ไม่มี size variant — `crv-menu-item` มีขนาดคงที่ width=200, height=40

## States

- `state=default`: surface สีขาว (`color/on-surface/default`)
- `state=hover`: surface เปลี่ยนเป็น (`color/on-surface/action/hover`)
- `selected=true`: surface เปลี่ยนเป็น (`color/on-surface/action/selected`)
- `disabled=true`: surface สีขาว, label และ icon ใช้สี (`color/content/disabled`)

## Properties

| Property | Type | Values / Notes |
|---|---|---|
| `variant` | variant | `default` = item ธรรมดา, `checkbox` = item มี crv-checkbox-base นำหน้า |
| `state` | variant | `default`, `hover` — CSS pseudo-class, ไม่ expose เป็น code prop |
| `selected` | boolean | `false`, `true` — maps to MUI `selected` prop |
| `disabled` | boolean | `false`, `true` — maps to MUI `disabled` prop |
| `Icon Leading` | instance swap | Material icon นำหน้า label (ซ้ายและขวา) |
| `label` | text | ข้อความ menu item |

## Anatomy

### crv-menu

- `crv-menu` (COMPONENT): container ครอบ items ทั้งหมด, layout VERTICAL, padding top/bottom = `spacing/sm`, radius = `radius/container sm`, fill = `color/on-surface/default`, shadow = DROP_SHADOW (y=4, radius=16, opacity=12%)
- `crv-menu-item` ×n: children instances ของ `crv-menu-item`

### crv-menu-item

- `Icon Leading` (instance, ซ้าย): Material icon, fill = `color/content/secondary` (enabled) / `color/content/disabled` (disabled)
- `label` (TEXT): ข้อความ item, text style bound, fill = `color/content/primary` (enabled) / `color/content/disabled` (disabled)
- `Icon Leading` (instance, ขวา): trailing icon, fill เดียวกับ leading icon
- `crv-checkbox-base` (instance, เฉพาะ `variant=checkbox`): checkbox component ของ Cariva DS ที่ถูกครอบใน Frame wrapper

## Layout behavior

### crv-menu

- Direction: vertical
- Padding: top/bottom = `spacing/sm` (8px), left/right = 0
- Gap: 0
- Sizing: FIXED × FIXED (width=200, height ปรับตาม content)
- Radius: `radius/container sm`

### crv-menu-item

- Direction: horizontal
- Padding: top/bottom = `spacing/sm` (8px), left/right = `spacing/lg` (16px)
- Gap: `spacing/md` (12px)
- Sizing: FIXED × FIXED (width=200, height=40)
- Alignment: center

## Token usage

- Color (surface default): `color/on-surface/default`
- Color (surface hover): `color/on-surface/action/hover`
- Color (surface selected): `color/on-surface/action/selected`
- Color (surface disabled): `color/on-surface/action/disabled`
- Color (label/icon enabled): `color/content/primary`
- Color (label/icon secondary): `color/content/secondary`
- Color (label/icon disabled): `color/content/disabled`
- Typography: bound text style (IBM Plex Sans Thai Medium, 14px)
- Spacing padding (item): `spacing/sm` (top/bottom), `spacing/lg` (left/right)
- Spacing gap (item): `spacing/md`
- Spacing padding (container): `spacing/sm` (top/bottom)
- Radius: `radius/container sm`
- Shadow: `shadow/lg` (effect style)

## Existing examples

- `crv-menu` ใน Figma มี 4 `crv-menu-item` instances (Option one / two / three / four) ทั้งหมด `variant=default, state=default, selected=false, disabled=false`

## Do / Don't

### Do

- ใช้ `crv-menu` เป็น container ครอบ `crv-menu-item` เสมอ
- ใช้ `variant=checkbox` เมื่อต้องการให้ user เลือกได้หลาย option พร้อมกัน
- ใช้ `state=disabled` สำหรับ option ที่ยังไม่พร้อมใช้งาน แทนการซ่อน item ออก

### Don't

- อย่าใช้ Menu แทน Dropdown ในฟอร์ม (ใช้ `crv-dropdown` แทน)
- อย่าผสม `variant=default` กับ `variant=checkbox` ใน menu เดียวกัน
- อย่าวาง `crv-menu-item` โดยตรงบน canvas โดยไม่มี `crv-menu` ครอบ

## Needs designer review

- `crv-menu` เป็น FIXED size — ควรพิจารณาว่า width ควรเป็น fill หรือ hug เมื่อใช้ใน product จริง
- ยังไม่มี variant สำหรับ menu ที่มี divider หรือ section header
