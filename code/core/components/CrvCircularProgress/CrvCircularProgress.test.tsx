import { render, screen } from '@testing-library/react';
import { CrvCircularProgress } from './CrvCircularProgress';

describe('CrvCircularProgress', () => {
  it('renders indeterminate progressbar', () => {
    render(<CrvCircularProgress variant="indeterminate" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders determinate with aria-valuenow', () => {
    render(<CrvCircularProgress variant="determinate" value={60} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CrvCircularProgress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
