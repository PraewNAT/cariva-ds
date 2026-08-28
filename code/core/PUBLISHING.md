# Publishing `cariva-design-system`

This package is built from `code/core/` and published to the **public npm registry**
(npmjs.com) — not GitHub Packages. Not yet wired to CI — publish manually until the
flow is proven out.

## One-time setup (per machine, only needed to publish — not to install)

```bash
npm login
```
Logs into your npm account (create one free at [npmjs.com](https://www.npmjs.com/signup) if you don't have one). No GitHub token, no scopes to configure.

## Publish a new version

```bash
cd code/core
npm version patch   # or minor / major
npm publish
```

`prepublishOnly` runs the build automatically, so `dist/` is always fresh before publish.

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
