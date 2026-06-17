# Figma Component Workflow

This file documents the exact workflow for creating, auditing, and fixing Figma components in the Cariva Core Design System using the figma-console MCP.

**Implementing React code from Figma?** Use `rules/figma-to-code-workflow.md` instead (inspect node → mirror structure → Storybook → visual verify).

---

## Tools Required

- **figma-console MCP** — must be connected via Desktop Bridge plugin in Figma Desktop
- Verify connection before starting: `figma_get_status` with `probe: true`
- If disconnected: ask user to open Figma Desktop → Plugins → Development → Figma Desktop Bridge → Run

---

## Step 1 — Create Component

### Prop Naming Rules

1. Use MUI prop names wherever possible
2. If MUI prop name is not applicable in Figma (e.g. `children`), use a descriptive Figma name and document the mapping in `rules/components.md`

**Variant axes (visual states that require unique frames):**
- `size=small|medium|large` — use when visual sizing differs
- `state=default|hover|focused|filled` — interaction states (CSS pseudo-classes — do NOT expose as code props)
- `disabled=false|true` — separate boolean axis, maps to MUI `disabled={true}`
- `error=false|true` — separate boolean axis, maps to MUI `error={true}`
- `selected=false|true` — separate boolean axis, maps to MUI `selected={true}`

**Do not merge `disabled` or `error` into the `state` axis.** They are independent MUI props and must be separate variant properties so dev can use them independently.

### Variable Binding (mandatory)

Bind variables to every property that supports it. Do not hardcode values.

**Spacing mapping rule (MANDATORY for all design work):**

Every spacing value used in padding, gap (itemSpacing), width, or height must be mapped to the nearest spacing variable. Do not use raw pixel numbers.

| Raw px | Variable to use |
|---:|---|
| 2 | `spacing/2xs` |
| 4 | `spacing/xs` |
| 8 | `spacing/sm` |
| 12 | `spacing/md` |
| 16 | `spacing/lg` |
| 24 | `spacing/xl` |
| 28 | `spacing/2xl` |
| 32 | `spacing/3xl` |
| 40 | `spacing/4xl` |

If a value falls between tokens (e.g. 20px), round to the nearest token (use `spacing/xl` = 24px or `spacing/lg` = 16px — whichever fits better visually). Never introduce one-off local values.

Always bind via `setBoundVariable()` — never set `paddingTop = 16` as a raw number:
```js
// ✅ correct
node.setBoundVariable('paddingTop',    findVar('spacing/lg')); // 16px
node.setBoundVariable('paddingBottom', findVar('spacing/lg'));
node.setBoundVariable('paddingLeft',   findVar('spacing/xl')); // 24px
node.setBoundVariable('paddingRight',  findVar('spacing/xl'));
node.setBoundVariable('itemSpacing',   findVar('spacing/sm')); // 8px

// ❌ wrong — hardcoded
node.paddingTop = 16;
node.itemSpacing = 8;
```

**Color fills — use `figma.variables.setBoundVariableForPaint()`:**
```js
const colorFill = varName => {
  const v = allVars.find(v => v.name === varName);
  return figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v);
};
node.fills = [colorFill('color/on-surface/default')];
```

**Spacing, radius, border-width — use `setBoundVariable()`:**
```js
node.setBoundVariable('paddingTop',    findVar('spacing/sm'));
node.setBoundVariable('paddingBottom', findVar('spacing/sm'));
node.setBoundVariable('paddingLeft',   findVar('spacing/lg'));
node.setBoundVariable('paddingRight',  findVar('spacing/lg'));
node.setBoundVariable('itemSpacing',   findVar('spacing/sm'));
node.setBoundVariable('cornerRadius',  findVar('radius/md'));
node.setBoundVariable('strokeWeight',  findVar('border-width/1'));
```

**Typography — use `setTextStyleIdAsync()`:**
```js
const style = allStyles.find(s => s.name === 'typography/label/medium');
await textNode.setTextStyleIdAsync(style.id);
```

### Token Reference (quick lookup)

| Usage | Token |
|---|---|
| Input / card / menu surface | `color/on-surface/default` |
| Page background | `color/bg/page` |
| Hover surface | `color/on-surface/action/hover` |
| Selected surface | `color/on-surface/action/selected` |
| Disabled surface | `color/on-surface/action/disabled` |
| Primary text/icon | `color/content/primary` |
| Secondary/helper text | `color/content/secondary` |
| Placeholder | `color/content/placeholder` |
| Disabled content | `color/content/disabled` |
| Default border | `color/border/default` |
| Hover border | `color/border/strong` |
| Focused/active border | `color/border/system` |
| Error border | `color/border/error` |
| Disabled border | `color/border/disabled` |
| Error text/icon | `color/status/error/content/default` |

