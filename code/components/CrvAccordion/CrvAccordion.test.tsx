import { render, screen, fireEvent } from '@testing-library/react';
import { CrvAccordion } from './CrvAccordion';

describe('CrvAccordion', () => {
  it('renders title and content', () => {
    render(
      <CrvAccordion title="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </CrvAccordion>,
    );
    expect(screen.getByText('Is it accessible?')).toBeInTheDocument();
  });

  it('expands when trigger is clicked', () => {
    render(
      <CrvAccordion title="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </CrvAccordion>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Is it accessible/i }));
    expect(
      screen.getByText('Yes. It adheres to the WAI-ARIA design pattern.'),
    ).toBeVisible();
  });

  it('hides icon when showIcon is false', () => {
    render(
      <CrvAccordion showIcon={false} title="No icon">
        Content
      </CrvAccordion>,
    );
    expect(screen.queryByTestId('ErrorOutlineIcon')).not.toBeInTheDocument();
  });
});
