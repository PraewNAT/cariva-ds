import { render, screen, fireEvent } from '@testing-library/react';
import { CrvButtonIcon } from './CrvButtonIcon';

describe('CrvButtonIcon', () => {
  it('renders with aria-label', () => {
    render(
      <CrvButtonIcon aria-label="close">
        <span data-testid="icon" />
      </CrvButtonIcon>,
    );
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it.each(['small', 'medium', 'large'] as const)('renders %s size', (size) => {
    render(
      <CrvButtonIcon aria-label="t" size={size}>
        <span />
      </CrvButtonIcon>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['contained', 'outlined', 'ghost'] as const)(
    'renders %s variant',
    (variant) => {
      render(
        <CrvButtonIcon aria-label="t" variant={variant}>
          <span />
        </CrvButtonIcon>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(
      <CrvButtonIcon aria-label="t" onClick={onClick}>
        <span />
      </CrvButtonIcon>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <CrvButtonIcon aria-label="t" onClick={onClick} disabled>
        <span />
      </CrvButtonIcon>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <CrvButtonIcon aria-label="t" ref={ref}>
        <span />
      </CrvButtonIcon>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
