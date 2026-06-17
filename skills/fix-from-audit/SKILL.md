---
name: cariva-ds-fix-from-audit
description: Fix Cariva Core Design System Figma issues from a prior audit, then re-audit and report only remaining issues.
---

# Fix From Audit

Use when the user says:

```text
แก้ทั้งหมดตาม audit นี้
```

Fix only the audited design-system integration issues.

## Required Context

- Read the audit findings in the current conversation first.
- Read `plugins/cariva-design-system/CLAUDE.md`.
- Read relevant `plugins/cariva-design-system/rules/*.md`.
- Use Figma tools for Figma fixes.
- If using `use_figma`, load the `figma-use` skill first and pass `skillNames: "figma-use"`.

## Fix Rules

- Do not change visual intention unless required for DS correctness.
- Do not detach components unless necessary.
- Do not create new tokens.
- Use only current semantic tokens, typography styles, spacing variables, radius/effect styles, and shared components.
- If a needed token or component is missing, stop and ask before creating anything.
- Preserve component names, layer names, variant properties, and existing structure where possible.
- Work with existing user changes; do not revert unrelated edits.

## Workflow

1. Restate the audit items being fixed in one short note.
2. Apply scoped fixes.
3. Re-audit the same target for the same categories.
4. Report only remaining issues.

## Final Report

Include:

- What was fixed
- Re-audit result
- Remaining issues only, if any
- Any blocker where a token/component is missing
