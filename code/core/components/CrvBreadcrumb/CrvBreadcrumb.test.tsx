import { render, screen } from '@testing-library/react';
import { CrvBreadcrumb, CrvBreadcrumbDemo } from './CrvBreadcrumb';

describe('CrvBreadcrumb', () => {
  it('renders demo path with home and active item', () => {
    render(<CrvBreadcrumbDemo />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getAllByText('breadcrumb').length).toBeGreaterThan(0);
  });

  it('hides toggled items', () => {
    render(
      <CrvBreadcrumbDemo
        breadcrumb01={false}
        breadcrumb02={false}
        breadcrumb03={true}
        breadcrumb04={false}
        breadcrumb05={false}
      />,
    );
    expect(
      screen.queryByRole('button', { name: /show more breadcrumb items/i }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });
});
