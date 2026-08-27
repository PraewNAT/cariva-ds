import { render, screen } from '@testing-library/react';
import { CrvRadio } from './CrvRadio';

describe('CrvRadio', () => {
  it('renders label and description', () => {
    render(
      <CrvRadio
        label="Option A"
        description="Description text"
      />,
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('hides description for groupItem type', () => {
    render(
      <CrvRadio
        type="groupItem"
        label="Label"
        description="Hidden"
        descriptionVisible
      />,
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
