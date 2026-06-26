# Sidebar

> Navigation panel แนวตั้งสำหรับ primary navigation — ประกอบด้วย Logo area และ content slot ที่รับ nav groups แบ่งกลุ่มด้วย header ใช้ `crv-sidebar-menu` เป็น building block สำหรับ expandable menu items

## Figma structure

- Component type: Navigation Panel
- Component: `crv-sidebar` (COMPONENT — single variant, ไม่มี variant axis)
- Sub-component set: `crv-sidebar-menu` (COMPONENT_SET — `open=true | open=false`)
- Page: Sidebar

> `crv-sidebar` เป็น COMPONENT ไม่ใช่ COMPONENT_SET — ไม่มี `state` หรือ property axis ที่ระดับ sidebar เอง การแสดง state (hover/selected) เกิดที่ `crv-menu-item` ด้านใน

## crv-sidebar-menu Variants (4735:102038)

| Property | Values | Meaning |
|---|---|---|
| `type` | `expand`, `default` | Expandable group vs direct link |
| `active` | `true`, `false` | expand: open / collapsed — default: current route / inactive |

### type=expand

- Parent row shows chevron (`closeRighticon=true`)
- `active=true` — expanded: sub-items visible; parent icon/label stay `content/secondary` + `content/primary` (4735:102037)
- `active=false` — collapsed: parent only; same neutral colors
- Selected sub-item: bg `on-surface/action/selected`, label `brand/primary/content/default`, bar `brand/primary/on-surface/default`

### type=default

- No chevron (`closeRighticon=false`), no sub-items
- `active=true` — current page: parent icon/label brand primary (no selected background)
- `active=false` — inactive link
- Click navigates (`onClick`) — does not expand

## API

Use `active` + `defaultActive` for both types. Legacy `open` / `selected` / `defaultOpen` still work as aliases.

## Anatomy

```
crv-sidebar (COMPONENT)
├── Logo (SLOT)
│   └── Logo Material Tailwind (FRAME)
│       └── Cariva logo (INSTANCE)
└── contentSlot (SLOT)
    ├── [nav section] (FRAME)
    │   ├── [header row] (FRAME)
    │   │   └── Header text (TEXT)
    │   └── nav-group (FRAME)
    │       ├── crv-sidebar-menu (INSTANCE, open=true)
    │       │   ├── crv-menu-item (INSTANCE) ← parent item
    │       │   └── sub-items (FRAME)
    │       │       ├── sub-item bar column (FRAME, 2×120px)
    │       │       │   ├── Rectangle — selected indicator (2×40px)
    │       │       │   ├── Rectangle — inactive bar (2×40px)
    │       │       │   └── Rectangle — inactive bar (2×40px)
    │       │       └── sub-item rows (FRAME)
    │       │           ├── crv-menu-item (INSTANCE) ← sub-item
    │       │           ├── crv-menu-item (INSTANCE)
    │       │           └── crv-menu-item (INSTANCE)
    │       ├── crv-sidebar-menu (INSTANCE, open=false)
    │       └── crv-menu-item (INSTANCE) ← standalone item
    └── [nav section] (FRAME)
        └── nav-group (FRAME)
            └── crv-sidebar-menu / crv-menu-item ×n
```

## Layout behavior

### crv-sidebar container

| Property | Value | Token |
|---|---|---|
| Direction | Vertical | — |
| Padding top/bottom | 24px | `spacing/xl` |
| Padding left/right | 0 | — |
| Gap | 16px | `spacing/lg` |
| Fill | white | `color/on-surface/default` |
| Width | 240px fixed | — |

### Logo slot

| Property | Value | Token |
|---|---|---|
| Padding top/bottom | 8px | `spacing/sm` |
| Padding left/right | 16px | `spacing/lg` |
| Fill | white | `color/on-surface/default` |

### contentSlot

| Property | Value | Token |
|---|---|---|
| Direction | Vertical | — |
| Padding top/bottom | 16px | `spacing/lg` |
| Padding left/right | 8px | `spacing/sm` |
| Gap | 24px | `spacing/xl` |
| Fill | white | `color/on-surface/default` |

### Header row

| Property | Value | Token |
|---|---|---|
| Padding left/right | 16px | `spacing/lg` |

### nav-group

