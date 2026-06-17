import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvInputOtpBase } from './CrvInputOtpBase';

describe('CrvInputOtpBase', () => {
  it('renders an input slot', () => {
    render(<CrvInputOtpBase aria-label="OTP digit" />);
    expect(screen.getByRole('textbox', { name: 'OTP digit' })).toBeInTheDocument();
  });

  it('shows filled value', () => {
    render(<CrvInputOtpBase value="5" aria-label="OTP digit" readOnly />);
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('accepts numeric input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CrvInputOtpBase aria-label="OTP digit" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'OTP digit' }), '3');
    expect(onChange).toHaveBeenCalled();
  });
});
