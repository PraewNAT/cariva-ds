import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvLinkSize } from '../../components/CrvLink/CrvLink.types';
import { getCarivaColors, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

const HEIGHT_BY_SIZE: Record<CrvLinkSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
};

export function getCrvLinkSx(size: CrvLinkSize, disabled: boolean): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);
    const padV =
      size === 'small' ? s.xs : size === 'medium' ? s.sm : s.md;

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${s.sm}px`,
      height: HEIGHT_BY_SIZE[size],
      minHeight: HEIGHT_BY_SIZE[size],
      paddingTop: `${padV}px`,
      paddingBottom: `${padV}px`,
      fontSize: `${ty.fontSize.label.large}px`,
      lineHeight: `${ty.lineHeight.label.large}px`,
      fontWeight: ty.fontWeight.medium,
      fontFamily: ty.fontFamily.sans,
      color: disabled ? `${c.content.link.disabled} !important` : c.content.link.default,
      '&:hover': disabled ? {} : { color: c.content.link.hover },
      '&:active': disabled ? {} : { color: c.content.link.pressed },
      pointerEvents: disabled ? 'none' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecorationColor: 'currentColor',
    };
  };
}
