# Publishing `cariva-design-system`

This package is built from `code/core/` and published to the **public npm registry**
(npmjs.com) — not GitHub Packages.

## Publishing is automated

`.github/workflows/publish-ds-package.yml` publishes automatically whenever
`code/core/package.json`'s version changes on `main`. To ship a new version:

1. Bump the version in `code/core/package.json` (or run `npm version patch`
   inside `code/core` locally and commit the result).
2. Merge that into `main` as usual (normal PR flow — no extra steps).

CI checks whether that version is already on npm; if it's new, it builds and
publishes. Merging without a version bump is safe — the workflow just no-ops.

Auth is a GitHub Actions secret (`NPM_TOKEN`, an npm granular access token
scoped to this package) — set once in the repo's Settings → Secrets → Actions.
npm currently caps granular token expiry at 4 months, so this secret needs
regenerating and re-pasting there periodically (quick — 2FA is already set
up on the npm account, no OTP/browser-auth hassle like the first publish).

## Manual publish (fallback, if CI is down or you want to publish locally)

```bash
npm login
cd code/core
npm version patch   # or minor / major
npm publish
```
`prepublishOnly` runs the build automatically, so `dist/` is always fresh before publish.
Manual publish needs your own npm account with 2FA — the CI path above doesn't.

## Install in a consuming project

```bash
npm install cariva-design-system
```

That's it — **no token, no `.npmrc`, no auth setup** needed on the install side. It's a public package like any other npm package (e.g. `react`).

## What's NOT changed by this setup

- Storybook, Vitest, and the design-system skills all still read `code/core/components` source directly — unaffected by this build.
- `code/core/dist/` is gitignored (covered by the root `.gitignore`).

## Workspace note

`code/core` is an npm **workspace** of the repo root (see `"workspaces"` in the root `package.json`).
Always run `npm install` from the repo root, not inside `code/core/` — installing there directly
creates a second, nested `node_modules` with its own copy of React, which breaks Vitest with a
"Cannot read properties of null (reading 'useContext')" error (two React instances loaded at once).
If you ever see that error, check for and delete `code/core/node_modules`.
