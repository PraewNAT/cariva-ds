import figma from '@figma/code-connect';
import { CrvFileUpload, CrvFileUploadItem } from './CrvFileUpload';

// Figma node: crv-file-upload component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56094
figma.connect(
  CrvFileUpload,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56094',
  {
    props: {
      state: figma.enum('state', {
        default:  'default',
        hover:    'hover',
        dragging: 'dragging',
        error:    'error',
        disabled: 'disabled',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
    },
    example: ({ state, disabled }) => (
      <CrvFileUpload state={state} disabled={disabled} />
    ),
  },
);

// Figma node: crv-file-upload-item component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56129
figma.connect(
  CrvFileUploadItem,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-56129',
  {
    props: {
      state: figma.enum('state', {
        idle:      'idle',
        uploading: 'uploading',
        complete:  'complete',
        error:     'error',
      }),
    },
    example: ({ state }) => (
      <CrvFileUploadItem
        state={state}
        fileName="filename.pdf"
        fileMeta="2.4 MB"
        progress={60}
        onRemove={() => undefined}
        onRetry={() => undefined}
      />
    ),
  },
);
