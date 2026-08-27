import type { StepIconProps as MuiStepIconProps } from '@mui/material/StepIcon';
import type { StepProps as MuiStepProps } from '@mui/material/Step';
import type { StepperProps as MuiStepperProps } from '@mui/material/Stepper';
import type { ReactNode } from 'react';

export type CrvStepperIconState = 'default' | 'done';

export type CrvStepState =
  | 'inactive'
  | 'active'
  | 'complete'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type CrvStepTextAlign = 'left' | 'center';

export type CrvStepperAlignment = 'horizontal' | 'vertical';

export type CrvMobileStepperProgressType = 'dots' | 'text' | 'progress';

export interface CrvStepperIconProps {
  state?: CrvStepperIconState;
  value?: ReactNode;
}

export interface CrvStepProps extends Omit<MuiStepProps, 'optional'> {
  state?: CrvStepState;
  textAlign?: CrvStepTextAlign;
  stepNumber?: number;
  stepTitle?: ReactNode;
  optional?: boolean;
  optionalContent?: ReactNode;
}

export interface CrvStepperStep {
  label: ReactNode;
  optional?: ReactNode;
  state?: CrvStepState;
}

export interface CrvStepperProps extends Omit<MuiStepperProps, 'orientation'> {
  steps: CrvStepperStep[];
  activeStep: number;
  alignment?: CrvStepperAlignment;
  textAlign?: CrvStepTextAlign;
  showOptional?: boolean;
  smallScreen?: boolean;
}

export interface CrvMobileStepperProps {
  progressType?: CrvMobileStepperProgressType;
  activeStep: number;
  steps: number;
  backLabel?: string;
  nextLabel?: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  onBack?: () => void;
  onNext?: () => void;
}

export interface CrvStepIconProps extends MuiStepIconProps {
  state?: CrvStepState;
}
