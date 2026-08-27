# Changelog — admin-backoffice-export

## 2026-06-19 — Round 2.1.1 (apply.sh + dev approval)

### Fixed

- `apply.sh` — use `rsync -a --delete` to prevent `theme/theme/` nesting on re-apply

### Dev handback

- **Verdict:** ✅ APPROVED for integrate (admin-dashboard FE, round 2.1 review)
- `theme-bridge.example.ts` removed in round 2 (not in package)

---

## 2026-06-19 — Round 2.1 (MUI 9 Alert fix)

### Fixed

- `theme/components/alert.ts` — MUI 9 slot keys: `colorSuccess`, `colorError`, `colorWarning` (was `standardSuccess` / `standardError` / `standardWarning`)

### Brand sign-off (confirmed — does not block integrate)

Round 1 **admin-dashboard** deltas remain until Design/PO phase 2:

| Token | Round 1 (admin-dashboard) | Phase 2 (Core DS canonical) |
|-------|---------------------------|------------------------------|
| Primary | `#0075EA` | `#2563eb` |
| Font | Noto Sans Thai | IBM Plex Sans Thai |
| Button radius | 32px pill | backOffice 12px |
| Alert success / error | `#2E7D32` / `#D32F2F` | `#047857` / `#dc2626` |
| Table header | `#ECEFF1` | `#f8fafc` |
| Page bg | `#F4F6F9` | `#f1f5f9` |

Set `useProductBrand: false` in bridge to preview Core DS values.

---

## 2026-06-19 — Round 2 (component overrides)

### Added

- `theme/buildAdminComponentOverrides.ts` — full Mui* styleOverrides merge helper
- `theme/components/` — button, input, dialog, table, alert, tabs, form modules
- `theme/adminTokens.ts` — `getAdminThemeTokens()` reads admin palette schema from theme
- `theme/outlinedBorder.ts` — `getOutlinedBorderTokens()` (separate from palette)
- `buildAdminThemePatch()` — palette + components in one merge call
- Renamed `theme-bridge.example.ts` → `theme-bridge.ts`

### Fixed

- **TS error:** removed `outlinedBorder` from `buildAdminPalettePatch()` palette — use `getOutlinedBorderTokens()` as top-level const in `muiTheme.ts`

### Component overrides included

`MuiButton`, `MuiIconButton`, `MuiTextField`, `MuiOutlinedInput`, `MuiInputBase`, `MuiSelect`, `MuiFormControl`, `MuiFormHelperText`, `MuiDialog`, `MuiDialogTitle`, `MuiDialogContent`, `MuiDialogActions`, `MuiBackdrop`, `MuiAlert`, `MuiSnackbar`, `MuiTableCell`, `MuiTableSortLabel`, `MuiTablePagination`, `MuiTab`, `MuiTabs`, `MuiBreadcrumbs`, `MuiMenuItem`, `MuiCheckbox`, `MuiDivider`

### Still excluded

- Crv* React components
- Option B migration

---

## 2026-06-19 — Round 1 (bridge)

### Added

- `tokens.json`, `tokens.ts`, `BRIDGE.md`, `apply.sh`, patch guide
- `defaultProductStyle: 'backOffice'` + `adminProductBrand` overrides
