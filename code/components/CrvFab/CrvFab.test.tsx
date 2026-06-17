import { render, screen, fireEvent } from '@testing-library/react';
import { CrvFab } from './CrvFab';

describe('CrvFab', () => {
  it('renders with aria-label', () => {
    render(
      <CrvFab aria-label="add">
        <span data-testid="icon" />
      </CrvFab>,
    );
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it.each(['small', 'medium', 'large'] as const)('renders %s size', (size) => {
    render(
      <CrvFab aria-label="add" size={size}>
        <span />
      </CrvFab>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['primary', 'neutral'] as const)('renders %s color', (color) => {
    render(
      <CrvFab aria-label="add" color={color}>
        <span />
      </CrvFab>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(
      <CrvFab aria-label="add" onClick={onClick}>
        <span />
      </CrvFab>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <CrvFab aria-label="add" onClick={onClick} disabled>
        <span />
      </CrvFab>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <CrvFab aria-label="add" ref={ref}>
        <span />
      </CrvFab>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
