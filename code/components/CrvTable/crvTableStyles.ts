import type { SxProps, Theme } from '@mui/material/styles';
import { colors, spacing, typography } from '../../tokens';

export type CrvTableSize = 'small' | 'default';
export type CrvTableCellState = 'default' | 'hover' | 'disabled';

/** Min column width — Figma crv-table-head / crv-table-cell (120px). */
export const TABLE_MIN_WIDTH = 120;
/** Square size for compact header / action columns. */
export const TABLE_COMPACT_SIZE: Record<CrvTableSize, number> = {
  small:   36,
  default: 54,
};

const SORT_ICON_SIZE = 18;

/** Head cell — Figma crv-table-head (4582:11202). */
export function getTableHeadSx(
  size: CrvTableSize,
  compact: boolean,
): SxProps<Theme> {
  const square = TABLE_COMPACT_SIZE[size];
  const py = size === 'small' ? 7 : spacing.lg;

  return {
    boxSizing: 'border-box',
    backgroundColor: colors.onSurface.subtle,
    borderBottom: 'none',
    padding: compact ? 0 : `${py}px ${spacing.lg}px`,
    height: square,
    ...(compact
      ? { width: square, minWidth: square, maxWidth: square }
      : { minWidth: TABLE_MIN_WIDTH }),
    '& .crv-table-head__inner': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: compact ? 'center' : 'flex-start',
      gap: `${spacing.sm}px`,
      width: '100%',
      height: '100%',
    },
    '& .crv-table-head__label': {
      fontFamily: typography.fontFamily.sans,
      fontSize: `${typography.fontSize.label.medium}px`,
      lineHeight: `${typography.lineHeight.label.medium}px`,
      fontWeight: typography.fontWeight.medium,
      color: colors.content.primary,
      whiteSpace: 'nowrap',
    },
    '& .crv-table-head__sort': {
      fontSize: SORT_ICON_SIZE,
      width: SORT_ICON_SIZE,
      height: SORT_ICON_SIZE,
      color: colors.content.secondary,
      flexShrink: 0,
    },
  };
}

function cellBackground(state: CrvTableCellState, alternate: boolean): string {
  if (state === 'hover') return colors.onSurface.action.hover;
  if (state === 'disabled') return colors.onSurface.action.disabled;
  if (alternate) return colors.onSurface.subtle;
  return 'transparent';
}

/** Body cell — Figma crv-table-cell (4582:11271). */
export function getTableCellSx(
  size: CrvTableSize,
  state: CrvTableCellState,
  alternate: boolean,
  compact: boolean,
): SxProps<Theme> {
  const square = TABLE_COMPACT_SIZE[size];
  const py = size === 'small' ? spacing.xs : spacing.lg;

  return {
    boxSizing: 'border-box',
    borderBottom: 'none',
    backgroundColor: cellBackground(state, alternate),
    color: state === 'disabled' ? colors.content.disabled : colors.content.primary,
    padding: compact ? 0 : `${py}px ${spacing.lg}px`,
    ...(compact
      ? { width: square, minWidth: square, maxWidth: square }
      : { minWidth: TABLE_MIN_WIDTH }),
    '& .crv-table-cell__inner': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: compact ? 'center' : 'flex-start',
      gap: `${spacing.md}px`,
      minHeight: size === 'small' ? 28 : 22,
    },
  };
}

/** Text content block inside a cell — Figma crv-tableText-cell (4705:20105). */
export function getTableTextCellSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    '& .crv-table-text__main': {
      fontFamily: typography.fontFamily.sans,
      fontSize: `${typography.fontSize.body.medium}px`,
      lineHeight: `${typography.lineHeight.body.medium}px`,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.primary,
    },
    '& .crv-table-text__description': {
      fontFamily: typography.fontFamily.sans,
      fontSize: `${typography.fontSize.caption.caption}px`,
      lineHeight: `${typography.lineHeight.caption.caption}px`,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.secondary,
    },
  };
}

/** Container that wraps the whole table — radius 16, clip, no border. */
export function getTableContainerSx(): SxProps<Theme> {
  return {
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid ${colors.border.default}`,
    backgroundColor: colors.onSurface.default,
  };
}

/** Row divider — Figma uses a divider component between rows. */
export function getTableRowSx(): SxProps<Theme> {
  return {
    '&:not(:last-of-type) > .MuiTableCell-root': {
      borderBottom: `1px solid ${colors.border.default}`,
    },
  };
}
