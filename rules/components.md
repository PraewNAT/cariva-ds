# Cariva Component Rules

**Figma → React implementation:** follow `rules/figma-workflow.md` before coding any component.

## Audit Ignore List

Components and nodes that are intentionally excluded from DS audit and mapping:

| Component | Reason |
|---|---|
| `keyboard` / `G-Board *` / `.Keys Layout *` | External keyboard UI — depends on user's device/OS. Font, spacing, radius, and color are intentionally unbound. Do not audit or fix. |
| `_Block Header` | Editorial/doc showcase frame. Uses external library (Lucide, shadcn). Not a DS component. |
| `crv-browser-scroll` | Simulates native browser/OS scrollbar UI. Colors are intentionally between DS shades to appear neutral. Platform scrollbar appearance varies (macOS/Windows/Android) — do not bind to DS tokens. If custom CSS scrollbar styling is needed in future, map thumb → `color/border/default`, track → `color/bg/subtle`. |

---


## Button Component

Component sets: `button-standard`, `button-icon`, `button-loading`

Variant pattern:

- `button-standard`: `variant=contained | outlined | text`, `color=primary | error`, `state=default | hover | pressed | disabled`, `size=small | medium | large`
- `button-icon`: `variant=contained | outlined | ghost`, `color=primary | error`, `state=default | hover | pressed | disabled`, `size=small | medium | large`, `icon` (INSTANCE_SWAP)
- `button-loading`: `variant=contained | outlined | text`, `size=small | medium | large`

Layer names:

- `button-standard`: `icon/leading`, `label`, `icon/trailing`
- `button-icon`: `icon/only`
- `button-loading`: `loading/icon`, `loading/label`

Button size scale:

| Size | Standard height | Icon size | Padding |
|---|---:|---:|---|
| small | 36 | 36 x 36 | 8px vertical, 16px horizontal |
| medium | 48 | 48 x 48 | 12px vertical, 16px horizontal |
| large | 56 | 56 x 56 | 16px vertical, 16px horizontal |

Typography:

- Small and medium text buttons use `typography/label/medium`
- Large text buttons use `typography/label/large`
- Icon buttons have no text

Button loading is a Button preset, not a separate product primitive:

- `button-loading` exists in Figma so designers can pick a loading button without manually hiding start/end icons.
- Map `button-loading` to the same Button implementation as `button-standard`.
- Use MUI Button or LoadingButton with `loading=true`.
- `button-loading` does not expose `color` in Figma because its visual is intentionally neutral/disabled; implementation may still pass through the Button `color` prop when needed.
- Always set `loadingPosition="start"` or equivalent implementation behavior.
- Do not expose `loadingPosition` in Figma unless product explicitly supports changing it.
- Do not render startIcon or endIcon while loading.
- If the codebase has a Cariva Button wrapper, implement loading there instead of creating a separate custom button primitive.

### `crv-button-icon` MUI mapping rules

`crv-button-icon` maps to MUI `IconButton`. Figma prop names are intentionally different from MUI for designer clarity — use these rules when translating spec to code.

**`variant` → visual style**

Figma uses `ghost` instead of MUI's `text` to better communicate the visual intent to designers.

| Figma `variant` | MUI code |
|---|---|
| `contained` | Custom styled `IconButton` with filled background |
| `outlined` | Custom styled `IconButton` with border |
| `ghost` | Raw MUI `IconButton` (default transparent style = `text` in MUI Button terms) |

Do not output `variant` as a prop on raw MUI `IconButton` — it does not support `variant`. Use `sx` or a Cariva wrapper instead.

**`state` → multiple concerns in code**

Figma `state` is a single variant for design convenience but maps to different things in code:

| Figma `state` | Code meaning |
|---|---|
| `default` | No additional prop needed |
| `hover` | CSS `:hover` pseudo-class — do not generate a prop |
| `pressed` | CSS `:active` pseudo-class — do not generate a prop |
| `disabled` | `disabled={true}` prop — this is a boolean prop, not a state |

