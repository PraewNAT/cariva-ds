import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvButtonSplit } from './CrvButtonSplit';

const setup = (props = {}) =>
  render(
    <CrvButtonSplit triggerLabel="ตัวเลือกอื่น" {...props}>
      บันทึก
    </CrvButtonSplit>,
  );

describe('CrvButtonSplit', () => {
  it.each([
    ['small', '12px', '16px'],
    ['medium', '14px', '20px'],
    ['large', '16px', '24px'],
  ] as const)('uses the %s label style on the action (%s / %s)', (size, fontSize, lineHeight) => {
    setup({ size });
    const style = getComputedStyle(screen.getByRole('button', { name: 'บันทึก' }));
    expect(style.fontSize).toBe(fontSize);
    expect(style.lineHeight).toBe(lineHeight);
  });

  it('renders both halves', () => {
    setup();
    expect(screen.getByRole('button', { name: 'บันทึก' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ตัวเลือกอื่น' })).toBeInTheDocument();
  });

  it('marks the trigger as opening a menu', () => {
    setup();
    expect(screen.getByRole('button', { name: 'ตัวเลือกอื่น' })).toHaveAttribute(
      'aria-haspopup',
      'menu',
    );
  });

  it('calls the two handlers separately', async () => {
    const onClick = vi.fn();
    const onTriggerClick = vi.fn();
    setup({ onClick, onTriggerClick });
    await userEvent.click(screen.getByRole('button', { name: 'บันทึก' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onTriggerClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'ตัวเลือกอื่น' }));
    expect(onTriggerClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables both halves', () => {
    setup({ disabled: true });
    expect(screen.getByRole('button', { name: 'บันทึก' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'ตัวเลือกอื่น' })).toBeDisabled();
  });
});
