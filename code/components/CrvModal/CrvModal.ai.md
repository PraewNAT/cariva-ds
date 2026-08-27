> Source of truth: ../../../rules/components/crv-modal.md
> Figma node: crv-modal, 4712:1805
> Workflow: ../../../rules/figma-workflow.md

# CrvModal

Dialog for important information and user actions.

## Exports

- `CrvModal`

## Figma Mapping

- `crv-modal` → `CrvModal`

## Variants

| Prop | Values | Default |
|---|---|---|
| `type` | `default`, `alignCenter` | `default` |
| `breakpoint` | `sm`, `md+` | `sm` |
| `showContent` | boolean | `true` |
| `showDescription` | boolean | `true` |
| `showIcon` | boolean | `true` |
| `showCTA` | boolean | `true` |

## Slots

- `children` → `contentSlot`
- `actions` → `ctaSlot` (use `CrvButton` only)
- `icon` → Figma `icon` instance swap

## AI Implementation Rules

1. Put actions in `actions` / `ctaSlot` — never hardcode primary buttons inside `children`.
2. Use `type="alignCenter"` for icon-led success/error/warning dialogs.
3. Use `breakpoint="sm"` on mobile (stacked full-width CTAs) and `md+` on larger screens.
4. Only one contained primary button per modal CTA area.
5. Footer/CTA area uses `colors.onSurface.subtle` — not the same white as header/body.
6. Customize icon context via `icon` + `iconContainerSx`, not ad-hoc markup.
7. Layout: header, content, footer are **sibling** sections — footer full-bleed, **no** `borderTop` on footer.
8. CTA order: `sm` = Confirm then Close (stacked); `md+` = Close then Confirm (row, `justifyContent: flex-end`).

## Pre-ship checklist

- [ ] Figma node `4712:1805` — footer fill `onSurface/subtle`, no divider
- [ ] Stories: `type` × `breakpoint` × `showCTA` covered
- [ ] Storybook visual match vs Figma screenshot
- [ ] `rules/components/crv-modal.md` matches implementation
