> Source of truth: ../../../rules/components/crv-bottom-sheet.md
> Figma node: `crv-bottom-sheet-header` 4485:31705 + `crv-bottom-sheet-content` 4485:31742 (Bottom Sheet section 4497:57350)
> Workflow: ../../../rules/figma-to-code-workflow.md

# CrvBottomSheet

Mobile bottom sheet — a drawer that slides up from the bottom with rounded top corners. Wraps MUI `Drawer` (`anchor="bottom"`).

## Exports

- `CrvBottomSheet`

## Figma Mapping

- `crv-bottom-sheet-header type=Default` → `variant="default"` (title row only)
- `crv-bottom-sheet-header type=Search` → `variant="search"` (title + search field)
- `showTopColor` → `showHeaderGradient` (decorative cyan/teal glow)
- header right icon buttons → `headerActions` slot (use `CrvButtonIcon`)
- `contentSlot` → `children`
- bottom action button (`state=selected`) → `actions` slot (use `CrvButton`)
- `showKeyboard` (G-Board) → not implemented — keyboard is native/OS UI, not part of the component
- `showScrollBar` → native browser scroll on the content slot

## Props

| Prop | Values | Default |
|---|---|---|
| `variant` | `default`, `search` | `default` |
| `title` | ReactNode | — |
| `showHeaderGradient` | boolean | `true` |
| `headerActions` | ReactNode | — |
| `searchValue` / `onSearchChange` / `searchPlaceholder` | search field state | — |
| `actions` | ReactNode (footer) | — |
| `children` | ReactNode (content slot) | — |
| `open` / `onClose` | drawer state | — |

## Token usage

| Role | Token |
|---|---|
| Sheet surface | `colors.onSurface.default` |
| Top corner radius | `radius['24']` (24px) |
| Header / content padding | `spacing.xl` (24px), header bottom `spacing.lg` (16px) |
| Header gap | `spacing.md` (12px) |
| Content gap | `spacing.lg` (16px) |
| Title | heading/small, `colors.content.primary`, semibold |
| Footer divider | `colors.border.default` |
| Header glow left / right | `colors.accent.cyan.A02` / `colors.accent.teal.A02` |
| Backdrop | `color/overlay/backdrop` via `getOverlayBackdropSx()` — see `crv-overlay` (4722:90374) |

## AI Implementation Rules

1. Bottom sheet is mobile-first — anchor it to the bottom; never reuse for desktop centered dialogs (use `CrvModal`).
2. Put the primary action in `actions` (full-width `CrvButton size="large"`); keep destructive/cancel out of the footer.
3. Use `variant="search"` only when the content slot is a filterable list.
4. Header layout is 3 sibling sections (header / content slot / footer) — do not nest the footer inside the content.
5. Do not implement an on-screen keyboard — that is native OS UI in Figma (`showKeyboard`).
6. The content slot scrolls; keep header and footer fixed.
