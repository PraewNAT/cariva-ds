import type { SxProps, Theme } from '@mui/material/styles';
import type { HTMLAttributes, ReactNode } from 'react';

export type CrvTagVariant = 'filled' | 'outlined';
export type CrvTagColor = 'default' | 'secondary' | 'error' | 'success' | 'warning';
export type CrvTagContent = 'label' | 'number';
export type CrvTagSize = 'small' | 'medium' | 'large';

export type CrvTagColorVariant =
  | 'primary'
  | 'sky'
  | 'cyan'
  | 'pink'
  | 'purple'
  | 'emerald'
  | 'amber'
  | 'orange';

export interface CrvTagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: CrvTagVariant;
  color?: CrvTagColor;
  content?: CrvTagContent;
  size?: CrvTagSize;
  label?: ReactNode;
  badgeContent?: ReactNode;
  startIconVisible?: boolean;
  endIconVisible?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

export interface CrvTagColorProps extends HTMLAttributes<HTMLSpanElement> {
  color?: CrvTagColorVariant;
  label?: ReactNode;
  sx?: SxProps<Theme>;
}
