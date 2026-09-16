import '@fontsource/ibm-plex-sans-thai/400.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import '@fontsource/ibm-plex-sans-thai/700.css';

// `font-family/prose` — Google Sans, self-hosted. It is NOT in the Adobe kit
// (verified against kit tfw1cme on 2026-09-16), but Google released it under
// OFL-1.1, so it ships as a normal npm package. These files cover Latin and
// Thai. IBM Plex Sans Thai Looped stays behind it as the fallback; without both
// of them, prose text drops straight through to the generic `serif` (Times).
import '@fontsource/google-sans/400.css';
import '@fontsource/google-sans/500.css';
import '@fontsource/google-sans/600.css';
import '@fontsource/ibm-plex-sans-thai-looped/400.css';
import '@fontsource/ibm-plex-sans-thai-looped/500.css';
import '@fontsource/ibm-plex-sans-thai-looped/600.css';

/**
 * Adobe Fonts (Typekit) — Aktiv Grotesk Thai + Malila
 * -----------------------------------------------------------------------
 * These fonts are licensed through Adobe Fonts, not self-hosted — they
 * cannot be `npm install`ed or bundled like the @fontsource imports above.
 * They only render if:
 *   1. The consuming app's Adobe Fonts subscription stays active, and
 *   2. The kit stylesheet is loaded in the document <head>.
 *
 * Add this to the app's root <head> (e.g. Next.js root layout):
 *   <link rel="stylesheet" href="https://use.typekit.net/tfw1cme.css" />
 *
 * Storybook loads it automatically via .storybook/preview-head.html.
 *
 * If the Adobe subscription lapses, these fonts silently stop loading and
 * fall back to the next font in the stack — verify the fallback in
 * tokens.ts is acceptable before shipping.
 */
export const ADOBE_FONTS_KIT_URL = 'https://use.typekit.net/tfw1cme.css';
