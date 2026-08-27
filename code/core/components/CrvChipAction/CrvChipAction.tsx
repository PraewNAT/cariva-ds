'use client';

import { forwardRef } from 'react';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import { CrvAvatar } from '../CrvAvatar';
import { getChipActionSx } from './crvChipActionStyles';
import type { CrvChipActionProps } from './CrvChipAction.types';

// Ground truth from Figma (crv-chip-action, node 4459:62796)
export const CrvChipAction = forwardRef<HTMLDivElement, CrvChipActionProps>(
  function CrvChipAction(
    {
      label = 'Chip',
      thumbnailVisible = false,
      deleteVisible = false,
      thumbnailInitials = 'OP',
      size = 'medium',
      color = 'default',
      variant = 'filled',
      disabled = false,
      onDelete,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <Chip
        ref={ref}
        label={label}
        variant={variant}
        size={size}
        disabled={disabled}
        avatar={
          thumbnailVisible ? (
            <CrvAvatar size="small" content="text" initials={thumbnailInitials} />
          ) : undefined
        }
        deleteIcon={<CancelIcon />}
        onDelete={deleteVisible ? onDelete : undefined}
        sx={{
          ...getChipActionSx(size, color, variant, Boolean(disabled)),
          ...sx,
        }}
        {...rest}
      />
    );
  },
);
