import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminTabsOverrides(
  useProductBrand = true,
): Pick<Components<Omit<Theme, 'components'>>, 'MuiTab' | 'MuiTabs' | 'MuiBreadcrumbs'> {
  return {
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const label = theme.typography.labelLarge;
          return {
            textTransform: 'unset',
            fontSize: label?.fontSize,
            lineHeight: label?.lineHeight,
            fontWeight: label?.fontWeight,
            color: t.textColor.black.secondary,
            minHeight: 48,
            '&.Mui-selected': { color: t.primary },
          };
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: getAdminThemeTokens(theme, { useProductBrand }).primary,
        }),
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            color: t.textColor.black.secondary,
            '& .MuiTypography-root': {
              fontSize: body?.fontSize,
              lineHeight: body?.lineHeight,
            },
          };
        },
        separator: ({ theme }) => ({
          color: getAdminThemeTokens(theme, { useProductBrand }).icon,
        }),
      },
    },
  };
}
