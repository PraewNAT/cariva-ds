import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvInputSize } from '../../components/CrvInput/CrvInput.types';
import { defaultProductStyle, productStyle } from '../../tokens';
import { getCarivaColors, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export const FIELD_MIN_HEIGHT: Record<CrvInputSize, number> = {
  medium: 48,
  small: 38,
};

function fieldPaddingV(size: CrvInputSize, theme: Theme) {
  const s = getCarivaSpacing(theme);
  return size === 'medium' ? s.md : s.sm;
}

function labelFontSize(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.fontSize.label.medium : ty.fontSize.label.small;
}

function labelLineHeight(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.lineHeight.label.medium : ty.lineHeight.label.small;
}

function inputFontSize(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.fontSize.body.large : ty.fontSize.body.medium;
}

function inputLineHeight(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.lineHeight.body.large : ty.lineHeight.body.medium;
}

function helperFontSize(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.fontSize.body.medium : ty.fontSize.body.small;
}

function helperLineHeight(size: CrvInputSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  return size === 'medium' ? ty.lineHeight.body.medium : ty.lineHeight.body.small;
}

function inputRadius(size: CrvInputSize) {
  return size === 'medium'
    ? productStyle[defaultProductStyle].inputMd
    : productStyle[defaultProductStyle].inputSm;
}

export function getCrvInputFormControlSx(): SxProps<Theme> {
  return (theme) => ({
    gap: `${getCarivaSpacing(theme).xs}px`,
  });
}

export function getCrvInputLabelRowSx(disabled: boolean): SxProps<Theme> {
  return (theme) => ({
    display: 'flex',
    alignItems: 'baseline',
    gap: `${getCarivaSpacing(theme).md}px`,
    cursor: disabled ? 'default' : 'text',
  });
}

export function getCrvInputLabelSx(size: CrvInputSize): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      flex: 1,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${labelFontSize(size, theme)}px`,
      lineHeight: `${labelLineHeight(size, theme)}px`,
      fontWeight: ty.fontWeight.medium,
      color: c.content.primary,
    };
  };
}

export function getCrvInputSecondaryLabelSx(size: CrvInputSize): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      flexShrink: 0,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${labelFontSize(size, theme)}px`,
      lineHeight: `${labelLineHeight(size, theme)}px`,
      fontWeight: ty.fontWeight.medium,
      color: c.content.secondary,
    };
  };
}

export function getCrvInputOutlinedSx(
  size: CrvInputSize,
  disabled: boolean,
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);
    return {
      minHeight: FIELD_MIN_HEIGHT[size],
      borderRadius: `${inputRadius(size)}px`,
      backgroundColor: disabled ? c.onSurface.action.disabled : c.onSurface.default,
      gap: `${s.sm}px`,
      paddingTop: `${fieldPaddingV(size, theme)}px`,
      paddingBottom: `${fieldPaddingV(size, theme)}px`,
      paddingLeft: `${s.lg}px`,
      paddingRight: `${s.lg}px`,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${inputFontSize(size, theme)}px`,
      lineHeight: `${inputLineHeight(size, theme)}px`,
      fontWeight: ty.fontWeight.regular,
      color: disabled ? c.content.disabled : c.content.primary,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: c.border.default,
        borderWidth: 1,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: disabled ? c.border.disabled : c.border.strong,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: c.border.system,
        borderWidth: 2,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: c.border.error,
        borderWidth: 2,
      },
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: c.border.disabled,
      },
      '& .MuiOutlinedInput-input': { padding: 0 },
      '& .MuiInputAdornment-root': {
        margin: 0,
        color: disabled ? c.content.disabled : c.content.primary,
      },
      '& input::placeholder': {
        color: c.content.placeholder,
        opacity: 1,
      },
      '& input:disabled::placeholder': {
        color: c.content.disabled,
      },
    };
  };
}

export function getCrvInputHelperSx(
  size: CrvInputSize,
  error: boolean,
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      margin: 0,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${helperFontSize(size, theme)}px`,
      lineHeight: `${helperLineHeight(size, theme)}px`,
      fontWeight: ty.fontWeight.regular,
      color: error ? c.status.error.content.default : c.content.secondary,
    };
  };
}
