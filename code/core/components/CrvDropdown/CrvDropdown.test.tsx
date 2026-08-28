import { render, screen, fireEvent } from '@testing-library/react';
import { CrvDropdown } from './CrvDropdown';
import { typography } from '../../tokens';

// Figma crv-dropdown (node 3875:3909) ground truth field sizes.
const EXPECTED_FIELD_MIN_HEIGHT = { small: 38, medium: 48 } as const;
const EXPECTED_FIELD_FONT_SIZE = {
  small:  typography.fontSize.body.medium,
  medium: typography.fontSize.body.large,
} as const;

const OPTIONS = [
  { value: 'bkk', label: 'กรุงเทพมหานคร' },
  { value: 'cnx', label: 'เชียงใหม่' },
];

describe('CrvDropdown', () => {
  it('renders label and placeholder', () => {
    render(
      <CrvDropdown
        label="จังหวัด"
        placeholder="เลือกจังหวัด"
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('จังหวัด')).toBeInTheDocument();
    expect(screen.getByText('เลือกจังหวัด')).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(
        <CrvDropdown size={size} label="Label" options={OPTIONS} />,
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    },
  );

  // Regression test: MUI Select clones the `input` element and applies its own
  // `sx` to that clone last, so field sizing/typography set on
  // `input={<OutlinedInput sx={...} />}` never reached the DOM — the field
  // always rendered at MUI's OutlinedInput defaults (56px/57px, 16px text)
  // regardless of `size`. The fix keeps all field-sizing rules on Select's own
  // `sx` instead. See CHANGELOG.
  it.each(['small', 'medium'] as const)(
    "applies the '%s' size field height and font size (not MUI's OutlinedInput default)",
    (size) => {
      const { container } = render(
        <CrvDropdown size={size} label="Label" options={OPTIONS} />,
      );
      const field = container.querySelector('.MuiOutlinedInput-root');
      expect(field).not.toBeNull();
      const computed = getComputedStyle(field as Element);
      expect(computed.minHeight).toBe(`${EXPECTED_FIELD_MIN_HEIGHT[size]}px`);
      expect(computed.fontSize).toBe(`${EXPECTED_FIELD_FONT_SIZE[size]}px`);
    },
  );

  it('shows error message when error is true', () => {
    render(
      <CrvDropdown
        label="จังหวัด"
        error
        errorMessage="กรุณาเลือกจังหวัด"
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('กรุณาเลือกจังหวัด')).toBeInTheDocument();
  });

  it('shows helper text when helperTextVisible is true', () => {
    render(
      <CrvDropdown
        label="จังหวัด"
        helperTextVisible
        helperText="เลือกจังหวัดที่ตั้ง"
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('เลือกจังหวัดที่ตั้ง')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const onChange = vi.fn();
    render(
      <CrvDropdown
        label="จังหวัด"
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('เชียงใหม่'));
    expect(onChange).toHaveBeenCalled();
  });
});
