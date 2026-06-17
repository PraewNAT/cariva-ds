import { render, screen, fireEvent } from '@testing-library/react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { CrvInput } from './CrvInput';

describe('CrvInput', () => {
  it('renders label and placeholder', () => {
    render(
      <CrvInput
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
      render(<CrvInput size={size} label="Label" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    },
  );

  it('shows error message when error is true', () => {
    render(
      <CrvInput
        label="อีเมล"
        error
        errorMessage="รูปแบบอีเมลไม่ถูกต้อง"
      />,
    );
    expect(screen.getByText('รูปแบบอีเมลไม่ถูกต้อง')).toBeInTheDocument();
  });

  it('shows helper text when helperTextVisible is true', () => {
    render(
      <CrvInput
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
      <CrvInput label="ชื่อ" onChange={onChange} />,
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'สมชาย' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    render(<CrvInput label="ชื่อ" disabled onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders start adornment when startAdornment is provided', () => {
    render(
      <CrvInput
        label="อีเมล"
        startAdornment={<MailOutlineIcon data-testid="mail-icon" />}
      />,
    );
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('hides start adornment when startAdornmentVisible is false', () => {
    render(
      <CrvInput
        label="อีเมล"
        startAdornmentVisible={false}
        startAdornment={<MailOutlineIcon data-testid="mail-icon" />}
      />,
    );
    expect(screen.queryByTestId('mail-icon')).not.toBeInTheDocument();
  });

  it('forwards ref to underlying input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<CrvInput ref={ref} label="ชื่อ" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
