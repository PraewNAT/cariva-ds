import type { SxProps, Theme } from '@mui/material/styles';
import { colors, spacing, typography, radius } from '../../tokens';
import type { CrvButtonDecorativeSize } from './CrvButtonDecorative.types';

export const HEIGHT_BY_SIZE: Record<CrvButtonDecorativeSize, number> = {
  small: 32,
  medium: 36,
  large: 48,
};

export const ICON_SIZE_BY_SIZE: Record<CrvButtonDecorativeSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

/**
 * The decorative surface is a deep navy base with a radial wash running through
 * brand blue into cyan — Figma paints it as a solid
 * `brand/decorative/gradient/from` plus a radial gradient of via → to.
 */
export const DECORATIVE_GRADIENT = `radial-gradient(120% 160% at 50% 135%, ${colors.brand.decorative.gradient.to} 0%, ${colors.brand.decorative.gradient.via} 25%, ${colors.brand.decorative.gradient.from} 100%)`;

/** glow/primary, the hover effect style on the Figma component. */
const GLOW_PRIMARY = `0 0 4px 0 rgba(23, 137, 250, 0.36)`;

export function getDecorativeSx(size: CrvButtonDecorativeSize): SxProps<Theme> {
  return {
    height: HEIGHT_BY_SIZE[size],
    minHeight: HEIGHT_BY_SIZE[size],
    px: `${spacing.lg}px`,
    py: `${spacing.sm}px`,
    gap: `${spacing.sm}px`,
    borderRadius: `${radius.full}px`,
    textTransform: 'none',
    fontFamily: typography.fontFamily.ui,
    fontSize: `${typography.fontSize.label.medium}px`,
    lineHeight: `${typography.lineHeight.label.medium}px`,
    fontWeight: typography.fontWeight.medium,
    color: colors.content.onBrand,
    backgroundColor: colors.brand.decorative.gradient.from,
    backgroundImage: DECORATIVE_GRADIENT,
    boxShadow: 'none',
    '& .MuiSvgIcon-root': { fontSize: ICON_SIZE_BY_SIZE[size] },
    '&:hover': {
      backgroundImage: DECORATIVE_GRADIENT,
      boxShadow: GLOW_PRIMARY,
      color: colors.content.inverse,
    },
    '&:active': {
      backgroundImage: DECORATIVE_GRADIENT,
      boxShadow: 'none',
      color: colors.content.inverse,
    },
    '&.Mui-disabled, &:disabled': {
      backgroundImage: 'none',
      backgroundColor: `${colors.onSurface.action.disabled} !important`,
      color: `${colors.content.disabled} !important`,
      boxShadow: 'none',
    },
  };
}
