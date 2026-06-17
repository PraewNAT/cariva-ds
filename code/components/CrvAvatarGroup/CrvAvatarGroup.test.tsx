import { render, screen } from '@testing-library/react';
import { CrvAvatar } from '../CrvAvatar';
import { CrvAvatarGroup } from './CrvAvatarGroup';

describe('CrvAvatarGroup', () => {
  it('renders visible avatars and surplus count', () => {
    render(
      <CrvAvatarGroup size="large" max={3}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
        <CrvAvatar content="text" initials="GH" />
      </CrvAvatarGroup>,
    );

    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByText('CD')).toBeInTheDocument();
    expect(screen.queryByText('EF')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('respects max=2 layout', () => {
    render(
      <CrvAvatarGroup size="large" max={2}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
      </CrvAvatarGroup>,
    );

    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.queryByText('CD')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
