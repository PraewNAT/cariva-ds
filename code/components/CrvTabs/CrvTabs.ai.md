# CrvTabs — AI implementation rules

> Tab family from Figma Tabs section (3875:4441). Three assembled components; building-block sets are internal only.

## Components

| Export | Figma | Use |
|---|---|---|
| `CrvTabsStandard` | `crv-tabs-standard` 4838:9365 | underline indicator — default web/app tabs |
| `CrvTabsPills` | `crv-tabs-pills` 3875:4462 | segmented pill container |
| `CrvTabsFolder` | `crv-tabs-folder` 4725:21088 | outermost tab layer — **web / back office only** |

Shared API: `items: CrvTabItem[]`, controlled `value` + `onChange(value, event)`.
`CrvTabItem = { value, label?, icon?, showBadge?, tag?, disabled? }`.

## Tokens (from Figma)

### Standard
| Element | Token |
|---|---|
| Tab bg | `color/on-surface/default` |
| Hover state-layer | `color/on-surface/subtle` (#f8fafc) |
| Indicator (2px) | `color/brand/primary/on-surface/default` |
| Selected label/icon | `color/brand/primary/content/default` |
| Unselected label/icon | `color/content/secondary` |
| Badge dot | `color/border/error` |
| Padding | 12 / 16 (`spacing/md` / `lg`), gap `spacing/sm` |
| Typography | `typography/label/medium` |

### Pills
| Element | Token |
|---|---|
| Container fill | `color/on-surface/action/hover` (#f1f5f9), radius `full` |
| Container pad | default 4 (`spacing/xs`), line 8 (`spacing/sm`) |
| Selected pill fill | `color/brand/primary/on-surface/default` (blue) |
| Selected label/icon | `color/content/inverse` (white) |
| Unselected label/icon | `color/content/secondary` |
| Tab height | default 36, line 48 |
| Tab padding | default 6/12, line 12/16 |

> Note: Figma shows the **selected pill as solid blue with white label** (not white-on-gray). Follows Figma over the older rule table.

### Folder
| Element | Token |
|---|---|
| Selected fill | `color/on-surface/default` |
| Unselected fill | transparent |
| Selected label | `color/content/primary` |
| Unselected label | `color/content/secondary` |
| Icon (selected) | `color/brand/primary/content/default` |
| Top radius | `radius/16` (top corners only) |
| Shadow | shadow/2xl = `0 25px 50px -12px rgba(30,58,138,0.25)` |
| Padding | 16 / 24 (`spacing/lg` / `xl`), gap `spacing/sm`, height 56 |
| Tag | `CrvTag` (number) — selected blue, unselected `secondary` |

## Rules

- DO use assembled components in product; never the `-base` building blocks directly.
- DO place `CrvTabsFolder` as the outer layer with `CrvTabsStandard`/`CrvTabsPills` inside.
- DON'T use `CrvTabsFolder` on mobile, or nest two folder layers.
- DON'T mix standard + pills on the same screen.

## Needs review

- Folder curved connector (Figma `vector`) is approximated with rounded-top + shadow; exact bezier connector not reproduced.
