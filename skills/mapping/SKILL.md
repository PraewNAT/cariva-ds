---
name: cariva-ds-mapping
description: Map an existing Figma component to the current Cariva Core Design System. Use when the user asks to mapping, map properties, or align a component with Cariva DS.
---

# Map To Cariva Design System

Use when the user says:

```text
ช่วย mapping [component name] ให้เข้ากับ Cariva Core Design System ปัจจุบัน
```

## Required Context

- Read `plugins/cariva-design-system/CLAUDE.md`.
- Read relevant `plugins/cariva-design-system/rules/*.md`.
- Inspect the target Figma component/page before changing anything.
- If using `use_figma`, load the `figma-use` skill first and pass `skillNames: "figma-use"`.

## Mapping Scope

Map:

- Color tokens
- Typography styles
- Spacing variables
- Radius variables/styles
- Effect styles
- Component base / shared component when available
- States and variants to the existing Cariva pattern
- Property names to current Cariva/MUI mapping rules where relevant

## Rules

- Do not use tokens from an old design system.
- Do not use local styles when a shared style exists.
- Do not create new tokens or components by default.
- Do not invent unsupported MUI props.
- If a component base is missing, or a needed variant/state is incomplete, tell the user what should be created before creating it.
- Preserve visual intention unless the DS mapping requires a correction.

## Output

When reporting mapping work, include:

- What was mapped
- Which node/component was affected
- Any missing base component, variant, state, token, or style
- Any follow-up question before creating new system pieces
