'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import { getDecorativeAuroraSx, getDecorativeSx } from './crvButtonDecorativeStyles';
import type { CrvButtonDecorativeProps } from './CrvButtonDecorative.types';

/**
 * The gradient AI button. Reserved for the primary action of an AI feature —
 * see rules/components/crv-button-decorative.md.
 */
export const CrvButtonDecorative = forwardRef<HTMLButtonElement, CrvButtonDecorativeProps>(
  function CrvButtonDecorative(
    { size = 'medium', animated = true, startIcon, endIcon, children, sx, ...rest },
    ref,
  ) {
    return (
      <MuiButton
        ref={ref}
        variant="contained"
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={[
          getDecorativeSx(size),
          ...(animated ? [getDecorativeAuroraSx()] : []),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);
