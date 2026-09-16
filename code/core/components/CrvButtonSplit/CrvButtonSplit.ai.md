> Source of truth: ../../../rules/components/crv-button-split.md
> Figma node: crv-button-split, 5981:34184

# CrvButtonSplit

A main action plus a trigger for its alternatives.

## Exports

- `CrvButtonSplit`

## Variants

| Prop | Values | Default |
|---|---|---|
| `color` | `primary`, `error` | `primary` |
| `size` | `small`, `medium`, `large` | `medium` |
| `disabled` | boolean | `false` |
| `triggerLabel` | string — required, the trigger is icon-only | — |

## Tokens

- Surface: `color/brand/primary/on-surface/*` or `color/status/error/on-surface/*`
- Divider: `color/{brand/primary|status/error}/border/strong`, disabled `color/border/disabled`
- Label/icon `color/content/on-brand` · radius `radius/full`

## AI Implementation Rules

1. Both halves must belong to the same task — the trigger holds variations of the main action.
2. `onClick` runs the main action; `onTriggerClick` opens the menu.
3. `triggerLabel` is required — the trigger half has no visible text.
4. Do not use it as a two-action button for unrelated actions.
