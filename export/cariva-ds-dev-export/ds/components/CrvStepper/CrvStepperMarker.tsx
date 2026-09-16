'use client';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import Box from '@mui/material/Box';
import { getStepIconSx } from './crvStepperStyles';
import type {
  CrvStepIconProps,
  CrvStepperMarkerProps,
  CrvStepperMarkerStatus,
  CrvStepState,
} from './CrvStepper.types';

/**
 * The icon `crv-stepper-base` swaps into the marker for each state. The marker
 * set itself ships `panorama-fish-eye` as a placeholder, so this mapping lives
 * with the step, not with the marker.
 */
const STEP_ICON_BY_STATE: Partial<Record<CrvStepState, JSX.Element>> = {
  complete: <CheckRoundedIcon />,
  error: <CloseRoundedIcon />,
  warning: <PriorityHighRoundedIcon />,
  info: <InfoOutlinedIcon />,
  success: <CheckRoundedIcon />,
};

export function CrvStepperMarker({
  status,
  content,
  value = 1,
  icon,
  state,
}: CrvStepperMarkerProps) {
  const resolvedStatus: CrvStepperMarkerStatus =
    status ?? (state === 'done' ? 'done' : 'default');
  const resolvedContent = content ?? (icon ? 'icon' : 'number');

  return (
    <Box sx={getStepIconSx(resolvedStatus)} aria-hidden>
      {resolvedContent === 'icon' ? (icon ?? <PanoramaFishEyeIcon />) : value}
    </Box>
  );
}

export function CrvStepIcon({
  icon,
  active,
  completed,
  error,
  state,
}: CrvStepIconProps) {
  const resolvedState: CrvStepState =
    state ??
    (error
      ? 'error'
      : completed
        ? 'complete'
        : active
          ? 'active'
          : 'inactive');

  return (
    <Box sx={getStepIconSx(resolvedState)} aria-hidden>
      {STEP_ICON_BY_STATE[resolvedState] ?? icon}
    </Box>
  );
}
