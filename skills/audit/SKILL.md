---
name: audit
description: ตรวจ token binding และ naming convention ของ Figma component หรือ screen — ใช้เมื่อพูดว่า audit, เช็ค component, เช็ค screen, หรืออยากรู้ว่า component ใช้ DS ถูกต้องไหม
---

# Audit Cariva Design System Integration

Use when the user says:

```text
audit [ชื่อ] node-id=[id]
ช่วย audit [component/page name] นี้ให้หน่อย
เช็ค component [ชื่อ]
```

## Required Context

- Read `rules/DESIGN.md` — token names, typography scale
- Read `tokens.json` — hex values and token mapping
- Read `rules/components/{ชื่อ}.md` ถ้ามี
- Use Figma inspection tools for the target node/page.

## Audit Scope

Check only:

- **Naming convention** — ชื่อ component ตรง format `crv[Component]/[variantName]` (camelCase) ไหม
- Uses component base / shared component correctly
- Colors are bound to current semantic color tokens — ไม่มี hardcode hex
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

รายงานผลในรูปแบบนี้:

```
## Audit: [ชื่อ component]

### ❌ พบปัญหา
| # | ปัญหา | Node | ควรเป็น |
|---|---|---|---|
| 1 | hardcode #2563EB | contained/primary fill | semantic/color/primary/default |

### ⚠️ ไม่แน่ใจ
- [สิ่งที่ต้องถามก่อนตัดสิน]

### ✅ ผ่าน
- [สิ่งที่ถูกต้อง]
```

หลังรายงานเสร็จ **ถามทันทีว่า:** "อยากให้แก้ปัญหาที่พบไหม?"
- ถ้า **ใช่** → แก้ต่อเลยโดยใช้ข้อมูลจาก audit ที่เพิ่ง inspect ไป ไม่ต้อง inspect ซ้ำ ถามยืนยันก่อนแก้ทีละรายการ
- ถ้า **ไม่** → จบแค่ report

If no issues are found, say the audit passed and mention any residual uncertainty. แล้วถามว่าอยากให้ทำอะไรต่อ

## Rules

- Do not change Figma or local files during audit phase.
- Do not create tokens/components.
- If a point is ambiguous, ask before recommending a structural change.
- Keep findings grounded in node IDs, component names, token/style names, or exact property names.
- ถ้า user บอกว่า "ห้ามแก้" หรือ "report อย่างเดียว" → ไม่ต้องถามท้าย report
