import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminAlertOverrides(
  useProductBrand = true,
): Pick<Components<Omit<Theme, 'components'>>, 'MuiAlert' | 'MuiSnackbar'> {
  return {
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            '& .MuiAlert-root': {
              borderRadius: t.radius.input,
            },
          };
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            borderRadius: t.radius.input,
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.white.primary,
          };
        },
        colorSuccess: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            backgroundColor: t.alert.success,
            color: t.textColor.white.primary,
            '& .MuiAlert-icon': { color: t.textColor.white.primary },
          };
        },
        colorError: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            backgroundColor: t.alert.error,
            color: t.textColor.white.primary,
            '& .MuiAlert-icon': { color: t.textColor.white.primary },
          };
        },
        colorWarning: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            backgroundColor: t.warning.main,
            color: t.warning.contrastText,
            '& .MuiAlert-icon': { color: t.warning.contrastText },
          };
        },
      },
    },
  };
}
