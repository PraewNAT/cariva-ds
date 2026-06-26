import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminDialogOverrides(
  useProductBrand = true,
): Pick<
  Components<Omit<Theme, 'components'>>,
  'MuiDialog' | 'MuiDialogTitle' | 'MuiDialogContent' | 'MuiDialogActions' | 'MuiBackdrop'
> {
  return {
    MuiDialog: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            '& .MuiBackdrop-root': {
              backgroundColor: t.backgroundColor.overlay,
              backdropFilter: 'blur(2px)',
            },
          };
        },
        paper: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            borderRadius: t.radius.dialog,
            backgroundColor: t.backgroundColor.white,
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          };
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const title = theme.typography.titleLarge;
          return {
            fontSize: title?.fontSize,
            lineHeight: title?.lineHeight,
            fontWeight: title?.fontWeight,
            color: t.textColor.black.primary,
            padding: theme.spacing(3, 3, 2),
          };
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.black.secondary,
            padding: theme.spacing(0, 3, 3),
          };
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 3, 3),
          gap: theme.spacing(1),
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            backgroundColor: t.backgroundColor.overlay,
            opacity: 1,
          };
        },
      },
    },
  };
}
