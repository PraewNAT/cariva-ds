# crv-accordion-standard

> Accordion สำหรับซ่อน/แสดง content ที่ไม่จำเป็นต้องเห็นตลอดเวลา เช่น FAQ, filter, settings

## Figma structure

- Component type: Accordion
- Component set: `crv-accordion-standard`
- Naming pattern: `expanded={false|true}`

## Variants

| Property | Values |
|---|---|
| `expanded` | `false`, `true` |

## Properties

| Property | Type | Notes |
|---|---|---|
| `expanded` | variant | false = collapsed, true = expanded |
| `showIcon` | boolean | แสดง/ซ่อน icon ด้านซ้ายของ trigger |
| `icon` | instance swap | icon ที่แสดงใน trigger |

## Anatomy

- **AccordionTrigger** — header ที่กดเพื่อ expand/collapse ประกอบด้วย icon + label + chevron
- **AccordionContent** — content area ที่แสดงเมื่อ expanded=true

## Layout behavior

- Direction: vertical
- Radius: `Product Style / radius/container sm` (ทั้ง container และ inner frame)
- Sizing: H:fill, V:hug

## Token usage

### Color
| Element | Token |
|---|---|
| Background | `color/on-surface/default` |
| Border | `color/border/default` |
| Trigger text | `color/content/primary` |
| Trigger hover BG | `color/on-surface/action/hover` |
| Content text | `color/content/secondary` |
| Icon | `color/content/secondary` |
| Chevron | `color/content/secondary` |

### Radius
- `Product Style / radius/container sm` — container และ inner frame

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ accordion เมื่อต้องการซ่อน content ที่ไม่จำเป็นต้องเห็นตลอดเวลา เช่น FAQ, filter, settings
- ใช้ `showIcon` เพื่อเพิ่ม icon ที่สื่อความหมายของ section

### ไม่ควรทำ

- อย่าใช้ accordion กับ content สำคัญที่ผู้ใช้ต้องเห็นทันที
- อย่าซ้อน accordion ภายใน accordion

## Needs designer review

- ไม่มีรายการที่ต้องรอ designer ยืนยันเพิ่มเติม
