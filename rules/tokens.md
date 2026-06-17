# Cariva Token Rules

Use semantic tokens only. Do not use raw primitive palette colors in components.

Exception: the Figma page `(w) Icon - Material` is a raw Material icon import/reference source. Raw vector fills on that page are intentional and may remain unbound. When those icons are used inside Cariva components, the consuming component must override or bind icon color to semantic tokens such as `color/content/secondary`, `color/content/disabled`, `color/content/inverse`, or a relevant status token.

## Do Not Create

- primitive tokens
- component-specific tokens
- `color/danger/*`
- `color/field/*`
- `color/foreground/*`
- `color/border/invalid`
- status border tokens
- tertiary tokens

## Primitive Source — Tailwind CSS

Cariva DS uses **Tailwind CSS** as the primitive source for all token categories:

| Category | Source |
|---|---|
| Color palette | Tailwind CSS color families (not MUI Material palette) |
| Spacing scale | Tailwind CSS spacing scale (4px base grid) |
| Shadow | Tailwind CSS shadow scale (`shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`) |

MUI components are used for the **component layer only** — their default theme values (palette, spacing, shadows) are overridden to use Tailwind-based Cariva tokens.

### Color Families

`slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, pink, fuchsia, rose`

Each family has shades 50–950. No A-variants in Foundation — accent palette lives only in the Semantic layer (`color/accent/*`) as aliases to regular shades.

In Figma, primitive variables are named **`color/{family}/{shade}`** (e.g., `color/blue/600`, `color/slate/900`).

---

## Semantic Color Groups

- `color/bg/*` — page-level backgrounds
- `color/on-surface/*` — cards, panels, inputs, popovers, menus
- `color/on-surface/action/*` — neutral interactive states (hover, pressed, selected, disabled)
- `color/on-surface/invert` — inverse surface (dark on light / light on dark)
- `color/content/*` — readable text and icons
- `color/content/link/*` — link text states
- `color/border/*` — strokes, outlines, dividers
- `color/brand/primary/*` — primary brand expression (blue)
- `color/brand/secondary/*` — secondary brand expression (teal)
- `color/status/success/*`, `warning/*`, `error/*`, `info/*` — feedback and meaning
- `color/overlay/*` — modal/drawer backdrops and scrims
- `color/accent/*` — decorative non-semantic color

---

## Background Colors (`color/bg`)

| Token | Light | Usage |
|---|---|---|
| `color/bg/white` | `#ffffff` (white) | Page / card background |
| `color/bg/subtle` | `#f1f5f9` (slate/100) | App shell / subtle bg |
| `color/bg/solid` | `#e2e8f0` (slate/200) | Solid neutral background |
| `color/bg/inverse` | `#0f172a` (slate/900) | Inverse/dark bg (tooltips, toasts) |

## On-Surface Colors (`color/on-surface`)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/on-surface/default` | `#ffffff` | `#0f172a` (slate/900) | Card, input, menu surface |
| `color/on-surface/subtle` | `#f8fafc` (slate/50) | `#1e293b` (slate/800) | Subtle surface variant |
| `color/on-surface/elevated` | `#ffffff` | `#1e293b` (slate/800) | Elevated surface (modal, popover) |
| `color/on-surface/sunken` | `#f1f5f9` (slate/100) | `#0f172a` (slate/900) | Sunken/recessed surface |
| `color/on-surface/overlay` | `#ffffff` | `#0f172a` (slate/900) | Overlay surface (dropdown) |
| `color/on-surface/invert` | `#0f172a` (slate/900) | `#ffffff` | Inverted surface |
| `color/on-surface/action/hover` | `#f1f5f9` (slate/100) | `#1e293b` (slate/800) | Neutral hover surface |
| `color/on-surface/action/pressed` | `#e2e8f0` (slate/200) | `#334155` (slate/700) | Neutral pressed surface |
| `color/on-surface/action/selected` | `#eff6ff` (blue/50) | `#1e3a8a` (blue/900) | Selected/active surface |
| `color/on-surface/action/disabled` | `#f1f5f9` (slate/100) | `#1e293b` (slate/800) | Disabled surface (same as hover — convey disabled via content/disabled + border/disabled) |

