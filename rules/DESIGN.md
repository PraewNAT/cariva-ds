# Design System: Cariva DS

## 1. Visual Theme & Atmosphere

Cariva DS is the design system for a multi-product healthcare platform. Its visual identity is best described as a **lab coat** — white, clean, and precise, but never cold or clinical to the point of feeling distant. The interface should feel like a skilled, approachable professional: structured enough to earn trust, and warm enough that people are comfortable spending hours inside it.

The system is built on **cool gray neutrals** (Tailwind slate family) with a **blue primary** that reads as confident and trustworthy, and a **teal secondary** that brings a touch of warmth without leaning decorative. Every color decision comes from a semantic token layer — there are no raw hex values or hardcoded palette colors in components.

The **border radius** is softly rounded (8px for controls, 12px for cards, 16px for overlaid surfaces) — intentionally avoiding anything that looks too angular or too pill-like. **Elevation is background-contrast-driven**: cards and containers sit on a `#f1f5f9` shell background as white (`#ffffff`) surfaces — no shadow, no border on static surfaces. Borders are reserved for structural layout boundaries (sidebar, topbar) and form field affordance (inputs, selects). Floating surfaces (dropdowns, modals, tooltips) use shadow to communicate that they truly float above the page.

**IBM Plex Sans Thai** is the only permitted typeface. It is structured and readable — weight and size carry hierarchy, not letter-spacing tricks or decorative styling.

**Key Characteristics:**
- IBM Plex Sans Thai at Regular (400), Medium (500), Semibold (600), Bold (700) — four weights, no more
- Cool slate neutrals — background `#f1f5f9`, text `#0f172a`
- Blue primary `#2563eb` for actions and interactive focus; teal secondary `#0d9488` for secondary brand expression
- Softly rounded: 8px buttons and inputs, 12px cards and containers, 16px modals and panels
- Background-contrast elevation: cards are white (`#ffffff`) on slate/100 shell (`#f1f5f9`) — no card borders, no card shadows on static surfaces; shadow reserved for floating surfaces only
- No gradients on UI elements — flat fills only
- No decorative illustration in product UI
- No full-pill radius on primary action buttons

---

## 2. Color Palette & Roles

All colors come from **Tailwind CSS primitive families** and are referenced via semantic tokens only. Never use raw hex values or primitive tokens (`color/blue/600`) in components — always use the semantic alias.

### Brand Primary (Blue)

| Token | Light Value | Usage |
|---|---|---|
| `color/brand/primary/on-surface/default` | `#2563eb` (blue/600) | Primary filled action, CTA |
| `color/brand/primary/on-surface/hover` | `#1d4ed8` (blue/700) | Primary hover state |
| `color/brand/primary/on-surface/pressed` | `#1e40af` (blue/800) | Primary pressed state |
| `color/brand/primary/on-surface/subtle` | `#eff6ff` (blue/50) | Primary tinted surface, selected state |
| `color/brand/primary/on-surface/muted` | `#dbeafe` (blue/100) | Primary muted background |
| `color/brand/primary/content/default` | `#2563eb` (blue/600) | Primary icon/text color |
| `color/brand/primary/border/default` | `#93c5fd` (blue/300) | Primary border |

### Brand Secondary (Teal)

| Token | Light Value | Usage |
|---|---|---|
| `color/brand/secondary/on-surface/default` | `#0f766e` (teal/700) | Secondary filled action |
| `color/brand/secondary/on-surface/subtle` | `#f0fdfa` (teal/50) | Secondary tinted surface |
| `color/brand/secondary/content/default` | `#0d9488` (teal/600) | Secondary icon/text color |

### Neutrals & Backgrounds

| Token | Light Value | Usage |
|---|---|---|
| `color/bg/white` | `#ffffff` | Page and card background |
| `color/bg/subtle` | `#f1f5f9` (slate/100) | App shell, section background |
| `color/bg/solid` | `#e2e8f0` (slate/200) | Solid neutral background |
| `color/bg/inverse` | `#0f172a` (slate/900) | Inverse surface (tooltips, toasts) |
| `color/on-surface/default` | `#ffffff` | Card, input, menu surface |
| `color/on-surface/subtle` | `#f8fafc` (slate/50) | Subtle surface variant |
| `color/on-surface/elevated` | `#ffffff` | Modal, popover surface |
| `color/on-surface/sunken` | `#f1f5f9` (slate/100) | Recessed/sunken input area |

