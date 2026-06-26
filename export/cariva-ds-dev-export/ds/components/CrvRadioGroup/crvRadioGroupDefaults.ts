import type { CrvRadioGroupOption } from './CrvRadioGroup.types';

// Ground truth from Figma (crv-radio-group, node 3815:5863)
export const DEFAULT_RADIO_GROUP_OPTIONS: CrvRadioGroupOption[] = [
  { value: 'recents', label: 'Recents', visible: true },
  { value: 'home', label: 'Home', visible: true },
  { value: 'applications', label: 'Applications', visible: true },
  { value: 'desktop', label: 'Desktop', visible: true },
  { value: 'downloads', label: 'Downloads', visible: true },
  { value: 'documents', label: 'Documents', visible: true },
];
