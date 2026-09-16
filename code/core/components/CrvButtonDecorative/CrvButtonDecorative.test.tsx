import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvButtonDecorative } from './CrvButtonDecorative';
import { DECORATIVE_GRADIENT, HEIGHT_BY_SIZE } from './crvButtonDecorativeStyles';
import { colors } from '../../tokens';

describe('CrvButtonDecorative', () => {
  it('renders its label as a button', () => {
    render(<CrvButtonDecorative>ถามผู้ช่วย AI</CrvButtonDecorative>);
    expect(screen.getByRole('button', { name: 'ถามผู้ช่วย AI' })).toBeInTheDocument();
  });

  it('paints the decorative gradient from the brand tokens', () => {
    expect(DECORATIVE_GRADIENT).toContain(colors.brand.decorative.gradient.from);
    expect(DECORATIVE_GRADIENT).toContain(colors.brand.decorative.gradient.via);
    expect(DECORATIVE_GRADIENT).toContain(colors.brand.decorative.gradient.to);
  });

  it.each(['small', 'medium', 'large'] as const)('sizes %s to the Figma height', (size) => {
    render(<CrvButtonDecorative size={size}>AI</CrvButtonDecorative>);
    expect(HEIGHT_BY_SIZE[size]).toBeGreaterThan(0);
  });

  it('fires onClick', async () => {
    const onClick = vi.fn();
    render(<CrvButtonDecorative onClick={onClick}>AI</CrvButtonDecorative>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is inert when disabled', () => {
    render(<CrvButtonDecorative disabled>AI</CrvButtonDecorative>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
