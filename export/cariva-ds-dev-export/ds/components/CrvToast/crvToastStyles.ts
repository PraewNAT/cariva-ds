import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvToastSeverity, CrvToastVariant } from './CrvToast.types';

export const TOAST_ICON_SIZE = 22;
export const TOAST_CLOSE_BUTTON_SIZE = 28;
export const TOAST_CLOSE_ICON_SIZE = 22;

interface ToastTokens {
  backgroundColor: string;
  color: string;
  iconColor: string;
  closeColor: string;
}

function secondaryTokens(severity: CrvToastSeverity): ToastTokens {
  const iconBySeverity: Record<CrvToastSeverity, string> = {
    error:   colors.status.error.onSurface.default,
    info:    colors.brand.primary.onSurface.default,
    success: colors.status.success.onSurface.default,
    warning: colors.status.warning.onSurface.default,
  };

  const backgroundBySeverity: Record<CrvToastSeverity, string> = {
    error:   colors.status.error.onSurface.muted,
    info:    colors.status.info.onSurface.muted,
    success: colors.status.success.onSurface.subtle,
    warning: colors.status.warning.onSurface.muted,
  };

  return {
    backgroundColor: backgroundBySeverity[severity],
    color:           colors.content.primary,
    iconColor:       iconBySeverity[severity],
    closeColor:      colors.content.secondary,
  };
}

function primaryTokens(severity: CrvToastSeverity): ToastTokens {
  return {
    backgroundColor: colors.status[severity].onSurface.default,
    color:           colors.content.inverse,
    iconColor:       colors.content.inverse,
    closeColor:      colors.content.inverse,
  };
}

export function getToastTokens(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): ToastTokens {
  return variant === 'primary'
    ? primaryTokens(severity)
    : secondaryTokens(severity);
}

export function getToastSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  const tokens = getToastTokens(variant, severity);

  return {
    alignItems:      'center',
    gap:             `${spacing.sm}px`,
    minHeight:       40,
    px:              `${spacing.sm}px`,
    py:              `${spacing.sm}px`,
    borderRadius:    `${radius['8']}px`,
    backgroundColor: tokens.backgroundColor,
    color:           tokens.color,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        typography.fontSize.body.medium,
    lineHeight:      `${typography.lineHeight.body.medium}px`,
    fontWeight:      typography.fontWeight.regular,
    '& .MuiAlert-icon': {
      marginRight: 0,
      padding:     0,
      opacity:     1,
      color:       tokens.iconColor,
      fontSize:    TOAST_ICON_SIZE,
      alignItems:  'center',
      '& .MuiSvgIcon-root': {
        fontSize: TOAST_ICON_SIZE,
      },
    },
    '& .MuiAlert-message': {
      padding:    0,
      overflow:   'visible',
      color:      tokens.color,
      fontFamily: typography.fontFamily.sans,
      fontSize:   typography.fontSize.body.medium,
      lineHeight: `${typography.lineHeight.body.medium}px`,
      fontWeight: typography.fontWeight.regular,
    },
    '& .MuiAlert-action': {
      marginRight: 0,
      padding:     0,
      alignItems:  'center',
      color:       tokens.closeColor,
    },
    '&.MuiAlert-standard': {
      border: 'none',
    },
  };
}

export function getCloseButtonSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  const { closeColor } = getToastTokens(variant, severity);

  return {
    width:           TOAST_CLOSE_BUTTON_SIZE,
    height:          TOAST_CLOSE_BUTTON_SIZE,
    padding:         0,
    borderRadius:    `${radius.full}px`,
    color:           closeColor,
    '&:hover': {
      backgroundColor:
        variant === 'primary'
          ? 'rgba(255, 255, 255, 0.12)'
          : colors.onSurface.action.hover,
    },
    '& .MuiSvgIcon-root': {
      fontSize: TOAST_CLOSE_ICON_SIZE,
    },
  };
}
