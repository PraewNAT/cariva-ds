#!/usr/bin/env node
/**
 * generate-tokens.js
 * Reads tokens.json → replaces the `colors` block in code/core/tokens.ts.
 * Everything else in tokens.ts (spacing, radius, productStyle, typography)
 * is hand-maintained and left untouched.
 *
 * Usage:
 *   npm run tokens:generate   write the colors block + generatedPalette.ts
 *   npm run tokens:check      exit 1 if either file is out of sync (no writes)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT       = path.resolve(__dirname, '..');
const INPUT      = path.join(ROOT, 'tokens.json');
const OUTPUT     = path.join(ROOT, 'code', 'core', 'tokens.ts');
const PALETTE    = path.join(ROOT, 'code', 'core', 'theme', 'generatedPalette.ts');

const tokens = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const semantic = tokens.semantic; // { "color/brand/primary/...": { alias, value } }

// ─── path helpers ──────────────────────────────────────────────────────────

// Convert kebab segment to camelCase: "on-surface" → "onSurface"
function toCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// Set deeply nested key on obj from array of keys.
// Some token paths collide with an existing leaf — e.g. "color/overlay/backdrop"
// is itself a leaf value, but "color/overlay/backdrop/strong" would need to
// nest under it. Skip those instead of overwriting the leaf consumers rely on.
function setDeep(obj, keys, value) {
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (typeof cur[k] !== 'undefined' && typeof cur[k] !== 'object') return;
    if (!cur[k]) cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
}

// ─── build colors object ───────────────────────────────────────────────────

const colors = {};

// Special overrides — values that Figma stores as pure black but need opacity in code
const OVERRIDES = {
  'color/overlay/backdrop':        '#00000066',
  'color/overlay/backdrop/strong': '#00000099',
};

for (const [tokenPath, data] of Object.entries(semantic)) {
  if (!tokenPath.startsWith('color/')) continue;

  // Strip leading "color/"
  const rest = tokenPath.slice('color/'.length); // e.g. "brand/primary/on-surface/default"

  // Split into path segments and camelCase each
  const keys = rest.split('/').map(toCamel);

  // Resolve value — use override first, then resolved hex from alias
  const value = OVERRIDES[tokenPath] ?? data.value ?? null;
  if (!value) continue;

  setDeep(colors, keys, value);
}

// ─── serialize to TypeScript ────────────────────────────────────────────────

function serialize(obj, indent = 2) {
  const pad  = ' '.repeat(indent);
  const pad2 = ' '.repeat(indent + 2);
  const entries = Object.entries(obj);
  const lines = entries.map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
    if (typeof v === 'object' && v !== null) {
      return `${pad2}${key}: ${serialize(v, indent + 2)},`;
    }
    return `${pad2}${key}: '${v}',`;
  });
  return `{\n${lines.join('\n')}\n${pad}}`;
}

// ─── splice into tokens.ts ─────────────────────────────────────────────────
// Only the `colors` block is generated. spacing, radius, productStyle and
// typography are maintained by hand in tokens.ts and must survive a run.
//
// This script used to rewrite the whole file from a template. The template
// had drifted (no fontFamily ui/prose, the old display scale, label
// line-heights copied from body), so every run silently reverted them.

const CHECK = process.argv.includes('--check');
const COLORS_BLOCK = /export const colors = \{[\s\S]*?\n\} as const;/;

const current = fs.readFileSync(OUTPUT, 'utf8');
if (!COLORS_BLOCK.test(current)) {
  console.error(`✖ No \`export const colors = { … } as const;\` block found in ${path.relative(ROOT, OUTPUT)}`);
  process.exit(1);
}

const generatedBlock = `export const colors = ${serialize(colors, 0)} as const;`;
// Function replacer so `$` sequences in values are never read as patterns.
const output = current.replace(COLORS_BLOCK, () => generatedBlock);

const paletteOutput = `/**
 * AUTO-GENERATED from tokens.json — run: npm run tokens:generate
 * Re-exports semantic colors for theme.palette.cariva (kept in sync with tokens.ts).
 */
export { colors } from '../tokens';
`;

if (CHECK) {
  const paletteCurrent = fs.existsSync(PALETTE) ? fs.readFileSync(PALETTE, 'utf8') : '';
  const stale = [];
  if (output !== current) stale.push(path.relative(ROOT, OUTPUT));
  if (paletteOutput !== paletteCurrent) stale.push(path.relative(ROOT, PALETTE));
  if (stale.length) {
    console.error(`✖ Out of sync with tokens.json: ${stale.join(', ')}`);
    console.error('  Run: npm run tokens:generate');
    process.exit(1);
  }
  console.log('✅ tokens.ts colors and generatedPalette.ts match tokens.json');
  process.exit(0);
}

fs.writeFileSync(OUTPUT, output, 'utf8');
console.log(`✅ Updated colors in ${path.relative(ROOT, OUTPUT)}`);

fs.writeFileSync(PALETTE, paletteOutput, 'utf8');
console.log(`✅ Generated ${path.relative(ROOT, PALETTE)}`);
console.log(`   ${Object.keys(semantic).filter(k => k.startsWith('color/')).length} semantic color tokens`);
