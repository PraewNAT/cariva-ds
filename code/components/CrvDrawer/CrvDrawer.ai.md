> Source of truth: ../../../rules/components/crv-drawer.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-drawer.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `children` | `ReactNode` (contentSlot) | — |
| `anchor` | `left`, `right`, `top`, `bottom` | `left` |
| `variant` | `temporary`, `persistent`, `permanent` | `temporary` |
| `open` | `boolean` | — |
| `onClose` | `() => void` | — |

## Layout (Figma 4497:77989)

- Panel width: **320px** (left/right anchors)
- Surface: `color/on-surface/default`
- contentSlot padding: `spacing/xl` (24px) top & bottom
- Backdrop: `color/overlay/backdrop` via `getOverlayBackdropSx()` — Figma `crv-overlay` (4722:90374)

## Rules

- `children` maps to Figma `contentSlot` — use `CrvMenuItem` for navigation lists
- Default to `variant="temporary"` so backdrop blocks page interaction
- Anchor direction is controlled in code (`anchor` prop) — not exposed as a Figma variant
- Do not nest multiple drawers
