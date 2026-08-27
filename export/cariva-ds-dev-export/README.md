# Cariva DS — Developer Export

Package สำหรับ integrate Cariva Design System เข้า Next.js + MUI app

**Generated:** 2026-06-19  
**Source repo:** Cariva DS (`code/`)

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

### 3) Font — IBM Plex Sans Thai

```ts
// app/layout.tsx หรือ fonts.ts
import '@fontsource/ibm-plex-sans-thai/400.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import '@fontsource/ibm-plex-sans-thai/700.css';
```

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

- Font ต้อง load เอง — DS ใช้ **IBM Plex Sans Thai** เท่านั้น
- `tokens.json` เป็น source of truth — regenerate ด้วย `npm run tokens:generate` ใน DS repo ก่อน export รอบถัดไป
- Theme ใช้ MUI typography มาตรฐาน (`h4`, `body2`) — ไม่ใช่ MD3 keys (`headlineMedium`)
- ห้าม hardcode hex/px ใน product code — ใช้ `colors`, `spacing`, `radius` จาก `@/ds/tokens`

## Support

ติดต่อ Core DS owner สำหรับ token update / component gap
