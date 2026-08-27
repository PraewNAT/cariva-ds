import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import type { ReactNode } from 'react';

export type CrvToastVariant = 'primary' | 'secondary';
export type CrvToastSeverity = 'error' | 'info' | 'success' | 'warning';

export interface CrvToastProps
  extends Omit<MuiAlertProps, 'color' | 'severity' | 'variant' | 'action' | 'onClose'> {
  variant?: CrvToastVariant;
  severity?: CrvToastSeverity;
  /** Maps to Figma `showAction` — renders the dismiss icon button when true */
  showAction?: boolean;
  /** Maps to Figma `actionIcon` instance swap */
  actionIcon?: ReactNode;
  onClose?: (event: React.SyntheticEvent) => void;
}
