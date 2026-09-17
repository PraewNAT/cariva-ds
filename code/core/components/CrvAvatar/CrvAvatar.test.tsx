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

  it.each([
    ['large', 24],
    ['medium', 20],
    ['small', 16],
    ['xSmall', 12],
  ] as const)('sizes the default icon for %s to the Figma slot (%ipx)', (size, px) => {
    const { container } = render(<CrvAvatar content="icon" size={size} />);
    expect(getComputedStyle(container.querySelector('svg')!).fontSize).toBe(`${px}px`);
  });

  it.each([false, true])('keeps the same icon size with badge=%s', (badge) => {
    const { container } = render(<CrvAvatar content="icon" size="small" badge={badge} />);
    expect(getComputedStyle(container.querySelector('svg')!).fontSize).toBe('16px');
  });

  it('renders online badge when badge is true', () => {
    const { container } = render(
      <CrvAvatar content="text" initials="OP" badge />,
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
  });
});
