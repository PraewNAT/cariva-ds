import { render } from '@testing-library/react';
import * as icons from './index';

// Guards the generated DS icons: every family ships all five MUI styles and
// each one renders a 24×24 SVG that inherits colour like any MUI icon.
const STYLES = ['', 'Outlined', 'Rounded', 'Sharp', 'TwoTone'];
const FAMILIES = [
  'AmpStories', 'DockToRight', 'Eco', 'ExposureNeg1', 'ExposureNeg2',
  'ExposurePlus1', 'ExposurePlus2', 'ExposureZero', 'Polymer',
];

describe('DS custom icons', () => {
  it('exports every family in all five styles and nothing else', () => {
    const expected = FAMILIES.flatMap((f) => STYLES.map((s) => f + s)).sort();
    expect(Object.keys(icons).sort()).toEqual(expected);
  });

  it.each(Object.entries(icons))('%s renders a 24×24 icon with paths', (_, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg!.querySelectorAll('path').length).toBeGreaterThan(0);
    svg!.querySelectorAll('path').forEach((p) => expect(p).not.toHaveAttribute('fill'));
  });
});
