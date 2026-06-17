# crv-tabs

> Tab components สำหรับ navigation ระหว่าง views — มี 3 assembled components ให้เลือกตาม visual style และ hierarchy ของ layout

## ภาพรวม — เลือกใช้อะไร

| Component | เมื่อไหร่ใช้ | Platform |
|---|---|---|
| `crv-tabs-standard` | Tab หลักทั่วไป — underline indicator | Web, App |
| `crv-tabs-pills` | Tab แบบ pill/button container | Web, App |
| `crv-tabs-folder` | Tab ชั้นนอกสุดเสมอ เมื่อ layout มีหลาย tab layer | Web / Back Office เท่านั้น |

> `crv-tabs-standard` กับ `crv-tabs-pills` เลือกตาม visual design — ไม่มีกฎตายตัว

---

## crv-tabs-standard

Tab แบบ underline indicator รองรับ primary/secondary style, icon/label/icon+label

### Figma structure

- Component type: assembled COMPONENT (single variant)
- Component set: `crv-tabs-standard`
- Node ID: `4838:9365`
- Size: 176 × 48px (base)
- Slot prop: `tabs` (SLOT) — รับ `crv-tabs-standard-base` instance

### Building block — `crv-tabs-standard-base`

Component set ที่ใช้สร้าง `crv-tabs-standard`

| Property | Type | Values |
|---|---|---|
| `selected` | VARIANT | `true`, `false` |
| `state` | VARIANT | `default`, `hover` |
| `Icon` | INSTANCE_SWAP | icon instance |
| `Label text` | TEXT | — |
| `Show badge` | BOOLEAN | true / false |

### Token usage

| Element | Token |
|---|---|
| Selected label (primary) | `color/brand/primary/content/default` |
| Selected label (secondary) | `color/content/primary` |
| Unselected label | `color/content/secondary` |
| Selected icon | `color/brand/primary/content/default` |
| Unselected icon | `color/content/secondary` |
| Indicator underline | `color/brand/primary/on-surface/default` |
| Typography | `typography/label/medium` |
| Tab background | `color/on-surface/default` |

---

## crv-tabs-pills

Tab แบบ pill/button ใน container — มี background รวมทุก tab ไว้ใน strip

### Figma structure

- Component type: COMPONENT_SET
- Component set: `crv-tabs-pills`
- Node ID: `3875:4462`

### Variants

| Property | Values |
|---|---|
| `variant` | `standard`, `fullWidth` |
| `tabVariant` | `default`, `line` |

### Component properties

| Property | Type | Default |
|---|---|---|
| `tab01Visible`–`tab05Visible` | BOOLEAN | true |

### Building block — `crv-tabs-base`

Component set ที่ใช้สร้าง `crv-tabs-pills`

| Property | Type | Values |
|---|---|---|
| `selected` | VARIANT | `true`, `false` |
| `tabVariant` | VARIANT | `default`, `line` |
| `state` | VARIANT | `Default`, `hover` |
| `label` | TEXT | — |
| `iconVisible` | BOOLEAN | — |
| `icon` | INSTANCE_SWAP | — |
| `labelVisible` | BOOLEAN | — |

### Token usage

