import { render, screen } from '@testing-library/react';
import { CrvBreadcrumbBase } from './CrvBreadcrumbBase';

describe('CrvBreadcrumbBase', () => {
  it('renders link text for default type', () => {
    render(<CrvBreadcrumbBase text="Home" href="/" />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders current page for active type', () => {
    render(<CrvBreadcrumbBase type="active" text="Current" />);
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders ellipsis button', () => {
    render(<CrvBreadcrumbBase type="ellipsis" />);
    expect(
      screen.getByRole('button', { name: /show more breadcrumb items/i }),
    ).toBeInTheDocument();
  });

  it('renders dropdown chevron', () => {
    render(<CrvBreadcrumbBase type="dropdown" text="Section" href="#" />);
    expect(screen.getByRole('link', { name: /Section/i })).toBeInTheDocument();
  });
});
