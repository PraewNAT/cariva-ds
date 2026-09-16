# Cariva DS — Developer Export

Package สำหรับ integrate Cariva Design System เข้า Next.js + MUI app

**Generated:** 2026-09-16  
**Source repo:** Cariva DS (`code/core/`) — สร้างด้วย `npm run export:dev` ห้ามแก้ไฟล์ใน `ds/` ด้วยมือ

## สิ่งที่อยู่ใน zip

| Path | รายละเอียด |
|------|------------|
| `ds/index.ts` | Barrel export — Crv* components + tokens + theme |
| `ds/theme.ts` | `carivaTheme`, palette helpers, MUI overrides |
| `ds/theme/` | Component style tokens (`crvButton`, `crvInput`, …) |
| `ds/theme/carivaAugmentation.d.ts` | TS autocomplete สำหรับ `palette.cariva` |
| `ds/tokens.ts` + `ds/tokens.json` | Semantic tokens (colors จาก JSON) |
| `ds/components/` | Crv* components (ไม่รวม stories / tests / Figma Code Connect) |
| `ds/crvOverlayStyles.ts` | Modal/drawer backdrop |
| `ds/fonts.ts` | IBM Plex import + Adobe Fonts kit URL (`ADOBE_FONTS_KIT_URL`) |

**ไม่รวม:** Storybook, tests, `.figma.tsx`, `.ai.md`

## Quick setup

### 1) Copy ไฟล์เข้า project

```bash
# จาก root ของ zip
./apply.sh /path/to/your-next-app
```

หรือ copy manual:

```bash
cp -R ds /path/to/your-next-app/src/ds
```

### 2) Peer dependencies

```json
{
  "react": "^18.3.1",
  "@mui/material": "^6.1.6",
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@mui/icons-material": "^6.1.6",
  "@fontsource/ibm-plex-sans-thai": "^5.2.8"
}
```

Optional (ถ้าใช้ DateTimePicker):

```json
{
  "@mui/x-date-pickers": "^8.29.0",
  "dayjs": "^1.11.21"
}
```

### 3) Font

DS ใช้ font ต่างกันตาม product style (`productStyle` ใน `ds/tokens.ts`):

| Token | `carivaApp` (default) | `backOffice` |
|---|---|---|
| `fontFamily.ui` | Aktiv Grotesk Thai → IBM Plex Sans Thai | IBM Plex Sans Thai |
| `fontFamily.display` | Malila → IBM Plex Sans Thai | Malila → IBM Plex Sans Thai |
| `fontFamily.prose` | Google Sans → IBM Plex Sans Thai Looped | IBM Plex Sans Thai Looped |

**IBM Plex Sans Thai** — self-hosted ผ่าน npm import `ds/fonts.ts` ครั้งเดียวที่ root:

```ts
// app/layout.tsx
import '@/ds/fonts';
```

**Aktiv Grotesk Thai + Malila** — เป็น Adobe Fonts ติดตั้งผ่าน npm ไม่ได้ ต้องใส่ kit link ใน `<head>`:

```tsx
<link rel="stylesheet" href="https://use.typekit.net/tfw1cme.css" />
```

ถ้าไม่ใส่ หรือ subscription หมดอายุ จะ fallback เป็น IBM Plex Sans Thai แบบเงียบๆ — ไม่ error แต่หน้าตาจะไม่ตรง Figma

### 4) ThemeProvider

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { carivaTheme } from '@/ds/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <ThemeProvider theme={carivaTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 5) ใช้ component

```tsx
import { CrvButton, CrvInput, CrvSidebar } from '@/ds';
import { colors, spacing } from '@/ds/tokens';
```

## TypeScript paths

เพิ่มใน `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/ds": ["./src/ds"],
      "@/ds/*": ["./src/ds/*"],
      "@/theme": ["./src/ds/theme"]
    }
  }
}
```

ปรับ path ให้ตรงโครงสร้าง project ของคุณ

## Customize theme

```tsx
import { createTheme } from '@mui/material/styles';
import { carivaTheme } from '@/ds/theme';

const appTheme = createTheme(carivaTheme, {
  palette: {
    cariva: {
      ...carivaTheme.palette.cariva,
      // override nested tokens
    },
  },
});
```

## Verify หลัง integrate

```bash
npm run typecheck   # หรือ tsc --noEmit
npm run lint
npm run test        # ถ้ามี snapshot ที่เกี่ยวกับ theme
```

## Gaps / notes

- Font ต้อง load เอง — ดูข้อ 3 (Adobe Fonts kit ไม่ได้มากับ package)
- `tokens.json` เป็น source of truth — ใน DS repo รัน `npm run tokens:generate` แล้ว `npm run export:dev` เพื่อสร้าง package นี้ใหม่
- Theme ใช้ MUI typography มาตรฐาน (`h4`, `body2`) — ไม่ใช่ MD3 keys (`headlineMedium`)
- ห้าม hardcode hex/px ใน product code — ใช้ `colors`, `spacing`, `radius` จาก `@/ds/tokens`

## Support

ติดต่อ Core DS owner สำหรับ token update / component gap
