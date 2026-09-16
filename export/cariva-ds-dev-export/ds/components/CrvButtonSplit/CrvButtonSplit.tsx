'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import {
  getSplitActionSx,
  getSplitDividerSx,
  getSplitRootSx,
  getSplitTriggerSx,
} from './crvButtonSplitStyles';
import type { CrvButtonSplitProps } from './CrvButtonSplit.types';

/**
 * One primary action plus a trigger for its alternatives — see
 * rules/components/crv-button-split.md.
 */
export const CrvButtonSplit = forwardRef<HTMLDivElement, CrvButtonSplitProps>(
  function CrvButtonSplit(
    {
      children,
      color = 'primary',
      size = 'medium',
      disabled = false,
      startIcon,
      triggerIcon,
      onClick,
      onTriggerClick,
      triggerLabel,
      className,
    },
    ref,
  ) {
    return (
      <Box ref={ref} className={className} sx={getSplitRootSx(color, size, disabled)}>
        <ButtonBase disabled={disabled} onClick={onClick} sx={getSplitActionSx(size, disabled)}>
          {startIcon}
          {children}
        </ButtonBase>
        <Box aria-hidden sx={getSplitDividerSx(color, disabled)} />
        <ButtonBase
          disabled={disabled}
          onClick={onTriggerClick}
          aria-label={triggerLabel}
          aria-haspopup="menu"
          sx={getSplitTriggerSx(size, disabled)}
        >
          {triggerIcon ?? <ExpandMoreRoundedIcon />}
        </ButtonBase>
      </Box>
    );
  },
);
