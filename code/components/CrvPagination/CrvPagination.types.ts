import type { SelectChangeEvent } from '@mui/material/Select';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

export type CrvPaginationSize = 'medium' | 'large';

export interface CrvPaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  count: number;
  page?: number;
  defaultPage?: number;
  size?: CrvPaginationSize;
  disabled?: boolean;
  showEllipsis?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  previousLabel?: string;
  nextLabel?: string;
  getPageLabel?: (page: number) => string;
  onChange?: (event: MouseEvent<HTMLButtonElement>, page: number) => void;
}

export interface CrvPaginationRowsPerPageProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  options?: number[];
  label?: ReactNode;
  suffix?: ReactNode;
  size?: CrvPaginationSize;
  disabled?: boolean;
  onChange?: (event: SelectChangeEvent<string>, value: number) => void;
}

export interface CrvPaginationJumpToPageProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  count: number;
  label?: ReactNode;
  size?: CrvPaginationSize;
  disabled?: boolean;
  onChange?: (event: SelectChangeEvent<string>, value: number) => void;
}
