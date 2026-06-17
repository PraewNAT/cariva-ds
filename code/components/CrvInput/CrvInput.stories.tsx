'use client';

import type { Meta, StoryObj } from '@storybook/react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CrvInput } from './CrvInput';

const ICONS = {
  none:   undefined,
  mail:   <MailOutlineIcon fontSize="small" />,
  phone:  <PhoneOutlinedIcon fontSize="small" />,
  lock:   <LockOutlinedIcon fontSize="small" />,
  search: <SearchIcon fontSize="small" />,
  person: <PersonOutlineIcon fontSize="small" />,
};

type IconKey = keyof typeof ICONS;

const meta: Meta<typeof CrvInput> = {
  title: 'Form/CrvInput',
  component: CrvInput,
  parameters: {
    docs: {
      description: {
        component:
          'Standard vertical input — wraps MUI OutlinedInput. ' +
          'Supports label, secondary label, start adornment, helper text, and error message.',
      },
    },
    controls: {
      include: [
        'size',
        'label',
        'labelVisible',
        'secondaryLabel',
        'secondaryLabelVisible',
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
    labelVisible: { control: 'boolean' },
    secondaryLabelVisible: { control: 'boolean' },
    helperTextVisible: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    secondaryLabel: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    startAdornment: {
      control:     { type: 'select' },
      options:     Object.keys(ICONS),
      mapping:     ICONS,
      description: 'เลือก icon ด้านซ้าย — none = ไม่แสดง',
    },
    startAdornmentVisible: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    label: 'Label',
    labelVisible: true,
    secondaryLabel: 'optional',
    secondaryLabelVisible: false,
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
type Story = StoryObj<typeof CrvInput>;

export const Default: Story = {
  args: {
    size: 'medium',
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const Medium: Story = {
  args: { size: 'medium', label: 'อีเมล', placeholder: 'name@example.com' },
};

export const Small: Story = {
  args: { size: 'small', label: 'อีเมล', placeholder: 'name@example.com' },
};

export const WithSecondaryLabel: Story = {
  args: {
    label: 'ชื่อ-นามสกุล',
    secondaryLabel: 'optional',
    secondaryLabelVisible: true,
    placeholder: 'กรอกชื่อ-นามสกุล',
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: 'อีเมล',
    placeholder: 'name@example.com',
    startAdornment: 'mail' as IconKey,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'รหัสผ่าน',
    placeholder: 'กรอกรหัสผ่าน',
    helperTextVisible: true,
    helperText: 'ต้องมีอย่างน้อย 8 ตัวอักษร',
  },
};

export const Filled: Story = {
  args: {
    label: 'อีเมล',
    value: 'name@example.com',
  },
};

export const Error: Story = {
  args: {
    label: 'อีเมล',
    value: 'invalid-email',
    error: true,
    errorMessage: 'รูปแบบอีเมลไม่ถูกต้อง กรุณากรอกใหม่',
  },
};

export const Disabled: Story = {
  args: {
    label: 'อีเมล',
    value: 'name@example.com',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    labelVisible: false,
    placeholder: 'ค้นหา...',
    startAdornment: 'search' as IconKey,
    'aria-label': 'ค้นหา',
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — medium/small × default/error/disabled',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 360 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{size}</p>
          <CrvInput
            size={size}
            label="Label"
            placeholder="Placeholder"
            secondaryLabel="optional"
            secondaryLabelVisible
          />
          <CrvInput
            size={size}
            label="Label"
            placeholder="Placeholder"
            startAdornment={<MailOutlineIcon fontSize="small" />}
          />
          <CrvInput
            size={size}
            label="Label"
            value="Content"
            helperTextVisible
            helperText="Help text"
          />
          <CrvInput
            size={size}
            label="Label"
            value="Content"
            error
            errorMessage="Error message"
          />
          <CrvInput
            size={size}
            label="Label"
            value="Content"
            disabled
          />
        </div>
      ))}
    </div>
  ),
};
