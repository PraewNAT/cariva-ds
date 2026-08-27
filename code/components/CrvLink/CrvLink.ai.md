# CrvLink — AI Usage Guide

> **Canonical rules:** `rules/components/crv-link.md`  
> Figma: `crv-link` component set, node `4165:5267`

## Purpose

`CrvLink` wraps MUI `Link` for navigation and low-emphasis actions. It is the hyperlink primitive of the Cariva Design System. It has a single style (no variant or color prop) and always renders with an underline.

## When to Use

| Use CrvLink | Use CrvButton instead |
|---|---|
| Navigation (page, section, external) | Primary form actions (submit, save) |
| Low-emphasis inline action ("ดูรายละเอียด") | Destructive actions (delete, disable) |
| "เรียนรู้เพิ่มเติม", "รีเซ็ตรหัสผ่าน" | Any action that changes data |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls height and vertical padding |
| `disabled` | `boolean` | `false` | Disables interaction via pointer-events:none + disabled color token |
| `startIconVisible` | `boolean` | `true` | Show/hide startIcon slot |
| `endIconVisible` | `boolean` | `true` | Show/hide endIcon slot |
| `startIcon` | `ReactNode` | — | Icon element rendered before the label |
| `endIcon` | `ReactNode` | — | Icon element rendered after the label |
| `children` | `ReactNode` | — | Link label text |
| `href` | `string` | — | Destination URL (from MUI Link) |

All other MUI `Link` props (`href`, `target`, `rel`, `component`, `sx`, etc.) are forwarded.

## Ground Truth — Figma Token Table

Synced with `rules/components/crv-link.md` → **Token usage → Color**.

| State | Token path | Code (`colors.*`) | Hex (light) |
|---|---|---|---|
| default | `color/content/link/default` | `content.link.default` | `#2563eb` |
| hover | `color/content/link/hover` | `content.link.hover` | `#1d4ed8` |
| pressed | `color/content/link/pressed` | `content.link.pressed` | `#1e40af` |
| disabled | `color/content/link/disabled` | `content.link.disabled` | `#475569` |

> **Disabled:** ใช้ `colors.content.link.disabled` เท่านั้น — **ห้าม** `colors.content.disabled` (generic disabled ≠ link disabled ใน Figma)

| Size | Height (impl.) | Padding V | Font |
|---|---|---|---|
| `small` | 32px | 4px | 16/24/500 (`label/large`) |
| `medium` | 40px | 8px | 16/24/500 |
| `large` | 48px | 12px | 16/24/500 |

> Rules doc lists small height 36px; implementation follows Figma measured bounding box (32px).

- Background: transparent in all states
- Underline: always present (`underline="always"`)
- Underline color: `currentColor` (follows text color per state)
- Font: IBM Plex Sans Thai, Medium (500), 16px/24px — same across all sizes

## Disabled Implementation Note

MUI `Link` has no native `disabled` prop. CrvLink implements disabled as:
- `pointer-events: none` — blocks all interaction
- `aria-disabled="true"` — accessible state
- `tabIndex={-1}` — removes from tab order
- Color overridden to `colors.content.link.disabled` (`#475569`)
- `onClick` prop is omitted when disabled

## Correct Usage

```tsx
// Navigation
<CrvLink href="/patients/123">ดูรายละเอียดผู้ป่วย</CrvLink>

// With external link
<CrvLink href="https://docs.example.com" target="_blank" rel="noopener noreferrer"
  endIcon={<OpenInNewIcon fontSize="small" />}>
  เปิดเอกสาร
</CrvLink>

// Low-emphasis action
<CrvLink href="#" onClick={handleReset}>รีเซ็ตรหัสผ่าน</CrvLink>

// Disabled
<CrvLink href="#" disabled>ดูรายละเอียด</CrvLink>

// Large with back icon
<CrvLink href="/home" size="large" startIcon={<ArrowBackIcon fontSize="small" />}>
  กลับหน้าหลัก
</CrvLink>
```

## Wrong Usage

```tsx
// ❌ Use as primary form action
<CrvLink onClick={handleSubmit}>บันทึก</CrvLink>  // use CrvButton instead

// ❌ Destructive action
<CrvLink onClick={handleDelete}>ลบบัญชี</CrvLink>  // use CrvButton color="error"

// ❌ Ambiguous label
<CrvLink href="#">คลิกที่นี่</CrvLink>  // label must describe destination

// ❌ No href or meaningful action
<CrvLink>เรียนรู้เพิ่มเติม</CrvLink>

// ❌ crv-link has no error color
<CrvLink color="error">ลบ</CrvLink>  // color prop is not supported
```

## AI Rules

- `CrvLink` has no `variant` or `color` prop — it is a single-style component
- Never add `color="error"` — direct AI/codegen to use `CrvButton variant="text" color="error"` instead
- Text must describe destination — never generate "คลิกที่นี่"
- Always provide `href` for navigation links; use `onClick` only for SPA actions
- Do not recreate a button as a link — use `CrvButton` for actions that submit, save, or mutate data
