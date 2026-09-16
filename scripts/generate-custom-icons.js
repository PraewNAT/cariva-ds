#!/usr/bin/env node
/**
 * generate-custom-icons.js
 * Builds React icons for Figma icon sets that @mui/icons-material doesn't
 * ship, straight from the Figma vectors — so product code can use them and
 * Code Connect can point at them.
 *
 * Output: code/core/icons/<Name>.tsx (5 styles each, MUI naming) + index.ts
 *
 * Usage: npm run icons:custom      (needs FIGMA_ACCESS_TOKEN with File content: Read)
 * Then:  npm run icons:connect     (maps them alongside the MUI icons)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'code', 'core', 'icons');

const FILE_KEY = 'XgxprkSY5mGbzIIwlmscCt';
const ICON_PAGE_ID = '3616:1454';

// Figma sets with no @mui/icons-material equivalent. Decided 2026-09-11:
// ship them from the DS rather than drop them.
// - removed from MUI in v5 (present in @material-ui/icons v4)
// - dock-to-right is Material Symbols, never part of MUI
const CUSTOM_ICONS = {
  'amp-stories':     'AmpStories',
  'eco':             'Eco',
  'exposure-neg-1':  'ExposureNeg1',
  'exposure-neg-2':  'ExposureNeg2',
  'exposure-plus-1': 'ExposurePlus1',
  'exposure-plus-2': 'ExposurePlus2',
  'exposure-zero':   'ExposureZero',
  'polymer':         'Polymer',
  'dock-to-right':   'DockToRight',
};

// Figma `Style` variant value → MUI export suffix.
const STYLES = { filled: '', outlined: 'Outlined', rounded: 'Rounded', sharp: 'Sharp', 'two-tone': 'TwoTone' };

function loadToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN;
  for (const file of ['.env.local', '.env']) {
    const p = path.join(ROOT, file);
    if (!fs.existsSync(p)) continue;
    const line = fs.readFileSync(p, 'utf8').split('\n').find((l) => l.startsWith('FIGMA_ACCESS_TOKEN='));
    if (line) return line.slice('FIGMA_ACCESS_TOKEN='.length).trim();
  }
  console.error('✖ Missing FIGMA_ACCESS_TOKEN — add it to .env.local (scope: File content → Read).');
  process.exit(1);
}
const TOKEN = loadToken();

async function api(pathname) {
  const res = await fetch(`https://api.figma.com/v1/${pathname}`, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) {
    console.error(`✖ Figma API ${res.status} on ${pathname}: ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

// 1. Icon sets → the variants we need.
const page = (await api(`files/${FILE_KEY}/nodes?ids=${encodeURIComponent(ICON_PAGE_ID)}&depth=3`)).nodes[ICON_PAGE_ID].document;
const sets = page.children
  .filter((n) => n.type === 'FRAME')
  .flatMap((f) => f.children ?? [])
  .filter((n) => n.type === 'COMPONENT_SET' && CUSTOM_ICONS[n.name]);

const missing = Object.keys(CUSTOM_ICONS).filter((name) => !sets.some((s) => s.name === name));
if (missing.length) {
  console.error(`✖ Not found on the Icon page: ${missing.join(', ')} — renamed or deleted in Figma?`);
  process.exit(1);
}

const jobs = [];
for (const set of sets) {
  for (const [style, suffix] of Object.entries(STYLES)) {
    const variant = set.children.find((v) => v.name === `Style=${style}`);
    if (!variant) {
      console.error(`✖ ${set.name} has no Style=${style} variant`);
      process.exit(1);
    }
    jobs.push({ set, style, variantId: variant.id, exportName: CUSTOM_ICONS[set.name] + suffix });
  }
}

// 2. Export every variant as SVG.
const { images } = await api(`images/${FILE_KEY}?format=svg&ids=${encodeURIComponent(jobs.map((j) => j.variantId).join(','))}`);

// Figma exports icons as plain <path d fill [opacity]>. Drop the hardcoded
// fill so the icon inherits currentColor like every other MUI icon; keep
// opacity, which is what gives two-tone its light layer.
function toPaths(svg, label) {
  const paths = [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((m) => {
    const attrs = Object.fromEntries([...m[1].matchAll(/([a-zA-Z-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
    return { d: attrs.d, opacity: attrs.opacity };
  });
  const other = svg.replace(/<\?xml[^>]*>|<svg\b[^>]*>|<\/svg>|<path\b[^>]*?\/?>/g, '').trim();
  if (!paths.length || other) {
    console.error(`✖ ${label}: unexpected SVG content — only <path> is supported.\n${other}`);
    process.exit(1);
  }
  return paths;
}

for (const job of jobs) {
  const url = images[job.variantId];
  if (!url) {
    console.error(`✖ Figma returned no image for ${job.set.name} / ${job.style}`);
    process.exit(1);
  }
  job.paths = toPaths(await (await fetch(url)).text(), `${job.set.name} / ${job.style}`);
}

// 3. Write one file per icon family.
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const jsx = (p, i, many) =>
  `<path${many ? ` key="${i}"` : ''}${p.opacity ? ` opacity="${p.opacity}"` : ''} d="${p.d}" />`;

const families = [];
for (const set of sets.sort((a, b) => CUSTOM_ICONS[a.name].localeCompare(CUSTOM_ICONS[b.name]))) {
  const base = CUSTOM_ICONS[set.name];
  const exports = jobs.filter((j) => j.set === set).map((j) => {
    const many = j.paths.length > 1;
    const body = many ? `[\n  ${j.paths.map((p, i) => jsx(p, i, true)).join(',\n  ')},\n]` : jsx(j.paths[0], 0, false);
    return `/** Figma \`${set.name}\` · Style=${j.style} */
export const ${j.exportName} = createSvgIcon(${body}, '${j.exportName}');`;
  });
  fs.writeFileSync(
    path.join(OUT_DIR, `${base}.tsx`),
    `'use client';

// AUTO-GENERATED by scripts/generate-custom-icons.js from Figma set \`${set.name}\` (${set.id}).
// Do not edit — change the icon in Figma, then run: npm run icons:custom
// Not available in @mui/icons-material, so the DS ships it.

import { createSvgIcon } from '@mui/material/utils';

${exports.join('\n\n')}
`,
    'utf8',
  );
  families.push(base);
}

fs.writeFileSync(
  path.join(OUT_DIR, 'index.ts'),
  `// AUTO-GENERATED by scripts/generate-custom-icons.js — do not edit.
// Icons the DS ships itself because @mui/icons-material doesn't have them.
// Everything else: import from @mui/icons-material directly.
${families.map((b) => `export * from './${b}';`).join('\n')}
`,
  'utf8',
);

console.log(`✅ Generated ${jobs.length} icons (${families.length} × 5 styles) → ${path.relative(ROOT, OUT_DIR)}/`);
console.log(`   ${families.join(', ')}`);
