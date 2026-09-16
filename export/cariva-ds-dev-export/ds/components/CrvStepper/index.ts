export { CrvStep } from './CrvStep';
export { CrvStepper, CrvStepperCompact } from './CrvStepper';
export { CrvStepIcon, CrvStepperMarker } from './CrvStepperMarker';
export type {
  CrvStepperCompactProgressType,
  CrvStepperCompactProps,
  CrvStepIconProps,
  CrvStepperAlignment,
  CrvStepperMarkerProps,
  CrvStepperMarkerState,
  CrvStepperProps,
  CrvStepperStep,
  CrvStepProps,
  CrvStepState,
  CrvStepTextAlign,
} from './CrvStepper.types';

/** @deprecated Figma renamed `crv-stepper-icon` → `crv-stepper-marker` (2026-09-09). Use `CrvStepperMarker`. */
export { CrvStepperMarker as CrvStepperIcon } from './CrvStepperMarker';
/** @deprecated Figma renamed `crv-mobile-stepper` → `crv-stepper-compact` (2026-09-09). Use `CrvStepperCompact`. */
export { CrvStepperCompact as CrvMobileStepper } from './CrvStepper';
export type {
  /** @deprecated Use `CrvStepperMarkerProps`. */
  CrvStepperMarkerProps as CrvStepperIconProps,
  /** @deprecated Use `CrvStepperMarkerState`. */
  CrvStepperMarkerState as CrvStepperIconState,
  /** @deprecated Use `CrvStepperCompactProps`. */
  CrvStepperCompactProps as CrvMobileStepperProps,
  /** @deprecated Use `CrvStepperCompactProgressType`. */
  CrvStepperCompactProgressType as CrvMobileStepperProgressType,
} from './CrvStepper.types';
