import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type {
  CrvStepperMarkerStatus,
  CrvStepState,
  CrvStepTextAlign,
} from './CrvStepper.types';

export const STEPPER_ICON_SIZE = 24;
/** Figma nests a 20px glyph inside the 24px circle. */
export const STEPPER_ICON_GLYPH_SIZE = 20;
export const STEPPER_COMPACT_WIDTH = 400;
/** MUI v7 renders `StepLabel`'s optional slot unwrapped, so the step supplies this hook. */
export const OPTIONAL_CLASS = 'crv-step-optional';

/**
 * Figma `crv-stepper-marker`: every status paints a filled 24px circle. Only
 * `default` and `active` carry their content in a colour; the rest knock it out
 * in white.
 */
export function getStepIconColors(state: CrvStepState | CrvStepperMarkerStatus) {
  switch (state) {
    case 'active':
      return {
        backgroundColor: colors.brand.primary.onSurface.muted,
        color:           colors.brand.primary.onSurface.default,
      };
    case 'complete':
    case 'done':
      return {
        backgroundColor: colors.brand.primary.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'error':
      return {
        backgroundColor: colors.status.error.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'warning':
      return {
        backgroundColor: colors.status.warning.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'info':
      return {
        backgroundColor: colors.status.info.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'success':
      return {
        backgroundColor: colors.status.success.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'inactive':
    case 'default':
    default:
      return {
        backgroundColor: colors.bg.solid,
        color:           colors.content.secondary,
      };
  }
}

/**
 * Title and `Optional` always share one colour — Figma sets both from the same
 * token in all seven states, including `inactive`, which is as dark as the rest.
 */
export function getStepTitleColor(state: CrvStepState): string {
  if (state === 'error') return colors.status.error.onSurface.default;
  if (state === 'warning') return colors.status.warning.onSurface.default;
  if (state === 'info') return colors.status.info.onSurface.default;
  if (state === 'success') return colors.status.success.onSurface.default;
  return colors.content.primary;
}

export function getStepIconSx(
  state: CrvStepState | CrvStepperMarkerStatus,
): SxProps<Theme> {
  const palette = getStepIconColors(state);

  return {
    width:           STEPPER_ICON_SIZE,
    height:          STEPPER_ICON_SIZE,
    borderRadius:    `${radius.full}px`,
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
    backgroundColor: palette.backgroundColor,
    color:           palette.color,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        typography.fontSize.caption.caption,
    lineHeight:      `${typography.lineHeight.caption.caption}px`,
    fontWeight:      typography.fontWeight.regular,
    '& .MuiSvgIcon-root': {
      fontSize: STEPPER_ICON_GLYPH_SIZE,
    },
  };
}

export function getStepLabelSx(
  state: CrvStepState,
  textAlign: CrvStepTextAlign,
): SxProps<Theme> {
  return {
    // Figma stacks title over optional with no gap between them.
    '& .MuiStepLabel-labelContainer': {
      display:       'flex',
      flexDirection: 'column',
      gap:           0,
    },
    '& .MuiStepLabel-label, & .MuiStepLabel-label.Mui-active, & .MuiStepLabel-label.Mui-completed':
      {
        color:      getStepTitleColor(state),
        fontFamily: typography.fontFamily.sans,
        fontSize:   typography.fontSize.label.medium,
        lineHeight: `${typography.lineHeight.label.medium}px`,
        fontWeight: typography.fontWeight.medium,
        textAlign:  textAlign === 'center' ? 'center' : 'left',
        marginTop:  textAlign === 'center' ? `${spacing.sm}px` : 0,
      },
    '& .MuiStepLabel-label.Mui-error': {
      color: colors.status.error.onSurface.default,
    },
    [`& .${OPTIONAL_CLASS}`]: {
      display:    'block',
      color:      getStepTitleColor(state),
      fontFamily: typography.fontFamily.sans,
      fontSize:   typography.fontSize.caption.caption,
      lineHeight: `${typography.lineHeight.caption.caption}px`,
      fontWeight: typography.fontWeight.regular,
      textAlign:  textAlign === 'center' ? 'center' : 'left',
    },
  };
}

export function getStepperSx(
  alignment: 'horizontal' | 'vertical',
  textAlign: CrvStepTextAlign,
  smallScreen: boolean,
): SxProps<Theme> {
  const useAlternativeLabel = textAlign === 'center';

  return {
    px: `${spacing.sm}px`,
    '& .MuiStepConnector-root': {
      ...(alignment === 'horizontal'
        ? {
            top:       12,
            left:      'calc(-50% + 20px)',
            right:     'calc(50% + 20px)',
          }
        : {
            marginLeft: 12,
          }),
    },
    '& .MuiStepConnector-line': {
      borderColor: colors.border.default,
      ...(alignment === 'vertical'
        ? { minHeight: 24 }
        : { borderTopWidth: 1 }),
    },
    '& .MuiStep-root': {
      px: smallScreen ? `${spacing.xs}px` : `${spacing.sm}px`,
    },
    ...(useAlternativeLabel
      ? {
          '& .MuiStepLabel-root': {
            flexDirection: 'column-reverse',
          },
        }
      : {}),
  };
}

export function getStepperCompactSx(): SxProps<Theme> {
  return {
    width:          STEPPER_COMPACT_WIDTH,
    maxWidth:       '100%',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            `${spacing.sm}px`,
    px:             `${spacing.sm}px`,
    py:             `${spacing.sm}px`,
  };
}

export function getStepperCompactDotSx(active: boolean): SxProps<Theme> {
  return {
    width:           8,
    height:          8,
    borderRadius:    `${radius.full}px`,
    backgroundColor: active
      ? colors.brand.primary.onSurface.default
      : colors.content.disabled,
    flexShrink:      0,
  };
}

export function getStepperCompactTextSx(): SxProps<Theme> {
  return {
    color:      colors.content.primary,
    fontFamily: typography.fontFamily.sans,
    fontSize:   typography.fontSize.body.medium,
    lineHeight: `${typography.lineHeight.body.medium}px`,
    fontWeight: typography.fontWeight.regular,
    minWidth:   48,
    textAlign:  'center',
  };
}

export function getStepperCompactProgressSx(): SxProps<Theme> {
  return {
    flex:            1,
    mx:              `${spacing.sm}px`,
    height:          4,
    borderRadius:    `${radius.full}px`,
    backgroundColor: colors.brand.primary.onSurface.subtle,
    '& .MuiLinearProgress-bar': {
      borderRadius:    `${radius.full}px`,
      backgroundColor: colors.brand.primary.onSurface.default,
    },
  };
}

export function resolveStepState(
  index: number,
  activeStep: number,
  explicit?: CrvStepState,
): CrvStepState {
  if (explicit) return explicit;
  if (index < activeStep) return 'complete';
  if (index === activeStep) return 'active';
  return 'inactive';
}
