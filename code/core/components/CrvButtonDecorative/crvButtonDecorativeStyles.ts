import type { SxProps, Theme } from '@mui/material/styles';
import { colors, typography, radius } from '../../tokens';
import { buttonSizing } from '../../theme/buttonSizing';
import type { CrvButtonDecorativeSize } from './CrvButtonDecorative.types';

/** Re-exported so the stories and tests keep their existing imports. */
export const HEIGHT_BY_SIZE: Record<CrvButtonDecorativeSize, number> = {
  small: buttonSizing.small.height,
  medium: buttonSizing.medium.height,
  large: buttonSizing.large.height,
};

export const ICON_SIZE_BY_SIZE: Record<CrvButtonDecorativeSize, number> = {
  small: buttonSizing.small.iconSize,
  medium: buttonSizing.medium.iconSize,
  large: buttonSizing.large.iconSize,
};

/**
 * The decorative surface is a deep navy base with a radial wash that brightens
 * toward the left and right edges — Figma paints it as a solid
 * `brand/decorative/gradient/from` under a radial gradient whose ending shape is
 * an ellipse centred on the button: 50% of the width across, 129.76% of the
 * height down (from the Figma `gradientTransform`). The first stop is `from` at
 * zero alpha so the navy base shows through the middle.
 */
export const DECORATIVE_GRADIENT =
  `radial-gradient(50% 129.76% at 50% 50%, ${colors.brand.decorative.gradient.from}00 0%, ${colors.brand.decorative.gradient.via} 75%, ${colors.brand.decorative.gradient.to} 100%)`;

/**
 * The aurora — the drifting "liquid light" behind the label.
 *
 * Two blurred layers of soft radial blobs, drifting against each other at
 * different speeds so the overlap never repeats on a visible cycle. Both live on
 * pseudo-elements at `z-index: -1`, which paints them above the button's own
 * background and below the label, so no wrapper element is needed and the label
 * never has to fight for stacking order.
 *
 * Only `transform` and `opacity` animate, so the whole thing stays on the
 * compositor. The button keeps its Figma gradient underneath: with motion off,
 * or the animation disabled, what is left is exactly the static component.
 */
const BLOB = (color: string, x: string, y: string, size: string) =>
  `radial-gradient(circle at ${x} ${y}, ${color} 0%, ${color}00 ${size})`;

const { from, via, to } = colors.brand.decorative.gradient;

// The navy blobs are listed first so they sit under the bright ones and keep the
// dark core Figma gives the resting button — an all-cyan aurora washes it out.
const AURORA_LAYER_A = [
  BLOB(to, '18%', '32%', '34%'),
  BLOB(via, '74%', '68%', '32%'),
  BLOB(from, '46%', '48%', '42%'),
].join(', ');

const AURORA_LAYER_B = [
  BLOB(via, '88%', '26%', '30%'),
  BLOB(to, '30%', '78%', '28%'),
  BLOB(from, '58%', '44%', '40%'),
].join(', ');

/** Bleeds past the edges so the blur never shows a hard boundary inside the pill. */
const AURORA_BLEED = '-60%';

const auroraLayer = (image: string, animation: string) => ({
  content: '""',
  position: 'absolute' as const,
  inset: AURORA_BLEED,
  zIndex: -1,
  pointerEvents: 'none' as const,
  backgroundImage: image,
  filter: 'blur(14px)',
  willChange: 'transform',
  animation,
});

export const AURORA_KEYFRAMES = {
  '@keyframes crvDecorativeDriftA': {
    '0%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
    '50%': { transform: 'translate3d(8%, 6%, 0) scale(1.15)' },
    '100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
  },
  '@keyframes crvDecorativeDriftB': {
    '0%': { transform: 'translate3d(7%, 5%, 0) scale(1.1)' },
    '50%': { transform: 'translate3d(-9%, -7%, 0) scale(0.95)' },
    '100%': { transform: 'translate3d(7%, 5%, 0) scale(1.1)' },
  },
};

/** Layered on top of `getDecorativeSx` when the button is animated. */
export function getDecorativeAuroraSx(): SxProps<Theme> {
  return {
    position: 'relative',
    overflow: 'hidden',
    // Contains the negative z-index so the layers cannot slip behind the button.
    isolation: 'isolate',
    ...AURORA_KEYFRAMES,
    '&::before': auroraLayer(
      AURORA_LAYER_A,
      'crvDecorativeDriftA 9s ease-in-out infinite',
    ),
    '&::after': auroraLayer(
      AURORA_LAYER_B,
      'crvDecorativeDriftB 13s ease-in-out infinite',
    ),
    // Hover pulls the light forward rather than speeding it up — a faster drift
    // on hover reads as a glitch on a button this small.
    '&:hover::before, &:hover::after': { opacity: 0.6 },
    '&::before, &::after': { opacity: 0.42, transition: 'opacity 200ms ease' },
    '&.Mui-disabled::before, &.Mui-disabled::after': { display: 'none' },
    '@media (prefers-reduced-motion: reduce)': {
      '&::before, &::after': { animation: 'none' },
    },
  };
}

/** glow/primary, the hover effect style on the Figma component. */
const GLOW_PRIMARY = `0 0 4px 0 rgba(23, 137, 250, 0.36)`;

export function getDecorativeSx(size: CrvButtonDecorativeSize): SxProps<Theme> {
  const metrics = buttonSizing[size];

  return {
    height: metrics.height,
    minHeight: metrics.height,
    px: `${metrics.paddingX}px`,
    py: `${metrics.paddingY}px`,
    gap: `${metrics.gap}px`,
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
    '& .MuiSvgIcon-root': { fontSize: metrics.iconSize },
    '&:hover': {
      backgroundImage: DECORATIVE_GRADIENT,
      boxShadow: GLOW_PRIMARY,
      color: colors.content.inverse,
    },
    '&:active': {
      backgroundImage: DECORATIVE_GRADIENT,
      boxShadow: 'none',
      // Figma dims the whole pressed variant rather than recolouring it.
      opacity: 0.85,
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
