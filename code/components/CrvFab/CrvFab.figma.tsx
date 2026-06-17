import figma from '@figma/code-connect';
import AddIcon from '@mui/icons-material/Add';
import { CrvFab } from './CrvFab';

// Figma node: crv-fab component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4497-77574
figma.connect(
  CrvFab,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4497-77574',
  {
    props: {
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
        large:  'large',
      }),
      color: figma.enum('color', {
        primary: 'primary',
        neutral: 'neutral',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
    },
    example: ({ size, color, disabled }) => (
      <CrvFab size={size} color={color} disabled={disabled} aria-label="add">
        <AddIcon />
      </CrvFab>
    ),
  },
);
