import type { StepIconProps as MuiStepIconProps } from '@mui/material/StepIcon';
import type { StepProps as MuiStepProps } from '@mui/material/Step';
import type { StepperProps as MuiStepperProps } from '@mui/material/Stepper';
import type { ReactNode } from 'react';

/**
 * The `status` axis of the Figma `crv-stepper-marker` set, lower-cased.
 * Every status paints a filled 24px circle; only the colours change.
 */
export type CrvStepperMarkerStatus =
  | 'default'
  | 'active'
  | 'done'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

/** The `content` axis — the marker shows either its number or an icon. */
export type CrvStepperMarkerContent = 'number' | 'icon';

/** @deprecated Use `CrvStepperMarkerStatus`; this only ever had two of the seven. */
export type CrvStepperMarkerState = 'default' | 'done';

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

export type CrvStepperCompactProgressType = 'dots' | 'text' | 'progress';

export interface CrvStepperMarkerProps {
  /** Figma `status`. Defaults to `default`. */
  status?: CrvStepperMarkerStatus;
  /** Figma `content`. Defaults to `number`, or to `icon` when `icon` is given. */
  content?: CrvStepperMarkerContent;
  /** Shown when `content` is `number`. */
  value?: ReactNode;
  /**
   * Shown when `content` is `icon`. Figma ships a placeholder here and expects
   * each step to swap its own in, so there is no per-status default.
   */
  icon?: ReactNode;
  /** @deprecated Use `status`. `done` maps to `done`, anything else to `default`. */
  state?: CrvStepperMarkerState;
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

export interface CrvStepperCompactProps {
  progressType?: CrvStepperCompactProgressType;
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
