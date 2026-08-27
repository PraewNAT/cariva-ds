import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminFormOverrides(
  useProductBrand = true,
): Pick<Components<Omit<Theme, 'components'>>, 'MuiMenuItem' | 'MuiCheckbox' | 'MuiDivider'> {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.black.primary,
            '&:hover': { backgroundColor: t.primaryStates.hover },
            '&.Mui-selected': {
              backgroundColor: t.primaryStates.selected,
              '&:hover': { backgroundColor: t.primaryStates.focus },
            },
            '&.Mui-disabled': { color: t.textColor.black.disabled },
          };
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            color: t.outlinedBorder.hoverColor,
            '&.Mui-checked': { color: t.primary },
            '&.Mui-disabled': { color: t.textColor.black.disabled },
          };
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: getAdminThemeTokens(theme, { useProductBrand }).divider,
        }),
      },
    },
  };
}
