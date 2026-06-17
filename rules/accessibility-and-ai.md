# Cariva Accessibility And AI Rules

## Accessibility

- Normal text: WCAG AA 4.5:1
- Large text/icon: 3:1
- Do not use color alone to communicate meaning.
- Error state must include a message, icon, or label.
- Disabled state must look inactive but remain readable.

## AI Rules

1. Use existing variants before creating new UI.
2. Use semantic tokens only.
3. Do not use raw primitive palette colors in components, except on the raw Material icon reference page. Consuming components must bind or override icon color.
4. Always use `typography/...` text styles.
5. Preserve layer names and variant properties unless a mapping/fix task requires changing them.
6. If a required token or state does not exist, ask before creating it.
7. If a Figma prop does not match MUI, read the Prop Mapping Rules before generating code. Do not guess APIs.
8. If a component is composition such as Button + Badge, use a wrapper/composed component instead of adding unsupported props to MUI Button.
9. When generating a form/page, do not use placeholder as the field label. Put the field name in `label` and use `placeholder` only as hint/example.
10. When implementing a component from Figma, follow `rules/figma-to-code-workflow.md`: inspect the live node (structure, variants, per-layer tokens) before coding; do not rely on rules alone; update docs when Figma contradicts them.