### Content (Text & Icons)

| Token | Light Value | Usage |
|---|---|---|
| `color/content/primary` | `#0f172a` (slate/900) | Main text and icons |
| `color/content/secondary` | `#334155` (slate/700) | Supporting text, helper text |
| `color/content/placeholder` | `#475569` (slate/600) | Placeholder text |
| `color/content/disabled` | `#94a3b8` (slate/400) | Disabled text and icons |
| `color/content/inverse` | `#ffffff` | Text/icon on dark or filled surfaces |
| `color/content/on-brand` | alias → inverse | Text/icon on filled brand surfaces |
| `color/content/link/default` | `#2563eb` (blue/600) | Link text |

### Borders

| Token | Light Value | Usage |
|---|---|---|
| `color/border/default` | `#cbd5e1` (slate/300) | Default border and divider |
| `color/border/strong` | `#94a3b8` (slate/400) | Hover border |
| `color/border/system` | `#2563eb` (blue/600) | Focus ring, active field |
| `color/border/error` | `#dc2626` (red/600) | Error border |
| `color/border/disabled` | `#e2e8f0` (slate/200) | Disabled border |

### Status Colors

| Status | Filled surface | Content | Usage |
|---|---|---|---|
| Success | `#047857` (emerald/700) | `#047857` | Confirmations, completion |
| Warning | `#d97706` (amber/600) | `#d97706` | Caution states — use dark text on filled warning |
| Error | `#dc2626` (red/600) | `#dc2626` | Destructive actions, form errors |
| Info | `#0284c7` (sky/600) | `#0284c7` | Informational banners |

**Warning exception**: On a filled warning background, use `color/content/primary` (dark text), not `color/content/inverse` (white) — amber is too light for white text to meet WCAG AA.

### Overlay

| Token | Light Value | Usage |
|---|---|---|
| `color/overlay/backdrop` | `rgba(0,0,0,0.40)` | Modal and drawer backdrop |
| `color/overlay/backdrop/strong` | `rgba(0,0,0,0.60)` | Strong backdrop (confirmations) |

---

## 3. Typography Rules

### Font Family

**IBM Plex Sans Thai** — the only permitted typeface. Never use Inter, Roboto, or system fonts.

Load weights before use in Figma plugin context:
```js
await figma.loadFontAsync({ family: 'IBM Plex Sans Thai', style: 'Regular' });
await figma.loadFontAsync({ family: 'IBM Plex Sans Thai', style: 'Medium' });
await figma.loadFontAsync({ family: 'IBM Plex Sans Thai', style: 'SemiBold' });
await figma.loadFontAsync({ family: 'IBM Plex Sans Thai', style: 'Bold' });
```

### Type Scale

Typography uses a structured, readable approach — weight and size create hierarchy. Letter-spacing is normal at all sizes; no negative tracking tricks.

#### Display — Hero & Landing Only

| Style | Desktop Size / LH | Mobile Size / LH | Weight | Use for |
|---|---|---|---|---|
| `typography/display/large` | 64px / 72px | 40px / 48px | Bold 700 | Hero headline |
| `typography/display/medium` | 48px / 56px | 36px / 44px | Bold 700 | Large marketing headline |
| `typography/display/small` | 40px / 48px | 32px / 40px | Semibold 600 | Section display title |

#### Heading

| Style | Desktop Size / LH | Mobile Size / LH | Weight | Use for |
|---|---|---|---|---|
| `typography/heading/large` | 24px / 32px | 24px / 32px | Semibold 600 | Section heading, modal title |
| `typography/heading/medium` | 20px / 28px | 20px / 28px | Semibold 600 | Card title, panel heading |
| `typography/heading/small` | 16px / 24px | 16px / 24px | Semibold 600 | Compact section heading |

