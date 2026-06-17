# Tooltip

> Contextual label ที่ปรากฏเมื่อ user hover/focus บน element หรือใช้นำ user ผ่าน onboarding walkthrough

## Figma structure

- Component type: Tooltip
- Figma component sets: `crv-tooltip-standard`, `crv-tooltip-with-action`
- Code components: `CrvTooltip`, `CrvTooltipWithAction`
- Page: `Tooltips ✅`
- Section node: `4167:287`

---

## crv-tooltip-standard

Dark label tooltip สำหรับแสดงข้อมูลเสริมสั้นๆ

### Code mapping

- Use `CrvTooltip` for `crv-tooltip-standard`.
- `placement="none"` disables the arrow.
- Pass label copy via `title` (Figma "My Tooltip").

### Variants

| Property | Values |
|---|---|
| `placement` | `top`, `bottom`, `left`, `right`, `none` |

### Anatomy

- **Arrow** — VECTOR ลูกศรชี้ทิศทาง, fill `color/on-surface/invert`
- **Tooltip** — frame ครอบ label
  - text label — `typography/label/small`, fill `color/content/inverse`

### Layout behavior

- Tooltip frame padding: T/B `spacing/xs`, L/R `spacing/sm`
- Radius: `radius/4`

### Token usage

| Element | Token |
|---|---|
| Background (variant + Tooltip frame + Arrow) | `color/on-surface/invert` |
| Text | `color/content/inverse` |
| Typography | `typography/label/small` |
| Radius | `radius/4` |
| Padding T/B | `spacing/xs` |
| Padding L/R | `spacing/sm` |

---

## crv-tooltip-with-action

Larger tooltip พร้อม step counter และ Back/Next actions สำหรับ onboarding walkthrough

### Code mapping

- Use `CrvTooltipWithAction` with `open` + `anchorEl` in product flows.
- Use `CrvTooltipWithActionPanel` for static previews and design QA.
- `step` maps to Figma `step`.
- `content` maps to Figma `content`.
- Back/Next use shared `CrvButton` (`text` + `contained`, `size="small"`).

### Variants

| Property | Values |
|---|---|
| `placement` | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `right` |

### Properties

| Property | Type | Notes |
|---|---|---|
| `step` | text | ข้อความ step counter เช่น "1/7" |
| `content` | text | ข้อความอธิบายใน tooltip |

### Anatomy

- **Tooltip** — frame หลัก, light surface
  - step counter frame — `typography/body/small`, `color/content/secondary`
  - content/action frame — `typography/label/medium`, `color/brand/primary/content/default`
- Arrow — ลูกศรชี้ตำแหน่ง

### Token usage

| Element | Token |
|---|---|
| Background | `color/on-surface/default` |
| Step text | `color/content/secondary` |
| Action text (Back/Next) | `color/brand/primary/content/default` |
| Step typography | `typography/body/small` |
| Action typography | `typography/label/medium` |
| Radius | `radius/16` |

---

## Do / Don't

### Do

- ใช้ `CrvTooltip` (`crv-tooltip-standard`) เพื่อแสดงข้อมูลเสริมสั้นๆ เมื่อ user hover/focus บน element เช่น อธิบาย icon button ที่ไม่มี label
- ใช้ `CrvTooltipWithAction` (`crv-tooltip-with-action`) สำหรับ onboarding หรือ product walkthrough ที่ต้องนำ user ผ่านหลาย step
- เลือก `placement` ให้ tooltip ไม่บัง content สำคัญ

### Don't

- อย่าใส่ข้อความยาวหรือ action ใน `CrvTooltip` — ถ้าต้องการให้ user โต้ตอบ ให้ใช้ `CrvTooltipWithAction`
- อย่าแสดง `CrvTooltip` บน mobile — touch screen ไม่มี hover state
- อย่าใช้ tooltip แทน label หรือ helper text ใน form

## Needs designer review

- `placement=none` ใน `crv-tooltip-standard` — ไม่มี arrow — ใช้เมื่อต้องการ label bubble โดยไม่ชี้ anchor
