import type { ReactNode } from 'react';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import type { CrvDateTimePickerSize } from './crvDateTimePickerStyles';

// This component always renders inside a <LocalizationProvider dateAdapter={AdapterDayjs}>,
// so the picker value type is fixed to Dayjs rather than left generic.

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
  extends Omit<DatePickerProps<Dayjs>, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: DatePickerProps<Dayjs>['slotProps'];
}

export interface CrvTimePickerProps
  extends Omit<TimePickerProps<Dayjs>, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: TimePickerProps<Dayjs>['slotProps'];
}

export interface CrvDateTimePickerProps
  extends Omit<DateTimePickerProps<Dayjs>, 'slotProps'>,
    CrvPickerFieldProps {
  slotProps?: DateTimePickerProps<Dayjs>['slotProps'];
}

export type { CrvDateTimePickerSize };
