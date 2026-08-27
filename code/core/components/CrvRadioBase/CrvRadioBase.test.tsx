import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvRadioBase } from './CrvRadioBase';

describe('CrvRadioBase', () => {
  it('renders unchecked radio', () => {
    render(<CrvRadioBase aria-label="Option" />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('renders checked radio', () => {
    render(<CrvRadioBase checked aria-label="Option" readOnly />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CrvRadioBase aria-label="Option" onChange={onChange} />);
    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });
});
