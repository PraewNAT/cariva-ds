'use client';

import type { Meta, StoryObj } from '@storybook/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CrvLink } from './CrvLink';

const ICONS = {
  none:           undefined,
  'arrow-forward': <ArrowForwardIcon fontSize="small" />,
  'arrow-back':    <ArrowBackIcon fontSize="small" />,
  'open-in-new':   <OpenInNewIcon fontSize="small" />,
  'info':          <InfoOutlinedIcon fontSize="small" />,
};

type IconKey = keyof typeof ICONS;

const meta: Meta<typeof CrvLink> = {
  title: 'Buttons/CrvLink',
  component: CrvLink,
  parameters: {
    docs: {
      description: {
        component:
          'Link component — wraps MUI Link. For navigation and low-emphasis actions only. ' +
          'No variant or color prop — single style. Underline is always present.',
      },
    },
    controls: { include: ['children', 'size', 'disabled', 'startIcon', 'endIcon'] },
  },
  argTypes: {
    size:     { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    startIcon: {
      control:     { type: 'select' },
      options:     Object.keys(ICONS),
      mapping:     ICONS,
      description: 'เลือก icon ด้านซ้าย',
    },
    endIcon: {
      control:     { type: 'select' },
      options:     Object.keys(ICONS),
      mapping:     ICONS,
      description: 'เลือก icon ด้านขวา',
    },
    // Hide inherited props
    component: { table: { disable: true } },
    sx:        { table: { disable: true } },
    classes:   { table: { disable: true } },
    style:     { table: { disable: true } },
    ref:       { table: { disable: true } },
  },
  args: {
    children:  'ดูรายละเอียด',
    size:      'medium',
    disabled:  false,
    startIcon: 'none' as IconKey,
    endIcon:   'none' as IconKey,
  },
};

export default meta;
type Story = StoryObj<typeof CrvLink>;

export const Default: Story = {
  args: {
    size:     'medium',
    children: 'ดูรายละเอียด',
    href:     '#',
  },
};

export const Small: Story = {
  args: { size: 'small', children: 'เรียนรู้เพิ่มเติม', href: '#' },
};

export const Medium: Story = {
  args: { size: 'medium', children: 'เรียนรู้เพิ่มเติม', href: '#' },
};

export const Large: Story = {
  args: { size: 'large', children: 'เรียนรู้เพิ่มเติม', href: '#' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'ดูรายละเอียด', href: '#' },
};

export const WithStartIcon: Story = {
  args: {
    children:   'กลับไปหน้าหลัก',
    startIcon:  'arrow-back' as IconKey,
    href:       '#',
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'เปิดในหน้าใหม่',
    endIcon:  'open-in-new' as IconKey,
    href:     '#',
  },
};

export const WithBothIcons: Story = {
  args: {
    children:  'ไปยังหน้าถัดไป',
    startIcon: 'info' as IconKey,
    endIcon:   'arrow-forward' as IconKey,
    href:      '#',
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — แสดงทุก size × state พร้อมกัน',
      },
    },
  },
  render: () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        {/* Enabled */}
        <div>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Enabled</p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {sizes.map((s) => (
              <CrvLink key={s} size={s} href="#">
                {`Link ${s}`}
              </CrvLink>
            ))}
          </div>
        </div>
        {/* Disabled */}
        <div>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Disabled</p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {sizes.map((s) => (
              <CrvLink key={s} size={s} href="#" disabled>
                {`Link ${s}`}
              </CrvLink>
            ))}
          </div>
        </div>
        {/* With icons */}
        <div>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>With Icons</p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {sizes.map((s) => (
              <CrvLink
                key={s}
                size={s}
                href="#"
                startIcon={<ArrowBackIcon fontSize="small" />}
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                {`Link ${s}`}
              </CrvLink>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
