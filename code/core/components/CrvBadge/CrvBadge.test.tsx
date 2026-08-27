import { render, screen } from '@testing-library/react';
import { CrvBadge } from './CrvBadge';

describe('CrvBadge', () => {
  it('renders standard badge content', () => {
    render(<CrvBadge variant="standard" color="primary" badgeContent="5" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders dot badge without content text', () => {
    render(<CrvBadge variant="dot" color="error" badgeContent="9" />);
    expect(screen.queryByText('9')).not.toBeInTheDocument();
  });

  it('wraps child anchor for overlay usage', () => {
    render(
      <CrvBadge variant="standard" color="primary" badgeContent="2">
        <button type="button">Inbox</button>
      </CrvBadge>,
    );
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
