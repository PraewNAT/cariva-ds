import type { Components, Theme } from '@mui/material/styles';
import { getAdminThemeTokens } from '../adminTokens';

export function adminTableOverrides(
  useProductBrand = true,
): Pick<
  Components<Omit<Theme, 'components'>>,
  'MuiTableCell' | 'MuiTableSortLabel' | 'MuiTablePagination'
> {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            padding: theme.spacing(2),
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
            color: t.textColor.black.primary,
            borderBottomColor: t.divider,
          };
        },
        head: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const label = theme.typography.labelLarge;
          return {
            backgroundColor: t.tableHeaderBg,
            fontSize: label?.fontSize,
            lineHeight: label?.lineHeight,
            fontWeight: label?.fontWeight,
            color: t.textColor.black.primary,
          };
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          return {
            color: t.textColor.black.primary,
            '&:hover': { color: t.primary },
            '&.Mui-active': {
              color: t.primary,
              '& .MuiTableSortLabel-icon': { color: t.primary },
            },
          };
        },
        icon: ({ theme }) => ({
          color: getAdminThemeTokens(theme, { useProductBrand }).icon,
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => {
          const t = getAdminThemeTokens(theme, { useProductBrand });
          const body = theme.typography.bodyMedium;
          return {
            color: t.textColor.black.secondary,
            fontSize: body?.fontSize,
            lineHeight: body?.lineHeight,
          };
        },
        selectLabel: ({ theme }) => ({
          fontSize: theme.typography.bodyMedium?.fontSize,
        }),
        displayedRows: ({ theme }) => ({
          fontSize: theme.typography.bodyMedium?.fontSize,
        }),
        actions: ({ theme }) => ({
          color: getAdminThemeTokens(theme, { useProductBrand }).icon,
        }),
      },
    },
  };
}
