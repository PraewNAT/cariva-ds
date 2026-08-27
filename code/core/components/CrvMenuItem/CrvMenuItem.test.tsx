import { render, screen } from '@testing-library/react';
import MenuList from '@mui/material/MenuList';
import { CrvMenuItem } from './CrvMenuItem';

describe('CrvMenuItem', () => {
  it('renders label', () => {
    render(
      <MenuList>
        <CrvMenuItem leftIconVisible={false} rightIconVisible={false}>
          กรุงเทพมหานคร
        </CrvMenuItem>
      </MenuList>,
    );
    expect(screen.getByText('กรุงเทพมหานคร')).toBeInTheDocument();
  });

  it('renders checkbox variant', () => {
    render(
      <MenuList>
        <CrvMenuItem variant="checkbox" leftIconVisible={false} rightIconVisible={false}>
          Option
        </CrvMenuItem>
      </MenuList>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('marks selected state', () => {
    render(
      <MenuList>
        <CrvMenuItem selected leftIconVisible={false} rightIconVisible={false}>
          Selected
        </CrvMenuItem>
      </MenuList>,
    );
    expect(screen.getByRole('menuitem')).toHaveClass('Mui-selected');
  });
});
