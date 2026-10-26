import { render, screen, fireEvent } from '@testing-library/react';
import { CrvTextArea } from './CrvTextArea';

describe('CrvTextArea', () => {
  it('renders label and placeholder', () => {
    render(
      <CrvTextArea
        label="หมายเหตุ"
        placeholder="กรอกหมายเหตุ"
      />,
    );
    expect(screen.getByText('หมายเหตุ')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('กรอกหมายเหตุ')).toBeInTheDocument();
  });

  it.each(['small', 'medium'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(<CrvTextArea size={size} label="Label" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    },
  );

  it('shows error message when error is true', () => {
    render(
      <CrvTextArea
        label="หมายเหตุ"
        error
        errorMessage="กรุณากรอกข้อมูลให้ครบ"
      />,
    );
    expect(screen.getByText('กรุณากรอกข้อมูลให้ครบ')).toBeInTheDocument();
  });

  it('shows helper text when helperTextVisible is true', () => {
    render(
      <CrvTextArea
        label="Feedback"
        helperTextVisible
        helperText="สูงสุด 500 ตัวอักษร"
      />,
    );
    expect(screen.getByText('สูงสุด 500 ตัวอักษร')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(
      <CrvTextArea label="หมายเหตุ" onChange={onChange} />,
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'ข้อความใหม่' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref to underlying textarea', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<CrvTextArea ref={ref} label="หมายเหตุ" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  // jsdom has no layout, so this asserts the style that stops the drag handle
  // shrinking the textarea below minRows — not the dragging itself.
  it.each([
    ['medium', undefined, '96px'],
    ['small', undefined, '80px'],
    ['medium', 6, '144px'],
  ] as const)(
    'keeps textarea min-height at minRows (%s, minRows=%s -> %s)',
    (size, minRows, expected) => {
      render(<CrvTextArea size={size} minRows={minRows} label="Label" />);
      expect(screen.getByRole('textbox')).toHaveStyle({ minHeight: expected });
    },
  );
});
