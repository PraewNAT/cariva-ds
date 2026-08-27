> Source of truth: ../../../rules/components/crv-switch-base.md
> This file is a mirror for AI handoff. Do not edit directly — update the source then resync.

See `rules/components/crv-switch-base.md` for the full spec.

## Quick reference

| Prop | Values | Default |
|---|---|---|
| `size` | `small`, `medium` | `medium` |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

## Sizes (Figma 3875:1752)

| Size | Track | Thumb | Thumb travel |
|---|---|---|---|
| medium | 44 × 24 | 20 | 20px |
| small | 36 × 20 | 16 | 16px |

## Colors

| State | Track | Thumb |
|---|---|---|
| unchecked | border/default | content/on-brand + shadow |
| checked | brand/primary/on-surface/default | content/on-brand + shadow |
| focus (unchecked) | brand/primary/on-surface/default | content/on-brand + shadow |
| disabled / unchecked | on-surface/action/disabled | content/on-brand + shadow |
| disabled / checked | brand/primary/on-surface/muted | content/on-brand + shadow |
