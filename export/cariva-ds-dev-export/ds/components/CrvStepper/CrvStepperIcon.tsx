'use client';

import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from '@mui/material/Box';
import { getStepIconSx } from './crvStepperStyles';
import type { CrvStepIconProps, CrvStepperIconProps, CrvStepState } from './CrvStepper.types';

function SemanticStepIcon({ state }: { state: CrvStepState }) {
  switch (state) {
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningAmberIcon />;
    case 'info':
      return <InfoIcon />;
    case 'success':
      return <CheckCircleIcon />;
    default:
      return null;
  }
}

export function CrvStepperIcon({
  state = 'default',
  value = 1,
}: CrvStepperIconProps) {
  const visualState: CrvStepState = state === 'done' ? 'complete' : 'inactive';

  return (
    <Box sx={getStepIconSx(visualState)} aria-hidden>
      {state === 'done' ? <CheckIcon /> : value}
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

  const isSemantic = ['error', 'warning', 'info', 'success'].includes(resolvedState);

  return (
    <Box sx={getStepIconSx(resolvedState)} aria-hidden>
      {resolvedState === 'complete' ? (
        <CheckIcon />
      ) : isSemantic ? (
        <SemanticStepIcon state={resolvedState} />
      ) : (
        icon
      )}
    </Box>
  );
}
