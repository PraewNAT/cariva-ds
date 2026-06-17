> Source of truth: Figma Tag section, node 3918:825

# CrvTag

Standalone pill label for status, category, or content attributes. It is not an overlay badge and not an action chip.

## Exports

- `CrvTag`
- `CrvTagColor`

## Figma Mapping

- `crv-tag-standard`: `CrvTag`
- `crv-tag-color`: `CrvTagColor`

## CrvTag Variants

- `variant`: `filled`, `outlined`
- `color`: `default`, `secondary`, `error`, `success`, `warning`
- `content`: `label`, `number`
- `size`: `small`, `medium`, `large`
- `startIconVisible`: boolean (default `false`)
- `endIconVisible`: boolean

## CrvTagColor Variants

- `color`: `primary`, `sky`, `cyan`, `pink`, `purple`, `emerald`, `amber`, `orange`

## Tokens

- Radius: `productStyle[defaultProductStyle].interactive`
- Typography: `typography/label/small` for small/medium, `typography/label/medium` for large
- Standard filled status colors use semantic tokens only:
  - primary/default: `colors.brand.primary.onSurface.default`
  - secondary: `colors.onSurface.sunken`
  - error/success/warning: `colors.status.*.onSurface.default`
- Standard outlined is supported only for `color=default`.
- `CrvTagColor` uses accent tokens only for non-semantic grouping/category colors.

## AI Implementation Rules

1. Do not implement `CrvTag` with MUI `Chip` or `Badge`.
2. Use `CrvBadge` only when the indicator overlays another element.
3. Use `CrvChipAction` only when the chip is interactive or removable.
4. Use `CrvTag` for semantic status tags such as error, success, warning, default, or secondary.
5. Use `CrvTagColor` for decorative category/group labels only; do not use it for error/success/warning status.
6. Do not invent new tag colors. If a color is missing, ask before adding a token or variant.
