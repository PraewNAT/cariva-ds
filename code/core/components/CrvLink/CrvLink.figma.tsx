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
      // Figma has a visibility toggle + an instance swap per icon; CrvLink
      // takes the icon element itself, so emit the swapped icon only when shown.
      startIcon: figma.boolean('startIconVisible', {
        true:  figma.instance('startIcon'),
        false: undefined,
      }),
      endIcon: figma.boolean('endIconVisible', {
        true:  figma.instance('endIcon'),
        false: undefined,
      }),
      children: figma.textContent('label'),
    },
    example: ({ size, disabled, startIcon, endIcon, children }) => (
      <CrvLink
        href="#"
        size={size}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {children}
      </CrvLink>
    ),
  },
);
