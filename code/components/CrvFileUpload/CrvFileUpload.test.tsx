import { fireEvent, render, screen } from '@testing-library/react';
import { CrvFileUpload, CrvFileUploadItem } from './CrvFileUpload';

describe('CrvFileUpload', () => {
  it('renders default copy', () => {
    render(<CrvFileUpload />);
    expect(screen.getByText('Drag & drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse · PNG, JPG, PDF up to 10MB')).toBeInTheDocument();
  });

  it('renders error message in error state', () => {
    render(<CrvFileUpload state="error" errorMessage="Invalid file" />);
    expect(screen.getByText('Invalid file')).toBeInTheDocument();
  });

  it('does not expose description in disabled state', () => {
    render(<CrvFileUpload disabled />);
    expect(screen.getByText('Upload unavailable')).toBeInTheDocument();
    expect(screen.queryByText('or click to browse · PNG, JPG, PDF up to 10MB')).not.toBeInTheDocument();
  });

  it('calls onFilesSelected when a file is selected', () => {
    const onFilesSelected = vi.fn();
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
    const { container } = render(<CrvFileUpload onFilesSelected={onFilesSelected} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFilesSelected).toHaveBeenCalledTimes(1);
  });
});

describe('CrvFileUploadItem', () => {
  it('renders file metadata', () => {
    render(<CrvFileUploadItem fileName="document.pdf" fileMeta="2 MB" />);
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
    expect(screen.getByText('2 MB')).toBeInTheDocument();
  });

  it('renders progress state', () => {
    render(<CrvFileUploadItem state="uploading" progress={60} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls remove action', () => {
    const onRemove = vi.fn();
    render(<CrvFileUploadItem onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText('Remove file'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
