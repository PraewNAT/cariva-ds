import type { TableCellProps } from '@mui/material/TableCell';
import type { ReactNode } from 'react';
import type { CrvTableCellState, CrvTableSize } from './crvTableStyles';

export type { CrvTableCellState, CrvTableSize } from './crvTableStyles';

export interface CrvTableHeadProps extends Omit<TableCellProps, 'size'> {
  /** Figma `size` — row height (small 36 / default 54). */
  size?: CrvTableSize;
  /** Figma `compact` — square icon/checkbox-only header (hides label). */
  compact?: boolean;
  /** Column label — Figma `label`. */
  label?: ReactNode;
  /** Figma `checkBoxVisible` — render a leading checkbox slot. */
  checkbox?: ReactNode;
  /** Figma `leftSortVisible` — sort icon before the label. */
  leftSort?: boolean;
  /** Figma `rightSortVisible` — sort icon after the label. */
  rightSort?: boolean;
  /** Sort click handler (applies to either sort icon). */
  onSort?: () => void;
}

export interface CrvTableCellProps extends Omit<TableCellProps, 'size'> {
  /** Figma `size` — row height (small 36 / default 54). */
  size?: CrvTableSize;
  /** Figma `state` — visual state. */
  state?: CrvTableCellState;
  /** Figma `alternate` — zebra striping background. */
  alternate?: boolean;
  /** Square column (checkbox/action) — width = height, content centered. */
  compact?: boolean;
  /** Cell content — Figma `customContent` slot. */
  children?: ReactNode;
}

export interface CrvTableTextCellProps {
  /** Primary text. */
  main?: ReactNode;
  /** Secondary description — Figma `descriptionVisible`. */
  description?: ReactNode;
}
