import { crvMenuPaperSx, MENU_ITEM_HEIGHT, MENU_VISIBLE_ITEMS } from './crvMenuListStyles';
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

  it('caps the menu at six items and scrolls past that', () => {
    // Figma crv-menu scrollable=true: 6 × 40 + 8px padding top and bottom.
    expect(crvMenuPaperSx.maxHeight).toBe(MENU_VISIBLE_ITEMS * MENU_ITEM_HEIGHT + 16);
    expect(crvMenuPaperSx.overflowY).toBe('auto');
  });

  it('draws a 6px rounded scrollbar thumb', () => {
    const thumb = crvMenuPaperSx['&::-webkit-scrollbar-thumb'];
    // 14px track − 2 × 4px transparent border = a 6px thumb, as in Figma.
    expect(crvMenuPaperSx['&::-webkit-scrollbar'].width).toBe(14);
    expect(thumb.border).toBe('4px solid transparent');
    expect(thumb.backgroundClip).toBe('content-box');
  });
});
