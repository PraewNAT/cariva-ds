'use client';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CrvStepIcon } from './CrvStepperMarker';
import { OPTIONAL_CLASS, getStepLabelSx } from './crvStepperStyles';
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
      sx={{ px: 0, ...(typeof sx === 'object' && !Array.isArray(sx) ? sx : {}) }}
      {...rest}
    >
      <StepLabel
        optional={
          optional ? (
            // MUI v7 drops the optional slot in as a bare text node, so it has
            // no class of its own to style — give it one.
            <Box component="span" className={OPTIONAL_CLASS}>
              {optionalContent}
            </Box>
          ) : undefined
        }
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