Do not output `state` as a prop on MUI `IconButton`. When the design shows `state=disabled`, always render `disabled={true}`.

**`icon` → MUI `children`**

Figma uses `icon` as the prop name for instance-swap to help designers identify what to swap. In MUI, the icon is passed as `children`, not a named prop.

```jsx
// Correct
<IconButton>
  <SearchIcon />
</IconButton>

// Wrong — MUI does not support this
<IconButton icon={<SearchIcon />} />
```

**`size`**

`size=small | medium | large` maps directly to MUI `IconButton` `size` prop with no translation needed.

**`color`**

`color=primary | error` maps directly to MUI `IconButton` `color` prop. Cariva intentionally limits to these two values — do not add other MUI colors (secondary, inherit, etc.) unless explicitly specified in the design.

Filled brand button uses `color/content/inverse` for text/icon.

Destructive button uses `color=error`, not `variant=destructive`, and maps to MUI `color="error"`.

Do not ask designers to manually recolor destructive buttons. Use `color=error` variants for contained, outlined, and text buttons.

## Input Component

Component sets: `input/standard`, `input/horizontal`

Variant pattern:

- `state=default | hover | filled | focused | focused-filled | error | disabled`
- `size=small | medium`

Component properties:

- `labelVisible`
- `secondaryLabelVisible`
- `helperTextVisible`
- `placeholder`
- `value`
- `startAdornmentVisible`
- `startAdornment`

Layer names:

- `Field`
- `label`
- `label/secondary`
- `content`
- `help-text`
- `error-message`

Token mapping:

- System active border -> `color/border/system`
- Error border -> `color/border/error`
- Helper text -> `color/content/secondary`
- Error helper text -> `color/status/error/content/default`

Form field usage:

- Field names must be mapped to `label`, not `placeholder`.
- `placeholder` is only for hints or examples, such as `Enter first name` or `name@example.com`.
- `value` is only for entered or prefilled content.
- Never use placeholder as the only visible name for a field when the component supports labels.
- If `labelVisible=false`, code must still provide an accessible name through `aria-label`, `aria-labelledby`, or an external visible label.
- When generating forms, audit each field semantically: `label` answers "what is this field?", `placeholder` answers "what example or hint goes inside?", and `value` answers "what has the user entered?"

MUI mapping:

- `size=small | medium` -> MUI TextField `size`
- `state=error` -> MUI TextField `error={true}` and error helper text
- `state=disabled` -> MUI TextField `disabled={true}`
- `state=focused` and `state=focused-filled` are Figma visual states; do not generate a persistent MUI prop for focus
- `state=filled` and `state=focused-filled` represent value-present visuals; map to the presence of `value` or `defaultValue`, not to a custom MUI prop
- `helperTextVisible=true` should render `helperText`; if `state=error`, helper text should be the error message
- `labelVisible=false` may omit `label`, but code must still provide an accessible name
- Do not generate unsupported MUI props such as `state="focused-filled"` on raw MUI TextField

## Combobox Component

Component set: `combobox`

Variant pattern:

- `size=small | medium`
- `state=default | hover | focused | filled | disabled`
- `error=false | true`

Component properties:

- `label`, `labelVisible`, `placeholder`
- `helperText`, `helperTextVisible`
- `errorMessage`, `errorMessageVisible`
- `startAdornmentVisible`, `startAdornment`
- `popupIconVisible`, `popupIcon`

MUI mapping:

- Use MUI Autocomplete for combobox behavior and render the field with MUI TextField.
- `size=small | medium` -> MUI Autocomplete/TextField `size`
- `error=true` -> MUI TextField `error={true}` and error helper text
- `state=disabled` -> MUI Autocomplete/TextField `disabled={true}`
- `state=focused` is a Figma visual state; do not generate a persistent MUI prop for focus
- `state=filled` represents selected/displayed value; map to `value`, `defaultValue`, or `inputValue`
- The Figma combobox represents the closed field shell. For opened menu, option row states, loading, no-options, grouped options, multiple selection, or free-solo behavior, use/add a separate listbox/option wrapper or explicit preset.
- Do not generate unsupported MUI props such as `state="filled"` or `error="true"` strings on raw MUI Autocomplete.

