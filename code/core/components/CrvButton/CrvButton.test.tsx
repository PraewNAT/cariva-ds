import { render, screen, fireEvent } from '@testing-library/react';
import { colors } from '../../tokens';
import { CrvButton } from './CrvButton';

describe('CrvButton', () => {
  it('renders label', () => {
    render(<CrvButton>Save</CrvButton>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it.each(['small', 'medium', 'large'] as const)(
    'renders %s size without crashing',
    (size) => {
      render(<CrvButton size={size}>Btn</CrvButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );

  it.each(['contained', 'outlined', 'text'] as const)(
    'renders %s variant',
    (variant) => {
      render(<CrvButton variant={variant}>Btn</CrvButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );


  // Figma gap between icon and label: 4 / 8 / 12, carried by `gap` alone. MUI's icon-slot
  // margins must be overridden; jsdom ignores selector specificity, so check the emitted rule
  // (a real browser applies it — measured in the Mira prototype).
  it.each([
    ['small', '4px', 16],
    ['medium', '8px', 20],
    ['large', '12px', 24],
  ] as const)('spaces a %s icon from its label by gap only (%s)', (size, gap, icon) => {
    render(
      <CrvButton size={size} startIcon={<span data-testid="lead" />}>
        Label
      </CrvButton>,
    );
    const button = screen.getByRole('button', { name: 'Label' });
    expect(getComputedStyle(button).gap).toBe(gap);
    const css = Array.from(document.querySelectorAll('style'))
      .map((el) => el.textContent ?? '')
      .join('');
    const scope = Array.from(button.classList).find((c) => c.startsWith('css-'))!;
    expect(css).toContain(
      `.${scope} .MuiButton-startIcon.MuiButton-startIcon,.${scope} .MuiButton-endIcon.MuiButton-endIcon{margin:0px;}`,
    );
    expect(css).toMatch(
      new RegExp(`\\.${scope} \\.MuiButton-startIcon\\.MuiButton-startIcon>\\*:nth-of-type\\(1\\)[^{]*\\{font-size:${icon}px;`),
    );
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CrvButton onClick={onClick}>Go</CrvButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <CrvButton onClick={onClick} disabled>
        Go
      </CrvButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const onClick = vi.fn();
    render(
      <CrvButton onClick={onClick} loading>
        Go
      </CrvButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides startIcon and endIcon while loading', () => {
    render(
      <CrvButton
        loading
        startIcon={<span data-testid="start" />}
        endIcon={<span data-testid="end" />}
      >
        Go
      </CrvButton>,
    );
    expect(screen.queryByTestId('start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('end')).not.toBeInTheDocument();
  });

  it('forwards ref to underlying button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<CrvButton ref={ref}>Go</CrvButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('uses brand primary border token on outlined primary default state', () => {
    render(<CrvButton variant="outlined" color="primary">Label</CrvButton>);
    expect(screen.getByRole('button', { name: 'Label' })).toHaveStyle({
      borderColor: colors.brand.primary.border.default,
    });
  });
});
