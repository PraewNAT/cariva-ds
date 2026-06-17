import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { CrvDatePicker, CrvDateTimePicker, CrvTimePicker } from './CrvDateTimePicker';

describe('CrvDateTimePicker', () => {
  it('renders date picker label', () => {
    render(<CrvDatePicker label="วันที่" defaultValue={dayjs('2026-06-16')} />);
    expect(screen.getAllByLabelText('วันที่').length).toBeGreaterThan(0);
  });

  it('renders time picker label', () => {
    render(<CrvTimePicker label="เวลา" defaultValue={dayjs('2026-06-16T09:30:00')} />);
    expect(screen.getAllByLabelText('เวลา').length).toBeGreaterThan(0);
  });

  it('renders date time picker helper text', () => {
    render(
      <CrvDateTimePicker
        label="วันที่และเวลา"
        helperText="เลือกวันนัดหมาย"
        defaultValue={dayjs('2026-06-16T09:30:00')}
      />,
    );
    expect(screen.getByText('เลือกวันนัดหมาย')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <CrvDateTimePicker
        label="วันที่และเวลา"
        error
        errorMessage="กรุณาเลือกวันที่"
      />,
    );
    expect(screen.getByText('กรุณาเลือกวันที่')).toBeInTheDocument();
  });
});
