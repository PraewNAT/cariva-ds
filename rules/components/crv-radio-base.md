# crv-radio-base

> Radio control ขนาด 16×16 — วงกลมพร้อม dot เมื่อเลือก

## โครงสร้าง Figma

- Component type: Radio
- Component set: `crv-radio-base`
- Node: `3848:6592`
- Naming pattern: `checked={true|false}, state={default|focusVisible|disabled}`

## Variants

| Property | Values |
|---|---|
| `checked` | `true`, `false` |
| `state` | `default`, `focusVisible`, `disabled` |

## States (Figma ground truth)

| Variant | Fill | Ring | Dot |
|---|---|---|---|
| `checked=false, state=default` | `on-surface/default` | 1px `border/default` | — |
| `checked=true, state=default` | `on-surface/default` | 1px `brand/primary/on-surface/default` | 10×10 `brand/primary/on-surface/default` |
| `checked=false, state=focusVisible` | `on-surface/default` | 1px `border/system` | — |
| `checked=true, state=focusVisible` | `on-surface/default` | 2px `border/system` | 10×10 `brand/primary/on-surface/default` |
| `checked=false, state=disabled` | `on-surface/action/disabled` | 1px `border/disabled` | — |
| `checked=true, state=disabled` | `on-surface/action/disabled` | 1px `border/disabled` | 10×10 `content/disabled` |

> หมายเหตุ: checked state ใช้ **พื้นหลังขาว + ring + dot** — ไม่ใช่วงกลมทึบสี primary

## MUI Mapping

| Figma | MUI |
|---|---|
| Radio control | `<Radio />` wrapped by `CrvRadioBase` |
| `state=focusVisible` | CSS `:focus-visible` |
| `state=disabled` | `<Radio disabled />` |

## Token usage

| Element | Token |
|---|---|
| Size | 16×16 |
| Dot size | 10×10 |
| Radius | `radius/full` |
| Unchecked ring | `color/border/default` |
| Checked ring | `color/brand/primary/on-surface/default` |
| Checked dot | `color/brand/primary/on-surface/default` |
| Focus ring (unchecked) | 1px `color/border/system` |
| Focus ring (checked) | 2px `color/border/system` |
| Disabled fill | `color/on-surface/action/disabled` |
| Disabled ring | `color/border/disabled` |
| Disabled dot | `color/content/disabled` |

## ควรทำ / ไม่ควรทำ

### ควรทำ

- ใช้ผ่าน `CrvRadio` หรือ `CrvRadioGroup` เป็นหลัก
- เก็บพื้นหลัง checked เป็น `on-surface/default` ตาม Figma

### ไม่ควรทำ

- ไม่ควรใช้ radio สำหรับ multi-select — ใช้ Checkbox
- ไม่ควรใช้ radio สำหรับ on/off — ใช้ Switch
- ไม่ควรเปลี่ยนสี control ด้วย `color=error` — prop นี้ใช้ที่ standard สำหรับ label เท่านั้น
