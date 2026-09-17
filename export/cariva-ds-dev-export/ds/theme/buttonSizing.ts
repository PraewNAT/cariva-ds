import { spacing } from '../tokens';

/**
 * The one size scale every button in Figma follows — `crv-button-standard`,
 * `crv-button-loading`, `crv-button-decorative` and the action half of
 * `crv-button-split` all measure the same at each size.
 *
 * Keeping it here means a size that changes in Figma changes in one place.
 */
export type CrvButtonSizeName = 'small' | 'medium' | 'large';

export type CrvButtonMetrics = {
  /** Fixed outer height. */
  height: number;
  /** Vertical padding. */
  paddingY: number;
  /** Horizontal padding on a button that carries a label. */
  paddingX: number;
  /** Space between the label and its icons. */
  gap: number;
  /** Icon box, and the side of a square icon-only button's padding. */
  iconSize: number;
  /** Padding on every side of an icon-only button. */
  squarePadding: number;
  /** Label text style — Figma binds `typography/label/{small|medium|large}` per size. */
  label: 'small' | 'medium' | 'large';
};

export const buttonSizing: Record<CrvButtonSizeName, CrvButtonMetrics> = {
  small: {
    height: 32,
    paddingY: spacing.sm,
    paddingX: spacing.md,
    gap: spacing.xs,
    iconSize: 16,
    squarePadding: spacing.sm,
    label: 'small',
  },
  medium: {
    height: 36,
    paddingY: spacing.sm,
    paddingX: spacing.lg,
    gap: spacing.sm,
    iconSize: 20,
    squarePadding: spacing.sm,
    label: 'medium',
  },
  large: {
    height: 48,
    paddingY: spacing.md,
    paddingX: spacing.xl,
    gap: spacing.md,
    iconSize: 24,
    squarePadding: spacing.md,
    label: 'large',
  },
};
