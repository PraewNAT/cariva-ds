import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvCheckboxGroup } from './CrvCheckboxGroup';

describe('CrvCheckboxGroup', () => {
  it('renders group label and options', () => {
    render(
      <CrvCheckboxGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />,
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeInTheDocument();
  });

  it('updates selection on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CrvCheckboxGroup
        options={[{ value: 'a', label: 'Option A' }]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('shows error message in error color mode', () => {
    render(
      <CrvCheckboxGroup
        color="error"
        errorMessage="Selection required"
        options={[{ value: 'a', label: 'Option A' }]}
      />,
    );
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });
});
