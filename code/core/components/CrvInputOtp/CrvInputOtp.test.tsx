import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvInputOtp } from './CrvInputOtp';

describe('CrvInputOtp', () => {
  it('renders label, slots, and helper text', () => {
    render(<CrvInputOtp helperTextVisible />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the one-time password sent to your phone.'),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('shows error message when error is true', () => {
    render(<CrvInputOtp error />);
    expect(
      screen.getByText('Your one-time password must be 6 characters.'),
    ).toBeInTheDocument();
  });

  it('keeps label primary color in error state', () => {
    render(<CrvInputOtp error label="OTP Label" helperTextVisible={false} />);
    const label = screen.getByText('OTP Label');
    expect(label).toHaveStyle({ color: 'rgb(15, 23, 42)' });
  });

  it('calls onChange while typing across slots', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CrvInputOtp onChange={onChange} />);
    const slots = screen.getAllByRole('textbox');
    await user.type(slots[0], '1');
    await user.type(slots[1], '2');
    expect(onChange).toHaveBeenLastCalledWith('12');
  });
});
