# Cariva Core Rules

## Naming Convention

Figma component names use kebab-case. Code components use PascalCase.

```text
cv-button-icon        -> CvButtonIcon
cv-input-horizontal   -> CvInputHorizontal
cv-ai-bubble-user     -> CvAiBubbleUser
```

## MUI Wrapper Rules

Components that wrap MUI:

```text
cv-button-*    -> wrap MuiButton
cv-input-*     -> wrap MuiTextField
cv-select-*    -> wrap MuiSelect
cv-combobox-*  -> wrap MuiAutocomplete + MuiTextField
cv-checkbox-*  -> wrap MuiCheckbox
cv-toggle-*    -> wrap MuiSwitch or MuiToggleButton, depending on product behavior
cv-tabs-*      -> wrap MuiTabs + MuiTab
cv-badge-*     -> wrap MuiBadge for count/overlay badges; standalone pill badges may use a Cariva wrapper or MuiChip-like styling
cv-chip-*      -> wrap MuiChip
```

Components that do not wrap MUI:

```text
cv-ai-bubble-*      -> custom
cv-ai-streaming-*   -> custom
cv-ai-suggest-*     -> custom
```

## Prop Mapping Rules

Figma props are an AI-readable contract. They do not need to be identical to MUI props, but every prop must have a clear implementation rule.

If a Figma prop maps to an existing MUI prop, use MUI directly:

- Figma `variant=contained | outlined | text` -> MUI Button `variant`
- Figma `color=primary | error` -> MUI Button `color`
- Figma `size=small | medium | large` -> MUI Button `size`
- Figma `startIcon`, `endIcon`, `children`, `loading`, `loadingIndicator` -> matching MUI Button APIs when available

If a Figma prop is Cariva-only but maps to an MUI concept, keep the Figma prop and translate it in code. Prefer MUI prop names when the meaning is the same.

If a Figma component requires behavior that MUI Button does not provide by itself, create a wrapper/composed component instead of forcing the prop onto MUI Button:

- `cv-button-with-badge` -> compose MUI Badge around MUI Button
- Button props pass through to Button
- Badge props apply to Badge

Do not generate unsupported MUI props. For example, do not output `<Button intent="destructive" />` when the Figma component exposes `color=error`; output `<Button color="error" />`.

## Documentation Sync Rule

Every time a Cariva DS rule, token, component guidance, or usage doc changes:

- Update plugin `.md` and the matching Figma doc.
- Do not update only one side unless the user explicitly says it is draft or local-only.
- After editing, check that Figma docs and plugin docs use the same token names, prop names, behavior, and AI rules.
