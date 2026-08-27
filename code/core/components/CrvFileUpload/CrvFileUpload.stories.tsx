import type { Meta, StoryObj } from '@storybook/react';
import { CrvFileUpload } from './CrvFileUpload';
import type { CrvFileUploadState } from './CrvFileUpload.types';

const UPLOAD_STATES: CrvFileUploadState[] = [
  'default',
  'hover',
  'dragging',
  'error',
  'disabled',
];

const meta: Meta<typeof CrvFileUpload> = {
  title: 'Form/CrvFileUpload',
  component: CrvFileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'File upload dropzone and upload item components. Maps to Figma file-upload node 4457:62799.',
      },
    },
    controls: {
      include: ['state', 'label', 'description', 'errorMessage', 'disabled', 'multiple', 'accept'],
    },
  },
  argTypes: {
    state: { control: 'select', options: UPLOAD_STATES },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    onFilesSelected: { table: { disable: true } },
    onInputChange: { table: { disable: true } },
    onFileDrop: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    state: 'default',
    label: 'Drag & drop files here',
    description: 'or click to browse · PNG, JPG, PDF up to 10MB',
    errorMessage: 'File type not supported or too large',
    disabled: false,
    multiple: true,
    accept: '.png,.jpg,.jpeg,.pdf',
  },
};

export default meta;
type Story = StoryObj<typeof CrvFileUpload>;

export const Default: Story = {};

export const Dragging: Story = {
  args: { state: 'dragging' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllUploadStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {UPLOAD_STATES.map((state) => (
        <div key={state} style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontSize: 12 }}>{state}</span>
          <CrvFileUpload
            state={state}
            disabled={state === 'disabled'}
          />
        </div>
      ))}
    </div>
  ),
};
