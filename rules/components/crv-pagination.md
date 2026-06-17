# crv-pagination-standard / crv-pagination-page-base / crv-pagination-controller-base

> Pagination component สำหรับนำทางระหว่างหน้าของข้อมูล ประกอบด้วย controller (prev/next) และ page buttons ที่ครอบใน strip

## Figma structure

- Component type: Pagination
- Component sets:
  - `crv-pagination-standard` — container หลักรวม prev/next + page strip
  - `crv-pagination-page-base` — page button แต่ละปุ่ม
  - `crv-pagination-controller-base` — prev/next button
- Naming pattern:
  - standard: `size=large|medium`
  - page-base: `type=page, size=large|medium, state=selected|default|disabled|hover|pressed`
  - controller-base: `type=next|previous, size=large|medium, state=default|disabled|hover|pressed`

## Variants

### crv-pagination-standard

| Property | Values |
|---|---|
| `size` | `large`, `medium` |

### crv-pagination-page-base

| Property | Values |
|---|---|
| `type` | `page` |
| `size` | `large`, `medium` |
| `state` | `selected`, `default`, `disabled`, `hover`, `pressed` |

### crv-pagination-controller-base

| Property | Values |
|---|---|
| `type` | `next`, `previous` |
| `size` | `large`, `medium` |
| `state` | `default`, `disabled`, `hover`, `pressed` |

## Sizes

| Size | crv-pagination-standard | page-base / controller-base |
|---|---|---|
| `large` | 432×48 | 40×40 |
| `medium` | 368×40 | 32×32 |

## States (crv-pagination-page-base)

- `selected`: `<ButtonBase>` fill = `color/brand/primary/on-surface/default`, label = `color/content/inverse`
- `default`: fill = transparent (no fill)
- `hover`: fill = `color/on-surface/action/hover`
- `pressed`: fill = `color/on-surface/action/pressed`
- `disabled`: no fill, stroke = `color/border/disabled`

## States (crv-pagination-controller-base)

- `default`: fill = `color/brand/primary/on-surface/default`
- `hover`: fill = `color/brand/primary/on-surface/hover`
- `pressed`: fill = `color/brand/primary/on-surface/pressed`
- `disabled`: no fill, stroke = `color/border/disabled`

## Anatomy

### crv-pagination-standard

- `crv-pagination-controller-base` (previous): prev button instance
- `Frame 1` (page strip): container ครอบ page buttons ทั้งหมด — fill = `color/on-surface/action/hover` (subtle bg), radius = `radius/full`
  - `crv-pagination-page-base` ×n: page number buttons
  - `more-horiz` (icon): ellipsis สำหรับหน้าที่ซ่อนอยู่, fill = `color/content/secondary`
- `crv-pagination-controller-base` (next): next button instance

### crv-pagination-page-base / crv-pagination-controller-base

- `<ButtonBase>` (FRAME): กรอบปุ่ม — radius = `radius/interactive`, ครอบ label หรือ icon

## Layout behavior

### crv-pagination-standard

- Direction: horizontal
- Gap: `spacing/lg` (16px)
- Sizing: FIXED (width=432 large / 368 medium)

### Frame 1 (page strip ภายใน standard)

- Direction: horizontal
- Padding: top/bottom = `spacing/2xs` (2px), left/right = `spacing/sm` (8px)
- Gap: `spacing/sm` (8px)
- Radius: `radius/full`
- Fill: `color/on-surface/action/hover`

### crv-pagination-page-base (large)

- `<ButtonBase>`: 40×40, padding left/right = `spacing/md` (12px), radius = `radius/interactive`

## Token usage

- Color (selected fill): `color/brand/primary/on-surface/default`
- Color (selected label): `color/content/inverse`
- Color (default/empty fill): transparent
- Color (hover fill): `color/on-surface/action/hover`
- Color (pressed fill): `color/on-surface/action/pressed`
- Color (disabled stroke): `color/border/disabled`
- Color (ellipsis icon): `color/content/secondary`
- Color (page strip bg): `color/on-surface/action/hover`
- Typography (label): text style bound (IBM Plex Sans Thai, Medium, 14px)
- Spacing (standard gap): `spacing/lg`
- Spacing (strip padding): `spacing/2xs` top/bottom, `spacing/sm` left/right + gap
- Spacing (button padding): `spacing/md` left/right
- Radius (button): `radius/interactive`
- Radius (page strip): `radius/full`

## Existing examples

- Page แสดง `size=large` และ `size=medium` side by side พร้อม controller disabled บน previous (หน้าแรก)
- มี `rowsPerPageSelect` และ `pageSelect` เป็น dropdown/input instances แยกต่างหากในหน้า (ไม่ได้เป็นส่วนหนึ่งของ component set)
- ใน code ให้ map `rowsPerPageSelect` และ `pageSelect` ไปที่ `CrvDropdown` เพื่อ reuse `CrvMenuItem` styling

## Do / Don't

### Do

- ใช้ `crv-pagination-standard` เป็น component หลักเสมอ — ไม่ใช้ `crv-pagination-page-base` หรือ `crv-pagination-controller-base` แยกโดดๆ
- ใช้ `state=disabled` บน controller เมื่อถึงหน้าแรกหรือหน้าสุดท้าย
- เลือก `size` ให้สอดคล้องกับ density ของหน้า — `large` สำหรับ page หลัก, `medium` สำหรับ table หรือ panel ที่พื้นที่จำกัด
- ใช้ `CrvDropdown` สำหรับ `Rows per page` และ `Jump to page` helper controls เสมอ เพื่อให้ option menu ใช้ `CrvMenuItem` เดียวกับ dropdown ทั้งระบบ
- ตั้ง `labelVisible={false}` เมื่อฝัง `CrvDropdown` ใน pagination helper เพราะ label ถูก render เป็น text ด้านซ้ายของ select แล้ว
- Map size: pagination `large` → dropdown `medium`; pagination `medium` → dropdown `small`

### Don't

- อย่าแสดง pagination เมื่อมีเพียงหน้าเดียว
- อย่าใช้ pagination แทน infinite scroll ในบริบทที่ข้อมูล load ต่อเนื่อง
- อย่าผสม `size=large` กับ `size=medium` ใน pagination เดียวกัน
- อย่าใช้ raw MUI `TextField select`, `Select`, หรือ `MenuItem` เพื่อสร้าง dropdown ใน pagination helper เพราะสี, hover, selected, paper, และ backdrop จะไม่ตรง DS

## AI Implementation Rules

1. Implement `CrvPaginationRowsPerPage` and `CrvPaginationJumpToPage` by composing `CrvDropdown`.
2. Never create a separate menu item implementation for pagination; options must inherit `CrvMenuItem` through `CrvDropdown`.
3. If option colors are wrong, first verify that the implementation still uses `CrvDropdown` instead of raw MUI menu components.
4. Use semantic tokens only for page/controller button styling.
5. Do not invent new pagination menu tokens or local menu colors.

## Needs designer review

- `rowsPerPageSelect` และ `pageSelect` ในหน้า Figma เป็น input instances แยกต่างหาก ยังไม่ถูก integrate เข้าใน `crv-pagination-standard` — ควรพิจารณาว่าจะสร้าง variant ที่รวม rows-per-page selector หรือไม่
