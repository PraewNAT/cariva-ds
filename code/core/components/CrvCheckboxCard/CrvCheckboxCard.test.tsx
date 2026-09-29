import { render, screen } from '@testing-library/react';
import { colors } from '../../tokens';
import { glow, shadows } from '../../theme/shadows';
import { CrvCheckboxCard } from './CrvCheckboxCard';

function cardOf(label: string) {
  return screen.getByText(label).closest('label') as HTMLElement;
}

describe('CrvCheckboxCard', () => {
  it('renders label and description', () => {
    render(<CrvCheckboxCard label="Accept terms" description="Privacy policy applies." />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy policy applies.')).toBeInTheDocument();
  });

  it('paints the selected surface when checked', () => {
    render(<CrvCheckboxCard label="Selected" checked />);
    expect(cardOf('Selected')).toHaveStyle({
      backgroundColor: colors.brand.primary.onSurface.subtle,
    });
  });

  it('tints the whole card for color=error', () => {
    render(<CrvCheckboxCard label="Invalid" color="error" checked />);
    expect(cardOf('Invalid')).toHaveStyle({
      backgroundColor: colors.status.error.onSurface.subtle,
    });
  });

  it('drops the colour when disabled', () => {
    render(<CrvCheckboxCard label="Off" color="error" checked disabled />);
    expect(cardOf('Off')).toHaveStyle({ borderColor: colors.border.disabled });
  });

  it.each([
    ['unselected', false, shadows.sm],
    ['selected', true, glow(colors.brand.primary.onSurface.default)],
  ] as const)('lifts a %s card on hover', (_name, checked, expected) => {
    render(<CrvCheckboxCard label={`Hover ${_name}`} checked={checked} />);
    const css = Array.from(document.querySelectorAll('style'))
      .map((el) => el.textContent ?? '')
      .join('');
    expect(css.replace(/\s+/g, ' ')).toContain(`box-shadow:${expected}`.replace(/\s+/g, ' '));
  });

  it('gives a selected error card the error glow', () => {
    render(<CrvCheckboxCard label="Hover error" color="error" checked />);
    const css = Array.from(document.querySelectorAll('style'))
      .map((el) => el.textContent ?? '')
      .join('');
    expect(css).toContain(glow(colors.status.error.onSurface.default));
  });

  it('associates the label element with the checkbox', () => {
    render(<CrvCheckboxCard label="Subscribe" />);
    const input = screen.getByRole('checkbox');
    expect(cardOf('Subscribe')).toHaveAttribute('for', input.getAttribute('id'));
  });
});
