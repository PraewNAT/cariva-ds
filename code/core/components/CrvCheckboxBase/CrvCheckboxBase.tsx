'use client';

import { forwardRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import {
  checkedIcon,
  indeterminateIcon,
  uncheckedIcon,
} from './crvCheckboxIcons';
import { getCheckboxRootSx } from './crvCheckboxStyles';
import type { CrvCheckboxBaseProps } from './CrvCheckboxBase.types';

export const CrvCheckboxBase = forwardRef<HTMLButtonElement, CrvCheckboxBaseProps>(
  function CrvCheckboxBase({ color = 'primary', disabled = false, sx, ...rest }, ref) {
    return (
      <Checkbox
        ref={ref}
        disabled={disabled}
        disableRipple
        icon={uncheckedIcon(disabled, color)}
        checkedIcon={checkedIcon(disabled)}
        indeterminateIcon={indeterminateIcon(disabled)}
        sx={{
          ...getCheckboxRootSx(),
          ...sx,
        }}
        {...rest}
      />
    );
  },
);
