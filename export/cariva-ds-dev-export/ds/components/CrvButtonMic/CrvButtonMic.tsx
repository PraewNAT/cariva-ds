'use client';

import { forwardRef } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import {
  WAVEFORM_BAR_HEIGHTS,
  getMicButtonSx,
  getWaveformBarSx,
} from './crvButtonMicStyles';
import type { CrvButtonMicProps } from './CrvButtonMic.types';

/** Picker for the audio input device — see rules/components/crv-button-mic.md. */
export const CrvButtonMic = forwardRef<HTMLButtonElement, CrvButtonMicProps>(
  function CrvButtonMic(
    { label, active = false, showWaveform = true, sx, ...rest },
    ref,
  ) {
    return (
      <ButtonBase
        ref={ref}
        sx={[getMicButtonSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {showWaveform ? (
          <Box
            aria-hidden
            sx={{ display: 'flex', alignItems: 'center', gap: '2px', height: 16 }}
          >
            {WAVEFORM_BAR_HEIGHTS.map((height, index) => (
              <Box key={index} sx={getWaveformBarSx(height, active, index)} />
            ))}
          </Box>
        ) : null}
        <MicNoneRoundedIcon />
        <Box
          component="span"
          sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}
        >
          {label}
        </Box>
        <ExpandMoreRoundedIcon />
      </ButtonBase>
    );
  },
);