#### Body

| Style | Desktop Size / LH | Mobile Size / LH | Weight | Use for |
|---|---|---|---|---|
| `typography/body/large` | 16px / 24px | 16px / 24px | Regular 400 | Long-form readable content |
| `typography/body/medium` | 14px / 22px | 14px / 20px | Regular 400 | Default UI text — forms, tables, descriptions |
| `typography/body/small` | 12px / 18px | 12px / 16px | Regular 400 | Compact text, helper detail |

#### Label — Controls & Actions

| Style | Desktop Size / LH | Mobile Size / LH | Weight | Use for |
|---|---|---|---|---|
| `typography/label/large` | 16px / 24px | 16px / 24px | Medium 500 | Large button, tab label, form label |
| `typography/label/medium` | 14px / 22px | 14px / 22px | Medium 500 | Default button, menu item, form label |
| `typography/label/small` | 12px / 18px | 12px / 18px | Medium 500 | Badge text, compact control |

#### Caption

| Style | Desktop Size / LH | Mobile Size / LH | Weight | Use for |
|---|---|---|---|---|
| `typography/caption/caption` | 12px / 16px | 12px / 16px | Regular 400 | Timestamp, metadata, low-emphasis note |

### Typography Principles

- **Default to `typography/body/medium`** for any UI text unless a heading, label, or caption is clearly appropriate
- **Labels for controls, body for content**: buttons, tabs, and form labels use label styles; readable text blocks use body styles
- **Display only for hero/landing**: never use display styles in dense UI, tables, modals, or forms
- **No local font-size overrides**: always pick a text style from the scale — do not override font size with `sx={{ fontSize: 20 }}`
- **Mobile mode via variable switch**: switch the Typography variable mode to "Mobile" for mobile screens — do not duplicate styles
- **No monospace/code styles**: Cariva DS does not include a code typography style

---

## 4. Component Stylings

### Buttons

**`button-standard`** — 3 size variants × 2 color × 3 visual variants

| Size | Height | Padding V/H | Label style |
|---|---|---|---|
| Small | 36px | 8px / 16px | `typography/label/medium` |
| Medium | 48px | 12px / 16px | `typography/label/medium` |
| Large | 56px | 16px / 16px | `typography/label/large` |

**Variant rules:**
- `variant=contained color=primary` — filled blue `#2563eb`, white label, radius 8px. Hover: `#1d4ed8`. Pressed: `#1e40af`. — **1 per action group max**
- `variant=contained color=error` — filled red `#dc2626`, white label. For destructive actions only (Delete, Disable, Remove)
- `variant=outlined` — transparent fill, `1px` solid blue or error border, colored label
- `variant=text` — no border or fill, colored label
- `variant=contained` (loading) — loading state hides start/end icons, shows spinner at start position

**`button-icon`** — icon-only variant with `aria-label` required on every instance

| Figma variant | Code | Notes |
|---|---|---|
| `ghost` | Raw MUI `IconButton` | Transparent — most common |
| `contained` | Styled `IconButton` with filled background | |
| `outlined` | Styled `IconButton` with border | |

### Form Inputs

Label ≠ Placeholder — this rule is absolute:

| Prop | Purpose | Example |
|---|---|---|
| `label` | Field name — always visible | "ชื่อ-นามสกุล" |
| `placeholder` | Hint or example inside field | "กรอกตามบัตรประชาชน" |
| `value` | Current entered value | "สมชาย ใจดี" |

Input states use semantic tokens:
- Default border: `color/border/default`
- Hover border: `color/border/strong`
- Focus border: `color/border/system` (blue)
- Error border: `color/border/error`
- Disabled: `color/border/disabled` + `color/content/disabled` + `color/on-surface/action/disabled` background

**Error state**: always pair `error={true}` with an `errorMessage` — color change alone is not sufficient.

### Tags & Badges

