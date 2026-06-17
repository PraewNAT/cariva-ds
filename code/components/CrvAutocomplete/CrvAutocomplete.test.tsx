import { render, screen, fireEvent } from '@testing-library/react';
import { CrvAutocomplete } from './CrvAutocomplete';

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('CrvAutocomplete', () => {
  it('renders label and placeholder', () => {
    render(
      <CrvAutocomplete
        label="โรงพยาบาล"
        placeholder="Search or select..."
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('โรงพยาบาล')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search or select...')).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(
        <CrvAutocomplete size={size} label="Label" options={OPTIONS} />,
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    },
  );

  it('shows error message when error is true', () => {
    render(
      <CrvAutocomplete
        label="โรงพยาบาล"
        error
        errorMessage="กรุณาเลือกจากรายการ"
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('กรุณาเลือกจากรายการ')).toBeInTheDocument();
  });

  it('shows helper text when helperTextVisible is true', () => {
    render(
      <CrvAutocomplete
        label="โรงพยาบาล"
        helperTextVisible
        helperText="พิมพ์เพื่อค้นหา"
        options={OPTIONS}
      />,
    );
    expect(screen.getByText('พิมพ์เพื่อค้นหา')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const onChange = vi.fn();
    render(
      <CrvAutocomplete
        label="โรงพยาบาล"
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Option' },
    });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });
});
