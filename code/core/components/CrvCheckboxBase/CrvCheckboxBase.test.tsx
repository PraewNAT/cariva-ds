import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { colors } from '../../tokens';
import { glow } from '../../theme/shadows';
import { getCheckboxRootSx } from './crvCheckboxStyles';
import { CrvCheckboxBase } from './CrvCheckboxBase';

function rule(sx: Record<string, unknown>, ...needles: string[]) {
  const key = Object.keys(sx).find((k) => needles.every((n) => k.includes(n)));
  if (!key) throw new Error(`no rule matching ${needles.join(' + ')}`);
  return sx[key] as Record<string, string>;
}

describe('CrvCheckboxBase', () => {
  it('renders unchecked checkbox', () => {
    render(<CrvCheckboxBase aria-label="Option" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked checkbox', () => {
    render(<CrvCheckboxBase checked aria-label="Option" readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CrvCheckboxBase aria-label="Option" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  // Figma crv-checkbox-base 3815:5417, state=focusVisible
  it.each([
    ['primary', colors.border.system, colors.brand.primary.onSurface.pressed],
    ['error', colors.border.error, colors.status.error.onSurface.pressed],
  ] as const)('uses the Figma focus ring for %s', (color, ring, checkedFill) => {
    const sx = getCheckboxRootSx(color) as Record<string, unknown>;
    const unchecked = rule(sx, 'Mui-focusVisible', '--unchecked');
    expect(unchecked.boxShadow).toContain(ring);
    expect(unchecked.backgroundColor).toBe(colors.onSurface.default);
    expect(rule(sx, 'Mui-checked.Mui-focusVisible').backgroundColor).toBe(checkedFill);
  });

  // Figma has no separate hover variant, so hover reuses state=focusVisible
  // rather than growing a second, undesigned treatment.
  it.each(['primary', 'error'] as const)('gives hover the focusVisible look for %s', (color) => {
    const sx = getCheckboxRootSx(color) as Record<string, unknown>;
    const unchecked = rule(sx, ':hover', '--unchecked');
    expect(unchecked).toBe(rule(sx, 'Mui-focusVisible', '--unchecked'));
    const checked = rule(sx, 'Mui-checked:hover');
    expect(checked).toBe(rule(sx, 'Mui-checked.Mui-focusVisible'));
  });

  // Figma puts glow/primary · glow/error on every focusVisible variant.
  it.each([
    ['primary', colors.brand.primary.onSurface.default],
    ['error', colors.status.error.onSurface.default],
  ] as const)('halos the %s control on hover and focus', (color, glowColor) => {
    const sx = getCheckboxRootSx(color) as Record<string, unknown>;
    expect(rule(sx, '&:hover, &.Mui-focusVisible').boxShadow).toBe(glow(glowColor));
  });

  it('drops the halo when disabled', () => {
    const sx = getCheckboxRootSx('primary') as Record<string, unknown>;
    expect(rule(sx, 'Mui-disabled, &.Mui-disabled:hover').boxShadow).toBe('none');
  });

  it('keeps the disabled box flat on hover', () => {
    const sx = getCheckboxRootSx('primary') as Record<string, unknown>;
    expect(rule(sx, 'Mui-disabled:hover', '--unchecked').boxShadow).toContain(
      colors.border.disabled,
    );
  });

  it('renders indeterminate state', () => {
    render(<CrvCheckboxBase indeterminate aria-label="Option" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'data-indeterminate',
      'true',
    );
  });
});
