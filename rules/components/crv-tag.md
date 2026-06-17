# crv-tag

> Pill label แสดง status, category, หรือ attribute ของ content — ใช้เป็น standalone element ไม่ใช่ overlay

## Figma structure

- Component type: Tag / Label
- Component sets: `crv-tag-standard`, `crv-tag-color`
- Page: `Tag  ✅`

---

## crv-tag-standard

### Code mapping

- Use `CrvTag` for `crv-tag-standard`.
- Use `content="label"` for Figma `children=label`.
- Use `content="number"` and `badgeContent` for Figma `children=number`.
- Use `startIconVisible` / `endIconVisible` for the icon visibility properties.

### Variants

| Property | Values |
|---|---|
| `variant` | `filled`, `outlined` |
| `color` | `default`, `secondary`, `error`, `success`, `warning` |
| `children` | `label`, `number` |
| `size` | `small`, `medium`, `large` |

### Properties

| Property | Type | Values / Notes |
|---|---|---|
| `label` | text | ข้อความใน tag — default: `"Label"` |
| `badgeContent` | text | ตัวเลขใน `children=number` — default: `"8"` |
| `startIcon` | instance swap | icon ซ้าย |
| `endIcon` | instance swap | icon ขวา |
| `startIconVisible` | boolean | default: true |
| `endIconVisible` | boolean | default: false |

### Sizes

| Size | Height | Padding T/B | Padding L/R | Gap | Typography |
|---|---:|---|---|---|---|
| `small` | 20px | `spacing/xs` (4px) | `spacing/sm` (8px) | `spacing/xs` | `typography/label/small` |
| `medium` | 26px | `spacing/xs` (4px) | `spacing/sm` (8px) | `spacing/xs` | `typography/label/small` |
| `large` | 38px | `spacing/sm` (8px) | `spacing/md` (12px) | `spacing/xs` | `typography/label/medium` |

### Token usage

- Radius: `border-radius/interactive` (Product Style)
- Typography: `typography/label/small` (small/medium), `typography/label/medium` (large)
- Spacing: ดูตาราง Sizes ด้านบน

#### variant=filled

| Color | Fill | Text |
|---|---|---|
| `default` | `color/brand/primary/on-surface/default` | `color/content/on-brand` |
| `secondary` | `color/on-surface/sunken` | `color/content/primary` |
| `error` | `color/status/error/on-surface/default` | `color/content/on-brand` |
| `success` | `color/status/success/on-surface/default` | `color/content/on-brand` |
| `warning` | `color/status/warning/on-surface/default` | `color/content/on-brand` |

#### variant=outlined

> ใช้ได้เฉพาะ `color=default` เท่านั้น — ไม่รองรับ error/success/warning

| Property | Token |
|---|---|
| Fill | transparent (ไม่มี fill) |
| Stroke | `color/border/default` |
| Stroke weight | `border-width/1` |
| Text | `color/content/primary` |

### MUI mapping

- ไม่มี MUI component ที่ตรงตรง — implement เป็น custom styled `span` หรือ `Box` พร้อม border-radius, padding, semantic color tokens
- ห้ามส่ง props ของ `crv-tag` เข้า MUI `Chip` หรือ `Badge` โดยตรง

---

## crv-tag-color

### Code mapping

- Use `CrvTagColor` for `crv-tag-color`.
- Use this component only for category/group colors with no fixed semantic meaning.

### Variants

| Property | Values |
|---|---|
| `color` | `primary`, `sky`, `cyan`, `pink`, `purple`, `emerald`, `amber`, `orange` |

### Sizes

- Height: 22px (fixed — ไม่มีตัวเลือก size)
- Typography: `typography/label/small`

### Token usage

| Color | Fill | Text |
|---|---|---|
| `primary` | `color/brand/primary/on-surface/muted` | `color/brand/primary/content/strong` |
| `sky` | `color/accent/sky/A01` | `color/accent/sky/A04` |
| `cyan` | `color/accent/cyan/A01` | `color/accent/cyan/A04` |
| `pink` | `color/accent/pink/A01` | `color/accent/pink/A04` |
| `purple` | `color/accent/purple/A01` | `color/accent/purple/A04` |
| `emerald` | `color/accent/emerald/A01` | `color/accent/emerald/A04` |
| `amber` | `color/accent/amber/A01` | `color/accent/amber/A04` |
| `orange` | `color/accent/orange/A01` | `color/accent/orange/A04` |


- ไม่มี stroke บน `crv-tag-color` ทุก variant
- Radius: `border-radius/interactive` (Product Style)

### MUI mapping

- เหมือน `crv-tag-standard` — implement เป็น custom styled component

---

## Do / Don't

### Do

- ใช้ `crv-tag-standard` เมื่อ tag มีความหมายชัดเจนและต้องการให้ user รับรู้ทันที เช่น สถานะ order (`success`, `error`, `warning`) หรือ label แสดง type ของ content (`primary`, `default`)
- ใช้ `crv-tag-color` เมื่อต้องการแยกประเภท/grouping โดยสีไม่มี semantic ตายตัว เช่น หมวดหมู่สินค้า, team label, topic ของ article
- ใช้ `crv-tag-color` เมื่อมีหลาย status/category พร้อมกันในหน้าเดียวและต้องการให้ดู subtle กว่า standard
- ถ้า status เป็น `error/success/warning` ให้ใช้ `crv-tag-standard` เสมอ เพราะมี semantic token รองรับ

### Don't

- อย่าใช้ `crv-tag` เป็น overlay บน element อื่น — ใช้ `crv-badge` แทน
- อย่าใช้ `crv-tag-color` แทน `crv-tag-standard` สำหรับ error/success/warning เพราะสีของ color tag ไม่ได้สื่อความหมาย semantic
- อย่าส่ง props ของ `crv-tag` เข้า MUI `Chip`, `Badge`, หรือ component อื่นโดยตรง

## AI Implementation Rules

1. Implement `crv-tag-standard` with `CrvTag`.
2. Implement `crv-tag-color` with `CrvTagColor`.
3. Never implement tags with MUI `Chip` or `Badge`; those components have different behavior and semantics.
4. Use `CrvBadge` only for overlay indicators.
5. Use `CrvChipAction` only for removable/interactive chips.
6. Do not add new tag colors without a Figma variant and token mapping.

## Needs designer review

- `crv-tag-color` มีเฉพาะ size เดียว (22px) — ไม่มีตัวเลือก size หลายขนาดเหมือน standard
