import type { ReactNode } from 'react';

export type CrvButtonSplitColor = 'primary' | 'error';
export type CrvButtonSplitSize = 'small' | 'medium' | 'large';

export interface CrvButtonSplitProps {
  /** Label of the main action. */
  children: ReactNode;
  color?: CrvButtonSplitColor;
  size?: CrvButtonSplitSize;
  disabled?: boolean;
  startIcon?: ReactNode;
  /** Icon in the trigger half — defaults to a chevron. */
  triggerIcon?: ReactNode;
  /** Runs the main action. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Opens the menu of alternative actions. */
  onTriggerClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name for the trigger half — it is icon-only. */
  triggerLabel: string;
  className?: string;
}
