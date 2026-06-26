'use client';

import { forwardRef } from 'react';
import Radio from '@mui/material/Radio';
import { checkedIcon, uncheckedIcon } from './crvRadioIcons';
import { getRadioRootSx } from './crvRadioStyles';
import type { CrvRadioBaseProps } from './CrvRadioBase.types';

// Ground truth from Figma (crv-radio-base, node 3848:6592)
export const CrvRadioBase = forwardRef<HTMLButtonElement, CrvRadioBaseProps>(
  function CrvRadioBase({ color = 'primary', disabled = false, sx, ...rest }, ref) {
    return (
      <Radio
        ref={ref}
        disabled={disabled}
        disableRipple
        icon={uncheckedIcon(disabled)}
        checkedIcon={checkedIcon(disabled)}
        sx={{
          ...getRadioRootSx(),
          ...sx,
        }}
        {...rest}
      />
    );
  },
);
