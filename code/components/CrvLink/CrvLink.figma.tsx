'use client';

/**
 * CrvLink — Figma Code Connect
 *
 * Figma component: crv-link
 * Node: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4165-5267
 */

import figma from '@figma/code-connect';
import { CrvLink } from './CrvLink';

figma.connect(
  CrvLink,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4165-5267',
  {
    props: {
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
        large:  'large',
      }),
      disabled: figma.enum('state', {
        disabled: true,
        default:  false,
        hover:    false,
        pressed:  false,
      }),
      startIconVisible: figma.boolean('startIconVisible'),
      endIconVisible:   figma.boolean('endIconVisible'),
    },
    example: ({ size, disabled, startIconVisible, endIconVisible }) => (
      <CrvLink
        href="#"
        size={size}
        disabled={disabled}
        startIconVisible={startIconVisible}
        endIconVisible={endIconVisible}
      >
        Label
      </CrvLink>
    ),
  },
);