## Content Colors (`color/content`)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/content/primary` | `#0f172a` (slate/900) | `#f8fafc` (slate/50) | Main text / icon |
| `color/content/secondary` | `#334155` (slate/700) | `#cbd5e1` (slate/300) | Supporting text / helper text / icon |
| `color/content/placeholder` | `#475569` (slate/600) | `#64748b` (slate/500) | Placeholder text |
| `color/content/disabled` | `#94a3b8` (slate/400) | `#475569` (slate/600) | Disabled text / icon |
| `color/content/inverse` | `#ffffff` | `#0f172a` (slate/900) | Text/icon on neutral dark/inverse backgrounds |
| `color/content/on-brand` | alias → `inverse` | alias → `inverse` | Text/icon on brand primary/secondary filled surface |
| `color/content/link/default` | `#2563eb` (blue/600) | `#60a5fa` (blue/400) | Link default |
| `color/content/link/hover` | `#1d4ed8` (blue/700) | `#93c5fd` (blue/300) | Link hover |
| `color/content/link/pressed` | `#1e40af` (blue/800) | `#bfdbfe` (blue/200) | Link pressed |
| `color/content/link/disabled` | `#475569` (slate/600) | `#94a3b8` (slate/400) | Link disabled |

## Border Colors (`color/border`)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/border/default` | `#cbd5e1` (slate/300) | `#334155` (slate/700) | Default border / divider |
| `color/border/strong` | `#94a3b8` (slate/400) | `#475569` (slate/600) | Hover border |
| `color/border/disabled` | `#e2e8f0` (slate/200) | `#334155` (slate/700) | Disabled border |
| `color/border/system` | `#2563eb` (blue/600) | `#60a5fa` (blue/400) | System active (focused field) |
| `color/border/error` | `#dc2626` (red/600) | `#f87171` (red/400) | Error border |

## Brand Colors

### Primary (Blue) — `color/brand/primary`

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/brand/primary/on-surface/default` | `#2563eb` (blue/600) | `#3b82f6` (blue/500) | Primary filled action |
| `color/brand/primary/on-surface/hover` | `#1d4ed8` (blue/700) | `#60a5fa` (blue/400) | Primary filled hover |
| `color/brand/primary/on-surface/pressed` | `#1e40af` (blue/800) | `#93c5fd` (blue/300) | Primary filled pressed |
| `color/brand/primary/on-surface/subtle` | `#eff6ff` (blue/50) | `#1e3a8a` (blue/900) | Primary subtle surface |
| `color/brand/primary/on-surface/muted` | `#dbeafe` (blue/100) | `#1e3a8a` (blue/900) | Primary muted surface |
| `color/brand/primary/content/default` | `#2563eb` (blue/600) | `#93c5fd` (blue/300) | Primary content/icon color |
| `color/brand/primary/content/strong` | `#1d4ed8` (blue/700) | `#bfdbfe` (blue/200) | Primary strong content |
| `color/brand/primary/border/default` | `#93c5fd` (blue/300) | `#1d4ed8` (blue/700) | Primary border |
| `color/brand/primary/border/strong` | `#3b82f6` (blue/500) | `#3b82f6` (blue/500) | Primary strong border |

### Secondary (Teal) — `color/brand/secondary`

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/brand/secondary/on-surface/default` | `#0f766e` (teal/700) | `#14b8a6` (teal/500) | Secondary filled action |
| `color/brand/secondary/on-surface/hover` | `#115e59` (teal/800) | `#2dd4bf` (teal/400) | Secondary filled hover |
| `color/brand/secondary/on-surface/pressed` | `#134e4a` (teal/900) | `#5eead4` (teal/300) | Secondary filled pressed |
| `color/brand/secondary/on-surface/subtle` | `#f0fdfa` (teal/50) | `#134e4a` (teal/900) | Secondary subtle surface |
| `color/brand/secondary/on-surface/muted` | `#ccfbf1` (teal/100) | `#134e4a` (teal/900) | Secondary muted surface |
| `color/brand/secondary/content/default` | `#0d9488` (teal/600) | `#5eead4` (teal/300) | Secondary content/icon color |
| `color/brand/secondary/content/strong` | `#0f766e` (teal/700) | `#99f6e4` (teal/200) | Secondary strong content |
| `color/brand/secondary/border/default` | `#5eead4` (teal/300) | `#0f766e` (teal/700) | Secondary border |
| `color/brand/secondary/border/strong` | `#14b8a6` (teal/500) | `#14b8a6` (teal/500) | Secondary strong border |

## Status Colors

### Status Border — Quick Reference

| ต้องการขอบสี | ให้ใช้ token นี้ |
|---|---|
| 🟢 สีเขียว (success) | `color/status/success/border/default` |
| 🟡 สีเหลือง (warning) | `color/status/warning/border/default` |
| 🔴 สีแดง (error) | `color/border/error` — ไม่มี status/error/border |
| 🔵 สีฟ้า (info) | `color/border/system` — ไม่มี status/info/border |

### Success — `color/status/success`

