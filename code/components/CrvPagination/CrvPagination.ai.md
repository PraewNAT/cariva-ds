> Source of truth: Figma Pagination section, node 4230:424

# CrvPagination

Pagination controls for moving between pages, plus rows-per-page and jump-to-page helpers.

## Exports

- `CrvPagination`
- `CrvPaginationRowsPerPage`
- `CrvPaginationJumpToPage`

## Variants

- `size`: `large`, `medium`
- `disabled`: boolean

## Page strip

- Figma `crv-pagination-standard` (4230:1661) shows **five consecutive page numbers** in the strip.
- No ellipsis (`…`) — use prev/next to reach pages outside the visible window.

## Figma Mapping

- `crv-pagination-standard`: `CrvPagination`
- `crv-pagination-rows-per-page`: `CrvPaginationRowsPerPage`
- `crv-pagination-jump-to-page`: `CrvPaginationJumpToPage`
- `crv-pagination-page-base`: internal page button styling
- `crv-pagination-controller-base`: internal previous/next styling

## Tokens

- Page/controller size: large `40`, medium `32`
- Standard container height: large `48`, medium `40`
- Page group background: `colors.bg.subtle`
- Selected page/controller background: `colors.brand.primary.onSurface.default`
- Hover: `colors.brand.primary.onSurface.hover` or `colors.brand.primary.onSurface.subtle`
- Pressed: `colors.brand.primary.onSurface.pressed` or `colors.brand.primary.onSurface.muted`
- Disabled text/icon: `colors.content.disabled`
- Disabled controller border: `colors.border.disabled`
- Radius: `radius.full`
- Typography: `typography.label.medium`

## Usage

Use `CrvPagination` for navigation. It supports controlled `page` and uncontrolled `defaultPage`. Use the helper components when a table needs row count selection or direct page jumps.

## AI Implementation Rules

1. `CrvPaginationRowsPerPage` และ `CrvPaginationJumpToPage` must reuse `CrvDropdown`.
2. Do not build pagination dropdowns with raw MUI `TextField select`, `Select`, or `MenuItem`.
3. Dropdown options must inherit `CrvMenuItem` styling through `CrvDropdown`; this keeps option color, hover, selected, typography, paper, and backdrop behavior consistent.
4. Use `labelVisible={false}` when embedding `CrvDropdown` inside pagination helper controls, because the helper label is rendered beside the select.
5. Map pagination size to dropdown density: pagination `large` uses dropdown `medium`; pagination `medium` uses dropdown `small`.
6. If the dropdown menu color looks wrong, check that `CrvDropdown` is still being used before changing tokens or writing new menu styles.
