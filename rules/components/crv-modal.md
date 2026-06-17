# Modal

> Dialog สำหรับแสดงข้อมูลสำคัญหรือขอ action จากผู้ใช้ — รองรับ icon, content slot, และ CTA slot

## โครงสร้าง Figma

- Component type: Modal / Dialog
- Component set: `crv-modal`
- Code component: `CrvModal`
- Naming pattern: `type={default|alignCenter}, breakpoint={sm|md+}`

## Code mapping

- Use `CrvModal` for `crv-modal`.
- `type="default"` → left-aligned header with icon beside title.
- `type="alignCenter"` → centered icon above title/description.
- `breakpoint="sm"` → width 320px, stacked full-width CTA buttons (Confirm then Close)
- `breakpoint="md+"` → width 400px, horizontal CTA row aligned right (Close then Confirm)
- `children` → `contentSlot`.
- `actions` → `ctaSlot`.
- `showContent`, `showDescription`, `showIcon`, `showCTA` map to Figma booleans.

## Variants

| Property | Values |
|---|---|
| `type` | `default`, `alignCenter` |
| `breakpoint` | `sm`, `md+` |

## Properties

| Property | Type | Notes |
|---|---|---|
| `type` | variant | default = left-align, alignCenter = center-align (ใช้กับ icon dialog) |
| `breakpoint` | variant | sm = mobile (320px), md+ = tablet/desktop (400px) |
| `contentSlot` | SLOT | พื้นที่ content ภายใน modal — ปรับ spacing top/bottom และ gap ได้ |
| `ctaSlot` | SLOT | พื้นที่ action buttons |
| `showContent` | boolean | แสดง/ซ่อน content area |
| `showDescription` | boolean | แสดง/ซ่อน description text |
| `showIcon` | boolean | แสดง/ซ่อน icon บน title |
| `icon` | instance swap | icon ที่แสดงใน icon container — เปลี่ยนสีได้ |
| `showCTA` | boolean | แสดง/ซ่อน CTA area |

## Anatomy

### Top-level structure (Figma + code)

`crv-modal` ใช้ **3 sibling blocks** แนวตั้ง — ห้ามยัด footer ไว้ใน padded wrapper เดียวกับ header/content

```text
crv-modal (shell — radius + shadow)
├── Container              → header section (title, icon, description)
├── contentSlot            → optional body slot
└── Footer Container       → CTA area (ชื่อ layer อาจเป็น Bottom container / Button Container)
```

**Code rule:** render header, `children` (content), and `actions` (footer) as **siblings** inside the modal surface. Footer is **full-bleed** (edge-to-edge), not inset by header padding.

### Layers

- **Container** — header section only; inherits modal surface `color/on-surface/default` (white)
  - **Header Container** — icon container + title + description
  - **Icon Container** — border radius `Product Style / radius/container sm` — ใส่ background color ได้
  - **icon** (`panorama-fish-eye`) — instance swap, fill `color/content/primary` — เปลี่ยนสีได้ตาม context
  - **title** — ข้อความหัวข้อ
  - **description** — toggle ด้วย `showDescription`
- **contentSlot** — body slot; inherits `color/on-surface/default`; padding และ gap ปรับได้
- **Footer Container** — CTA wrapper; fill **`color/on-surface/subtle`** (`#f8fafc`); **ไม่มี border-top / divider**

### Do not assume

- Footer background **≠** header/body — ต้อง bind `on-surface/subtle` ที่ footer layer
- MUI `DialogActions` default border-top — **ไม่ใช้** เว้นแต่ Figma มี stroke
- CTA order ขึ้นกับ `breakpoint` — ดู [CTA layout](#cta-layout)

## Layout behavior

- Direction: vertical (header → content → footer)
- `type=default` — title ชิดซ้าย, icon อยู่บน title
- `type=alignCenter` — title และ icon อยู่กึ่งกลาง
- `breakpoint=sm` — width 320px
- `breakpoint=md+` — width 400px

### CTA layout

| Breakpoint | Direction | Alignment | Button order (primary last in reading order) |
|---|---|---|---|
| `sm` | vertical stack | full width | **Confirm** (contained) → **Close** (outlined/text) |
| `md+` | horizontal row | end (right) | **Close** → **Confirm** |

Primary = contained; secondary = outlined or text. Only one contained primary per modal.

## Token usage

### Color
| Element | Token |
|---|---|
| Background (header/body) | `color/on-surface/default` |
| Background (CTA footer) | `color/on-surface/subtle` |
| Icon fill (default) | `color/content/primary` |
### Spacing

Padding applies **per section**, not one box around everything.

| Element | Token |
|---|---|
| Header (`Container`) padding | `spacing/xl` top, `spacing/lg` horizontal; bottom via gap to content |
| Gap (header elements) | `spacing/sm` |
| Icon Container padding | `spacing/xs` |
| Content slot padding | `spacing/lg` (all sides) |
| Footer / CTA padding | `spacing/lg` (all sides) |
| CTA button gap | `spacing/sm` |

### Radius
- `Product Style / border-radius/container md` — Modal container
- `Product Style / border-radius/container sm` — Icon Container

### Shadow
- `shadow/2xl` — Modal container

## Customization

- **Icon color** — เปลี่ยนสีได้ตาม context เช่น `color/status/error/content/default`, `color/status/success/content/default`
- **Icon Container background** — ใส่ background fill ได้เพื่อเพิ่ม visual weight
- **Content slot spacing** — ปรับ padding top/bottom และ gap ภายใน contentSlot ได้

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ `type=alignCenter` เมื่อมี icon นำ เช่น success, warning, error dialog
- ใช้ `type=default` เมื่อ content เป็น form หรือข้อความยาวที่ต้องการ left-align
- วาง action ใน `ctaSlot` เสมอ — ไม่ hardcode ปุ่มลงใน `contentSlot`
- ใช้ `breakpoint=sm` บน mobile และ `breakpoint=md+` บน tablet/desktop
- เปลี่ยนสีไอคอนให้สื่อ context เช่น error ใช้ `color/status/error/content/default`
- ใส่ background ให้ icon container เพื่อเพิ่ม visual weight เมื่อต้องการเน้น icon

### ไม่ควรทำ

- อย่าวาง `contained primary button` มากกว่า 1 ปุ่มใน `ctaSlot`
- อย่าซ่อน title โดยไม่มีข้อมูลอื่นบอก context ของ modal

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
