import { render, screen } from '@testing-library/react';
import { CrvCheckbox } from './CrvCheckbox';

describe('CrvCheckbox', () => {
  it('renders label and description', () => {
    render(
      <CrvCheckbox
        label="Accept terms"
        description="Privacy policy applies."
      />,
    );
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy policy applies.')).toBeInTheDocument();
  });

  it('hides description for groupItem type', () => {
    render(
      <CrvCheckbox
        type="groupItem"
        label="Label"
        description="Hidden"
        descriptionVisible
      />,
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('associates label with checkbox input', () => {
    render(<CrvCheckbox label="Subscribe" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
});
