import type { ReactNode } from 'react';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import type { CrvDateTimePickerSize } from './crvDateTimePickerStyles';

interface CrvPickerFieldProps {
  /** Field size — follows Cariva input sizes */
  size?: CrvDateTimePickerSize;
  /** Helper text below the field */
  helperText?: ReactNode;
  /** Error state for the field */
  error?: boolean;
  /** Error message shown when `error` is true */
  errorMessage?: ReactNode;
  /** Expand the field to its container width */
  fullWidth?: boolean;
}

export interface CrvDatePickerProps
  extends Omit<DatePickerProps, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: DatePickerProps['slotProps'];
}

export interface CrvTimePickerProps
  extends Omit<TimePickerProps, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: TimePickerProps['slotProps'];
}

export interface CrvDateTimePickerProps
  extends Omit<DateTimePickerProps, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: DateTimePickerProps['slotProps'];
}

export type { CrvDateTimePickerSize };
