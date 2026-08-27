import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CrvTabsStandard } from './CrvTabsStandard';
import { CrvTabsPills } from './CrvTabsPills';
import { CrvTabsFolder } from './CrvTabsFolder';
import type { CrvTabItem } from './CrvTabs.types';

const items: CrvTabItem[] = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
  { value: 'c', label: 'Tab C', disabled: true },
];

describe('CrvTabsStandard', () => {
  it('renders tabs and marks the selected one', () => {
    render(<CrvTabsStandard items={items} value="a" />);
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'false');
  });

  it('fires onChange with the new value', () => {
    const onChange = vi.fn();
    render(<CrvTabsStandard items={items} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
  });
});

describe('CrvTabsPills', () => {
  it('renders and selects', () => {
    render(<CrvTabsPills items={items} value="b" />);
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('disables disabled tabs', () => {
    const onChange = vi.fn();
    render(<CrvTabsPills items={items} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab C' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('CrvTabsFolder', () => {
  it('renders tablist and toggles selection', () => {
    const onChange = vi.fn();
    render(<CrvTabsFolder items={items} value="a" onChange={onChange} />);
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
  });
});
