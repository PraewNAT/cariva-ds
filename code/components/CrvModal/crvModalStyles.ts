import type { SxProps, Theme } from '@mui/material/styles';
import {
  colors,
  defaultProductStyle,
  productStyle,
  spacing,
  typography,
} from '../../tokens';
import type { CrvModalBreakpoint, CrvModalType } from './CrvModal.types';

export const MODAL_WIDTH: Record<CrvModalBreakpoint, number> = {
  sm:  320,
  'md+': 400,
};

export const MODAL_SHADOW =
  '0 25px 50px -12px rgba(15, 23, 42, 0.25)';

export function getModalPaperSx(breakpoint: CrvModalBreakpoint): SxProps<Theme> {
  return {
    width:           MODAL_WIDTH[breakpoint],
    maxWidth:        `calc(100% - ${spacing.xl * 2}px)`,
    margin:          `${spacing.xl}px`,
    borderRadius:    `${productStyle[defaultProductStyle].containerMd}px`,
    backgroundColor: colors.onSurface.default,
    boxShadow:       MODAL_SHADOW,
    overflow:        'hidden',
  };
}

export function getModalContainerSx(): SxProps<Theme> {
  return {
    display:       'flex',
    flexDirection: 'column',
    width:         '100%',
  };
}

export function getModalHeaderSectionSx(
  type: CrvModalType,
  breakpoint: CrvModalBreakpoint,
): SxProps<Theme> {
  return {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     type === 'alignCenter' ? 'center' : 'stretch',
    gap:
      type === 'alignCenter' && breakpoint === 'sm'
        ? `${spacing.sm}px`
        : `${spacing.lg}px`,
    pt: `${spacing.xl}px`,
    px: `${spacing.lg}px`,
    pb: `${spacing.lg}px`,
  };
}

export function getModalHeaderSx(type: CrvModalType): SxProps<Theme> {
  if (type === 'alignCenter') {
    return {
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      gap:            `${spacing.sm}px`,
      width:          '100%',
    };
  }

  return {
    display:    'flex',
    alignItems: 'flex-start',
    gap:        `${spacing.sm}px`,
    width:      '100%',
  };
}

export function getModalIconContainerSx(
  iconContainerSx?: SxProps<Theme>,
): SxProps<Theme> {
  return {
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
    p:               `${spacing.xs}px`,
    borderRadius:    `${productStyle[defaultProductStyle].containerSm}px`,
    color:           colors.content.primary,
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
    ...(typeof iconContainerSx === 'object' && !Array.isArray(iconContainerSx)
      ? iconContainerSx
      : {}),
  };
}

export function getModalTextContainerSx(type: CrvModalType): SxProps<Theme> {
  return {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     type === 'alignCenter' ? 'center' : 'flex-start',
    gap:            `${spacing['2xs']}px`,
    minWidth:       0,
    flex:           type === 'default' ? 1 : undefined,
    textAlign:      type === 'alignCenter' ? 'center' : 'left',
  };
}

export function getModalTitleSx(type: CrvModalType): SxProps<Theme> {
  return {
    color:      colors.content.primary,
    fontFamily: typography.fontFamily.sans,
    fontSize:   typography.fontSize.heading.medium,
    lineHeight: `${typography.lineHeight.heading.medium}px`,
    fontWeight: typography.fontWeight.semibold,
    textAlign:  type === 'alignCenter' ? 'center' : 'left',
  };
}

export function getModalDescriptionSx(type: CrvModalType): SxProps<Theme> {
  return {
    color:      colors.content.secondary,
    fontFamily: typography.fontFamily.sans,
    fontSize:   typography.fontSize.body.medium,
    lineHeight: `${typography.lineHeight.body.medium}px`,
    fontWeight: typography.fontWeight.regular,
    textAlign:  type === 'alignCenter' ? 'center' : 'left',
  };
}

export function getModalContentSlotSx(): SxProps<Theme> {
  return {
    width:           '100%',
    boxSizing:       'border-box',
    p:               `${spacing.lg}px`,
    display:         'flex',
    flexDirection:   'column',
    gap:             `${spacing.lg}px`,
  };
}

export function getModalFooterSx(): SxProps<Theme> {
  return {
    width:           '100%',
    boxSizing:       'border-box',
    backgroundColor: colors.onSurface.subtle,
    p:               `${spacing.lg}px`,
  };
}

export function getModalCtaSlotSx(
  breakpoint: CrvModalBreakpoint,
): SxProps<Theme> {
  const isStacked = breakpoint === 'sm';

  return {
    display:        'flex',
    flexDirection:  isStacked ? 'column' : 'row',
    alignItems:     isStacked ? 'stretch' : 'center',
    justifyContent: isStacked ? 'stretch' : 'flex-end',
    gap:            `${spacing.sm}px`,
    width:          '100%',
    '& .MuiButton-root': isStacked
      ? { width: '100%' }
      : { width: 'auto' },
  };
}