| Element | Token |
|---|---|
| Container fill | `color/on-surface/action/hover` (#f1f5f9) |
| Container radius | `radius/full` |
| Container padding | default `spacing/xs` (4px), line `spacing/sm` (8px) |
| Selected tab fill | `color/brand/primary/on-surface/default` (blue) |
| Selected tab radius | `radius/full` |
| Unselected tab fill | transparent |
| Selected label/icon | `color/content/inverse` (white) |
| Unselected label | `color/content/secondary` |
| Unselected icon | `color/content/secondary` |
| Tab height | `default` 36px, `line` 48px |
| Tab padding | `default` 6/12, `line` 12/16 |
| Typography | `typography/label/medium` |

> Figma source of truth: selected pill = solid blue fill + white label (ตาม `crv-tabs-base` 3875:4448 / assembled 3875:4462)

---

## crv-tabs-folder

Tab แบบ folder — ใช้เป็น **tab ชั้นนอกสุดเสมอ** เมื่อ layout มีหลาย tab layer  
**ใช้ได้เฉพาะ Web / Web App Back Office** — ไม่ใช้กับ mobile application

### Figma structure

- Component type: assembled COMPONENT (single variant)
- Component set: `crv-tabs-folder`
- Node ID: `4725:21088`
- Size: 483 × 56px
- Slot prop: `Tabs` (SLOT) — รับ `crv-tabs-folder-base` instances

### Building block — `crv-tabs-folder-base`

Component set ที่ใช้สร้าง `crv-tabs-folder`

| Property | Type | Values |
|---|---|---|
| `selected` | VARIANT | `yes`, `no` |
| `state` | VARIANT | `default`, `hover` |
| `icon` | INSTANCE_SWAP | — |
| `showTag` | BOOLEAN | — |

> `showTag=true` แสดง `crv-tag-standard` (badge จำนวน) ใน tab item

### Anatomy

- `Button` (FRAME): tab surface — radius/16 top, radius/none bottom
- `vector` (FRAME): curved connector ด้านล่างเชื่อมกับ content panel

### Token usage

| Element | Token |
|---|---|
| Selected fill | `color/on-surface/default` |
| Unselected fill | transparent |
| Selected label | `color/brand/primary/content/default` |
| Unselected label | `color/content/secondary` |
| Unselected icon | `color/content/secondary` |
| Corner radius (top) | `radius/16` (topLeft + topRight) |
| Corner radius (bottom) | `radius/none` |
| Shadow | `shadow/2xl` |
| Padding L/R | `spacing/xl` (24px) |
| Padding T/B | `spacing/lg` (16px) |
| Gap | `spacing/sm` (8px) |
| Typography | `typography/label/medium` |

---

## Tab layer hierarchy

เมื่อ screen มีหลาย tab layer ให้เรียงลำดับดังนี้:

```
ชั้นนอก  →  crv-tabs-folder          (web back office เท่านั้น)
ชั้นใน   →  crv-tabs-standard หรือ crv-tabs-pills
```

ห้ามใช้ `crv-tabs-folder` ซ้ำ 2 ชั้น — ต้องสลับกับ standard หรือ pills เสมอ

---

## Building Blocks (internal reference)

ไม่ใช้โดยตรงใน product — ใช้ assembled component แทน

| Building Block | ใช้ใน |
|---|---|
| `crv-tabs-standard-base` | assembled `crv-tabs-standard` |
| `crv-tabs-base` | assembled `crv-tabs-pills` |
| `crv-tabs-folder-base` | assembled `crv-tabs-folder` |

---

## Do / Don't

### Do

- เลือก `crv-tabs-standard` หรือ `crv-tabs-pills` ตาม visual design — ไม่มีกฎตายตัว
- ใช้ `crv-tabs-folder` เป็น tab ชั้นนอกสุดเสมอ เมื่อ layout มีหลาย tab layer
- ถ้า screen มี tab ซ้อนกัน ให้ใช้ `crv-tabs-folder` ชั้นนอก + `crv-tabs-standard` หรือ `crv-tabs-pills` ชั้นใน
- ใช้ `crv-tabs-standard` แบบ `icon + label` เมื่อพื้นที่พอ — ใช้ `icon-only` เฉพาะเมื่อ space จำกัดมาก
- ใช้ assembled component (`crv-tabs-standard`, `crv-tabs-pills`, `crv-tabs-folder`) ใน product เสมอ

### Don't

- อย่าใช้ `crv-tabs-folder` กับ mobile application — ใช้ `crv-tabs-standard` หรือ `crv-tabs-pills` แทน
- อย่าซ้อน `crv-tabs-folder` 2 ชั้นในหน้าเดียวกัน
- อย่าผสม `crv-tabs-standard` กับ `crv-tabs-pills` ในหน้าเดียวกัน
- อย่าหยิบ Building Blocks (`crv-tabs-standard-base`, `crv-tabs-base`, `crv-tabs-folder-base`) ไปวางใน product โดยตรง — assembled component จัดการ spacing, indicator, และ state ให้แล้ว

## Needs designer review

- `crv-tabs-standard` ไม่มี `configuration` variant axis ใน Figma — configuration (label-only / label-and-icon / icon-only) ถูก control ผ่าน `Icon` instance swap + `Label text` text prop บน building block แทน
- `crv-tabs-pills` ขนาด tab item (height, padding) ยังไม่ได้ bind spacing variable ครบ — ตรวจสอบอีกครั้ง