| Component | When to use | MUI mapping |
|---|---|---|
| `crv-tag-standard` | Standalone status/category label | Custom span — not MUI Badge or Chip |
| `crv-tag-color` | Decorative accent grouping | Custom span with accent tokens |
| `crv-badge` | Overlay count/dot on icon or avatar | MUI Badge — overlay only, never standalone |

Tag sizes: 20px (label/small), 24px (label/small), 32px (label/medium). Radius: full pill (`9999px`) for tags.

### Cards & Containers

- Background: `color/on-surface/default` (`#ffffff`)
- Border: none
- Shadow: none — separation comes from white card on `#f1f5f9` shell background
- Radius: 12px standard card, 16px for modals and panels

### Avatars

- `variant=circular` only
- Content: `image`, `text` (initials), or `icon`
- `badge=true` composes MUI Badge around MUI Avatar
- Sizes: xSmall 18px, small 24px, medium 32px, large 40px

### Date/Time Pickers

Panel surface: `color/on-surface/elevated`, `cornerRadius=8`, `shadow-md`

Selected day cell: `color/brand/primary/on-surface/default` fill + `color/content/on-brand` text

Action row: Cancel uses `color/content/secondary`, OK uses `color/brand/primary/content/default`

---

## 5. Layout Principles

### Spacing System (4px base grid)

| Token | Value | Common use |
|---|---|---|
| `spacing/none` | 0px | Reset |
| `spacing/2xs` | 2px | Icon internal nudge |
| `spacing/xs` | 4px | Tight internal padding |
| `spacing/sm` | 8px | Row gap, icon gap |
| `spacing/md` | 12px | Internal component padding (small) |
| `spacing/lg` | 16px | Standard padding, gap between form rows |
| `spacing/xl` | 24px | Section gap, card padding |
| `spacing/2xl` | 28px | Wider gap |
| `spacing/3xl` | 32px | Section vertical rhythm |
| `spacing/4xl` | 40px | Page-level padding |

Never use raw pixel numbers — always map to the nearest spacing token.

### Border Radius Scale

| Role | Value | Use for |
|---|---|---|
| `radius/xs` | 4px | Tags (non-pill), small chips |
| `radius/sm` | 8px | Buttons, inputs, checkboxes, toggles |
| `radius/md` | 12px | Cards, containers, panels |
| `radius/lg` | 16px | Modals, bottom sheets, large panels |
| `radius/full` | 9999px | Tag/badge pills, avatar full circle |

Avoid sharp corners (0–2px) and avoid full-pill on primary action buttons.

### Layout Patterns

Cariva supports two layout modes depending on product context:

**App Shell** (primary for product screens)
- Fixed sidebar navigation (left) + scrollable main content area
- Sidebar width: typically 240–280px
- Content area: fluid width with 24–32px horizontal padding
- App-level background: `color/bg/subtle` (`#f1f5f9`)

**Full-Width Pages** (settings, landing, onboarding)
- Centered content column with max-width (typically 768–1200px)
- Page background: `color/bg/white` or `color/bg/subtle`
- Horizontal padding scales with viewport

### Whitespace Philosophy

- **Generous section rhythm**: 32–40px between major sections
- **Contained density**: dense areas (tables, forms) use compact spacing internally but are surrounded by ample padding
- **Background contrast for cards**: card separation comes from white (`#ffffff`) surfaces sitting on the `#f1f5f9` page shell — no card borders, no card shadows

---

## 6. Depth & Elevation

Cariva uses a **background-contrast elevation model** — cards and containers sit as white (`#ffffff`) surfaces on the `#f1f5f9` shell background with no shadow and no border. Borders are reserved for structural layout boundaries (sidebar rail, topbar) and form field affordance (inputs, selects, comboboxes). Shadow is reserved exclusively for floating surfaces that need to communicate they sit above the page.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Page background `#f1f5f9`, plain text sections |
| Card | White on `#f1f5f9`, no border, no shadow | Cards, panels, stat blocks, quick-action tiles |
| Raised | `shadow-sm`, no border | Hover state on interactive cards |
| Floating | `shadow-md`, no border | Dropdowns, tooltips, date picker panels |
| Overlay | `shadow-lg` + `color/overlay/backdrop` | Modals, dialogs, drawers |

