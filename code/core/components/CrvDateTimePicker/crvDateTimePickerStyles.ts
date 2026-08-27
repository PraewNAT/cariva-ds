import type { SxProps, Theme } from '@mui/material/styles';
import { colors, defaultProductStyle, productStyle, spacing, typography } from '../../tokens';

export type CrvDateTimePickerSize = 'small' | 'medium';

const FIELD_MIN_HEIGHT: Record<CrvDateTimePickerSize, number> = {
  small: 38,
  medium: 48,
};

const FIELD_PADDING_V: Record<CrvDateTimePickerSize, number> = {
  small: spacing.sm,
  medium: spacing.md,
};

const FIELD_RADIUS: Record<CrvDateTimePickerSize, number> = {
  small: productStyle[defaultProductStyle].inputSm,
  medium: productStyle[defaultProductStyle].inputMd,
};

const FIELD_FONT_SIZE: Record<CrvDateTimePickerSize, number> = {
  small: typography.fontSize.body.medium,
  medium: typography.fontSize.body.large,
};

const FIELD_LINE_HEIGHT: Record<CrvDateTimePickerSize, number> = {
  small: typography.lineHeight.body.medium,
  medium: typography.lineHeight.body.large,
};

export function crvPickerTextFieldSx(
  size: CrvDateTimePickerSize,
  disabled: boolean,
): SxProps<Theme> {
  return {
    fontFamily: typography.fontFamily.sans,
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.label.medium,
      lineHeight: `${typography.lineHeight.label.medium}px`,
      fontWeight: typography.fontWeight.medium,
      color: disabled ? colors.content.disabled : colors.content.secondary,
      '&.Mui-focused': {
        color: colors.brand.primary.content.default,
      },
      '&.Mui-error': {
        color: colors.status.error.content.default,
      },
    },
    '& .MuiOutlinedInput-root': {
      minHeight: FIELD_MIN_HEIGHT[size],
      borderRadius: `${FIELD_RADIUS[size]}px`,
      backgroundColor: disabled
        ? colors.onSurface.action.disabled
        : colors.onSurface.default,
      paddingTop: `${FIELD_PADDING_V[size]}px`,
      paddingBottom: `${FIELD_PADDING_V[size]}px`,
      paddingLeft: `${spacing.lg}px`,
      paddingRight: `${spacing.md}px`,
      fontFamily: typography.fontFamily.sans,
      fontSize: `${FIELD_FONT_SIZE[size]}px`,
      lineHeight: `${FIELD_LINE_HEIGHT[size]}px`,
      fontWeight: typography.fontWeight.regular,
      color: disabled ? colors.content.disabled : colors.content.primary,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.border.default,
        borderWidth: 1,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: disabled ? colors.border.disabled : colors.border.strong,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.border.system,
        borderWidth: 2,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.border.error,
        borderWidth: 2,
      },
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.border.disabled,
      },
    },
    '& .MuiInputBase-input': {
      padding: 0,
      fontFamily: typography.fontFamily.sans,
      fontSize: `${FIELD_FONT_SIZE[size]}px`,
      lineHeight: `${FIELD_LINE_HEIGHT[size]}px`,
      fontWeight: typography.fontWeight.regular,
      color: disabled ? colors.content.disabled : colors.content.primary,
      '&::placeholder': {
        color: colors.content.placeholder,
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root': {
      margin: 0,
      color: disabled ? colors.content.disabled : colors.content.secondary,
    },
    '& .MuiSvgIcon-root': {
      color: disabled ? colors.content.disabled : colors.content.secondary,
    },
    '& .MuiFormHelperText-root': {
      margin: `${spacing.xs}px 0 0`,
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.body.small,
      lineHeight: `${typography.lineHeight.body.small}px`,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.secondary,
      '&.Mui-error': {
        color: colors.status.error.content.default,
      },
    },
  };
}

export const crvPickerPopupSx: SxProps<Theme> = {
  fontFamily: typography.fontFamily.sans,
  color: colors.content.primary,
  '& .MuiPaper-root': {
    backgroundColor: colors.onSurface.default,
    color: colors.content.primary,
    border: `1px solid ${colors.border.default}`,
    borderRadius: `${productStyle[defaultProductStyle].containerMd}px`,
    fontFamily: typography.fontFamily.sans,
    backgroundImage: 'none',
  },
  '& .MuiTypography-root, & .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel': {
    fontFamily: typography.fontFamily.sans,
  },
  '& .MuiPickersCalendarHeader-label': {
    fontSize: typography.fontSize.label.medium,
    lineHeight: `${typography.lineHeight.label.medium}px`,
    fontWeight: typography.fontWeight.medium,
    color: colors.content.primary,
  },
  '& .MuiDayCalendar-weekDayLabel': {
    fontSize: typography.fontSize.label.small,
    lineHeight: `${typography.lineHeight.label.small}px`,
    fontWeight: typography.fontWeight.medium,
    color: colors.content.secondary,
  },
  '& .MuiPickersDay-root, & .MuiClockNumber-root': {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.body.medium,
    lineHeight: `${typography.lineHeight.body.medium}px`,
    color: colors.content.primary,
    '&:hover': {
      backgroundColor: colors.onSurface.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: `${colors.brand.primary.onSurface.default} !important`,
      color: `${colors.content.onBrand} !important`,
      '&:hover': {
        backgroundColor: `${colors.brand.primary.onSurface.hover} !important`,
      },
    },
    '&.Mui-disabled': {
      color: colors.content.disabled,
    },
  },
  '& .MuiPickersDay-today': {
    borderColor: colors.border.system,
  },
  '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton': {
    fontFamily: typography.fontFamily.sans,
    color: colors.content.primary,
    '&:hover': {
      backgroundColor: colors.onSurface.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: `${colors.brand.primary.onSurface.default} !important`,
      color: `${colors.content.onBrand} !important`,
    },
  },
  '& .MuiButton-textPrimary': {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    color: colors.brand.primary.content.default,
  },
};