## Checkbox Component

Component sets: `checkbox/standard`, `checkbox/group`, `checkbox/base`

Variant pattern:

- `checkbox/standard`: `type=default | groupItem`, `disabled=false | true`, `color=primary | error`, `labelPlacement=end | start`
- `checkbox/group`: `color=primary | error`, `disabled=false | true`
- `checkbox/base`: `checked=false | true | indeterminate`, `state=default | focusVisible | disabled`

Component properties:

- `label`: maps to FormControlLabel label text
- `labelVisible`: controls whether label text is shown
- `description`: Cariva helper/description content
- `descriptionVisible`: controls description visibility
- `errorMessage`: error helper text for group-level error
- `errorMessageVisible`: controls error helper text visibility
- `checkbox01Visible` through `checkbox06Visible`: Cariva-only visibility controls for group items

MUI mapping:

- `disabled=true` -> MUI Checkbox/FormControl disabled
- `color=primary | error` -> MUI Checkbox `color`
- `labelPlacement=end | start` -> MUI FormControlLabel `labelPlacement`
- `checked=false` -> MUI Checkbox `checked={false}`, `indeterminate={false}`
- `checked=true` -> MUI Checkbox `checked={true}`, `indeterminate={false}`
- `checked=indeterminate` maps to MUI Checkbox `indeterminate={true}`; do not output `checked="indeterminate"` in code
- `state=focusVisible` is a Figma visual state; do not generate a persistent MUI prop for focus
- `type=default | groupItem` is Cariva-only and maps to wrapper styling/layout
- `disabled=true` should use disabled visuals even when `color=error`; disabled state overrides color styling

## Radio Component

Component sets: `radio/standard`, `radio/group`, `radio/base`

Variant pattern:

- `radio/standard`: `type=default | groupItem`, `disabled=false | true`, `color=primary | error`, `labelPlacement=end | start`
- `radio/group`: `color=primary | error`, `disabled=false | true`
- `radio/base`: `checked=false | true`, `state=default | focusVisible | disabled`

Component properties:

- `label`: maps to FormControlLabel label text or FormLabel text in groups
- `labelVisible`: controls whether label text is shown
- `description`: Cariva helper/description content
- `descriptionVisible`: controls description visibility
- `errorMessage`: error helper text for group-level error
- `errorMessageVisible`: controls error helper text visibility
- `radio01Visible` through `radio06Visible`: Cariva-only visibility controls for group items

MUI mapping:

- `disabled=true` -> MUI Radio/FormControl disabled
- `color=primary | error` -> MUI Radio `color`
- `labelPlacement=end | start` -> MUI FormControlLabel `labelPlacement`
- `checked=false | true` -> MUI Radio `checked`
- `state=focusVisible` is a Figma visual state; do not generate a persistent MUI prop for focus
- `type=default | groupItem` is Cariva-only and maps to wrapper styling/layout
- `disabled=true` should use disabled visuals even when `color=error`

## Toggle Component

Component sets: `toggle`, `toggle/base`

Variant pattern:

- `toggle`: `disabled=false | true`, `color=primary | error`, `labelPlacement=end | start`
- `toggle/base`: `checked=false | true`, `state=default | focusVisible | disabled`, `size=small | medium`

Component properties:

- `label`: maps to FormControlLabel label text or wrapper label text
- `labelVisible`: controls whether label text is shown
- `description`: Cariva helper/description content
- `descriptionVisible`: controls description visibility

MUI mapping:

- Use MUI Switch when the toggle represents an on/off setting.
- Use MUI ToggleButton only when the toggle is a pressed/unpressed button control.
- `disabled=true` -> MUI Switch/ToggleButton disabled
- `color=primary | error` -> MUI color or wrapper error styling
- `labelPlacement=end | start` -> MUI FormControlLabel `labelPlacement`
- `checked=false | true` -> MUI Switch `checked`; for ToggleButton, map to `selected`
- `state=focusVisible` is a Figma visual state; do not generate a persistent MUI prop for focus
- `color=error` on standard switch styles the label only; switch base track stays primary when checked
- `disabled=true` should use disabled visuals even when `color=error`