**Where borders ARE still used:**
- Sidebar right rail: `1px solid color/border/default` — layout boundary
- Topbar bottom: `1px solid color/border/default` — layout boundary
- Input / select / combobox: `1px solid color/border/default` — form field affordance
- Table row dividers: `1px solid color/border/default` at very low contrast — internal row separation only, not card outline

**Tailwind shadow reference used in Cariva:**
- `shadow-sm`: `0 1px 2px rgba(0,0,0,0.05)`
- `shadow-md`: `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)`
- `shadow-lg`: `0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -4px rgba(0,0,0,0.05)`

**What to avoid:**
- `border` on cards, stat blocks, or container panels
- `shadow-sm` or any shadow on static card surfaces
- `shadow-xl` or `shadow-2xl` on regular UI components
- Mixing visible border + shadow on the same element

---

## 7. Responsive Behavior

### Breakpoints

| Name | Min Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked layout, compact spacing |
| Tablet | 640–1024px | 2-column grids begin, sidebar may collapse |
| Desktop | 1024–1280px | Full app shell, standard layout |
| Wide | > 1280px | Centered content, generous margins |

### Typography Responsive

Typography variables switch to "Mobile" mode for screens < 640px. All font sizes and line-heights adjust automatically — do not create duplicate mobile text styles.

Key shifts:
- `display/large`: 64px → 40px
- `display/medium`: 48px → 36px
- `body/medium`: 14px / 22px → 14px / 20px (tighter line-height on small screens)

### Touch Targets

- Minimum touch target: 44×44px on mobile
- Button minimum height: 36px (small), 48px (medium), 56px (large)
- All interactive elements must meet minimum target regardless of visual size

### Collapsing Strategy

- Sidebar navigation collapses to bottom tab bar or hamburger overlay on mobile
- Multi-column card grids: 3-col → 2-col → 1-col
- Data tables: horizontal scroll on mobile, not column dropping
- Form layouts: 2-column → single column below tablet
- Modal width: fixed max-width on desktop, full-screen sheet on mobile

---

## 8. Accessibility & States

### Contrast Requirements

| Text type | Min ratio | Notes |
|---|---|---|
| Normal body text (< 18px) | 4.5:1 (WCAG AA) | `color/content/primary` on white: ~17:1 ✅ |
| Large text / UI icons (≥ 18px or 14px bold) | 3:1 | |
| `color/content/secondary` on white | 5.5:1 ✅ | |
| Blue primary `#2563eb` on white | 4.6:1 ✅ | Meets AA for large text |

### Focus System

- All interactive elements receive visible focus indicators
- Focus ring: `2px solid color/border/system` (`#2563eb`) + `2px offset`
- Never remove `outline` without providing an equivalent visible focus indicator
- Tab order must follow visual reading order

### Interactive States (all interactive components)

| State | Visual treatment |
|---|---|
| Default | Standard appearance |
| Hover | Background: `color/on-surface/action/hover` (`#f1f5f9`); border: `color/border/strong` |
| Pressed/Active | Background: `color/on-surface/action/pressed` (`#e2e8f0`) |
| Focus | Blue `2px` focus ring |
| Selected | Background: `color/on-surface/action/selected` (`#eff6ff` blue/50) |
| Disabled | Content: `color/content/disabled`; border: `color/border/disabled`; surface: `color/on-surface/action/disabled` |
| Error | Border: `color/border/error`; error message required (not color alone) |

### Key Rules

