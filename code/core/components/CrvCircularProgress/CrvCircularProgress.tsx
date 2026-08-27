'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import {
  CIRCULAR_PROGRESS_SIZE,
  CIRCULAR_PROGRESS_THICKNESS,
  getProgressPalette,
} from '../../crvProgressStyles';
import type { CrvCircularProgressProps } from './CrvCircularProgress.types';

const rotateKeyframe = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dashKeyframe = keyframes`
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
  100% { stroke-dasharray: 1, 200; stroke-dashoffset: -126; }
`;

// Ground truth: Figma crv-circular-progress 4456:16646 — track + fill ellipses
export const CrvCircularProgress = forwardRef<HTMLDivElement, CrvCircularProgressProps>(
  function CrvCircularProgress(
    {
      variant = 'indeterminate',
      size = 'medium',
      color = 'primary',
      value = 60,
      sx,
      ...rest
    },
    ref,
  ) {
    const palette = getProgressPalette(color);
    const dim = CIRCULAR_PROGRESS_SIZE[size];
    const stroke = CIRCULAR_PROGRESS_THICKNESS[size];
    const radius = (dim - stroke) / 2;
    const center = dim / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.min(100, Math.max(0, value));
    const dashOffset = circumference * (1 - clamped / 100);

    return (
      <Box
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={variant === 'determinate' ? Math.round(clamped) : undefined}
        sx={[
          {
            width: dim,
            height: dim,
            display: 'inline-flex',
            flexShrink: 0,
            ...(variant === 'indeterminate'
              ? { animation: `${rotateKeyframe} 1.4s linear infinite` }
              : {}),
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        <Box
          component="svg"
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
          aria-hidden
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={palette.track}
            strokeWidth={stroke}
          />
          <Box
            component="circle"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={palette.fill}
            strokeWidth={stroke}
            strokeLinecap="round"
            {...(variant === 'determinate'
              ? {
                  strokeDasharray: `${circumference}`,
                  strokeDashoffset: `${dashOffset}px`,
                }
              : {})}
            sx={{
              transformOrigin: `${center}px ${center}px`,
              ...(variant === 'determinate'
                ? { transform: 'rotate(-90deg)' }
                : { animation: `${dashKeyframe} 1.4s ease-in-out infinite` }),
            }}
          />
        </Box>
      </Box>
    );
  },
);
