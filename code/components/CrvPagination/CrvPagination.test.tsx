import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CrvPagination } from './CrvPagination';

describe('CrvPagination', () => {
  it('shows five consecutive pages without ellipsis when count exceeds five', () => {
    render(<CrvPagination count={12} page={2} size="medium" />);

    expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 5' })).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Go to page 12' })).not.toBeInTheDocument();
  });

  it('slides the visible window toward the end of the range', () => {
    render(<CrvPagination count={12} page={12} size="medium" />);

    expect(screen.getByRole('button', { name: 'Go to page 8' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 12' })).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('fires onChange with the new page', () => {
    const onChange = vi.fn();
    render(<CrvPagination count={12} page={2} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 3' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 3);
  });
});
