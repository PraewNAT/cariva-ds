'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { CrvButton } from '../CrvButton';
import { CrvButtonIcon } from '../CrvButtonIcon';
import { CrvChipAction } from '../CrvChipAction';
import { CrvBottomSheet } from './CrvBottomSheet';
import { colors, spacing } from '../../tokens';
import type { CrvBottomSheetProps } from './CrvBottomSheet.types';

const OPTIONS = [
  'Bangkok',
  'Chiang Mai',
  'Phuket',
  'Khon Kaen',
  'Nakhon Ratchasima',
  'Krabi',
  'Pattaya',
  'Hua Hin',
];

function BottomSheetDemo({ variant = 'default', ...rest }: CrvBottomSheetProps) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(['Chiang Mai']);

  const toggle = (opt: string) =>
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );

  const filtered =
    variant === 'search'
      ? OPTIONS.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
      : OPTIONS;

  return (
    <>
      {!open ? (
        <CrvButton variant="contained" color="primary" onClick={() => setOpen(true)}>
          Open bottom sheet
        </CrvButton>
      ) : null}
      <CrvBottomSheet
        {...rest}
        variant={variant}
        open={open}
        onClose={() => setOpen(false)}
        title="Select cities"
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search city"
        headerActions={
          <CrvButtonIcon
            variant="ghost"
            color="primary"
            size="small"
            aria-label="Close"
            onClick={() => setOpen(false)}
            sx={{ color: colors.content.secondary }}
          >
            <CloseIcon fontSize="small" />
          </CrvButtonIcon>
        }
        actions={
          <CrvButton
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={selected.length === 0}
            onClick={() => setOpen(false)}
          >
            {selected.length > 0 ? `Confirm (${selected.length})` : 'Confirm'}
          </CrvButton>
        }
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${spacing.sm}px` }}>
          {filtered.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <CrvChipAction
                key={opt}
                label={opt}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                onClick={() => toggle(opt)}
              />
            );
          })}
          {filtered.length === 0 ? (
            <Typography sx={{ color: colors.content.secondary, p: `${spacing.md}px` }}>
              No results
            </Typography>
          ) : null}
        </Box>
      </CrvBottomSheet>
    </>
  );
}

const meta: Meta<typeof CrvBottomSheet> = {
  title: 'Surfaces/CrvBottomSheet',
  component: CrvBottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Mobile bottom sheet drawer. Maps to Figma `crv-bottom-sheet-header` (4485:31705) + ' +
          '`crv-bottom-sheet-content` (4485:31742). Slides up from the bottom with rounded top ' +
          'corners. Header has `default` (title only) and `search` (title + search field) variants, ' +
          'a scrollable `children` content slot, and an optional sticky `actions` footer. ' +
          'Demo shows multi-select chips inside the content slot.',
      },
    },
    controls: {
      include: ['variant', 'showHeaderGradient'],
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'search'],
      description: 'Header layout — Figma `crv-bottom-sheet-header type`',
    },
    showHeaderGradient: {
      control: 'boolean',
      description: 'Decorative cyan/teal glow — Figma `showTopColor`',
    },
  },
  args: {
    variant: 'default',
    showHeaderGradient: true,
  },
  render: (args) => <BottomSheetDemo {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvBottomSheet>;

export const Playground: Story = {};

export const Search: Story = {
  args: { variant: 'search' },
  parameters: {
    docs: {
      description: {
        story:
          'Figma `crv-bottom-sheet-header type=Search` — adds a search field below the title that ' +
          'filters the selectable chips.',
      },
    },
  },
};

export const WithoutGradient: Story = {
  args: { showHeaderGradient: false },
  parameters: {
    docs: {
      description: {
        story: 'Figma `showTopColor=false` — header without the decorative gradient glow.',
      },
    },
  },
};
