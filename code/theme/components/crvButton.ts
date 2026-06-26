import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvButtonColor } from '../../components/CrvButton/CrvButton.types';
import { getCarivaColors } from '../carivaTokens';

type OutlinedTokens = {
  color: string;
  borderColor: string;
  hoverBg: string;
  pressedBg: string;
  hoverColor: string;
  pressedColor: string;
};

function outlinedTokens(color: CrvButtonColor, theme?: Theme): OutlinedTokens {
  const c = getCarivaColors(theme);
  if (color === 'primary') {
    return {
      color: c.brand.primary.content.default,
      borderColor: c.brand.primary.border.default,
      hoverBg: c.brand.primary.onSurface.subtle,
      pressedBg: c.brand.primary.onSurface.muted,
      hoverColor: c.brand.primary.content.default,
      pressedColor: c.brand.primary.content.default,
    };
  }
  return {
    color: c.status.error.content.default,
    borderColor: c.border.error,
    hoverBg: c.status.error.onSurface.subtle,
    pressedBg: c.status.error.onSurface.muted,
    hoverColor: c.status.error.content.strong,
    pressedColor: c.status.error.content.strong,
  };
}

export function getCrvButtonOutlinedSx(color: CrvButtonColor): SxProps<Theme> {
  return (theme) => {
    const tokens = outlinedTokens(color, theme);
    return {
      color: tokens.color,
      borderColor: tokens.borderColor,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: tokens.hoverBg,
        borderColor: tokens.borderColor,
        color: tokens.hoverColor,
      },
      '&:active': {
        backgroundColor: tokens.pressedBg,
        borderColor: tokens.borderColor,
        color: tokens.pressedColor,
      },
    };
  };
}

export function getCrvButtonDisabledSx(
  variant: 'contained' | 'outlined' | 'text' = 'contained',
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      '&.Mui-disabled, &:disabled': {
        backgroundColor:
          variant === 'text'
            ? 'transparent !important'
            : `${c.onSurface.action.disabled} !important`,
        color: `${c.content.disabled} !important`,
        borderColor: 'transparent !important',
      },
    };
  };
}

export function getCrvButtonIconOutlinedTokens(
  color: CrvButtonColor,
  theme?: Theme,
): OutlinedTokens {
  return outlinedTokens(color, theme as Theme);
}