## Tabs Component

Component sets: `tabs`, `tab/base`

Variant pattern:

- `tabs`: `variant=standard | fullWidth`, `tabVariant=default | line`
- `tab/base`: `selected=false | true`, `tabVariant=default | line`

Component properties:

- `label`: maps to MUI Tab `label`
- `tab01Visible` through `tab05Visible`: Cariva-only visibility controls for tab items

MUI mapping:

- `variant=standard | fullWidth` -> MUI Tabs `variant`
- `selected=true | false` maps through MUI Tabs `value` and each Tab `value`, not through a raw `selected` prop on Tab
- `tabVariant=default | line` is Cariva-only styling/layout and should map to wrapper styling
- Do not generate unsupported MUI props such as `tabVariant` on raw MUI Tabs or Tab

## Tag Component

Component sets: `crv-tag-standard`, `crv-tag-color`

**Naming rationale:** `crv-tag` is a standalone pill/label indicator. It is NOT the same as MUI `Badge` (which is an overlay wrapper). Do not confuse the two:

| Component | Figma name | MUI equivalent |
|---|---|---|
| Standalone pill label | `crv-tag-*` | No direct MUI equivalent — closest to shadcn `Badge` or MUI `Chip` (non-interactive) |
| Interactive pill (clickable/deletable) | `crv-chip-*` | `MuiChip` |
| Overlay count/dot on another element | `crv-badge` *(reserved)* | `MuiBadge` |

Variant pattern:

- standard: `variant=filled | outlined`, `color=default | secondary | error | success | warning`, `contentType=label | number`, `size=20 | 24 | 32`
- color: `variant=filled | outlined`, `color=orange | sky | pink | purple | green | yellow | amber`, `size=20 | 24 | 32`

Size scale:

| Size | Height | Padding T/B | Padding L/R | Typography |
|---|---:|---|---|---|
| `size=20` | 20px | `spacing/2xs` (2px) | `spacing/sm` (8px) | `typography/label/small` |
| `size=24` | 24px | `spacing/xs` (4px) | `spacing/sm` (8px) | `typography/label/small` |
| `size=32` | 32px | `spacing/sm` (8px) | `spacing/md` (12px) | `typography/label/medium` |

Component properties:

- `label`
- `badgeContent` (for contentType=number)
- `startIcon`, `endIcon`
- `startIconVisible`, `endIconVisible`

MUI mapping:

- `crv-tag` has no direct MUI mapping. Implement as a custom styled `span` or wrapper `Box` with border-radius, padding, and semantic color tokens.
- `color=error` → use `color/status/error/*` tokens
- `color=success` → use `color/status/success/*` tokens
- `color=warning` → use `color/status/warning/*` tokens
- Decorative `color` values (sky, pink, purple, orange, amber, yellow, green) → `color/accent/{family}/A*` tokens, not raw palette values.
- Do NOT pass `crv-tag` props to raw MUI `Badge` or `Chip` — they are different components.

## Avatar Component

Component set: `crv-avatar`

Variant pattern:

- `variant=circular`
- `content=image | text | icon`
- `size=large | medium | small | xSmall`
- `badge=false | true`

Component properties:

- `initials`: text shown when `content=text`

MUI mapping:

- `variant=circular` -> MUI Avatar `variant="circular"`
- `content=image` -> render image/avatar src
- `content=text` -> render initials as Avatar children
- `content=icon` -> render icon as Avatar children
- `badge=true` -> compose MUI Badge around MUI Avatar
- `size` maps to wrapper dimensions, not a raw MUI Avatar prop

## Avatar Group Component

Component set: `crv-avatar-group`

Variant pattern:

- `size=large | medium | small | xSmall`
- `max=2 | 3 | 4 | 5`

