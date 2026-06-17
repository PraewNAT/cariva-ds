# crv-menu-item

> รายการใน dropdown / autocomplete list — building block ของ `crv-dropdown` และ `crv-autocomplete`

## โครงสร้าง Figma

- Component set: `crv-menu-item`
- Node: `4454:12758`
- Naming: `variant={default|checkbox}, state={default|hover}, selected={true|false}, disabled={true|false}`

## Variants

| Property | Values |
|---|---|
| `variant` | `default`, `checkbox` |
| `state` | `default`, `hover` |
| `selected` | `true`, `false` |
| `disabled` | `true`, `false` |

## Properties

| Property | Type | Notes |
|---|---|---|
| `closeLefticon` | boolean | แสดง/ซ่อน left icon |
| `closeRighticon` | boolean | แสดง/ซ่อน right icon |
| `leftIcon` | instance swap | icon ด้านซ้าย |
| `rightIcon` | instance swap | icon ด้านขวา (chevron) |

## Layout

- Direction: horizontal
- Item height: 40px
- Padding: 8/16 (`spacing/sm` / `spacing/lg`)
- Gap: 12px (`spacing/md`)
- Label: 14/22, weight 500

## Token usage

| State | Background |
|---|---|
| default | `color/on-surface/default` |
| hover | `color/on-surface/action/hover` |
| selected | `color/on-surface/action/selected` |
| disabled label | `color/content/disabled` |

Label: `color/content/primary`  
Icons: `color/content/secondary`

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้เป็น option ใน `CrvDropdown` และ `CrvAutocomplete`
- ใช้ `variant=checkbox` สำหรับ multi-select list
- ซ่อน icons เมื่อไม่จำเป็น (`leftIconVisible={false}` ใน dropdown ธรรมดา)

### ไม่ควรทำ

- ไม่ใช้เป็น navigation item โดยตรง — ใช้ `crv-nav-item` (ถ้ามี)
- ไม่ hardcode สี/ขนาด — ใช้ semantic tokens