| Property | Value | Token |
|---|---|---|
| Direction | Vertical | — |
| Gap | 8px | `spacing/sm` |

### sub-items frame (ใน crv-sidebar-menu open=true)

| Property | Value | Token |
|---|---|---|
| Direction | Horizontal | — |
| Padding top/bottom | 8px | `spacing/sm` |
| Padding left | 24px | `spacing/xl` |
| Gap | 8px | `spacing/sm` |

## crv-menu-item properties

| Property | Values | Default |
|---|---|---|
| `variant` | `default`, `checkbox` | `default` |
| `state` | `default`, `hover` | `default` |
| `selected` | `true`, `false` | `false` |
| `disabled` | `true`, `false` | `false` |

## crv-menu-item states (ใน sidebar context)

| state × selected × disabled | Background token | Label token |
|---|---|---|
| default / selected=false / disabled=false | `color/on-surface/default` | `color/content/primary` |
| hover / selected=false / disabled=false | `color/on-surface/action/hover` | `color/content/primary` |
| default / selected=true / disabled=false | `color/on-surface/action/selected` | `color/content/primary` |
| any / selected=any / disabled=true | `color/on-surface/default` | `color/content/disabled` |

### Border radius ของ crv-menu-item ใน sidebar

| Context | Radius token | Value |
|---|---|---|
| Top-level item | `radius/12` | 12px |
| Sub-item | `radius/8` | 8px |

> ใช้ Foundation token โดยตรง (`radius/12`, `radius/8`) ไม่ใช้ `Product Style / radius/interactive` เพราะ sidebar ต้องการ radius คงที่ทุก theme

## Sub-item bar indicator

แถบแนวตั้ง 2px ทางซ้ายของ sub-items บอก visual grouping และ selected row:

| Bar | Fill token | ความหมาย |
|---|---|---|
| Selected row bar | `color/brand/primary/on-surface/default` | แถบฟ้า — row นี้ถูก selected |
| Inactive row bar | `color/border/default` | แถบเทา — row อื่นใน group เดียวกัน |

แต่ละ bar rectangle สูง 40px (= ความสูง 1 crv-menu-item), กว้าง 2px

## Token usage summary

| Element | Token |
|---|---|
| Sidebar / slot backgrounds | `color/on-surface/default` |
| Header text | `color/content/secondary` |
| Menu item default bg | `color/on-surface/default` |
| Menu item hover bg | `color/on-surface/action/hover` |
| Menu item selected bg | `color/on-surface/action/selected` |
| Menu item label (all states) | `color/content/primary` |
| Menu item icon (default/hover/selected) | `color/content/secondary` |
| Menu item label/icon disabled | `color/content/disabled` |
| Sub-item bar selected | `color/brand/primary/on-surface/default` |
| Sub-item bar inactive | `color/border/default` |
| Typography | `typography/label/medium` |

## MUI mapping

- `crv-sidebar` → custom layout wrapper (no direct MUI equivalent)
- `crv-sidebar-menu` → custom expandable group (compose MUI `Collapse` หรือ `Accordion` ถ้าต้องการ animation)
- `crv-menu-item` → MUI `ListItemButton` หรือ custom wrapper

## Do / Don't

### Do

- ใช้ `crv-sidebar-menu` `type=expand` สำหรับ menu ที่มี sub-navigation
- ใช้ `crv-sidebar-menu` `type=default` สำหรับลิงก์ตรง (ไม่มี chevron) — อย่าใช้ `crv-menu-item` standalone ใน sidebar
- ใช้ Header text เพื่อแบ่งกลุ่ม nav sections
- ผูก `selected=true` กับ `crv-menu-item` ที่ active อยู่เท่านั้น

### Don't

- อย่าเปลี่ยน width 240px โดยไม่อัปเดต layout ของ content ข้างๆ
- อย่าใส่ content ที่ scroll เยอะใน sidebar โดยไม่มี scroll container
- อย่าใช้ `radius/interactive` (Product Style) กับ menu item ใน sidebar — ใช้ `radius/12` / `radius/8` แทน

## Needs designer review

- `Cariva logo` internal fills เป็น brand gradient/solid hardcode — intentional ตาม brand identity
- ยังไม่มี collapsed/icon-only variant สำหรับ compact sidebar
- ยังไม่มี dark sidebar (inverse surface) variant
