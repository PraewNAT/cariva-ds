'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import {
  getOtpSlotInputSx,
  getOtpSlotWrapperSx,
} from './crvInputOtpStyles';
import type { CrvInputOtpBaseProps } from './CrvInputOtpBase.types';

// Ground truth from Figma (crv-input-otp-base, node 4315:749)
export const CrvInputOtpBase = forwardRef<HTMLInputElement, CrvInputOtpBaseProps>(
  function CrvInputOtpBase(
    { value = '', disabled = false, sx, ...rest },
    ref,
  ) {
    return (
      <Box sx={{ ...getOtpSlotWrapperSx(disabled), ...sx }}>
        <Box
          component="input"
          ref={ref}
          value={value}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-disabled={disabled}
          sx={getOtpSlotInputSx(disabled)}
          {...rest}
        />
      </Box>
    );
  },
);
