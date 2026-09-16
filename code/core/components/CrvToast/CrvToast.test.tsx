import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvToast } from './CrvToast';
import { getToastTokens } from './crvToastStyles';
import { colors } from '../../tokens';

describe('CrvToast', () => {
  describe('render', () => {
    it('renders title and description', () => {
      render(<CrvToast title="หัวข้อ" description="รายละเอียด" />);
      expect(screen.getByText('หัวข้อ')).toBeInTheDocument();
      expect(screen.getByText('รายละเอียด')).toBeInTheDocument();
    });

    it('still accepts children as the title', () => {
      render(<CrvToast>ข้อความ</CrvToast>);
      expect(screen.getByText('ข้อความ')).toBeInTheDocument();
    });

    it('omits the description when not given', () => {
      render(<CrvToast title="หัวข้อ" />);
      expect(screen.queryByText('รายละเอียด')).not.toBeInTheDocument();
    });

    it('keeps the alert role for screen readers', () => {
      render(<CrvToast title="หัวข้อ" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('renders the action node', () => {
      render(<CrvToast title="หัวข้อ" action={<button>เลิกทำ</button>} />);
      expect(screen.getByRole('button', { name: 'เลิกทำ' })).toBeInTheDocument();
    });

    it('shows the close button only when onClose is given', () => {
      const { rerender } = render(<CrvToast title="หัวข้อ" />);
      expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
      rerender(<CrvToast title="หัวข้อ" onClose={() => {}} />);
      expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
    });

    it('accepts a custom close label', () => {
      render(<CrvToast title="หัวข้อ" onClose={() => {}} closeLabel="ปิด" />);
      expect(screen.getByRole('button', { name: 'ปิด' })).toBeInTheDocument();
    });
  });

  describe('event', () => {
    it('calls onClose when the close button is clicked', async () => {
      const onClose = vi.fn();
      render(<CrvToast title="หัวข้อ" onClose={onClose} />);
      await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('state / tokens', () => {
    it.each(['error', 'warning', 'info', 'success'] as const)(
      'filled %s uses the status surface with inverse content',
      (severity) => {
        const tokens = getToastTokens('filled', severity);
        expect(tokens.backgroundColor).toBe(colors.status[severity].onSurface.default);
        expect(tokens.titleColor).toBe(colors.content.inverse);
      },
    );

    it.each(['error', 'warning', 'info', 'success'] as const)(
      'standard %s uses the subtle surface, the default border and a shadow',
      (severity) => {
        const tokens = getToastTokens('standard', severity);
        expect(tokens.backgroundColor).toBe(colors.status[severity].onSurface.subtle);
        expect(tokens.borderColor).toBe(colors.status[severity].border.default);
        expect(tokens.borderWidth).toBe(2);
        expect(tokens.boxShadow).toContain('rgba');
      },
    );

    it('outlined uses the strong border and no fill', () => {
      const tokens = getToastTokens('outlined', 'error');
      expect(tokens.borderColor).toBe(colors.status.error.border.strong);
      expect(tokens.borderWidth).toBe(1);
      expect(tokens.backgroundColor).toBe('transparent');
    });

    it('notification is neutral with a brand icon', () => {
      const tokens = getToastTokens('standard', 'notification');
      expect(tokens.backgroundColor).toBe(colors.neutral.onSurface.subtle);
      expect(tokens.borderColor).toBe(colors.neutral.border.default);
      expect(tokens.iconColor).toBe(colors.brand.primary.onSurface.default);
    });

    it('maps the retired variant names', () => {
      expect(getToastTokens('filled', 'error')).toEqual(
        getToastTokens('filled', 'error'),
      );
      render(<CrvToast variant="primary" title="เก่า" />);
      expect(screen.getByText('เก่า')).toBeInTheDocument();
    });
  });
});
