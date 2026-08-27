import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvStepState, CrvStepTextAlign } from './CrvStepper.types';

export const STEPPER_ICON_SIZE = 24;
export const MOBILE_STEPPER_WIDTH = 400;

export function getStepIconColors(state: CrvStepState) {
  switch (state) {
    case 'active':
    case 'complete':
      return {
        backgroundColor: colors.brand.primary.onSurface.default,
        color:           colors.content.onBrand,
      };
    case 'error':
      return {
        backgroundColor: 'transparent',
        color:           colors.status.error.onSurface.default,
      };
    case 'warning':
      return {
        backgroundColor: 'transparent',
        color:           colors.status.warning.onSurface.default,
      };
    case 'info':
      return {
        backgroundColor: 'transparent',
        color:           colors.status.info.onSurface.default,
      };
    case 'success':
      return {
        backgroundColor: 'transparent',
        color:           colors.status.success.onSurface.default,
      };
    case 'inactive':
    default:
      return {
        backgroundColor: colors.content.disabled,
        color:           colors.content.onBrand,
      };
  }
}

export function getStepTitleColor(state: CrvStepState): string {
  if (state === 'inactive') return colors.content.secondary;
  if (state === 'error') return colors.status.error.onSurface.default;
  if (state === 'warning') return colors.status.warning.onSurface.default;
  if (state === 'info') return colors.status.info.onSurface.default;
  if (state === 'success') return colors.status.success.onSurface.default;
  return colors.content.primary;
}

export function getStepIconSx(state: CrvStepState): SxProps<Theme> {
  const palette = getStepIconColors(state);
  const isSemanticIcon = ['error', 'warning', 'info', 'success'].includes(state);

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
      fontSize: isSemanticIcon ? STEPPER_ICON_SIZE : 20,
    },
  };
}

export function getStepLabelSx(
  state: CrvStepState,
  textAlign: CrvStepTextAlign,
): SxProps<Theme> {
  return {
    '& .MuiStepLabel-label': {
      color:         getStepTitleColor(state),
      fontFamily:    typography.fontFamily.sans,
      fontSize:      typography.fontSize.label.medium,
      lineHeight:    `${typography.lineHeight.label.medium}px`,
      fontWeight:    typography.fontWeight.regular,
      textAlign:     textAlign === 'center' ? 'center' : 'left',
      marginTop:     textAlign === 'center' ? `${spacing.sm}px` : 0,
    },
    '& .MuiStepLabel-label.Mui-active': {
      color:      getStepTitleColor('active'),
      fontWeight: typography.fontWeight.regular,
    },
    '& .MuiStepLabel-label.Mui-completed': {
      color:      getStepTitleColor('complete'),
      fontWeight: typography.fontWeight.regular,
    },
    '& .MuiStepLabel-label.Mui-error': {
      color: colors.status.error.onSurface.default,
    },
    '& .MuiStepLabel-optional': {
      color:         getStepTitleColor(state),
      fontFamily:    typography.fontFamily.sans,
      fontSize:      typography.fontSize.body.small,
      lineHeight:    `${typography.lineHeight.body.small}px`,
      fontWeight:    typography.fontWeight.regular,
      marginTop:     `${spacing['2xs']}px`,
    },
  };
}

export function getStepperSx(
  alignment: 'horizontal' | 'vertical',
  textAlign: CrvStepTextAlign,
  smallScreen: boolean,
): SxProps<Theme> {
  const useAlternativeLabel =
    textAlign === 'center' || (smallScreen && textAlign === 'center');

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

export function getMobileStepperSx(): SxProps<Theme> {
  return {
    width:          MOBILE_STEPPER_WIDTH,
    maxWidth:       '100%',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            `${spacing.sm}px`,
    px:             `${spacing.sm}px`,
    py:             `${spacing.sm}px`,
  };
}

export function getMobileDotSx(active: boolean): SxProps<Theme> {
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

export function getMobileStepTextSx(): SxProps<Theme> {
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

export function getMobileProgressSx(): SxProps<Theme> {
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
