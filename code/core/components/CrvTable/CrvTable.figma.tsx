import figma from '@figma/code-connect';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import { CrvTableCell } from './CrvTableCell';
import { CrvTableHead } from './CrvTableHead';
import { CrvTableTextCell } from './CrvTableTextCell';

// Figma node: crv-table-head component set
figma.connect(
  CrvTableHead,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4582-11202',
  {
    props: {
      size: figma.enum('size', { small: 'small', default: 'default' }),
      compact: figma.enum('compact', { true: true, false: false }),
      label: figma.string('label'),
      checkbox: figma.boolean('checkBoxVisible', {
        true: <CrvCheckboxBase />,
        false: undefined,
      }),
      leftSort: figma.boolean('leftSortVisible'),
      rightSort: figma.boolean('rightSortVisible'),
    },
    example: ({ size, compact, label, checkbox, leftSort, rightSort }) => (
      <CrvTableHead
        size={size}
        compact={compact}
        label={label}
        checkbox={checkbox}
        leftSort={leftSort}
        rightSort={rightSort}
      />
    ),
  },
);

// Figma node: crv-table-cell component set
figma.connect(
  CrvTableCell,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4582-11271',
  {
    props: {
      size: figma.enum('size', { small: 'small', default: 'default' }),
      state: figma.enum('state', {
        default: 'default',
        hover: 'hover',
        disabled: 'disabled',
      }),
      alternate: figma.enum('alternate', { true: true, false: false }),
      content: figma.children(['customContent']),
    },
    example: ({ size, state, alternate, content }) => (
      <CrvTableCell size={size} state={state} alternate={alternate}>
        {content}
      </CrvTableCell>
    ),
  },
);

// Figma node: crv-tableText-cell component
figma.connect(
  CrvTableTextCell,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4705-20105',
  {
    props: {
      showDescription: figma.boolean('descriptionVisible'),
    },
    example: ({ showDescription }) => (
      <CrvTableTextCell
        main="Main text"
        description={showDescription ? 'Description' : undefined}
      />
    ),
  },
);
