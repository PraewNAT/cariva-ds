# Cariva Typography Rules

Typography documentation describes how to use Text Styles and Typography variables in the Design System to ensure consistency across desktop and mobile modes.

## Core Rules

### Use Text Styles
Choose a Text Style from the current typography scale (e.g., `typography/body/medium`) instead of setting font size locally in components.

### Use Variables
Text Styles are bound to variables: font-family (Product Style collection), font-size, line-height, font-weight (Typography collection).

### No Code Typography Style
The system does not include separate code/monospace typography styles.

### Mobile Mode
For mobile screens, switch the Typography variable mode to "Mobile" to apply mobile-adjusted sizes and line-heights. Do not create duplicate mobile text styles.

## Token / Style Structure

Style names use slash hierarchy following the current naming pattern:
- `typography/display/large`, `typography/display/medium`, `typography/display/small`
- `typography/heading/large`, `typography/heading/medium`, `typography/heading/small`
- `typography/body/large`, `typography/body/medium`, `typography/body/small`
- `typography/label/large`, `typography/label/medium`, `typography/label/small`
- `typography/caption/caption`

### Variable Naming Pattern

For a style like `typography/body/medium`:

| Element | Variable Name |
|---|---|
| Text style | `typography/body/medium` |
| Font size variable | `typography/body/medium/font-size` |
| Line height variable | `typography/body/medium/line-height` |
| Font weight variable | `typography/body/medium/font-weight` |
| Font family variable | `font-family/sans` (Product Style collection) |
| Global weight variable | `typography/font-weight/regular` |

## Typography Scale

Complete scale with Desktop / Mobile sizes, line-heights, and weights.

### Display Scale (Hero / Landing)

| Style | Desktop | Mobile | Weight | Use for |
|---|---:|---:|---|---|
| `typography/display/large` | 64 / 72 | 40 / 48 | Bold 700 | Hero display, landing page headline, highest-impact title |
| `typography/display/medium` | 48 / 56 | 36 / 44 | Bold 700 | Large marketing headline or high-emphasis display title |
| `typography/display/small` | 40 / 48 | 32 / 40 | Semibold 600 | Medium display title for landing sections |

### Heading Scale

| Style | Desktop | Mobile | Weight | Use for |
|---|---:|---:|---|---|
| `typography/heading/large` | 24 / 32 | 24 / 32 | Semibold 600 | Section heading or modal title |
| `typography/heading/medium` | 20 / 28 | 20 / 28 | Semibold 600 | Card title, panel heading, grouped content title |
| `typography/heading/small` | 16 / 24 | 16 / 24 | Semibold 600 | Small section heading or compact component title |

### Body Scale

| Style | Desktop | Mobile | Weight | Use for |
|---|---:|---:|---|---|
| `typography/body/large` | 16 / 24 | 16 / 24 | Regular 400 | Large body copy and high-readability long text |
| `typography/body/medium` | 14 / 22 | 14 / 20 | Regular 400 | Default body text for forms, tables, descriptions, and UI copy |
| `typography/body/small` | 12 / 18 | 12 / 16 | Regular 400 | Small body text, helper detail, compact table content |

### Label Scale

| Style | Desktop | Mobile | Weight | Use for |
|---|---:|---:|---|---|
| `typography/label/large` | 16 / 24 | 16 / 24 | Medium 500 | Large button label, tab label, form label, control label |
| `typography/label/medium` | 14 / 22 | 14 / 22 | Medium 500 | Default button label, form label, menu item label |
| `typography/label/small` | 12 / 18 | 12 / 18 | Medium 500 | Small label, compact control text, badge text |

### Caption Scale

| Style | Desktop | Mobile | Weight | Use for |
|---|---:|---:|---|---|
| `typography/caption/caption` | 12 / 16 | 12 / 16 | Regular 400 | Caption, timestamp, metadata, low-emphasis helper note |

## Role Usage

### Display
Use only for landing pages, hero sections, and campaign headlines. Do not use in dense UI or small components.

### Heading
Use to establish hierarchy in pages, sections, cards, panels, modals, and other grouped content.

### Body
Use for readable content such as paragraphs, descriptions, table text, and helper content.

### Label
Use for control text such as buttons, tabs, menu items, form labels, and badge labels.

### Caption
Use for metadata, timestamps, notes, or supplementary information with lower priority.

## AI Implementation Rules

- **Choose from the current table first.** Select a `typography/...` Text Style from the table above. Do not create local text size overrides.
- **Use body/medium as default.** Use `typography/body/medium` as the default readable UI text unless the component clearly needs a label, heading, or caption style.
- **Label for controls, body for content.** Use label styles for controls and actions; use body styles for readable content.
- **Display only for landing / hero.** Use display styles only for landing pages or hero content; never inside compact cards, tables, menus, or forms.
- **Switch mode for mobile.** For mobile screens, switch the Typography variable mode to "Mobile" instead of creating duplicate mobile-only styles.
- **Avoid deprecated names.** Do not use deprecated style aliases such as `body/md` or `label/md`; use `typography/body/medium` and `typography/label/medium`.

## Deprecated Names

The following old typography names are no longer used. Use the current naming pattern above:

- ❌ `typography/display/xl`, `typography/display/lg`, `typography/display/md`, `typography/display/sm`
- ❌ `typography/heading/xl`, `typography/heading/lg`, `typography/heading/md`, `typography/heading/sm`
- ❌ `typography/body/lg`, `typography/body/md`, `typography/body/sm`
- ❌ `typography/label/lg`, `typography/label/md`, `typography/label/sm`
- ❌ `typography/caption/md`

✅ Use the full naming: `typography/display/large`, `typography/body/medium`, etc.
