import figma from '@figma/code-connect';
import {
  CrvPagination,
  CrvPaginationJumpToPage,
  CrvPaginationRowsPerPage,
} from './CrvPagination';

// Figma node: crv-pagination-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1661
figma.connect(
  CrvPagination,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1661',
  {
    props: {
      size: figma.enum('size', {
        large:  'large',
        medium: 'medium',
      }),
    },
    example: ({ size }) => (
      <CrvPagination
        count={10}
        page={1}
        size={size}
      />
    ),
  },
);

// Figma node: crv-pagination-rows-per-page component
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1695
figma.connect(
  CrvPaginationRowsPerPage,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1695',
  {
    example: () => (
      <CrvPaginationRowsPerPage value={10} />
    ),
  },
);

// Figma node: crv-pagination-jump-to-page component
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1696
figma.connect(
  CrvPaginationJumpToPage,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4230-1696',
  {
    example: () => (
      <CrvPaginationJumpToPage value={1} count={10} />
    ),
  },
);
