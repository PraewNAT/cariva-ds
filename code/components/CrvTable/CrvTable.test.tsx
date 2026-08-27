import { render, screen, fireEvent } from '@testing-library/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CrvTableCell } from './CrvTableCell';
import { CrvTableHead } from './CrvTableHead';
import { CrvTableTextCell } from './CrvTableTextCell';

function wrapHead(node: React.ReactNode) {
  return (
    <Table>
      <TableHead>
        <TableRow>{node}</TableRow>
      </TableHead>
    </Table>
  );
}

function wrapCell(node: React.ReactNode) {
  return (
    <Table>
      <TableBody>
        <TableRow>{node}</TableRow>
      </TableBody>
    </Table>
  );
}

describe('CrvTableHead', () => {
  it('renders label', () => {
    render(wrapHead(<CrvTableHead label="Name" />));
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('hides label when compact', () => {
    render(wrapHead(<CrvTableHead compact label="Name" />));
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('calls onSort', () => {
    const onSort = vi.fn();
    render(wrapHead(<CrvTableHead label="Name" rightSort onSort={onSort} />));
    fireEvent.click(screen.getByRole('button'));
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});

describe('CrvTableCell', () => {
  it('renders children content', () => {
    render(wrapCell(<CrvTableCell>Cell value</CrvTableCell>));
    expect(screen.getByText('Cell value')).toBeInTheDocument();
  });
});

describe('CrvTableTextCell', () => {
  it('renders main and description', () => {
    render(<CrvTableTextCell main="Main" description="Desc" />);
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });
});
