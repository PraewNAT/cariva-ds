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
  it('shows sub-items only when active=true (expand)', () => {
    const { rerender } = render(
      <CrvSidebarMenu type="expand" label="Dashboard" active={false} items={[{ label: 'Overview' }]} />,
    );
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();

    rerender(<CrvSidebarMenu type="expand" label="Dashboard" active items={[{ label: 'Overview' }]} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('toggles in uncontrolled mode and fires onToggle', () => {
    const onToggle = vi.fn();
    render(
      <CrvSidebarMenu type="expand" label="Dashboard" onToggle={onToggle} items={[{ label: 'Overview' }]} />,
    );
    fireEvent.click(screen.getByText('Dashboard'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('hides parent chevron for type=default', () => {
    const { container: expand } = render(
      <CrvSidebarMenu type="expand" label="Expand" active={false} items={[]} />,
    );
    const { container: link } = render(
      <CrvSidebarMenu type="default" label="User Management" onClick={() => undefined} />,
    );
    expect(expand.querySelectorAll('svg').length).toBeGreaterThan(link.querySelectorAll('svg').length);
  });

  it('navigates on click for type=default (no expand)', () => {
    const onClick = vi.fn();
    const onToggle = vi.fn();
    render(
      <CrvSidebarMenu
        type="default"
        label="User Management"
        items={[{ label: 'Hidden sub' }]}
        onClick={onClick}
        onToggle={onToggle}
      />,
    );
    fireEvent.click(screen.getByText('User Management'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onToggle).not.toHaveBeenCalled();
    expect(screen.queryByText('Hidden sub')).not.toBeInTheDocument();
  });

  it('tints parent icon and label brand primary when type=default and active=true', () => {
    render(
      <CrvSidebarMenu
        type="default"
        label="User Management"
        icon={<span data-testid="um-icon">icon</span>}
        active
        onClick={() => undefined}
      />,
    );
    const row = screen.getByText('User Management').closest('[role="menuitem"]');
    expect(row).toHaveStyle({ color: 'rgb(37, 99, 235)' });
    expect(row).not.toHaveClass('Mui-selected');
  });

  it('keeps expand parent neutral when active=true (Figma 4735:102037)', () => {
    render(
      <CrvSidebarMenu
        type="expand"
        label="Organization"
        icon={<span data-testid="org-icon">icon</span>}
        active
        items={[{ label: 'Overview' }]}
      />,
    );
    const row = screen.getByText('Organization').closest('[role="menuitem"]');
    expect(row).toHaveStyle({ color: 'rgb(15, 23, 42)' });
    expect(row).not.toHaveClass('Mui-selected');
  });

  it('tints selected sub-item label brand primary (Figma 4735:102037)', () => {
    render(
      <CrvSidebarMenu
        type="expand"
        label="Organization"
        active
        items={[{ label: 'Overview', selected: true }, { label: 'Departments' }]}
      />,
    );
    const selected = screen.getByText('Overview').closest('[role="menuitem"]');
    expect(selected).toHaveStyle({ color: 'rgb(37, 99, 235)' });
    expect(selected).toHaveClass('Mui-selected');
  });

  it('supports legacy open alias on expand type', () => {
    render(
      <CrvSidebarMenu type="expand" label="Dashboard" open items={[{ label: 'Overview' }]} />,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('supports legacy selected alias on default type', () => {
    render(
      <CrvSidebarMenu type="default" label="User Management" selected onClick={() => undefined} />,
    );
    const row = screen.getByText('User Management').closest('[role="menuitem"]');
    expect(row).toHaveStyle({ color: 'rgb(37, 99, 235)' });
  });
});
