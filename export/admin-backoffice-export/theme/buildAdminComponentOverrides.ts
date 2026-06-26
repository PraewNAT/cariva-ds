import type { Components, Theme } from '@mui/material/styles';
import {
  adminAlertOverrides,
  adminButtonOverrides,
  adminDialogOverrides,
  adminFormOverrides,
  adminIconButtonOverrides,
  adminInputOverrides,
  adminTableOverrides,
  adminTabsOverrides,
} from './components';

export type BuildAdminOverridesOptions = {
  /** Round 1 default: product brand + radius deltas */
  useProductBrand?: boolean;
};

/**
 * MUI styleOverrides for admin-dashboard — no Crv* React components.
 * Merge into createTheme(existingTheme, { components: buildAdminComponentOverrides() }).
 */
export function buildAdminComponentOverrides(
  options: BuildAdminOverridesOptions = {},
): Components<Omit<Theme, 'components'>> {
  const useProductBrand = options.useProductBrand ?? true;

  return {
    ...adminButtonOverrides(useProductBrand),
    ...adminIconButtonOverrides(useProductBrand),
    ...adminInputOverrides(useProductBrand),
    ...adminDialogOverrides(useProductBrand),
    ...adminTableOverrides(useProductBrand),
    ...adminAlertOverrides(useProductBrand),
    ...adminTabsOverrides(useProductBrand),
    ...adminFormOverrides(useProductBrand),
  };
}
