> Source of truth: ../../../rules/components/crv-table.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-table.md` for the full spec.

## Exports

| Component | Maps to Figma | Notes |
|---|---|---|
| `CrvTableHead` | `crv-table-head` (4582:11202) | wraps MUI `TableCell` (`th`) |
| `CrvTableCell` | `crv-table-cell` (4582:11271) | wraps MUI `TableCell`, content via `children` slot |
| `CrvTableTextCell` | `crv-tableText-cell` (4705:20105) | main + description text block |

Helpers: `getTableContainerSx()`, `getTableRowSx()`, `TABLE_MIN_WIDTH`, `TABLE_COMPACT_SIZE`.

## CrvTableHead props

| Prop | Values | Default |
|---|---|---|
| `size` | `small` (36) / `default` (54) | `small` |
| `compact` | `boolean` — square, hides label | `false` |
| `label` | `ReactNode` | — |
| `checkbox` | `ReactNode` (use `CrvCheckboxBase`) | — |
| `leftSort` / `rightSort` | `boolean` — `arrow-downward` icon | `false` |
| `onSort` | `() => void` | — |

## CrvTableCell props

| Prop | Values | Default |
|---|---|---|
| `size` | `small` / `default` | `small` |
| `state` | `default` / `hover` / `disabled` | `default` |
| `alternate` | `boolean` — zebra striping | `false` |
| `compact` | `boolean` — square checkbox/action column | `false` |
| `children` | `ReactNode` — Figma `customContent` slot | — |

## Rules

- Compose with MUI `Table` / `TableHead` / `TableBody` / `TableRow`; Crv components are the cells.
- Match `size` between head and body cells across the whole table.
- Use `compact` for checkbox (select-all) and action columns — square width = height.
- Cell `children` accepts any content: text, `CrvTag`, `CrvCheckboxBase`, `CrvAvatar`, `CrvLinearProgress`, `CrvButtonIcon`.
- Container: `getTableContainerSx()` (radius 16, clip); rows divided via `getTableRowSx()`.
- Sticky/pinned columns are a code concern (`position: sticky`) — Figma only simulates with scroll shadow.
