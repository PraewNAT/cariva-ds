import type { BoxProps } from '@mui/material/Box';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export type CrvSwitchBaseSize = 'small' | 'medium';

export interface CrvSwitchBaseProps
  extends Omit<
    BoxProps<'button'>,
    'color' | 'size' | 'onChange' | 'children' | 'component'
  > {
  size?: CrvSwitchBaseSize;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}
