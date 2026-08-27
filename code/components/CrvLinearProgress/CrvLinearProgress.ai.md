> Source of truth: ../../../rules/components/crv-progress.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-progress.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `variant` | `determinate`, `indeterminate`, `buffer` | `determinate` |
| `color` | `primary`, `error`, `success`, `warning` | `primary` |
| `value` | `0–100` | `60` (40 for buffer) |
| `valueBuffer` | `0–100` | `70` (buffer only) |

## Layout (Figma 4456:16573)

- Height: **4px**, track radius `radius/full`
- Width: fill container (Figma demo frame = 240px)