| Token | Light | Dark |
|---|---|---|
| `color/status/success/on-surface/default` | `#047857` (emerald/700) | `#10b981` (emerald/500) |
| `color/status/success/on-surface/hover` | `#065f46` (emerald/800) | `#34d399` (emerald/400) |
| `color/status/success/on-surface/pressed` | `#064e3b` (emerald/900) | `#6ee7b7` (emerald/300) |
| `color/status/success/on-surface/subtle` | `#ecfdf5` (emerald/50) | `#064e3b` (emerald/900) |
| `color/status/success/on-surface/muted` | `#d1fae5` (emerald/100) | `#064e3b` (emerald/900) |
| `color/status/success/content/default` | `#047857` (emerald/700) | `#6ee7b7` (emerald/300) |
| `color/status/success/content/strong` | `#065f46` (emerald/800) | `#a7f3d0` (emerald/200) |
| `color/status/success/border/default` | `#047857` (emerald/700) | `#34d399` (emerald/400) |

### Warning — `color/status/warning`

| Token | Light | Dark |
|---|---|---|
| `color/status/warning/on-surface/default` | `#d97706` (amber/600) | `#f59e0b` (amber/500) |
| `color/status/warning/on-surface/hover` | `#b45309` (amber/700) | `#fbbf24` (amber/400) |
| `color/status/warning/on-surface/pressed` | `#92400e` (amber/800) | `#fcd34d` (amber/300) |
| `color/status/warning/on-surface/subtle` | `#fffbeb` (amber/50) | `#78350f` (amber/900) |
| `color/status/warning/on-surface/muted` | `#fef3c7` (amber/100) | `#78350f` (amber/900) |
| `color/status/warning/content/default` | `#d97706` (amber/600) | `#fcd34d` (amber/300) |
| `color/status/warning/content/strong` | `#b45309` (amber/700) | `#fde68a` (amber/200) |
| `color/status/warning/border/default` | `#d97706` (amber/600) | `#fbbf24` (amber/400) |

### Error — `color/status/error`

| Token | Light | Dark |
|---|---|---|
| `color/status/error/on-surface/default` | `#dc2626` (red/600) | `#ef4444` (red/500) |
| `color/status/error/on-surface/hover` | `#b91c1c` (red/700) | `#f87171` (red/400) |
| `color/status/error/on-surface/pressed` | `#991b1b` (red/800) | `#fca5a5` (red/300) |
| `color/status/error/on-surface/subtle` | `#fef2f2` (red/50) | `#7f1d1d` (red/900) |
| `color/status/error/on-surface/muted` | `#fee2e2` (red/100) | `#7f1d1d` (red/900) |
| `color/status/error/content/default` | `#dc2626` (red/600) | `#fca5a5` (red/300) |
| `color/status/error/content/strong` | `#b91c1c` (red/700) | `#fecaca` (red/200) |

### Info — `color/status/info`

| Token | Light | Dark |
|---|---|---|
| `color/status/info/on-surface/default` | `#0284c7` (sky/600) | `#0ea5e9` (sky/500) |
| `color/status/info/on-surface/hover` | `#0369a1` (sky/700) | `#38bdf8` (sky/400) |
| `color/status/info/on-surface/pressed` | `#075985` (sky/800) | `#7dd3fc` (sky/300) |
| `color/status/info/on-surface/subtle` | `#f0f9ff` (sky/50) | `#0c4a6e` (sky/900) |
| `color/status/info/on-surface/muted` | `#e0f2fe` (sky/100) | `#0c4a6e` (sky/900) |
| `color/status/info/content/default` | `#0284c7` (sky/600) | `#7dd3fc` (sky/300) |
| `color/status/info/content/strong` | `#0369a1` (sky/700) | `#bae6fd` (sky/200) |

## Overlay Colors (`color/overlay`)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color/overlay/backdrop` | `#00000066` (40%) | `#00000099` (60%) | Modal/drawer backdrop |
| `color/overlay/backdrop/strong` | `#00000099` (60%) | `#000000CC` (80%) | Strong backdrop |

## Accent Colors (`color/accent`)

Use accent only for non-semantic decorative content (chart, avatar, tag colors).

- `color/accent/{family}/A01` — lightest decorative accent (aliases → `color/{family}/50`)
- `color/accent/{family}/A02` — soft decorative accent (aliases → `color/{family}/100`)
- `color/accent/{family}/A03` — default decorative accent (aliases → `color/{family}/300`)
- `color/accent/{family}/A04` — strong decorative accent (aliases → `color/{family}/500`)
- `color/accent/{family}/A05` — high-emphasis decorative accent (aliases → `color/{family}/700`)
- `color/accent/{family}/A06` — deepest decorative accent (aliases → `color/{family}/900`)

