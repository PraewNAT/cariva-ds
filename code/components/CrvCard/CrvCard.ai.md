> Source of truth: ../../../rules/components/crv-card.md
> Figma node: Card 4536:123343 (crv-card-vertical 4657:31022, crv-card-horizontal 4570:20745, crv-card-small-horizontal 4570:20655)
> Workflow: ../../../rules/figma-to-code-workflow.md

# CrvCard

Content card with media, tag, header, description, and actions. One component covers all three Figma card layouts.

## Exports

- `CrvCard`

## Figma Mapping

- `crv-card-vertical` → `orientation="vertical"` (image top, 1–2 buttons via `actions`)
- `crv-card-horizontal type=default-right` → `orientation="horizontal" imagePosition="right"`
- `crv-card-horizontal type=default-left` → `orientation="horizontal" imagePosition="left"`
- `crv-card-horizontal type=imgAbsolute` → `orientation="horizontal" imagePosition="absolute"` (image as background, full-width CTA)
- `crv-card-small-horizontal` → `orientation="small"` (thumbnail + text, no actions/top message)
- `showTag` → `showTag`; `showTopMessage` → `showTopMessage`; `showDescription` → `showDescription`; `showImg`/`ShowImg` → `showImage`; `showButton` → pass/omit `actions`
- `crv-tag-standard` → rendered via `CrvTag color="success"`; CTA → `CrvButton`

## Props

| Prop | Values | Default |
|---|---|---|
| `orientation` | `vertical`, `horizontal`, `small` | `vertical` |
| `imagePosition` | `left`, `right`, `absolute` (horizontal only) | `right` |
| `image` | ReactNode (media slot) | placeholder |
| `showImage` / `showTag` / `showTopMessage` / `showDescription` | boolean | `true` |
| `tag` / `topMessage` / `header` / `description` | ReactNode | — |
| `actions` | ReactNode (`CrvButton`) | — |

## Token usage

| Role | Token |
|---|---|
| Surface | `colors.onSurface.default` |
| Border | `colors.border.default` (`#cbd5e1`) |
| Radius | `radius['16']` (vertical/horizontal), `radius['12']` (small) |
| Padding | `spacing.lg` (16); small `12 / 16` |
| Header | heading/medium, `colors.content.primary`, semibold |
| Description / top message | body/medium · body/small, `colors.content.secondary` |
| Image placeholder | `colors.onSurface.sunken` (`#f1f5f9`) |

## AI Implementation Rules

1. Use `image` for real media (`<img>`); the placeholder is only a fallback.
2. Vertical cards take 1–2 buttons in `actions`; horizontal cards a single CTA; small cards have no actions.
3. `topMessage` is horizontal-only (ignored for `small`).
4. The tag is always `success` (green) per Figma `crv-tag-standard` — change only if design specifies.
5. Do not add shadows — Figma cards use a 1px border, no elevation.
