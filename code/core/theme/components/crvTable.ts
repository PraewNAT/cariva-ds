import type { SxProps, Theme } from '@mui/material/styles';
import { getCarivaColors, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export type CrvTableSize = 'small' | 'default';
export type CrvTableCellState = 'default' | 'hover' | 'disabled';

export const TABLE_MIN_WIDTH = 120;
export const TABLE_COMPACT_SIZE: Record<CrvTableSize, number> = {
  small: 36,
  default: 54,
};

const SORT_ICON_SIZE = 18;

export function getTableHeadSx(
  size: CrvTableSize,
  compact: boolean,
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);
    const square = TABLE_COMPACT_SIZE[size];
    const py = size === 'small' ? 7 : s.lg;

    return {
      boxSizing: 'border-box',
      backgroundColor: c.onSurface.subtle,
      borderBottom: 'none',
      padding: compact ? 0 : `${py}px ${s.lg}px`,
      height: square,
      ...(compact
        ? { width: square, minWidth: square, maxWidth: square }
        : { minWidth: TABLE_MIN_WIDTH }),
      '& .crv-table-head__inner': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: compact ? 'center' : 'flex-start',
        gap: `${s.sm}px`,
        width: '100%',
        height: '100%',
      },
      '& .crv-table-head__label': {
        fontFamily: ty.fontFamily.sans,
        fontSize: `${ty.fontSize.label.medium}px`,
        lineHeight: `${ty.lineHeight.label.medium}px`,
        fontWeight: ty.fontWeight.medium,
        color: c.content.primary,
        whiteSpace: 'nowrap',
      },
      '& .crv-table-head__sort': {
        fontSize: SORT_ICON_SIZE,
        width: SORT_ICON_SIZE,
        height: SORT_ICON_SIZE,
        color: c.content.secondary,
        flexShrink: 0,
      },
    };
  };
}

function cellBackground(
  state: CrvTableCellState,
  alternate: boolean,
  theme: Theme,
): string {
  const c = getCarivaColors(theme);
  if (state === 'hover') return c.onSurface.action.hover;
  if (state === 'disabled') return c.onSurface.action.disabled;
  if (alternate) return c.onSurface.subtle;
  return 'transparent';
}

export function getTableCellSx(
  size: CrvTableSize,
  state: CrvTableCellState,
  alternate: boolean,
  compact: boolean,
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const square = TABLE_COMPACT_SIZE[size];
    const py = size === 'small' ? s.xs : s.lg;

    return {
      boxSizing: 'border-box',
      borderBottom: 'none',
      backgroundColor: cellBackground(state, alternate, theme),
      color: state === 'disabled' ? c.content.disabled : c.content.primary,
      padding: compact ? 0 : `${py}px ${s.lg}px`,
      ...(compact
        ? { width: square, minWidth: square, maxWidth: square }
        : { minWidth: TABLE_MIN_WIDTH }),
      '& .crv-table-cell__inner': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: compact ? 'center' : 'flex-start',
        gap: `${s.md}px`,
        minHeight: size === 'small' ? 28 : 22,
      },
    };
  };
}

export function getTableTextCellSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const ty = getCarivaTypography(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      '& .crv-table-text__main': {
        fontFamily: ty.fontFamily.sans,
        fontSize: `${ty.fontSize.body.medium}px`,
        lineHeight: `${ty.lineHeight.body.medium}px`,
        fontWeight: ty.fontWeight.regular,
        color: c.content.primary,
      },
      '& .crv-table-text__description': {
        fontFamily: ty.fontFamily.sans,
        fontSize: `${ty.fontSize.caption.caption}px`,
        lineHeight: `${ty.lineHeight.caption.caption}px`,
        fontWeight: ty.fontWeight.regular,
        color: c.content.secondary,
      },
    };
  };
}

export function getTableContainerSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1px solid ${c.border.default}`,
      backgroundColor: c.onSurface.default,
    };
  };
}

export function getTableRowSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      '&:not(:last-of-type) > .MuiTableCell-root': {
        borderBottom: `1px solid ${c.border.default}`,
      },
    };
  };
}
