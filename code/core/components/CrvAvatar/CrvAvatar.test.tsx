import { render, screen } from '@testing-library/react';
import { CrvAvatar } from './CrvAvatar';

describe('CrvAvatar', () => {
  it('renders initials for text content', () => {
    render(<CrvAvatar content="text" initials="OP" />);
    expect(screen.getByText('OP')).toBeInTheDocument();
  });

  it('renders image avatar with alt text', () => {
    render(
      <CrvAvatar
        content="image"
        src="https://example.com/avatar.jpg"
        alt="Jane Doe"
      />,
    );
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('renders online badge when badge is true', () => {
    const { container } = render(
      <CrvAvatar content="text" initials="OP" badge />,
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
  });
});