| Spacing token | Value |
|---|---:|
| `spacing/xs` | 4px |
| `spacing/sm` | 8px |
| `spacing/md` | 12px |
| `spacing/lg` | 16px |
| `spacing/xl` | 24px |

### Font

Always use **IBM Plex Sans Thai** (sans) or **IBM Plex Sans Thai Looped** (serif). Never use Inter or other fonts.

Load before use:
```js
await figma.loadFontAsync({family: 'IBM Plex Sans Thai', style: 'Regular'});
await figma.loadFontAsync({family: 'IBM Plex Sans Thai', style: 'Medium'});
```

### Async API Requirements

Figma plugin context requires async versions of all document APIs:
```js
await figma.loadAllPagesAsync();
await figma.setCurrentPageAsync(page);
const allVars   = await figma.variables.getLocalVariablesAsync();
const allStyles = await figma.getLocalTextStylesAsync();
const node      = await figma.getNodeByIdAsync('1234:5678');
await textNode.setTextStyleIdAsync(styleId);
// primaryAxisSizingMode: use 'AUTO' not 'HUG'
```

### Purple Dashed Border (MANDATORY)

Every component set **must** have a purple dashed border `#8A38F5`. This happens automatically when using `figma.combineAsVariants()` — Figma renders COMPONENT_SET nodes with this border by default.

Rules:
- Always use `combineAsVariants()` to create component sets — never leave variants as loose COMPONENT nodes on the canvas
- If a component has only one variant (e.g. `crv-menu`), convert it to a COMPONENT using `figma.createComponentFromNode()` — it will show a solid purple border
- Never create standalone FRAMEs as the final deliverable for a component — they will not have the purple border and won't be reusable as instances
- Verify after creation: take a screenshot and confirm the purple dashed/solid border is visible

```js
// Multiple variants → COMPONENT_SET (purple dashed border)
const set = figma.combineAsVariants(variants, page);
set.name = 'crv-component-name';

// Single variant or container → COMPONENT (purple solid border)
const comp = figma.createComponentFromNode(existingFrame);
comp.name = 'crv-component-name';
```

### Component Set Height Fix

`combineAsVariants` creates the set with `layoutMode='NONE'`. After combining, manually set each variant's height and the set's bounding box:
```js
for (const v of set.children) {
  v.resize(v.width, calculatedHeight);
}
set.resize(totalWidth, totalHeight);
```

### Page Safety

Always check if a page already exists before creating:
```js
let page = figma.root.children.find(p => p.name === 'My Page');
if (!page) { page = figma.createPage(); page.name = 'My Page'; }
await figma.setCurrentPageAsync(page);
```

---

## Annotation Rules (do not report or fix)

- **Purple stroke on COMPONENT_SET nodes** — A stroke of approximately `rgb(138, 56, 245)` (`#8A38F5`) on a `COMPONENT_SET` node is a native Figma annotation rendered automatically by `combineAsVariants()`. Do **not** report it as a hardcoded stroke. Do **not** attempt to remove or replace it with a variable binding.

---

## Step 2 — Audit

Run audit when asked. Report every finding with:
- **Severity**: 🔴 Critical / 🟡 Warning / 🟢 Info
- **What**: exact prop name, token name, or layer name
- **Why**: rule it violates (reference `rules/tokens.md`, `rules/typography.md`, MUI docs)
- **Fix**: exact change needed

**Severity definitions:**
- 🔴 Critical — dev will implement wrong behavior (e.g. wrong token category, missing disabled prop, ghost→text not documented)
- 🟡 Warning — visual drift from DS (e.g. hardcoded spacing, wrong surface token)
- 🟢 Info — naming inconsistency or missing documentation (no visual impact)

Do NOT auto-fix after audit. Wait for user to say "แก้เลย" or explicitly approve.

---

## Step 3 — Fix

Fix only when the user explicitly says to fix. Preferred approach:

1. **Edit existing** (`แก้จากของเดิม`) — modify nodes in place using `figma_execute`. Do not delete and recreate unless the user says so.
2. **Rebuild** — only when user says to delete/rebuild, or when the existing structure is incompatible with the fix.

After every fix: capture screenshot with `figma_capture_screenshot` using the node ID and verify visually before reporting done.

---

## Step 4 — Document

After creating or significantly changing a component:
- Update `rules/components.md` with the new component section
- Follow the existing format: component set name, variant pattern, component properties, MUI mapping rules
- If a Figma prop name differs from MUI, always document the mapping explicitly

---

## Component Naming Convention

- Figma: `crv-{component-name}` in kebab-case (e.g. `crv-autocomplete`, `crv-menu-item`)
- Code: `Crv{ComponentName}` in PascalCase
- Do not use `cv-` prefix (deprecated)
