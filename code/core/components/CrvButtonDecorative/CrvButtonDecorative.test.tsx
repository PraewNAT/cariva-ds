import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvButtonDecorative } from './CrvButtonDecorative';
import {
  AURORA_KEYFRAMES,
  DECORATIVE_GRADIENT,
  HEIGHT_BY_SIZE,
  getDecorativeAuroraSx,
} from './crvButtonDecorativeStyles';
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

  describe('aurora', () => {
    const aurora = getDecorativeAuroraSx() as Record<string, any>;

    it('drifts two layers at different durations so the pattern does not loop', () => {
      const a = aurora['&::before'].animation as string;
      const b = aurora['&::after'].animation as string;
      expect(a).toContain('crvDecorativeDriftA');
      expect(b).toContain('crvDecorativeDriftB');
      expect(a).not.toBe(b);
    });

    it('defines both keyframes it references', () => {
      expect(AURORA_KEYFRAMES).toHaveProperty('@keyframes crvDecorativeDriftA');
      expect(AURORA_KEYFRAMES).toHaveProperty('@keyframes crvDecorativeDriftB');
    });

    it('animates only transform, so it stays off the main thread', () => {
      const frames = Object.values(AURORA_KEYFRAMES).flatMap((k) =>
        Object.values(k as Record<string, Record<string, string>>),
      );
      expect(frames.length).toBeGreaterThan(0);
      for (const frame of frames) {
        expect(Object.keys(frame)).toEqual(['transform']);
      }
    });

    it('paints the blobs from the decorative tokens only', () => {
      const image = aurora['&::before'].backgroundImage as string;
      for (const token of Object.values(colors.brand.decorative.gradient)) {
        expect(image + aurora['&::after'].backgroundImage).toContain(token);
      }
    });

    it('stops moving under prefers-reduced-motion', () => {
      const reduced = aurora['@media (prefers-reduced-motion: reduce)'];
      expect(reduced['&::before, &::after'].animation).toBe('none');
    });

    it('hides itself when the button is disabled', () => {
      expect(aurora['&.Mui-disabled::before, &.Mui-disabled::after'].display).toBe('none');
    });

    it('is layered behind the label, inside its own stacking context', () => {
      expect(aurora.isolation).toBe('isolate');
      expect(aurora['&::before'].zIndex).toBe(-1);
      expect(aurora['&::after'].pointerEvents).toBe('none');
    });
  });
});
