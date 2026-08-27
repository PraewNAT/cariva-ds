import { render, screen, fireEvent } from '@testing-library/react';
import { CrvSwitch } from './CrvSwitch';

describe('CrvSwitch', () => {
  it('renders label and description', () => {
    render(
      <CrvSwitch
        label="Notifications"
        description="Receive email alerts"
      />,
    );
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Receive email alerts')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('hides description when descriptionVisible is false', () => {
    render(
      <CrvSwitch
        label="Notifications"
        description="Receive email alerts"
        descriptionVisible={false}
      />,
    );
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.queryByText('Receive email alerts')).not.toBeInTheDocument();
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<CrvSwitch onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<CrvSwitch disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