- **Never use color alone to communicate meaning** — always pair with label, icon, or message
- **Error state must include a message** — changing border color without text is insufficient
- **Disabled must look inactive but remain readable** — `color/content/disabled` maintains legibility
- If `labelVisible=false` on an input, code must provide `aria-label`, `aria-labelledby`, or equivalent accessible name

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Role | Token | Light Hex |
|---|---|---|
| Page background | `color/bg/white` | `#ffffff` |
| App shell background | `color/bg/subtle` | `#f1f5f9` |
| Card / input surface | `color/on-surface/default` | `#ffffff` |
| Elevated surface (modal) | `color/on-surface/elevated` | `#ffffff` |
| Primary text | `color/content/primary` | `#0f172a` |
| Secondary text | `color/content/secondary` | `#334155` |
| Placeholder | `color/content/placeholder` | `#475569` |
| Disabled text | `color/content/disabled` | `#94a3b8` |
| Text on filled brand | `color/content/on-brand` | `#ffffff` |
| Default border | `color/border/default` | `#cbd5e1` |
| Focus border | `color/border/system` | `#2563eb` |
| Primary action | `color/brand/primary/on-surface/default` | `#2563eb` |
| Primary hover | `color/brand/primary/on-surface/hover` | `#1d4ed8` |
| Selected surface | `color/on-surface/action/selected` | `#eff6ff` |
| Hover surface | `color/on-surface/action/hover` | `#f1f5f9` |
| Success | `color/status/success/content/default` | `#047857` |
| Warning | `color/status/warning/content/default` | `#d97706` |
| Error | `color/status/error/content/default` | `#dc2626` |
| Info | `color/status/info/content/default` | `#0284c7` |

### Example Component Prompts

**Primary Button:**
"Create a primary button: background `#2563eb`, white label, `typography/label/medium` (14px/500), 8px border-radius, 12px vertical 16px horizontal padding (medium size). Hover: `#1d4ed8`. Disabled: `#e2e8f0` background, `#94a3b8` label, no pointer events."

**Form Input:**
"Create an input field: white background (`#ffffff`), `1px solid #cbd5e1` border, 8px border-radius, `typography/body/medium` (14px/400) for value, `typography/label/medium` (14px/500) for label above the field. On focus: border becomes `2px solid #2563eb`. On error: border `#dc2626`, error message below in `#dc2626` text using `typography/body/small`."

**Card:**
"Create a card: white background (`#ffffff`), no border, no shadow, 12px border-radius, 24px internal padding. Place on `#f1f5f9` shell background — contrast provides separation. Title: `typography/heading/medium` (20px/600, `#0f172a`). Body: `typography/body/medium` (14px/400, `#334155`)."

**Status Tag:**
"Create a success tag: background `#ecfdf5` (emerald/50), text `#047857` (emerald/700), `typography/label/small` (12px/500), 8px vertical padding, 12px horizontal padding, full-pill radius (9999px). Use semantic token `color/status/success/on-surface/subtle` for background and `color/status/success/content/default` for text."

**Modal:**
"Create a modal dialog: white surface `#ffffff`, 16px border-radius, `shadow-lg` elevation, dark backdrop `rgba(0,0,0,0.40)`. Title: `typography/heading/large` (24px/600). Body: `typography/body/medium`. Footer: right-aligned — secondary action (`variant=text`) then primary action (`variant=contained color=primary`). Max-width 560px, centered."

**App Shell Layout:**
"Create an app shell: fixed left sidebar (240px wide, `color/bg/subtle` background, `1px solid color/border/default` right border). Main content area fills remaining width with `color/bg/subtle` background and 32px horizontal padding. Top nav bar: white background, 64px height, `1px solid color/border/default` bottom border."

### Iteration Guide

1. **Semantic tokens only** — never write `#2563eb` directly into a component; reference `color/brand/primary/on-surface/default`
2. **Softly rounded, never angular** — minimum 8px radius on interactive elements; 12px on containers
3. **Background contrast carries elevation** — card uses white (`#ffffff`) on slate/100 shell (`#f1f5f9`); no border, no shadow on static surfaces
4. **Shadow reserved for floating surfaces** — dropdowns, tooltips, modals, and date picker panels
5. **IBM Plex Sans Thai exclusively** — no system fonts, no Inter, no fallback fonts in final components
6. **Error always needs a message** — `error=true` without `errorMessage` is incomplete
7. **One primary button per action group** — never two `variant=contained color=primary` side by side
8. **Label ≠ placeholder** — `label` is the field name (always visible); `placeholder` is a hint inside the field
9. **Warning uses dark text** — on a filled amber warning background, use `color/content/primary` not white
