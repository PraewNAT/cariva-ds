# Publishing `@PraewNAT/cariva-ds`

This package is built from `code/core/` and published to **GitHub Packages**.
Not yet wired to CI — publish manually until the flow is proven out.

## One-time setup (per machine)

1. Create a GitHub [personal access token](https://github.com/settings/tokens) with `write:packages` (and `read:packages` for installing).
2. Export it as an env var before publishing or installing:
   ```bash
   export GITHUB_TOKEN=ghp_xxxxxxxx
   ```
   `.npmrc` in this folder reads `${GITHUB_TOKEN}` — never hardcode the token in `.npmrc` itself.

## Publish a new version

```bash
cd code/core
npm version patch   # or minor / major
npm publish
```

`prepublishOnly` runs the build automatically, so `dist/` is always fresh before publish.

## Install in a consuming project

```bash
echo "@PraewNAT:registry=https://npm.pkg.github.com" >> .npmrc
npm install @PraewNAT/cariva-ds
```

The consumer also needs a `GITHUB_TOKEN` with `read:packages` available to npm (env var, or `~/.npmrc`) since GitHub Packages requires auth even for public repos.

## What's NOT changed by this setup

- Storybook, Vitest, and the design-system skills all still read `code/core/components` source directly — unaffected by this build.
- `code/core/dist/` is gitignored (covered by the root `.gitignore`).

## Workspace note

`code/core` is an npm **workspace** of the repo root (see `"workspaces"` in the root `package.json`).
Always run `npm install` from the repo root, not inside `code/core/` — installing there directly
creates a second, nested `node_modules` with its own copy of React, which breaks Vitest with a
"Cannot read properties of null (reading 'useContext')" error (two React instances loaded at once).
If you ever see that error, check for and delete `code/core/node_modules`.
