#!/usr/bin/env node
/**
 * generate-tokens.js
 * Reads tokens.json → writes code/tokens.ts (colors section only)
 * spacing, radius, productStyle, typography are kept as static sections below
 *
 * Usage: node scripts/generate-tokens.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT       = path.resolve(__dirname, '..');
const INPUT      = path.join(ROOT, 'tokens.json');
const OUTPUT     = path.join(ROOT, 'code', 'tokens.ts');
const PALETTE    = path.join(ROOT, 'code', 'theme', 'generatedPalette.ts');

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

// ─── compose final file ────────────────────────────────────────────────────

const output = `/**
 * Cariva Design System — Tokens
 * ⚠️  colors section is AUTO-GENERATED from tokens.json
 * DO NOT EDIT colors manually — run: npm run tokens:generate
 *
 * Source: tokens.json (synced from Figma via token-sync skill)
 * Figma file: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System
 */

export const colors = ${serialize(colors, 0)} as const;

export const spacing = {
  none:  0,
  '2xs': 2,
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
} as const;

export const radius = {
  none:  0,
  '2':   2,
  '4':   4,
  '8':   8,
  '12':  12,
  '16':  16,
  '24':  24,
  '32':  32,
  full:  9999,
} as const;

/**
 * Product Style — theme-aware radius tokens.
 * Mirrors Figma's "Product Style" collection (modes: cariva app / back office).
 */
export const productStyle = {
  carivaApp: {
    interactive: radius.full,
    inputSm:     radius.full,
    inputMd:     radius.full,
    containerSm: radius['12'],
    containerMd: radius['16'],
  },
  backOffice: {
    interactive: radius['12'],
    inputSm:     radius['8'],
    inputMd:     radius['12'],
    containerSm: radius['8'],
    containerMd: radius['12'],
  },
} as const;

export type ProductStyleName = keyof typeof productStyle;

export const defaultProductStyle: ProductStyleName = 'carivaApp';

export const typography = {
  fontFamily: {
    sans:  '"IBM Plex Sans Thai", sans-serif',
    serif: '"IBM Plex Sans Thai Looped", serif',
  },
  fontSize: {
    display:  { large: 64, medium: 48, small: 40 },
    heading:  { large: 24, medium: 20, small: 16 },
    body:     { large: 16, medium: 14, small: 12 },
    label:    { large: 16, medium: 14, small: 12 },
    caption:  { caption: 12 },
  },
  lineHeight: {
    display:  { large: 72, medium: 56, small: 48 },
    heading:  { large: 32, medium: 28, small: 24 },
    body:     { large: 24, medium: 22, small: 18 },
    label:    { large: 24, medium: 22, small: 18 },
    caption:  { caption: 16 },
  },
  fontWeight: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
  },
} as const;

export type CarivaColors  = typeof colors;
export type CarivaSpacing = typeof spacing;
`;

fs.writeFileSync(OUTPUT, output, 'utf8');
console.log(`✅ Generated ${path.relative(ROOT, OUTPUT)}`);

const paletteOutput = `/**
 * AUTO-GENERATED from tokens.json — run: npm run tokens:generate
 * Re-exports semantic colors for theme.palette.cariva (kept in sync with tokens.ts).
 */
export { colors } from '../tokens';
`;

fs.writeFileSync(PALETTE, paletteOutput, 'utf8');
console.log(`✅ Generated ${path.relative(ROOT, PALETTE)}`);
console.log(`   ${Object.keys(semantic).filter(k => k.startsWith('color/')).length} semantic color tokens`);
