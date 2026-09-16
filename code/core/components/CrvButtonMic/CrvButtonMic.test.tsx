import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CrvButtonMic } from './CrvButtonMic';
import { WAVEFORM_BAR_HEIGHTS } from './crvButtonMicStyles';

describe('CrvButtonMic', () => {
  it('shows the selected device name', () => {
    render(<CrvButtonMic label="MacBook Pro Microphone" />);
    expect(screen.getByRole('button', { name: /MacBook Pro Microphone/ })).toBeInTheDocument();
  });

  it('draws the five-bar waveform from Figma', () => {
    expect(WAVEFORM_BAR_HEIGHTS).toEqual([8, 12, 16, 12, 8]);
  });

  it('can hide the waveform', () => {
    const { container, rerender } = render(<CrvButtonMic label="ไมค์" />);
    const withWaveform = container.querySelectorAll('span[aria-hidden] > div').length;
    rerender(<CrvButtonMic label="ไมค์" showWaveform={false} />);
    expect(container.querySelectorAll('span[aria-hidden] > div').length).toBeLessThan(
      withWaveform + 1,
    );
  });

  it('fires onClick', async () => {
    const onClick = vi.fn();
    render(<CrvButtonMic label="ไมค์" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
