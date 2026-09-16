import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type CrvButtonVariant = 'contained' | 'outlined' | 'text' | 'elevated';
export type CrvButtonColor = 'primary' | 'error' | 'neutral';

/**
 * Figma pairs `color="neutral"` with outlined, text and elevated only — there
 * is deliberately no contained neutral button.
 */
export type CrvButtonNeutralVariant = Exclude<CrvButtonVariant, 'contained'>;
export type CrvButtonSize = 'small' | 'medium' | 'large';

interface CrvButtonBaseProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  size?: CrvButtonSize;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

/**
 * `color="neutral"` accepts only the variants Figma draws for it, so a
 * contained neutral button is a type error rather than a silent mismatch.
 */
export type CrvButtonProps = CrvButtonBaseProps &
  (
    | { color?: 'primary' | 'error'; variant?: CrvButtonVariant }
    | { color: 'neutral'; variant?: CrvButtonNeutralVariant }
  );
