# crv-breadcrumb

> แสดง navigation path ของหน้าปัจจุบัน รองรับ dropdown และ ellipsis สำหรับ path ยาว

## Figma structure

- Component type: Navigation / Breadcrumb
- Component set: `crv-breadcrumb-base` — building block แต่ละ item
- Component: `crv-breadcrumb-standard` — full breadcrumb row สำเร็จรูป
- Page: Breadcrumb

## Variants

### crv-breadcrumb-base

| Property | Values |
|---|---|
| `type` | `default`, `hover`, `dropdown`, `ellipsis`, `active` |

| Type | ความหมาย |
|---|---|
| `default` | Link item — กดได้ ไปหน้าอื่น |
| `hover` | Link item ขณะ hover |
| `dropdown` | Link item ที่มี sub-navigation — มี chevron-down |
| `ellipsis` | แทนที่ item ที่ถูกซ่อน — แสดงเป็นปุ่ม `…` |
| `active` | Current page — ไม่กดได้ เป็น item สุดท้ายเสมอ |

## Properties

### crv-breadcrumb-base

| Property | Type | Default | Notes |
|---|---|---|---|
| `text` | text | `"breadcrumb"` | ข้อความของ breadcrumb item |
| `type` | variant | `default` | ดูตาราง Variants ด้านบน |

### crv-breadcrumb-standard

| Property | Type | Default | Notes |
|---|---|---|---|
| `breadcrumb-01` | boolean | `true` | แสดง/ซ่อน item ที่ 1 |
| `breadcrumb-02` | boolean | `true` | แสดง/ซ่อน item ที่ 2 |
| `breadcrumb-03` | boolean | `true` | แสดง/ซ่อน item ที่ 3 |
| `breadcrumb-04` | boolean | `true` | แสดง/ซ่อน item ที่ 4 |
| `breadcrumb-05` | boolean | `true` | แสดง/ซ่อน item ที่ 5 |

## Anatomy

### crv-breadcrumb-base
```
crv-breadcrumb-base (COMPONENT_SET)
├── type=default
│   └── breadcrumb (TEXT)
├── type=hover
│   └── breadcrumb (TEXT)
├── type=dropdown
│   ├── breadcrumb (TEXT)
│   └── chevron-down (INSTANCE)
├── type=active
│   └── breadcrumb (TEXT)
└── type=ellipsis
    └── more-horiz icon (INSTANCE)
```

### crv-breadcrumb-standard
```
crv-breadcrumb-standard (COMPONENT)
├── crv-breadcrumb-base (type=default)  ← "Home"
├── chevron-right (INSTANCE)
├── crv-breadcrumb-base (type=ellipsis) ← hidden items
├── chevron-right (INSTANCE)
├── crv-breadcrumb-base (type=default)
├── chevron-right (INSTANCE)
├── crv-breadcrumb-base (type=default)
├── chevron-right (INSTANCE)
└── crv-breadcrumb-base (type=active)   ← current page (สุดท้ายเสมอ)
```

## Layout behavior

### crv-breadcrumb-base

| Type | Layout | Size | Gap | Padding |
|---|---|---|---|---|
| default / hover / active | HORIZONTAL | hug×22px | — | — |
| dropdown | HORIZONTAL | hug×22px | `spacing/xs` (4px) | — |
| ellipsis | HORIZONTAL | 32×32px | — | `spacing/sm` (8px) all sides |

### crv-breadcrumb-standard

| Property | Value | Token |
|---|---|---|
| Direction | Horizontal | — |
| Gap | 12px | `spacing/md` |
| Sizing | hug | — |

## Token usage

| Element | Token |
|---|---|
| Link text (default / dropdown) | `color/brand/primary/on-surface/default` |
| Hover text (default / dropdown) | `color/brand/primary/content/strong` — ใช้ CSS `:hover` ไม่ใช่ runtime prop |
| Active / current page text | `color/content/primary` |
| Dropdown chevron icon | `color/brand/primary/on-surface/default` (inherit hover → `content/strong`) |
| Ellipsis icon | `color/content/secondary` |
| Separator chevron-right | `color/content/secondary` |
| Typography (ทุก type) | `typography/label/medium` |
| Ellipsis padding | `spacing/sm` |
| Standard row gap | `spacing/md` |
| Dropdown gap (text + icon) | `spacing/xs` |
| Ellipsis radius | `radius/none` |

## MUI mapping

- `crv-breadcrumb-standard` → MUI `Breadcrumbs`
- `crv-breadcrumb-base type=default / hover` → MUI `Link` — hover ใช้ `:hover { color: brand.primary.content.strong }`
- `crv-breadcrumb-base type=active` → MUI `Typography` (non-clickable)
- `crv-breadcrumb-base type=ellipsis` → MUI `BreadcrumbCollapsed` หรือ custom `IconButton` + `Popover`
- `crv-breadcrumb-base type=dropdown` → ไม่มี MUI equivalent โดยตรง — ต้องใช้ custom `Link` + `Menu` wrapper
- Separator → MUI Breadcrumbs `separator` prop รับ `<ChevronRightIcon />`

## Do / Don't

### Do

- ใช้ breadcrumb เมื่อ hierarchy มีมากกว่า 2 ระดับขึ้นไป
- แสดง path จาก root → current page เสมอ
- ใช้ `type=active` เป็น item สุดท้ายที่ไม่มี link เสมอ
- ใช้ `type=ellipsis` เมื่อ path ยาวและต้องการซ่อน item กลาง

### Don't

- อย่าใช้ breadcrumb ในหน้าที่มีแค่ 1 ระดับ
- อย่าทำให้ current page (`type=active`) กดได้

## Needs designer review

- `crv-breadcrumb-standard` ไม่มี variant สำหรับ path ที่มีน้อยกว่า 2 item
