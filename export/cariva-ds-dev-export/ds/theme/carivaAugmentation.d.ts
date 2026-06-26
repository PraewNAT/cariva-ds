import type { CarivaColors, CarivaSpacing } from '../tokens';
import type { radius, typography } from '../tokens';

declare module '@mui/material/styles' {
  interface Palette {
    cariva: CarivaColors;
  }
  interface PaletteOptions {
    cariva?: CarivaColors;
  }

  interface Theme {
    cariva: {
      spacing: CarivaSpacing;
      radius: typeof radius;
      typography: typeof typography;
    };
  }
  interface ThemeOptions {
    cariva?: {
      spacing?: CarivaSpacing;
      radius?: typeof radius;
      typography?: typeof typography;
    };
  }
}

export {};
