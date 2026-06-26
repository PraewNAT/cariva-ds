import type { PopoverProps } from '@mui/material/Popover';
import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import type { ReactElement, ReactNode } from 'react';

export type CrvTooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'none';

export type CrvTooltipWithActionPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface CrvTooltipProps extends Omit<MuiTooltipProps, 'placement' | 'arrow'> {
  placement?: CrvTooltipPlacement;
  /** Tooltip label — maps to Figma "My Tooltip" */
  title: ReactNode;
}

export interface CrvTooltipWithActionPanelProps {
  step?: string;
  content?: ReactNode;
  backLabel?: string;
  nextLabel?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNext?: () => void;
}

export interface CrvTooltipWithActionProps
  extends CrvTooltipWithActionPanelProps,
    Omit<
      PopoverProps,
      'children' | 'open' | 'anchorEl' | 'content' | 'slotProps' | 'slots'
    > {
  placement?: CrvTooltipWithActionPlacement;
  open: boolean;
  anchorEl: PopoverProps['anchorEl'];
  children: ReactElement;
}
