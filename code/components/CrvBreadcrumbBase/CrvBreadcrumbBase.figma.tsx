import figma from '@figma/code-connect';
import { CrvBreadcrumbBase } from './CrvBreadcrumbBase';

// Figma node: crv-breadcrumb-base component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059
figma.connect(
  CrvBreadcrumbBase,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-5059',
  {
    props: {
      type: figma.enum('type', {
        default:  'default',
        hover:    'default',
        dropdown: 'dropdown',
        ellipsis: 'ellipsis',
        active:   'active',
      }),
      text: figma.string('text'),
    },
    example: ({ type, text }) => (
      <CrvBreadcrumbBase type={type} text={text} href="#" />
    ),
  },
);
