import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvRadioGroup } from './CrvRadioGroup';

describe('CrvRadioGroup', () => {
  it('renders group label and options', () => {
    render(
      <CrvRadioGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />,
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeInTheDocument();
  });

  it('selects a single option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CrvRadioGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole('radio', { name: 'Option B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('shows error message in error color mode', () => {
    render(
      <CrvRadioGroup
        color="error"
        errorMessage="Selection required"
        options={[{ value: 'a', label: 'Option A' }]}
      />,
    );
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });
});