Visual behavior:

- Shows `max - 1` regular avatars (content=text, badge=false) overlapping left-to-right
- Always shows one overflow avatar at the right end displaying "+3" as a placeholder count
- Each avatar has a 2px white `OUTSIDE` stroke to separate from adjacent avatars
- Overflow avatar uses `color/on-surface/action/selected` fill and `color/content/secondary` text

Overlap per size:

| Size | Avatar size | Overlap | Step |
|---|---:|---:|---:|
| large | 40px | 12px | 28px |
| medium | 32px | 10px | 22px |
| small | 24px | 8px | 16px |
| xSmall | 18px | 6px | 12px |

MUI mapping:

- Maps to MUI `AvatarGroup`
- `max` → MUI AvatarGroup `max` prop (controls how many avatars show before overflow)
- `size` → passed to each child MUI `Avatar` as `sx` width/height — no native MUI `size` prop on AvatarGroup
- Overflow "+N" avatar is rendered automatically by MUI when `total > max`
- `spacing` — MUI supports `'medium'` (default, -8px) or `'small'` (-4px) or a number; not exposed as a Figma variant axis
- Do not generate unsupported props such as `size` directly on raw MUI `AvatarGroup`

## File Upload Component

Component sets: `crv-file-upload`, `crv-file-upload-item`

No MUI equivalent — custom Cariva component inspired by shadcn/ui dropzone pattern.

### `crv-file-upload` (Dropzone)

Variant pattern:

- `state=default | hover | dragging | error | disabled`

Visual behavior per state:

| State | Border | Background | Description |
|---|---|---|---|
| `default` | `color/border/default` dashed | `color/on-surface/default` | Idle dropzone |
| `hover` | `color/border/strong` dashed | `color/on-surface/default` | Mouse over |
| `dragging` | `color/border/system` dashed | brand tint | File dragged over zone |
| `error` | `color/border/error` dashed | error tint | Upload or validation error |
| `disabled` | `color/border/disabled` dashed | `color/on-surface/action/disabled` | Upload unavailable |

Layer names:

- `icon` — upload icon
- `title` — primary instruction text (e.g. "Drag & drop files here")
- `subtitle` — secondary instruction (e.g. "or click to browse")
- `error-message` — shown in `state=error` only

### `crv-file-upload-item` (File Row)

Variant pattern:

- `state=idle | uploading | complete | error`

Visual behavior per state:

| State | Icon/indicator | Action button |
|---|---|---|
| `idle` | `InsertDriveFile` | `Close` |
| `uploading` | Progress bar (blue) + `InsertDriveFile` | `Close` |
| `complete` | `InsertDriveFile` | `CheckCircle` |
| `error` | `InsertDriveFile` | `ErrorOutline` |

Layer names:

- `file-icon` — file type icon
- `filename` — file name text
- `progress-bar` — visible in `state=uploading` only
- `action` — right-side icon button (remove/cancel/retry)

### Code guidance

- `crv-file-upload` wraps a native `<input type="file">` with drag-and-drop event handlers
- `crv-file-upload-item` is a list row rendered per accepted file
- `state=dragging` is a runtime state managed via `onDragOver` / `onDragLeave`
- `state=error` can represent either drop validation error or upload failure
- `state=disabled` maps to `disabled={true}` on the input and removes drag handlers

---

## Date/Time Components

All Date/Time components are rebuilt from scratch (Phase 1–2) with DS tokens, IBM Plex Sans Thai font, and variable bindings. Legacy components (`broken-backup/*`, `legacy-rebuild/*`) remain on the page as reference — do not use.

Figma naming: `crv-` prefix, kebab-case. Wraps MUI Date/Time pickers.

---

### Phase 1 — Field + Calendar primitives

#### `crv-date-day-cell`

Variant pattern: `state=default | today | selected | in-range | disabled`

