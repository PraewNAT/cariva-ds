'use client';

import { forwardRef } from 'react';
import MuiRating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getRatingSx } from './crvRatingStyles';
import type { CrvRatingProps } from './CrvRating.types';

// Figma: StarSharp (active) + StarOutlineFilled (inactive) — outline-style empty star

// Ground truth from Figma (<Rating> component set, node 4887:7022)
export const CrvRating = forwardRef<HTMLSpanElement, CrvRatingProps>(
  function CrvRating(
    {
      size = 'medium',
      readOnly = false,
      precision = 0.5,
      max = 5,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <MuiRating
        ref={ref}
        size={size}
        readOnly={readOnly}
        precision={precision}
        max={max}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        sx={[
          getRatingSx(size, readOnly),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      />
    );
  },
);
