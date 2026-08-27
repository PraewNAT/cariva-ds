import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvModalBreakpoint, CrvModalType } from '../../components/CrvModal/CrvModal.types';
import { defaultProductStyle, productStyle } from '../../tokens';
import { getCarivaColors, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export const MODAL_WIDTH: Record<CrvModalBreakpoint, number> = {
  sm: 320,
  'md+': 400,
};

export const MODAL_SHADOW = '0 25px 50px -12px rgba(15, 23, 42, 0.25)';

export function getModalPaperSx(breakpoint: CrvModalBreakpoint): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      width: MODAL_WIDTH[breakpoint],
      maxWidth: `calc(100% - ${s.xl * 2}px)`,
      margin: `${s.xl}px`,
      borderRadius: `${productStyle[defaultProductStyle].containerMd}px`,
      backgroundColor: c.onSurface.default,
      boxShadow: MODAL_SHADOW,
      overflow: 'hidden',
    };
  };
}

export function getModalContainerSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };
}

export function getModalHeaderSectionSx(
  type: CrvModalType,
  breakpoint: CrvModalBreakpoint,
): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: type === 'alignCenter' ? 'center' : 'stretch',
      gap:
        type === 'alignCenter' && breakpoint === 'sm'
          ? `${s.sm}px`
          : `${s.lg}px`,
      pt: `${s.xl}px`,
      px: `${s.lg}px`,
      pb: `${s.lg}px`,
    };
  };
}

export function getModalHeaderSx(type: CrvModalType): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    if (type === 'alignCenter') {
      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${s.sm}px`,
        width: '100%',
      };
    }
    return {
      display: 'flex',
      alignItems: 'flex-start',
      gap: `${s.sm}px`,
      width: '100%',
    };
  };
}

export function getModalIconContainerSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      p: `${s.xs}px`,
      borderRadius: `${productStyle[defaultProductStyle].containerSm}px`,
      color: c.content.primary,
      '& .MuiSvgIcon-root': { fontSize: 20 },
    };
  };
}

export function getModalTextContainerSx(type: CrvModalType): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: type === 'alignCenter' ? 'center' : 'flex-start',
      gap: `${s['2xs']}px`,
      minWidth: 0,
      flex: type === 'default' ? 1 : undefined,
      textAlign: type === 'alignCenter' ? 'center' : 'left',
    };
  };
}

export function getModalTitleSx(type: CrvModalType): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      color: c.content.primary,
      fontFamily: ty.fontFamily.sans,
      fontSize: ty.fontSize.heading.medium,
      lineHeight: `${ty.lineHeight.heading.medium}px`,
      fontWeight: ty.fontWeight.semibold,
      textAlign: type === 'alignCenter' ? 'center' : 'left',
    };
  };
}

export function getModalDescriptionSx(type: CrvModalType): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      color: c.content.secondary,
      fontFamily: ty.fontFamily.sans,
      fontSize: ty.fontSize.body.medium,
      lineHeight: `${ty.lineHeight.body.medium}px`,
      fontWeight: ty.fontWeight.regular,
      textAlign: type === 'alignCenter' ? 'center' : 'left',
    };
  };
}

export function getModalContentSlotSx(): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      width: '100%',
      boxSizing: 'border-box',
      p: `${s.lg}px`,
      display: 'flex',
      flexDirection: 'column',
      gap: `${s.lg}px`,
    };
  };
}

export function getModalFooterSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: c.onSurface.subtle,
      p: `${s.lg}px`,
    };
  };
}

export function getModalCtaSlotSx(breakpoint: CrvModalBreakpoint): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    const isStacked = breakpoint === 'sm';
    return {
      display: 'flex',
      flexDirection: isStacked ? 'column' : 'row',
      alignItems: isStacked ? 'stretch' : 'center',
      justifyContent: isStacked ? 'stretch' : 'flex-end',
      gap: `${s.sm}px`,
      width: '100%',
      '& .MuiButton-root': isStacked ? { width: '100%' } : { width: 'auto' },
    };
  };
}