| State | Surface | Content |
|---|---|---|
| `default` | transparent | `color/content/primary` |
| `today` | transparent + ring `color/brand/primary/content/default` | `color/brand/primary/content/default` |
| `selected` | `color/brand/primary/on-surface/default` (filled circle) | `color/content/on-brand` |
| `in-range` | `color/on-surface/action/selected` | `color/brand/primary/content/default` |
| `disabled` | transparent | `color/content/disabled` |

Size: 40 × 40px. Typography: `typography/label/medium`. Maps to MUI `PickersDay`.

---

#### `crv-date-calendar`

Variant pattern: `view=date` (single variant for now)

Structure:
- Header row: prev-arrow | month-year label (`typography/heading/small`, `color/content/primary`) | next-arrow
- Weekday row: Su Mo Tu We Th Fr Sa — `typography/label/small`, `color/content/secondary`
- Day grid: 6 rows × 7 columns of `crv-date-day-cell` instances

Size: 284 × 320px. Spacing uses DS spacing variables. Maps to MUI `DateCalendar`.

---

#### `crv-date-field`

Variant pattern: `clearable=false | true`

- Text input field with calendar-today icon (outlined, DS icon library)
- Placeholder: `MM/DD/YYYY`
- Clearable variant adds an × icon button on the right
- Typography: `typography/body/medium` for input content
- Maps to MUI `DateField` / `DatePicker` field slot

---

#### `crv-time-field`

Variant pattern: `clearable=false | true`

- Text input field with schedule icon (outlined, DS icon library)
- Placeholder: `HH:MM AA`
- Maps to MUI `TimeField` / `TimePicker` field slot

---

#### `crv-date-time-field`

Variant pattern: `clearable=false | true`

- Combined date+time field with calendar-today icon
- Placeholder: `MM/DD/YYYY HH:MM AA`
- Maps to MUI `DateTimeField` / `DateTimePicker` field slot

---

### Phase 2 — Picker panels

#### `crv-date-picker-panel`

Variant pattern: `view=date` (one variant; month/year views pending)

Structure:
- `crv-date-calendar` instance (top)
- Horizontal divider (`color/border/default`, 1px)
- Action row: `Cancel` (`color/content/secondary`) | `OK` (`color/brand/primary/content/default`) — right-aligned, `typography/label/medium`

Size: 316 × 397px. Surface: `color/on-surface/elevated`, `cornerRadius=8`, drop shadow. Maps to MUI `DatePicker` popup panel.

---

#### `crv-time-picker-panel`

Variant pattern: `breakpoint=desktop | mobile`

Structure (desktop):
- Scroll columns: hours (01–12) | `:` separator | minutes (00–59) | AM/PM
- Selected item: `color/on-surface/action/selected` background, `color/brand/primary/content/default` text, `cornerRadius=4`
- Non-selected: `color/content/primary` text
- Horizontal divider
- Action row: Cancel | OK (same pattern as date-picker-panel)

Column width: ~52px each. Panel width: 316px. Surface: `color/on-surface/elevated`, `cornerRadius=8`, drop shadow. Maps to MUI `TimePicker` popup panel (digital clock).

---

#### `crv-date-time-picker-panel`

Structure:
- Left: `crv-date-calendar` instance (284px wide)
- Vertical divider (`color/border/default`, 1px, full height)
- Right: inline time scroll columns (hours | `:` | minutes | AM/PM) centered vertically
- Horizontal divider at bottom
- Action row: Cancel | OK — right-aligned

Total size: 600 × 380px. Surface: `color/on-surface/elevated`, `cornerRadius=8`, drop shadow. Maps to MUI `DateTimePicker` popup panel.

Token summary for all picker panels:

| Element | Token |
|---|---|
| Panel surface | `color/on-surface/elevated` |
| Dividers | `color/border/default` |
| Selected cell/item bg | `color/on-surface/action/selected` |
| Selected text/icon | `color/brand/primary/content/default` |
| Regular text | `color/content/primary` |
| Cancel label | `color/content/secondary` |
| OK label | `color/brand/primary/content/default` |
- Expose `accept`, `multiple`, `maxSize`, and `onFilesChange` as component props
