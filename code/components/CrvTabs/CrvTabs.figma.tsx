import figma from '@figma/code-connect';
import { CrvTabsStandard } from './CrvTabsStandard';
import { CrvTabsPills } from './CrvTabsPills';
import { CrvTabsFolder } from './CrvTabsFolder';

// crv-tabs-standard (4838:9365)
figma.connect(
  CrvTabsStandard,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4838-9365',
  {
    example: () => (
      <CrvTabsStandard
        value="home"
        items={[
          { value: 'home', label: 'Home' },
          { value: 'profile', label: 'Profile' },
        ]}
      />
    ),
  },
);

// crv-tabs-pills (3875:4462)
figma.connect(
  CrvTabsPills,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-4462',
  {
    props: {
      variant: figma.enum('variant', { standard: 'standard', fullWidth: 'fullWidth' }),
      tabVariant: figma.enum('tabVariant', { default: 'default', line: 'line' }),
    },
    example: (props) => (
      <CrvTabsPills
        variant={props.variant}
        tabVariant={props.tabVariant}
        value="home"
        items={[
          { value: 'home', label: 'Label' },
          { value: 'two', label: 'Label' },
        ]}
      />
    ),
  },
);

// crv-tabs-folder (4725:21088)
figma.connect(
  CrvTabsFolder,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4725-21088',
  {
    example: () => (
      <CrvTabsFolder
        value="overview"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'details', label: 'Details' },
        ]}
      />
    ),
  },
);
