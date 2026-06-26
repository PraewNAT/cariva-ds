import type { AccordionProps } from '@mui/material/Accordion';
import type { ReactNode } from 'react';

export interface CrvAccordionProps
  extends Omit<AccordionProps, 'children' | 'title' | 'disabled'> {
  /** Trigger label — Figma `Title` */
  title: string;
  /** Expandable content — Figma `AccordionContent` */
  children: ReactNode;
  /** Show leading icon — Figma `showIcon` */
  showIcon?: boolean;
  /** Leading icon — Figma `icon` instance swap */
  icon?: ReactNode;
}
