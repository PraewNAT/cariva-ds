import type { CrvCheckboxGroupOption } from './CrvCheckboxGroup.types';

// Ground truth from Figma (crv-checkbox-group, node 3815:5374)
export const DEFAULT_CHECKBOX_GROUP_OPTIONS: CrvCheckboxGroupOption[] = [
  { value: 'recents', label: 'Recents', visible: true },
  { value: 'home', label: 'Home', visible: true },
  { value: 'applications', label: 'Applications', visible: true },
  { value: 'desktop', label: 'Desktop', visible: true },
  { value: 'downloads', label: 'Downloads', visible: true },
  { value: 'documents', label: 'Documents', visible: true },
];
