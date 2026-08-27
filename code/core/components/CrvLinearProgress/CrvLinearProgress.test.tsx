import { render, screen } from '@testing-library/react';
import { CrvLinearProgress } from './CrvLinearProgress';

describe('CrvLinearProgress', () => {
  it('renders determinate progressbar', () => {
    render(<CrvLinearProgress variant="determinate" value={60} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders indeterminate progressbar', () => {
    render(<CrvLinearProgress variant="indeterminate" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<CrvLinearProgress ref={ref} value={30} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
