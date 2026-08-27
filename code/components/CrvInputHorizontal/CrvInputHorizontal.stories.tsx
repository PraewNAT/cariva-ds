'use client';

import type { Meta, StoryObj } from '@storybook/react';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CrvInputHorizontal } from './CrvInputHorizontal';

const ICONS = {
  none:   undefined,
  search: <SearchIcon fontSize="small" />,
  mail:   <MailOutlineIcon fontSize="small" />,
  phone:  <PhoneOutlinedIcon fontSize="small" />,
  person: <PersonOutlineIcon fontSize="small" />,
};

type IconKey = keyof typeof ICONS;

const meta: Meta<typeof CrvInputHorizontal> = {
  title: 'Form/CrvInputHorizontal',
  component: CrvInputHorizontal,
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal input — label on the left, field on the right. ' +
          'For wide forms and detail views. Not recommended on mobile.',
      },
    },
    controls: {
      include: [
        'size',
        'label',
        'labelWidth',
        'placeholder',
        'value',
        'helperText',
        'helperTextVisible',
        'error',
        'errorMessage',
        'startAdornment',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    helperTextVisible: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelWidth: { control: 'number' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    startAdornment: {
      control:     { type: 'select' },
      options:     Object.keys(ICONS),
      mapping:     ICONS,
      description: 'เลือก icon ใน field — none = ไม่แสดง',
    },
    startAdornmentVisible: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    label: 'Label',
    labelWidth: 120,
    placeholder: 'Placeholder',
    helperText: 'Help text',
    helperTextVisible: false,
    error: false,
    errorMessage: 'Error message',
    startAdornment: 'none' as IconKey,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvInputHorizontal>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    labelWidth: 120,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'อีเมล',
    placeholder: 'name@example.com',
    labelWidth: 120,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'อีเมล',
    placeholder: 'name@example.com',
    labelWidth: 120,
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: 'ค้นหา',
    placeholder: 'พิมพ์คำค้นหา',
    labelWidth: 120,
    startAdornment: 'search' as IconKey,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'เบอร์โทร',
    placeholder: '0812345678',
    labelWidth: 120,
    helperTextVisible: true,
    helperText: 'ใช้เบอร์ที่ลงทะเบียนไว้',
  },
};

export const Filled: Story = {
  args: {
    label: 'อีเมล',
    value: 'name@example.com',
    labelWidth: 120,
  },
};

export const Error: Story = {
  args: {
    label: 'อีเมล',
    value: 'invalid-email',
    labelWidth: 120,
    error: true,
    errorMessage: 'รูปแบบอีเมลไม่ถูกต้อง กรุณากรอกใหม่',
  },
};

export const Disabled: Story = {
  args: {
    label: 'อีเมล',
    value: 'name@example.com',
    labelWidth: 120,
    disabled: true,
  },
};

export const FormGroup: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'ใช้ labelWidth เดียวกันใน form group เพื่อให้ field column ตรงกัน',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <CrvInputHorizontal label="ชื่อ-นามสกุล" placeholder="กรอกชื่อ-นามสกุล" labelWidth={120} />
      <CrvInputHorizontal label="อีเมล" placeholder="name@example.com" labelWidth={120} startAdornment={<MailOutlineIcon fontSize="small" />} />
      <CrvInputHorizontal label="เบอร์โทร" placeholder="0812345678" labelWidth={120} startAdornment={<PhoneOutlinedIcon fontSize="small" />} />
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase — medium/small × default/error/disabled',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 480 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{size}</p>
          <CrvInputHorizontal
            size={size}
            label="Label"
            placeholder="Placeholder"
            labelWidth={120}
            startAdornment={<SearchIcon fontSize="small" />}
          />
          <CrvInputHorizontal
            size={size}
            label="Label"
            value="Content"
            labelWidth={120}
            helperTextVisible
            helperText="Help text"
          />
          <CrvInputHorizontal
            size={size}
            label="Label"
            value="Content"
            labelWidth={120}
            error
            errorMessage="Error message"
          />
          <CrvInputHorizontal
            size={size}
            label="Label"
            value="Content"
            labelWidth={120}
            disabled
          />
        </div>
      ))}
    </div>
  ),
};
