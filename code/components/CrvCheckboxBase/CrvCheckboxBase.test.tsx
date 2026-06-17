import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvCheckboxBase } from './CrvCheckboxBase';

describe('CrvCheckboxBase', () => {
  it('renders unchecked checkbox', () => {
    render(<CrvCheckboxBase aria-label="Option" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked checkbox', () => {
    render(<CrvCheckboxBase checked aria-label="Option" readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CrvCheckboxBase aria-label="Option" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders indeterminate state', () => {
    render(<CrvCheckboxBase indeterminate aria-label="Option" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'data-indeterminate',
      'true',
    );
  });
});
