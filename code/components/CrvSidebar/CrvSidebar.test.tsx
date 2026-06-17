import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CrvSidebar } from './CrvSidebar';
import { CrvSidebarMenu } from './CrvSidebarMenu';

describe('CrvSidebar', () => {
  it('renders logo and content', () => {
    render(
      <CrvSidebar logo={<span>Logo</span>}>
        <span>Content</span>
      </CrvSidebar>,
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CrvSidebar ref={ref}>x</CrvSidebar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe('CrvSidebarMenu', () => {
  it('shows sub-items only when open', () => {
    const { rerender } = render(
      <CrvSidebarMenu label="Dashboard" open={false} items={[{ label: 'Overview' }]} />,
    );
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();

    rerender(<CrvSidebarMenu label="Dashboard" open items={[{ label: 'Overview' }]} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('toggles in uncontrolled mode and fires onToggle', () => {
    const onToggle = vi.fn();
    render(
      <CrvSidebarMenu label="Dashboard" onToggle={onToggle} items={[{ label: 'Overview' }]} />,
    );
    fireEvent.click(screen.getByText('Dashboard'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('fires sub-item onClick', () => {
    const onClick = vi.fn();
    render(
      <CrvSidebarMenu label="Dashboard" open items={[{ label: 'Overview', onClick }]} />,
    );
    fireEvent.click(screen.getByText('Overview'));
    expect(onClick).toHaveBeenCalled();
  });
});
