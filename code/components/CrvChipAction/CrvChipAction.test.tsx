import { render, screen, fireEvent } from '@testing-library/react';
import { CrvChipAction } from './CrvChipAction';

describe('CrvChipAction', () => {
  it('renders label', () => {
    render(<CrvChipAction label="Filter" />);
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)('renders %s size', (size) => {
    render(<CrvChipAction label="Chip" size={size} />);
    expect(screen.getByText('Chip')).toBeInTheDocument();
  });

  it.each(['default', 'primary'] as const)('renders %s color', (color) => {
    render(<CrvChipAction label="Chip" color={color} />);
    expect(screen.getByText('Chip')).toBeInTheDocument();
  });

  it.each(['filled', 'outlined'] as const)('renders %s variant', (variant) => {
    render(<CrvChipAction label="Chip" variant={variant} />);
    expect(screen.getByText('Chip')).toBeInTheDocument();
  });

  it('calls onClick when clickable', () => {
    const onClick = vi.fn();
    render(<CrvChipAction label="Chip" onClick={onClick} />);
    fireEvent.click(screen.getByText('Chip'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete is visible', () => {
    const onDelete = vi.fn();
    const { container } = render(
      <CrvChipAction label="Chip" deleteVisible onDelete={onDelete} />,
    );
    const deleteControl = container.querySelector('.MuiChip-deleteIcon');
    expect(deleteControl).toBeTruthy();
    fireEvent.click(deleteControl!);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    render(<CrvChipAction label="Chip" onClick={vi.fn()} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CrvChipAction label="Chip" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
