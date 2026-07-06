---
name: audit
description: ตรวจ token binding และ naming convention ของ Figma component หรือ screen — ใช้เมื่อพูดว่า audit, เช็ค component, เช็ค screen
---

# Audit Cariva Design System Integration

Use when the user says:

```text
ช่วย audit [component/page name] นี้ให้หน่อย
```

Audit only design-system integration. Do not fix anything unless the user asks later.

## Required Context

- Read `plugins/cariva-design-system/CLAUDE.md`.
- Read relevant `plugins/cariva-design-system/rules/*.md`.
- Use Figma inspection tools for the target node/page.
- If using `use_figma`, load the `figma-use` skill first and pass `skillNames: "figma-use"`.

## Audit Scope

Check only:

- **Naming convention** — ชื่อ component ตรง format `crv[Component]/[variantName]` (camelCase) ไหม
  - ถ้าพบชื่อผิด → บอกว่าควรแก้เป็นอะไร แล้วถามยืนยันก่อนแก้
- Uses component base / shared component correctly
- Colors are bound to current semantic color tokens
- Typography uses text styles / typography variables
- Spacing uses current spacing variables
- Radius/effect uses shared styles or variables
- Unexpected local overrides
- Deprecated or old tokens
- Raw primitive color used directly in components

## Do Not Check

- Visual taste unless it affects DS integration
- Product copy quality
- Layout redesign ideas
- Implementation code unless the user explicitly includes code

## Report Format

Report before fixing:

1. Problems found
2. Related node/component
3. Token/style/component that should be used instead
4. Questions for unclear points

If no issues are found, say the audit passed and mention any residual uncertainty.

## Rules

- Do not change Figma or local files during audit.
- Do not create tokens/components.
- If a point is ambiguous, ask before recommending a structural change.
- Keep findings grounded in node IDs, component names, token/style names, or exact property names.
