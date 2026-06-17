import figma from '@figma/code-connect';
import { CrvBreadcrumbDemo } from './CrvBreadcrumb';

// Figma node: crv-breadcrumb-standard component
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5038
figma.connect(
  CrvBreadcrumbDemo,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5038',
  {
    props: {
      breadcrumb01: figma.boolean('breadcrumb-01'),
      breadcrumb02: figma.boolean('breadcrumb-02'),
      breadcrumb03: figma.boolean('breadcrumb-03'),
      breadcrumb04: figma.boolean('breadcrumb-04'),
      breadcrumb05: figma.boolean('breadcrumb-05'),
    },
    example: ({
      breadcrumb01,
      breadcrumb02,
      breadcrumb03,
      breadcrumb04,
      breadcrumb05,
    }) => (
      <CrvBreadcrumbDemo
        breadcrumb01={breadcrumb01}
        breadcrumb02={breadcrumb02}
        breadcrumb03={breadcrumb03}
        breadcrumb04={breadcrumb04}
        breadcrumb05={breadcrumb05}
      />
    ),
  },
);