Accent families: `red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, pink`

Do not use raw Foundation A-variants directly in components — always use semantic `color/accent/*`.

---

## Spacing Tokens

Use only the current spacing variables below. Do not use old spacing values or create one-off local spacing unless explicitly approved.

### Positive Spacing

| Token | Value |
|---|---:|
| `spacing/none` | 0px |
| `spacing/2xs` | 2px |
| `spacing/xs` | 4px |
| `spacing/sm` | 8px |
| `spacing/md` | 12px |
| `spacing/lg` | 16px |
| `spacing/xl` | 24px |
| `spacing/2xl` | 28px |
| `spacing/3xl` | 32px |
| `spacing/4xl` | 40px |

### Negative Spacing

ใช้สำหรับ overlap, pull, หรือ offset layout — เช่น negative margin เพื่อดึง element เข้าหากัน

| Token | Value |
|---|---:|
| `spacing/-2xs` | -2px |
| `spacing/-xs` | -4px |
| `spacing/-sm` | -8px |
| `spacing/-md` | -12px |
| `spacing/-lg` | -16px |
| `spacing/-xl` | -24px |

---

## Common Token Mapping (quick reference)

| Usage | Token |
|---|---|
| Page / card background | `color/bg/white` |
| Subtle app shell | `color/bg/subtle` |
| Inverse/dark background | `color/bg/inverse` |
| Card / input / menu surface | `color/on-surface/default` |
| Elevated surface (modal, popover) | `color/on-surface/elevated` |
| Sunken/recessed surface | `color/on-surface/sunken` |
| Hover neutral surface | `color/on-surface/action/hover` |
| Pressed neutral surface | `color/on-surface/action/pressed` |
| Selected/active surface | `color/on-surface/action/selected` |
| Disabled surface | `color/on-surface/action/disabled` |
| Main text / icon | `color/content/primary` |
| Supporting / helper text | `color/content/secondary` |
| Placeholder | `color/content/placeholder` |
| Disabled text / icon | `color/content/disabled` |
| Text/icon on filled backgrounds | `color/content/inverse` |
| Link text | `color/content/link/default` |
| Primary filled action | `color/brand/primary/on-surface/default` |
| Primary filled hover | `color/brand/primary/on-surface/hover` |
| Primary filled pressed | `color/brand/primary/on-surface/pressed` |
| Primary content/icon | `color/brand/primary/content/default` |
| Error/destructive filled action | `color/status/error/on-surface/default` |
| Error content / icon | `color/status/error/content/default` |
| Error helper text | `color/status/error/content/default` |
| Default border / divider | `color/border/default` |
| Hover border | `color/border/strong` |
| System active (focused field) | `color/border/system` |
| Error border | `color/border/error` |
| Disabled border | `color/border/disabled` |
| Modal backdrop | `color/overlay/backdrop` |

## Surface–Content Pairing

When placing text or icons on a colored surface, choose the content token based on contrast:

| Surface token | Content token | Reason |
|---|---|---|
| `color/brand/primary/on-surface/default` (filled blue) | `color/content/on-brand` | white on dark blue — passes AA |
| `color/brand/primary/on-surface/subtle` (tinted bg) | `color/brand/primary/content/default` | blue on white-blue — passes AA |
| `color/brand/secondary/on-surface/default` (filled teal) | `color/content/on-brand` | white on dark teal — passes AA |
| `color/status/error/on-surface/default` (filled red) | `color/content/inverse` | white on dark red — passes AA |
| `color/status/error/on-surface/subtle` (tinted bg) | `color/status/error/content/default` | red on white-red — passes AA |
| `color/status/warning/on-surface/default` (filled amber) | `color/content/primary` | **dark text** on amber — amber is too light for white |
| `color/status/warning/on-surface/subtle` (tinted bg) | `color/status/warning/content/default` | amber on white-amber — passes AA |
| `color/status/success/on-surface/default` (filled emerald) | `color/content/inverse` | white on dark green — passes AA |
| `color/status/info/on-surface/default` (filled sky) | `color/content/inverse` | white on dark sky — passes AA |
| `color/bg/inverse` / tooltip / toast | `color/content/inverse` | white on near-black — passes AA |

## Selected State Note

`color/on-surface/action/selected` aliases through `color/brand/primary/on-surface/subtle` (blue/50 Light / blue/900 Dark). Do not assign brand/primary/on-surface/subtle directly to components — use `on-surface/action/selected` for selected/active states.

## Brand Rules

Primary = blue → `color/brand/primary/*`

Secondary = teal → `color/brand/secondary/*`

Text/icon on filled brand background must always use `color/content/on-brand` (alias of `color/content/inverse`).
