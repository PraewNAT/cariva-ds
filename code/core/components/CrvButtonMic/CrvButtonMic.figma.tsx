import figma from '@figma/code-connect';
import { CrvButtonMic } from './CrvButtonMic';

// Figma node: crv-button-mic
figma.connect(
  CrvButtonMic,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5862-33778',
  {
    example: () => (
      <CrvButtonMic label="Default - MacBook Pro Microphone (Built-in)" active />
    ),
  },
);
