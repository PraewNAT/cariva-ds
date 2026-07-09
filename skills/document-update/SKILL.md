---
name: document-update
description: Update existing component documentation when a component has changed. Syncs rules/components/{name}.md and the Figma doc frame. Use when the user asks to update or re-doc a component.
---

# Component Documentation Update

Use when the user says:

```text
อัปเดต doc [component name]
doc [component] เปลี่ยนแล้ว
แก้ doc [component]
```

---

## Pre-flight Checklist (MANDATORY)

Before updating, verify ALL of the following. If missing, ask and stop.

### 1. Component name
- Must be the exact Figma component set name
- If not provided: ask "กรุณาระบุชื่อ component ที่ต้องการอัปเดต doc"

### 2. What changed (optional but preferred)
- Ask: "มีอะไรเปลี่ยนบ้างครับ เช่น เพิ่ม variant, เปลี่ยน token, แก้ Do/Don't?"
- If user says "ไม่แน่ใจ / ดูเองเลย" — proceed to full re-inspect from Figma

---

## Steps

1. **Read existing doc**
   - Load `rules/components/{component-name}.md`
   - If file does not exist: stop and switch to `component-doc` skill instead

2. **Re-inspect Figma component**
   - Use `figma_get_component_for_development_deep` or `figma_execute`
   - Compare against existing doc: find what has changed (new variants, token changes, layout changes, new properties, removed states, etc.)
   - Take screenshot with `figma_capture_screenshot`

3. **Update only changed sections**
   - Do not rewrite sections that have not changed
   - Mark each changed section with a comment: `<!-- updated [date] -->`
   - If Do/Don't changed, ask user to confirm before overwriting

4. **Update Figma doc frame**
   - หา `Documentation Card` frame ใน page ของ component นั้น
   - Update text ใน Block ที่เปลี่ยน — ถ้าต้องเพิ่ม Block ใหม่ ให้ instantiate จาก `Blocks` component set แล้ว insert เข้า card
   - **Language: ไทยปนอังกฤษ** — อธิบายเป็นไทย, ชื่อ token/property/variant/code เป็นอังกฤษ
   - **Style: ไม่ต้องใช้ DS token** — ใช้ Inter หรือ font default ของ Figma ได้เลย
   - Take screenshot to verify

5. **Report what changed**
   - List every section updated and what the change was
   - List any new "Needs designer review" items discovered

---

## Rules

- Do not delete existing Do/Don't rules without user confirmation.
- Do not invent new information — only update from Figma or user input.
- Do not reformat unchanged sections.
- Keep all token names exact.
- If a section is now empty because a variant/state was removed in Figma, mark it as "Removed — Needs designer review" and ask before deleting.
