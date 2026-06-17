import { render, screen, fireEvent } from '@testing-library/react';
import { CrvDrawer } from './CrvDrawer';

describe('CrvDrawer', () => {
  it('renders content slot when open', () => {
    render(
      <CrvDrawer open onClose={() => {}}>
        <div>Drawer content</div>
      </CrvDrawer>,
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    render(
      <CrvDrawer open={false} onClose={() => {}}>
        <div>Drawer content</div>
      </CrvDrawer>,
    );
    expect(screen.queryByText('Drawer content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <CrvDrawer open onClose={onClose}>
        <div>Drawer content</div>
      </CrvDrawer>,
    );
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <CrvDrawer ref={ref} open onClose={() => {}}>
        <div>Drawer content</div>
      </CrvDrawer>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
