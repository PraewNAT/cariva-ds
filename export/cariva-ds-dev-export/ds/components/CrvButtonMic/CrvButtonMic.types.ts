import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { ReactNode } from 'react';

export interface CrvButtonMicProps
  extends Omit<ButtonBaseProps, 'children' | 'color'> {
  /** Name of the selected input device. */
  label: ReactNode;
  /** Animate the waveform while audio is coming in. */
  active?: boolean;
  /** Hide the waveform when no device is selected. */
  showWaveform?: boolean;
}
