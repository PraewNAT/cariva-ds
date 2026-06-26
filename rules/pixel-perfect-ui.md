# Pixel-Perfect UI from Figma

Use when implementing or tuning a **screen, template, or section** from a Figma frame (not only atomic DS components).

Companion: `rules/figma-workflow.md` (component implementation).

---

## Defaults (unless the user overrides)

1. **Design system first** — compose from existing `Crv*` components and tokens (`colors`, `spacing`, `radius`, `typography`).
2. **Figma wins** — if docs or an approximate layout disagree with the node, trust Figma.
3. **Tokens only** — no raw hex/px in `sx` unless a one-off is documented (see `rules/patterns/*.md`).
4. **Do not create new DS components** unless the user explicitly allows it or a pattern doc says to promote one.

Layout wrappers (`Box`, `grid`, `flex`) are allowed for page composition. They are not new UI components.

---

## Two task modes

| Mode | User intent | Agent behavior |
|---|---|---|
| **Compose** | “ลองสร้าง UI / demo หน้า” | Fast assembly from DS; close enough for structure review |
| **Pixel-perfect** | “ตรง Figma เป๊ะ / pixel-perfect” | Figma spec per layer → implement → Storybook vs Figma screenshot loop until pass |

If the user does not say which mode, **ask once** or infer from words like *เป๊ะ*, *pixel-perfect*, *ตรงฟิกม่า*, *เทียบ screenshot*.

---

## User prompt template (copy-paste)

```text
ทำ [ชื่อหน้า/ส่วน] ให้ตรง Figma แบบ pixel-perfect

Figma: [ลิงก์ node เดียว]
Story: [Storybook path > story name]
Scope: [เช่น breadcrumb + tabs + summary cards]
DS: ใช้ component จาก design system เท่านั้น; ห้ามสร้าง component ใหม่; ถ้าไม่มีให้ list gap
Acceptance: เทียบ Storybook กับ Figma screenshot จนผ่าน
Commit: [ยังไม่ commit | commit เมื่อผ่าน]
```

Optional flags:

- `DS: ใช้ DS เป็นหลัก — layout wrapper ได้ แต่ห้าม invent UI component`
- `DS: อนุญาตสร้าง component ใหม่ใน DS ถ้า Figma มีแต่ยังไม่มีใน repo`
- `Breakpoint: desktop 1440`

---

## Agent workflow (pixel-perfect)

1. **Inspect Figma node** — structure, padding/gap per frame, typography, fills per layer, variants.
2. **Read** `rules/components/*.md` and `rules/patterns/*.md` for matching pieces (e.g. stat cards).
3. **Implement** in Storybook story or page file; mirror Figma hierarchy.
4. **Visual verify** — Storybook story open; compare to Figma export (screenshot). Fix spacing, type, color per section.
5. **Report gaps** — if DS lacks a building block and user forbade new components, list what is missing instead of approximating silently.
6. **Sync docs** — update `rules/` or `.ai.md` when Figma differed from existing docs.

Checklist:

```text
[ ] Figma node + scope confirmed
[ ] DS components only (or gaps listed)
[ ] Tokens only
[ ] Storybook story for the screen/section
[ ] Visual compare Storybook vs Figma — pass
[ ] User commit preference respected
```

---

## DS-only vs pixel-perfect

These can conflict. Example: filled stat cards may follow `rules/patterns/stat-card-filled.md` but there is no `CrvStatCard` yet.

| Constraint | When DS missing a block |
|---|---|
| DS-only, no new components | Compose with `Box` + tokens + pattern doc; report gap if still off-spec |
| Pixel-perfect + DS-only | Same; **stop and list gap** if Figma cannot be matched without a new component |
| Pixel-perfect + new components allowed | Add `Crv*` (or pattern component) first, then compose the screen |

Never claim “pixel-perfect” while using unapproved substitutes without telling the user.

---

## Common failures (composed screens)

| Mistake | Fix |
|---|---|
| One `spacing.lg` everywhere | Read padding/gap per Figma frame |
| Custom card without pattern doc | Check `rules/patterns/` first — soft stat cards → `stat-card-soft-accent.md` |
| Accent `A01` on stat card bg | Required — outer card fill = `accent.<hue>.A01` per `stat-card-soft-accent.md` |
| Wrong tab variant (folder vs pills) | Read Figma component instance name |
| “Close enough” without screenshot compare | Run visual verify loop |
| New component without permission | List gap or ask user |
