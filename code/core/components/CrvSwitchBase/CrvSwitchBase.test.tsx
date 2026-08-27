import { render, screen, fireEvent } from '@testing-library/react';
import { CrvSwitchBase } from './CrvSwitchBase';

describe('CrvSwitchBase', () => {
  it('renders switch role', () => {
    render(<CrvSwitchBase inputProps={{ 'aria-label': 'Toggle setting' }} />);
    expect(screen.getByRole('switch', { name: 'Toggle setting' })).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)('renders %s size', (size) => {
    render(
      <CrvSwitchBase size={size} inputProps={{ 'aria-label': 'Toggle setting' }} />,
    );
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(
      <CrvSwitchBase
        onChange={onChange}
        inputProps={{ 'aria-label': 'Toggle setting' }}
      />,
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <CrvSwitchBase
        disabled
        onChange={onChange}
        inputProps={{ 'aria-label': 'Toggle setting' }}
      />,
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <CrvSwitchBase ref={ref} inputProps={{ 'aria-label': 'Toggle setting' }} />,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
