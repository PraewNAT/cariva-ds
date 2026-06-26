'use client';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CrvStepIcon } from './CrvStepperIcon';
import { getStepLabelSx } from './crvStepperStyles';
import type { CrvStepProps } from './CrvStepper.types';

export function CrvStep({
  state = 'inactive',
  textAlign = 'left',
  stepNumber = 1,
  stepTitle = 'Step title',
  optional = true,
  optionalContent = 'Optional',
  sx,
  ...rest
}: CrvStepProps) {
  return (
    <Step
      active={state === 'active'}
      completed={state === 'complete'}
      error={state === 'error'}
      sx={{ px: 0, ...(typeof sx === 'object' && !Array.isArray(sx) ? sx : {}) }}
      {...rest}
    >
      <StepLabel
        optional={optional ? optionalContent : undefined}
        StepIconComponent={(iconProps) => (
          <CrvStepIcon {...iconProps} state={state} icon={stepNumber} />
        )}
        sx={getStepLabelSx(state, textAlign)}
      >
        {stepTitle}
      </StepLabel>
    </Step>
  );
}
