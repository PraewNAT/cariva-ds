import { render, screen } from '@testing-library/react';
import { CrvStepperMarker } from './CrvStepperMarker';
import { getStepIconColors, getStepTitleColor } from './crvStepperStyles';
import { colors } from '../../tokens';
import type { CrvStepperMarkerStatus } from './CrvStepper.types';

describe('CrvStepperMarker', () => {
  describe('colours match the Figma crv-stepper-marker set', () => {
    it('default is a light solid circle with secondary content', () => {
      const c = getStepIconColors('default');
      expect(c.backgroundColor).toBe(colors.bg.solid);
      expect(c.color).toBe(colors.content.secondary);
    });

    it('active is the muted brand surface with the brand colour on top', () => {
      const c = getStepIconColors('active');
      expect(c.backgroundColor).toBe(colors.brand.primary.onSurface.muted);
      expect(c.color).toBe(colors.brand.primary.onSurface.default);
    });

    it('done fills with brand and knocks the content out in white', () => {
      const c = getStepIconColors('done');
      expect(c.backgroundColor).toBe(colors.brand.primary.onSurface.default);
      expect(c.color).toBe(colors.content.onBrand);
    });

    it.each(['error', 'warning', 'info', 'success'] as const)(
      '%s fills with the status surface, never transparent',
      (severity) => {
        const c = getStepIconColors(severity);
        expect(c.backgroundColor).toBe(colors.status[severity].onSurface.default);
        expect(c.color).toBe(colors.content.onBrand);
      },
    );

    it('treats the step state `complete` as the marker status `done`', () => {
      expect(getStepIconColors('complete')).toEqual(getStepIconColors('done'));
    });

    it('treats the step state `inactive` as the marker status `default`', () => {
      expect(getStepIconColors('inactive')).toEqual(getStepIconColors('default'));
    });
  });

  describe('step title colours', () => {
    it.each(['inactive', 'active', 'complete'] as const)(
      '%s reads at full contrast',
      (state) => {
        expect(getStepTitleColor(state)).toBe(colors.content.primary);
      },
    );

    it.each(['error', 'warning', 'info', 'success'] as const)(
      '%s carries the status colour',
      (severity) => {
        expect(getStepTitleColor(severity)).toBe(
          colors.status[severity].onSurface.default,
        );
      },
    );
  });

  describe('content axis', () => {
    it('shows the number by default', () => {
      render(<CrvStepperMarker value={3} />);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows the supplied icon and hides the number', () => {
      render(<CrvStepperMarker content="icon" value={3} icon={<svg data-testid="glyph" />} />);
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();
    });

    it('switches to icon content on its own when an icon is given', () => {
      render(<CrvStepperMarker value={3} icon={<svg data-testid="glyph" />} />);
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
    });

    it('falls back to the Figma placeholder when content=icon carries no icon', () => {
      const { container } = render(<CrvStepperMarker content="icon" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('deprecated state prop', () => {
    it('maps done to the done status', () => {
      const { container } = render(<CrvStepperMarker state="done" />);
      const done = getStepIconColors('done');
      expect(container.firstChild).toHaveStyle({ backgroundColor: done.backgroundColor });
    });

    it('maps default to the default status', () => {
      const { container } = render(<CrvStepperMarker state="default" value={1} />);
      const def = getStepIconColors('default');
      expect(container.firstChild).toHaveStyle({ backgroundColor: def.backgroundColor });
    });

    it('is ignored once status is given', () => {
      const statuses: CrvStepperMarkerStatus[] = ['error', 'success'];
      for (const status of statuses) {
        const { container, unmount } = render(
          <CrvStepperMarker state="done" status={status} />,
        );
        expect(container.firstChild).toHaveStyle({
          backgroundColor: getStepIconColors(status).backgroundColor,
        });
        unmount();
      }
    });
  });
});
