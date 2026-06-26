import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminInputOverrides(
  useProductBrand = true,
): Pick<
  Components<Omit<Theme, 'components'>>,
  'MuiTextField' | 'MuiOutlinedInput' | 'MuiInputBase' | 'MuiSelect' | 'MuiFormControl' | 'MuiFormHelperText'
> {
  return {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const label = theme.typography.labelLarge;
          return {
            '& .MuiInputLabel-root': {
              fontSize: label?.fontSize,
              lineHeight: label?.lineHeight,
              color: t.textColor.black.secondary,
              '&.Mui-focused': { color: t.primary },
              '&.Mui-disabled': { color: t.textColor.black.disabled },
            },
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyLarge;
          const border = t.outlinedBorder;
          return {
            borderRadius: t.radius.input,
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            backgroundColor: t.backgroundColor.white,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: border.color,
              borderWidth: border.width,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: border.hoverColor,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: t.primary,
              borderWidth: border.width,
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: t.divider,
            },
            '&.Mui-disabled': {
              backgroundColor: t.backgroundColor.main,
            },
          };
        },
        input: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            color: t.textColor.black.primary,
            '&::placeholder': {
              color: t.textColor.black.tertiary,
              opacity: 1,
            },
            '&.Mui-disabled': {
              color: t.textColor.black.disabled,
              WebkitTextFillColor: t.textColor.black.disabled,
            },
          };
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => {
          const body = theme.typography.bodyLarge;
          return {
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
          };
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyLarge;
          return {
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.black.primary,
          };
        },
        icon: ({ theme }) => ({
          color: getAdminThemeTokens(theme, { useProductBrand }).icon,
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': { marginLeft: 0 },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.black.secondary,
            '&.Mui-error': { color: t.error },
          };
        },
      },
    },
  };
}
