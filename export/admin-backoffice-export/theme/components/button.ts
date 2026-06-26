import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminButtonOverrides(
  useProductBrand = true,
): Components<Omit<Theme, 'components'>>['MuiButton'] {
  return {
    styleOverrides: {
      root: ({ theme }) => {
        const t = getAdminThemeTokens(theme, { useProductBrand });
        const label = theme.typography.labelLarge;
        return {
          borderRadius: t.radius.button,
          textTransform: 'unset',
          boxShadow: 'none',
          fontSize: label?.fontSize,
          lineHeight: label?.lineHeight,
          fontWeight: label?.fontWeight,
          '&.Mui-disabled': {
            color: t.textColor.black.disabled,
          },
        };
      },
      contained: ({ theme }) => {
        const t = getAdminThemeTokens(theme, { useProductBrand });
        return {
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
          '&:hover': {
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
          },
          '&.Mui-disabled': {
            backgroundColor: t.textColor.black.disabled,
            color: t.textColor.white.primary,
          },
        };
      },
      outlined: ({ theme }) => {
        const t = getAdminThemeTokens(theme, { useProductBrand });
        return {
          borderColor: t.outlinedBorder.color,
          '&:hover': {
            borderColor: t.outlinedBorder.hoverColor,
            backgroundColor: t.primaryStates.hover,
          },
          '&.Mui-disabled': {
            borderColor: t.divider,
            color: t.textColor.black.disabled,
          },
        };
      },
      text: ({ theme }) => {
        const t = getAdminThemeTokens(theme, { useProductBrand });
        return {
          '&:hover': {
            backgroundColor: t.primaryStates.hover,
          },
          '&.Mui-disabled': {
            color: t.textColor.black.disabled,
          },
        };
      },
    },
  };
}

export function adminIconButtonOverrides(
  useProductBrand = true,
): Components<Omit<Theme, 'components'>>['MuiIconButton'] {
  return {
    styleOverrides: {
      root: ({ theme }) => {
        const t = getAdminThemeTokens(theme, { useProductBrand });
        return {
          borderRadius: t.radius.input,
          color: t.icon,
          '&:hover': {
            backgroundColor: t.primaryStates.hover,
          },
          '&.Mui-disabled': {
            color: t.textColor.black.disabled,
          },
        };
      },
    },
  };
}
