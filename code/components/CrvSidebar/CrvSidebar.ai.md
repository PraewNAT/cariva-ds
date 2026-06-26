# CrvSidebar — AI implementation rules

> Vertical primary-navigation panel. Figma `crv-sidebar` (4724:103532) inside Sidebar section (4724:99204), with `crv-sidebar-menu` (4735:102038) expandable groups.

## Components

- `CrvSidebar` — 240px container with `logo` slot + content slot (`children`).
- `CrvSidebarSection` — optional grouping with a `header` label.
- `CrvSidebarMenu` — Figma `crv-sidebar-menu` (4735:102038) with two `type` variants:
  - **`type="expand"`** — chevron + collapsible sub-items; parent row stays `content/secondary` icon + `content/primary` label when open; selected sub-item uses `action/selected` bg + `brand/primary/content` label.
  - **`type="default"`** — direct link; `active=true` tints parent icon + label brand primary.

## Layout (from Figma)

| Element | Value | Token |
|---|---|---|
| Sidebar width | 240px | — |
| Sidebar padding top/bottom | 24px | `spacing/xl` |
| Sidebar gap | 16px | `spacing/lg` |
| Sidebar / slot bg | white | `color/on-surface/default` |
| Logo padding | 8px / 16px | `spacing/sm` / `spacing/lg` |
| contentSlot padding | 16px / 8px | `spacing/lg` / `spacing/sm` |
| contentSlot gap | 24px | `spacing/xl` |
| Header padding L/R | 16px | `spacing/lg` |
| nav-group gap | 8px | `spacing/sm` |
| sub-items pad | top/btm 8px, left 24px | `spacing/sm` / `spacing/xl` |
| Top-level item radius | 12px | `radius/12` |
| Sub-item radius | 8px | `radius/8` |

## Bar indicator

2px-wide column left of sub-items; one 40px segment per sub-item.
- Selected row → `color/brand/primary/on-surface/default`.
- Inactive row → `color/border/default`.

## Rules

- DO use `type="expand"` for items with sub-navigation; `type="default"` + `onClick` for direct links.
- DO NOT use standalone `CrvMenuItem` for sidebar top-level nav — use `CrvSidebarMenu type="default"`.
- DO hide sub-item icons unless explicitly passed — Figma sets `closeLefticon=false` on sub-rows (label only + bar).
- DO render `CrvMenuItem` as `component="div"` inside the sidebar to avoid invalid `<li>` nesting.
- DO keep menu-item radius as Foundation tokens (`radius/12`, `radius/8`), not Product `radius/interactive`.
- DON'T change the 240px width without adjusting adjacent layout.
- Selected state lives on `CrvMenuItem`, not the sidebar.
