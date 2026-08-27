import { render, screen, fireEvent } from '@testing-library/react';
import { CrvDropdown } from './CrvDropdown';

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
