import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvLinkSize } from '../../components/CrvLink/CrvLink.types';
import { getCarivaColors, getCarivaTypography } from '../carivaTokens';
import { buttonSizing } from '../buttonSizing';


export function getCrvLinkSx(size: CrvLinkSize, disabled: boolean): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    // A link is a button without the horizontal padding — Figma gives it the
    // same height, vertical padding and gap as `crv-button-standard`.
    const metrics = buttonSizing[size];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${metrics.gap}px`,
      height: metrics.height,
      minHeight: metrics.height,
      paddingTop: `${metrics.paddingY}px`,
      paddingBottom: `${metrics.paddingY}px`,
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
