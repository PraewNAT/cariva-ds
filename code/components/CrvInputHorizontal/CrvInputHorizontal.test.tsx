import { render, screen, fireEvent } from '@testing-library/react';
import SearchIcon from '@mui/icons-material/Search';
import { CrvInputHorizontal } from './CrvInputHorizontal';

describe('CrvInputHorizontal', () => {
  it('renders label and placeholder', () => {
    render(
      <CrvInputHorizontal
        label="อีเมล"
        placeholder="name@example.com"
      />,
    );
    expect(screen.getByText('อีเมล')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(<CrvInputHorizontal size={size} label="Label" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    },
  );

  it('shows error message when error is true', () => {
    render(
      <CrvInputHorizontal
        label="อีเมล"
        error
        errorMessage="รูปแบบอีเมลไม่ถูกต้อง"
      />,
    );
    expect(screen.getByText('รูปแบบอีเมลไม่ถูกต้อง')).toBeInTheDocument();
  });

  it('shows helper text when helperTextVisible is true', () => {
    render(
      <CrvInputHorizontal
        label="อีเมล"
        helperTextVisible
        helperText="ใช้อีเมลที่ลงทะเบียนไว้"
      />,
    );
    expect(screen.getByText('ใช้อีเมลที่ลงทะเบียนไว้')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(
      <CrvInputHorizontal label="ชื่อ" onChange={onChange} />,
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'สมชาย' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders start adornment when startAdornment is provided', () => {
    render(
      <CrvInputHorizontal
        label="ค้นหา"
        startAdornment={<SearchIcon data-testid="search-icon" />}
      />,
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('forwards ref to underlying input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<CrvInputHorizontal ref={ref} label="ชื่อ" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
