'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvTextArea } from './CrvTextArea';

const meta: Meta<typeof CrvTextArea> = {
  title: 'Form/CrvTextArea',
  component: CrvTextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Multiline text area for long-form input — notes, descriptions, feedback. ' +
          'Use maxRows for scrollable behavior (filledScrollable).',
      },
    },
    controls: {
      include: [
        'size',
        'label',
        'secondaryLabel',
        'secondaryLabelVisible',
        'placeholder',
        'value',
        'helperText',
        'helperTextVisible',
        'error',
        'errorMessage',
        'minRows',
        'maxRows',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    secondaryLabelVisible: { control: 'boolean' },
    helperTextVisible: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    label: { control: 'text' },
    secondaryLabel: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    label: 'Label',
    secondaryLabel: 'optional',
    secondaryLabelVisible: false,
    placeholder: 'Placeholder',
    helperText: 'Help text',
    helperTextVisible: false,
    error: false,
    errorMessage: 'Error message',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvTextArea>;

export const Default: Story = {
  args: {
    label: 'หมายเหตุ',
    placeholder: 'กรอกหมายเหตุเพิ่มเติม',
  },
};

export const Medium: Story = {
  args: { size: 'medium', label: 'รายละเอียด', placeholder: 'อธิบายรายละเอียด' },
};

export const Small: Story = {
  args: { size: 'small', label: 'รายละเอียด', placeholder: 'อธิบายรายละเอียด' },
};

export const WithSecondaryLabel: Story = {
  args: {
    label: 'หมายเหตุ',
    secondaryLabel: 'optional',
    secondaryLabelVisible: true,
    placeholder: 'กรอกหมายเหตุ (ถ้ามี)',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'แชร์ความคิดเห็นของคุณ',
    helperTextVisible: true,
    helperText: 'สูงสุด 500 ตัวอักษร',
  },
};

export const Filled: Story = {
  args: {
    label: 'หมายเหตุ',
    value: 'ผู้ป่วยแพ้ penicillin\n\nติดต่อญาติได้ที่เบอร์ 081-234-5678',
  },
};

export const Scrollable: Story = {
  args: {
    label: 'หมายเหตุ',
    value:
      'บรรทัด 1\nบรรทัด 2\nบรรทัด 3\nบรรทัด 4\nบรรทัด 5\nบรรทัด 6\nบรรทัด 7',
    maxRows: 4,
    helperTextVisible: true,
    helperText: 'เลื่อนดูข้อความที่เหลือ',
  },
};

export const Error: Story = {
  args: {
    label: 'หมายเหตุ',
    value: 'ข้อความสั้นเกินไป',
    error: true,
    errorMessage: 'กรุณากรอกอย่างน้อย 20 ตัวอักษร',
  },
};

export const Disabled: Story = {
  args: {
    label: 'หมายเหตุ',
    value: 'ข้อมูลที่บันทึกไว้แล้ว',
    disabled: true,
  },
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
    <div style={{ display: 'grid', gap: 32, maxWidth: 360 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{size}</p>
          <CrvTextArea
            size={size}
            label="Label"
            placeholder="Placeholder"
            secondaryLabel="optional"
            secondaryLabelVisible
          />
          <CrvTextArea
            size={size}
            label="Label"
            value={'Content\n\n\n'}
            helperTextVisible
            helperText="Help text"
          />
          <CrvTextArea
            size={size}
            label="Label"
            value={'Content\n\n\n'}
            error
            errorMessage="Error message"
          />
          <CrvTextArea
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
