'use client';

import { forwardRef } from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CrvButton } from '../CrvButton';
import { CrvStepIcon } from './CrvStepperIcon';
import {
  getMobileDotSx,
  getMobileProgressSx,
  getMobileStepTextSx,
  getMobileStepperSx,
  getStepLabelSx,
  getStepperSx,
  resolveStepState,
} from './crvStepperStyles';
import type {
  CrvMobileStepperProps,
  CrvStepperProps,
} from './CrvStepper.types';

export const CrvStepper = forwardRef<HTMLDivElement, CrvStepperProps>(
  function CrvStepper(
    {
      steps,
      activeStep,
      alignment = 'horizontal',
      textAlign = 'left',
      showOptional = false,
      smallScreen = false,
      sx,
      ...rest
    },
    ref,
  ) {
    const orientation = alignment === 'vertical' ? 'vertical' : 'horizontal';
    const alternativeLabel =
      textAlign === 'center' || (smallScreen && textAlign === 'center');

    return (
      <Stepper
        ref={ref}
        activeStep={activeStep}
        orientation={orientation}
        alternativeLabel={alternativeLabel}
        sx={[
          getStepperSx(orientation, textAlign, smallScreen),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {steps.map((step, index) => {
          const state = resolveStepState(index, activeStep, step.state);
          const optionalLabel =
            showOptional && step.optional !== undefined && step.optional !== false
              ? step.optional
              : showOptional && step.optional === undefined
                ? 'Optional'
                : undefined;

          return (
            <Step
              key={`${index}-${String(step.label)}`}
              active={state === 'active'}
              completed={state === 'complete'}
              error={state === 'error'}
            >
              <StepLabel
                optional={optionalLabel}
                StepIconComponent={(iconProps) => (
                  <CrvStepIcon
                    {...iconProps}
                    state={state}
                    icon={index + 1}
                  />
                )}
                sx={getStepLabelSx(state, textAlign)}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  },
);

export function CrvMobileStepper({
  progressType = 'text',
  activeStep,
  steps,
  backLabel = 'Back',
  nextLabel = 'Next',
  backDisabled,
  nextDisabled,
  onBack,
  onNext,
}: CrvMobileStepperProps) {
  const progress = steps > 0 ? ((activeStep + 1) / steps) * 100 : 0;
  const isFirst = activeStep <= 0;
  const isLast = activeStep >= steps - 1;

  return (
    <Box sx={getMobileStepperSx()}>
      <CrvButton
        variant="text"
        color="primary"
        size="small"
        startIcon={<ArrowBackIcon />}
        disabled={backDisabled ?? isFirst}
        onClick={onBack}
      >
        {backLabel}
      </CrvButton>

      {progressType === 'dots' ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${8}px`, flex: 1, justifyContent: 'center' }}>
          {Array.from({ length: steps }, (_, index) => (
            <Box key={index} sx={getMobileDotSx(index === activeStep)} />
          ))}
        </Box>
      ) : null}

      {progressType === 'text' ? (
        <Box sx={getMobileStepTextSx()}>
          {activeStep + 1}/{steps}
        </Box>
      ) : null}

      {progressType === 'progress' ? (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={getMobileProgressSx()}
        />
      ) : null}

      <CrvButton
        variant="text"
        color="primary"
        size="small"
        disabled={nextDisabled ?? isLast}
        onClick={onNext}
      >
        {nextLabel}
      </CrvButton>
    </Box>
  );
}
