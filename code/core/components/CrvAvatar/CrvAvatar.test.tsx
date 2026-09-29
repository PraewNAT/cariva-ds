import { render, screen } from '@testing-library/react';
import { carivaTheme } from '../../theme';
import { AVATAR_SIZE_PX, getAvatarSx } from '../../theme/components/crvAvatar';
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

  it.each([
    ['large', 14, 8],
    ['medium', 12, 4],
    ['small', 10, 4],
    ['xSmall', 10, 2],
  ] as const)(
    'uses the Figma label size and padding for %s initials (%ipx / %ipx)',
    (size, fontSize, padding) => {
      const style = (getAvatarSx(size, 'text') as (t: typeof carivaTheme) => Record<string, unknown>)(
        carivaTheme,
      );
      expect(style.fontSize).toBe(fontSize);
      expect(style.padding).toBe(`${padding}px`);
    },
  );

  it.each([
    ['large', 40],
    ['medium', 32],
    ['small', 24],
    ['xSmall', 20],
  ] as const)('sizes the %s avatar to %ipx', (size, px) => {
    expect(AVATAR_SIZE_PX[size]).toBe(px);
  });

  it('renders online badge when badge is true', () => {
    const { container } = render(
      <CrvAvatar content="text" initials="OP" badge />,
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
  });
});
