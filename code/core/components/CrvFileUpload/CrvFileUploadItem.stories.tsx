import type { Meta, StoryObj } from '@storybook/react';
import { CrvFileUploadItem } from './CrvFileUpload';
import type { CrvFileUploadItemState } from './CrvFileUpload.types';

const ITEM_STATES: CrvFileUploadItemState[] = [
  'idle',
  'uploading',
  'complete',
  'error',
];

const meta: Meta<typeof CrvFileUploadItem> = {
  title: 'Form/CrvFileUpload/Item',
  component: CrvFileUploadItem,
  parameters: {
    docs: {
      description: {
        component:
          'Upload item row for a selected file. Maps to Figma crv-file-upload-item node 4457:56129.',
      },
    },
    controls: {
      include: ['state', 'fileName', 'fileMeta', 'progress'],
    },
  },
  argTypes: {
    state: { control: 'select', options: ITEM_STATES },
    fileName: { control: 'text' },
    fileMeta: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    onRemove: { table: { disable: true } },
    onRetry: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    state: 'idle',
    fileName: 'medical-report.pdf',
    fileMeta: '2.4 MB',
    progress: 60,
  },
};

export default meta;
type Story = StoryObj<typeof CrvFileUploadItem>;

export const Default: Story = {};

export const Uploading: Story = {
  args: { state: 'uploading' },
};

export const Complete: Story = {
  args: { state: 'complete' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const AllItemStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      {ITEM_STATES.map((state) => (
        <CrvFileUploadItem
          key={state}
          state={state}
          fileName="medical-report.pdf"
          fileMeta="2.4 MB"
          progress={60}
          onRemove={() => undefined}
          onRetry={() => undefined}
        />
      ))}
    </div>
  ),
};
