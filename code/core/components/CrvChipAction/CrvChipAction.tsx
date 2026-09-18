'use client';

import { forwardRef } from 'react';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import { CrvAvatar } from '../CrvAvatar';
import { CHIP_AVATAR_SIZE, getChipActionSx } from './crvChipActionStyles';
import type { CrvChipActionProps } from './CrvChipAction.types';

// Ground truth from Figma (crv-chip-action, node 4459:62796)
export const CrvChipAction = forwardRef<HTMLDivElement, CrvChipActionProps>(
  function CrvChipAction(
    {
      label = 'Chip',
      thumbnailVisible = false,
      deleteVisible = false,
      thumbnailInitials = 'OP',
      thumbnailIcon,
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
            thumbnailIcon != null ? (
              <CrvAvatar size={CHIP_AVATAR_SIZE[size]} content="icon" icon={thumbnailIcon} />
            ) : (
              <CrvAvatar size={CHIP_AVATAR_SIZE[size]} content="text" initials={thumbnailInitials} />
            )
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
