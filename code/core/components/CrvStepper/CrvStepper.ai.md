> Source of truth: ../../../rules/components/crv-stepper.md
> Figma page: Stepper, node 4714:6228

# CrvStepper

Multi-step progress for wizard-like flows.

## Exports

- `CrvStepper`
- `CrvStep`
- `CrvStepperIcon`
- `CrvStepIcon`
- `CrvMobileStepper`

## Figma Mapping

- `crv-stepper-icon` → `CrvStepperIcon`
- `crv-stepper-base` → `CrvStep`
- `crv-stepper` → `CrvStepper`
- `crv-mobile-stepper` → `CrvMobileStepper`

## AI Implementation Rules

1. Use `CrvStepper` for desktop/tablet multi-step flows with 3–5 steps.
2. Use `CrvMobileStepper` on small screens instead of horizontal `CrvStepper`.
3. Derive step states from `activeStep`; set explicit `state` only for semantic overrides.
4. Reuse `CrvButton` in mobile stepper — do not style raw MUI buttons.
5. Do not use steppers for 1–2 step flows.
