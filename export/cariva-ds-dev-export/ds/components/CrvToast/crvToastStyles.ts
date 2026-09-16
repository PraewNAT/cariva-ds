import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type {
  CrvToastLegacyVariant,
  CrvToastSeverity,
  CrvToastVariant,
} from './CrvToast.types';

export const TOAST_ICON_SIZE = 24;
export const TOAST_WIDTH = 320;

/** Figma renamed the Variant axis; the old values still resolve. */
const LEGACY_VARIANTS: Record<CrvToastLegacyVariant, CrvToastVariant> = {
  primary: 'filled',
  secondary: 'standard',
};

export function resolveVariant(
  variant: CrvToastVariant | CrvToastLegacyVariant,
): CrvToastVariant {
  return (LEGACY_VARIANTS as Record<string, CrvToastVariant>)[variant] ?? (variant as CrvToastVariant);
}

/** MUI's Alert has no `notification` severity — it only drives internal defaults. */
export function toMuiSeverity(
  severity: CrvToastSeverity,
): 'error' | 'warning' | 'info' | 'success' {
  return severity === 'notification' ? 'info' : severity;
}

interface SurfaceTokens {
  backgroundColor: string;
  borderColor?: string;
  borderWidth: number;
  iconColor: string;
  closeColor: string;
  titleColor: string;
  descriptionColor: string;
  /** Matches the Figma effect style `shadow/status/*`. */
  boxShadow?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const int = parseInt(value.length === 3 ? value.replace(/./g, (c) => c + c) : value, 16);
  return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`;
}

/** shadow/status/* — 3 soft layers, recoloured per severity. */
function statusShadow(color: string): string {
  return [
    `0 8px 8px 0 ${hexToRgba(color, 0.06)}`,
    `0 -2px 8px 2px ${hexToRgba(color, 0.04)}`,
    `0 2px 4px 0 ${hexToRgba(color, 0.12)}`,
  ].join(', ');
}

/** Notification is neutral: brand icon, neutral surfaces, dark text. */
function notificationTokens(variant: CrvToastVariant): SurfaceTokens {
  const base = {
    iconColor: colors.brand.primary.onSurface.default,
    closeColor: colors.brand.primary.onSurface.default,
    titleColor: colors.content.primary,
    descriptionColor: colors.content.secondary,
  };

  if (variant === 'filled') {
    return {
      ...base,
      backgroundColor: colors.bg.white,
      borderWidth: 0,
      boxShadow: statusShadow(colors.brand.primary.onSurface.default),
    };
  }
  if (variant === 'outlined') {
    return {
      ...base,
      backgroundColor: 'transparent',
      borderColor: colors.neutral.border.strong,
      borderWidth: 1,
    };
  }
  return {
    ...base,
    backgroundColor: colors.neutral.onSurface.subtle,
    borderColor: colors.neutral.border.default,
    borderWidth: 2,
    boxShadow: statusShadow(colors.brand.primary.onSurface.default),
  };
}

export function getToastTokens(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SurfaceTokens {
  if (severity === 'notification') return notificationTokens(variant);

  const status = colors.status[severity];

  if (variant === 'filled') {
    return {
      backgroundColor: status.onSurface.default,
      borderWidth: 0,
      iconColor: colors.content.inverse,
      closeColor: colors.content.inverse,
      titleColor: colors.content.inverse,
      descriptionColor: colors.content.inverse,
    };
  }

  if (variant === 'outlined') {
    return {
      backgroundColor: 'transparent',
      borderColor: status.border.strong,
      borderWidth: 1,
      iconColor: status.content.default,
      closeColor: colors.neutral.content.default,
      titleColor: colors.content.primary,
      descriptionColor: colors.content.secondary,
    };
  }

  return {
    backgroundColor: status.onSurface.subtle,
    borderColor: status.border.default,
    borderWidth: 2,
    iconColor: status.content.default,
    closeColor: colors.neutral.content.default,
    titleColor: colors.content.primary,
    descriptionColor: colors.content.secondary,
    boxShadow: statusShadow(status.onSurface.default),
  };
}

export function getToastSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  const tokens = getToastTokens(variant, severity);

  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 0,
    px: `${spacing.lg}px`,
    py: `${spacing.xs}px`,
    borderRadius: `${radius['12']}px`,
    backgroundColor: tokens.backgroundColor,
    border: tokens.borderWidth
      ? `${tokens.borderWidth}px solid ${tokens.borderColor}`
      : 'none',
    boxShadow: tokens.boxShadow ?? 'none',
    color: tokens.titleColor,
    fontFamily: typography.fontFamily.ui,
    '& .MuiAlert-icon': {
      marginRight: 0,
      padding: `${spacing.sm}px ${spacing.md}px ${spacing.sm}px 0`,
      opacity: 1,
      color: tokens.iconColor,
      alignItems: 'flex-start',
      '& .MuiSvgIcon-root': { fontSize: TOAST_ICON_SIZE },
    },
    '& .MuiAlert-message': {
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacing.xs}px`,
      flex: 1,
      minWidth: 0,
      padding: `${spacing.sm}px 0`,
      overflow: 'visible',
    },
    '& .MuiAlert-action': {
      marginRight: 0,
      padding: `${spacing.xs}px 0 0 ${spacing.lg}px`,
      alignItems: 'flex-start',
      gap: `${spacing.xs}px`,
    },
    '&.MuiAlert-standard, &.MuiAlert-filled, &.MuiAlert-outlined': {
      backgroundColor: tokens.backgroundColor,
    },
  };
}

export function getToastCloseSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  return {
    color: getToastTokens(variant, severity).closeColor,
    '& .MuiSvgIcon-root': { fontSize: 20 },
  };
}

export function getToastTitleSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  return {
    color: getToastTokens(variant, severity).titleColor,
    fontFamily: typography.fontFamily.ui,
    fontSize: typography.fontSize.label.large,
    lineHeight: `${typography.lineHeight.label.large}px`,
    fontWeight: typography.fontWeight.medium,
  };
}

export function getToastDescriptionSx(
  variant: CrvToastVariant,
  severity: CrvToastSeverity,
): SxProps<Theme> {
  return {
    color: getToastTokens(variant, severity).descriptionColor,
    fontFamily: typography.fontFamily.ui,
    fontSize: typography.fontSize.label.medium,
    lineHeight: `${typography.lineHeight.label.medium}px`,
    fontWeight: typography.fontWeight.regular,
  };
}
