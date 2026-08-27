import figma from '@figma/code-connect';
import { CrvSidebar } from './CrvSidebar';
import { CrvSidebarMenu } from './CrvSidebarMenu';

// crv-sidebar (4724:103532)
figma.connect(
  CrvSidebar,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4724-103532',
  {
    props: {
      logo: figma.children('Logo'),
      children: figma.children('contentSlot'),
    },
    example: (props) => <CrvSidebar logo={props.logo}>{props.children}</CrvSidebar>,
  },
);

// crv-sidebar-menu (4735:102038) — type=expand|default × active=true|false
figma.connect(
  CrvSidebarMenu,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4735-102038',
  {
    props: {
      type: figma.enum('type', { expand: 'expand', default: 'default' }),
      active: figma.boolean('active'),
    },
    example: (props) =>
      props.type === 'default' ? (
        <CrvSidebarMenu type="default" label="Menu item" active={props.active} />
      ) : (
        <CrvSidebarMenu
          type="expand"
          label="Menu item"
          active={props.active}
          items={[{ label: 'Sub item', selected: true }, { label: 'Sub item' }, { label: 'Sub item' }]}
        />
      ),
  },
);
