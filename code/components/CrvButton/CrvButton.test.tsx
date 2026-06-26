import { render, screen, fireEvent } from '@testing-library/react';
import { colors } from '../../tokens';
import { CrvButton } from './CrvButton';

describe('CrvButton', () => {
  it('renders label', () => {
    render(<CrvButton>Save</CrvButton>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it.each(['small', 'medium', 'large'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(<CrvButton size={size}>Btn</CrvButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );

  it.each(['contained', 'outlined', 'text'] as const)(
    'renders %s variant',
    (variant) => {
      render(<CrvButton variant={variant}>Btn</CrvButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CrvButton onClick={onClick}>Go</CrvButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <CrvButton onClick={onClick} disabled>
        Go
      </CrvButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const onClick = vi.fn();
    render(
      <CrvButton onClick={onClick} loading>
        Go
      </CrvButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides startIcon and endIcon while loading', () => {
    render(
      <CrvButton
        loading
        startIcon={<span data-testid="start" />}
        endIcon={<span data-testid="end" />}
      >
        Go
      </CrvButton>,
    );
    expect(screen.queryByTestId('start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('end')).not.toBeInTheDocument();
  });

  it('forwards ref to underlying button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<CrvButton ref={ref}>Go</CrvButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('uses brand primary border token on outlined primary default state', () => {
    render(<CrvButton variant="outlined" color="primary">Label</CrvButton>);
    expect(screen.getByRole('button', { name: 'Label' })).toHaveStyle({
      borderColor: colors.brand.primary.border.default,
    });
  });
});
