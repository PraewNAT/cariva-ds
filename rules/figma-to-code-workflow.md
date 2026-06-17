# Figma → Code Workflow

Use this workflow whenever you implement or significantly change a Cariva DS React component from Figma.

**Related docs**

- Figma authoring/audit: `rules/figma-component-workflow.md`
- Component contracts: `rules/components/{component}.md`
- Code conventions: `code/CLAUDE.md`
- Per-component AI rules: `code/components/{Component}/{Component}.ai.md`

---

## Principle: Figma wins on conflict

`rules/components/*.md` is a **checklist and contract**, not a substitute for reading Figma.

If a rule contradicts the live Figma node (fills, borders, layout, variant matrix), **trust Figma**, implement from Figma, then **update the rule** in the same task.

Do not copy generic MUI patterns (DialogContent padding, DialogActions border-top, default button order) unless Figma shows the same structure.

---

## Step 1 — Inspect Figma first (mandatory)

Before writing code, inspect the target node with figma-console MCP:

1. `figma_get_status` — confirm Desktop Bridge is connected
2. Open the component set / reference frame (node id from `.ai.md` or user link)
3. Capture structure, not just a screenshot:
   - **Top-level children** — siblings vs nested (e.g. header frame, `contentSlot`, footer are often **peers**, not one padded wrapper)
   - **All variant axes** — list every combination you must support in Storybook
   - **Per-layer fills/strokes** — record token per layer; do not assume one background for the whole component
   - **Layout** — direction, alignment, gap, padding per frame
   - **Responsive breakpoints** — separate Figma variants (e.g. `breakpoint=sm|md+`), not only CSS media queries

Write a short mental model:

```text
crv-example
├── Header section     → token A, padding X
├── contentSlot        → token B, padding Y
└── Footer / CTA area  → token C (may differ from header), padding Z, border? (verify)
```

---

## Step 2 — Read docs as checklist

1. `rules/components/{name}.md` — props, slots, token table
2. `code/components/{Component}/{Component}.ai.md` — exports, AI rules
3. `code/CLAUDE.md` — tokens, imports, MUI wrapper rules

Note any gaps between docs and Figma. Plan to fix docs after implementation.

---

## Step 3 — Implement structure before polish

1. **Mirror Figma hierarchy in JSX** — same number of top-level sections; footer often **full-bleed** below content, not inside header padding
2. **Tokens only** — `colors`, `spacing`, `radius` from `@/ds/tokens`; no raw hex/px in `sx`
3. **MUI wrapper** — extend MUI where appropriate, but override layout to match Figma (do not leave MUI defaults that Figma does not show)
4. **Styles file** — keep variant logic in `{Component}Styles.ts` or `crv{Component}Styles.ts` when non-trivial
5. **Exports** — public API through `index.ts`; Storybook stories import from `index.ts`, not deep paths

---

## Step 4 — Storybook coverage (mandatory)

Add stories for **each important variant axis**, not just the happy path:

- Layout types (e.g. `default` vs `alignCenter`)
- Breakpoints (e.g. `sm` vs `md+`) as separate stories or controls
- Boolean toggles that change anatomy (`showCTA`, `showIcon`, …)
- At least one realistic content example (form, long text, icon-led dialog)

Story title pattern: `{Category}/Crv{Component}` (match existing components).

---

## Step 5 — Visual verify (mandatory)

Before marking done:

1. Run Storybook (`npm run storybook`) and open the new stories
2. Compare to Figma — `figma_take_screenshot` / `figma_capture_screenshot` on the matching variant
3. Check specifically:
   - Background color **per section** (header vs footer often differ)
   - Borders/dividers — present in Figma only
   - CTA order and alignment per breakpoint
   - Width, padding, gap, typography variant

If something differs, fix code first; update rules second.

---

## Step 6 — Sync documentation

In the same change:

| File | Update when |
|---|---|
| `rules/components/{name}.md` | Anatomy, tokens, layout, or prop mapping changed |
| `code/components/{Component}/{Component}.ai.md` | New props, slots, or implementation rules |
| `code/CLAUDE.md` | New global pattern worth repeating (only if broadly applicable) |

---

## Common failure modes (avoid)

| Mistake | What to do instead |
|---|---|
| Trusting stale rule over Figma | Inspect node; update rule after fix |
| Single wrapper with uniform padding | Split into sibling sections like Figma |
| Footer same color as body | Read fill on footer layer (`onSurface/subtle` vs `default`) |
| MUI `DialogActions` border-top | Only if Figma has a divider stroke |
| One Storybook story for a multi-axis component | Story per axis combination that designers use |
| Wrong CTA order on breakpoint | Read Figma variant matrix (`sm` vs `md+`) |
| Stories import from `./Component` not `./index` | Import from `index.ts` so exports stay stable |

**Reference:** `CrvModal` — footer is `colors.onSurface.subtle`, no border-top, full-bleed sibling; `sm` stacks Confirm → Close; `md+` row right-aligned Close → Confirm. See `rules/components/crv-modal.md`.

---

## Quick checklist (copy for each task)

```text
[ ] Figma node inspected — structure, variants, per-layer tokens
[ ] rules/components/*.md read; conflicts noted
[ ] JSX mirrors top-level Figma frames
[ ] Tokens only — no hardcoded hex/px
[ ] index.ts exports + stories import from index
[ ] Storybook stories for all key variants
[ ] Visual compare Storybook vs Figma screenshot
[ ] rules + .ai.md updated if Figma differed from docs
```
