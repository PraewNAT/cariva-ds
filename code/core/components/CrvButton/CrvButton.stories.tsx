import type { Meta, StoryObj } from '@storybook/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { CrvButton } from './CrvButton';
import type { CrvButtonProps } from './CrvButton.types';

const ICONS = {
  none: undefined,
  add: <AddIcon />,
  delete: <DeleteIcon />,
  'arrow-forward': <ArrowForwardIcon />,
  'arrow-back': <ArrowBackIcon />,
  download: <DownloadIcon />,
  upload: <UploadIcon />,
};

type IconKey = keyof typeof ICONS;

const meta: Meta<typeof CrvButton> = {
  title: 'Buttons/CrvButton',
  component: CrvButton,
  parameters: {
    docs: {
      description: {
        component:
          'Standard button — Figma `crv-button-standard` (3646:28000). Variants: contained / outlined / text / elevated × primary / error / neutral × small / medium / large. `neutral` has no contained form in Figma, so the types reject it.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'text', 'elevated'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'error', 'neutral'],
      description: 'neutral ใช้ได้กับ outlined / text / elevated เท่านั้น',
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    startIcon: {
      control: { type: 'select' },
      options: Object.keys(ICONS),
      mapping: ICONS,
      description: 'เลือก icon ด้านซ้าย',
    },
    endIcon: {
      control: { type: 'select' },
      options: Object.keys(ICONS),
      mapping: ICONS,
      description: 'เลือก icon ด้านขวา',
    },
    // Hide inherited MUI Button props from the controls panel
    component: { table: { disable: true } },
    sx: { table: { disable: true } },
    classes: { table: { disable: true } },
    style: { table: { disable: true } },
    ref: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
  },
  args: {
    children: 'Label',
    startIcon: 'none' as IconKey,
    endIcon: 'none' as IconKey,
  },
};

export default meta;
type Story = StoryObj<typeof CrvButton>;

export const Default: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    children: 'Label',
  },
};

export const ContainedPrimary: Story = { args: { variant: 'contained', color: 'primary' } };
export const ContainedError: Story = { args: { variant: 'contained', color: 'error' } };
export const OutlinedPrimary: Story = { args: { variant: 'outlined', color: 'primary' } };
export const OutlinedError: Story = { args: { variant: 'outlined', color: 'error' } };

/** Figma outlined matrix — border stays on hover/pressed; disabled loses border. */
export const OutlinedStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        {(['primary', 'error'] as const).map((color) => (
          <div key={color}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
              outlined / {color}
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <CrvButton key={size} variant="outlined" color={color} size={size}>
                  Label
                </CrvButton>
              ))}
              {sizes.map((size) => (
                <CrvButton key={`${size}-disabled`} variant="outlined" color={color} size={size} disabled>
                  Label
                </CrvButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const ElevatedPrimary: Story = { args: { variant: 'elevated', color: 'primary' } };
export const ElevatedError: Story = { args: { variant: 'elevated', color: 'error' } };
export const ElevatedNeutral: Story = {
  args: { variant: 'elevated', color: 'neutral' } as Partial<CrvButtonProps>,
};

export const OutlinedNeutral: Story = {
  args: { variant: 'outlined', color: 'neutral' } as Partial<CrvButtonProps>,
};
export const TextNeutral: Story = {
  args: { variant: 'text', color: 'neutral' } as Partial<CrvButtonProps>,
};

/**
 * `elevated` is a DS-only variant: a white surface carrying shadow/sm, lifting to
 * shadow/xl on hover and settling to shadow/md on press. Hover each button to see it.
 */
export const ElevatedStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: 24, background: '#f8fafc' }}>
      {(['primary', 'error', 'neutral'] as const).map((color) => (
        <div key={color}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            elevated / {color}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {(['small', 'medium', 'large'] as const).map((size) => (
              <CrvButton
                key={size}
                {...({ variant: 'elevated', color, size } as CrvButtonProps)}
              >
                Label
              </CrvButton>
            ))}
            <CrvButton {...({ variant: 'elevated', color, disabled: true } as CrvButtonProps)}>
              Label
            </CrvButton>
          </div>
        </div>
      ))}
    </div>
  ),
};

/** neutral drops the brand hue — Figma gives it no contained form, only these three. */
export const NeutralColor: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['outlined', 'text', 'elevated'] as const).map((variant) => (
        <CrvButton
          key={variant}
          {...({ variant, color: 'neutral' } as CrvButtonProps)}
        >
          {variant}
        </CrvButton>
      ))}
    </div>
  ),
};

export const TextPrimary: Story = { args: { variant: 'text', color: 'primary' } };
export const TextError: Story = { args: { variant: 'text', color: 'error' } };

export const Small: Story = { args: { size: 'small' } };
export const Medium: Story = { args: { size: 'medium' } };
export const Large: Story = { args: { size: 'large' } };

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, children: 'Saving' } };

export const WithStartIcon: Story = {
  args: { children: 'Add user', startIcon: 'add' as IconKey },
};

export const WithEndIcon: Story = {
  args: { children: 'Next', endIcon: 'arrow-forward' as IconKey },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Showcase grid — แสดงทุก variant พร้อมกัน ไม่ตอบสนอง control panel (hardcoded grid)',
      },
    },
  },
  render: () => {
    const variants = ['contained', 'outlined', 'text', 'elevated'] as const;
    const colorList = ['primary', 'error'] as const;
    const sizes = ['small', 'medium', 'large'] as const;
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {variants.map((v) => (
          <div key={v} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ width: 90, fontSize: 12 }}>{v}</span>
            {colorList.map((c) =>
              sizes.map((s) => (
                <CrvButton
                  key={`${v}-${c}-${s}`}
                  {...({ variant: v, color: c, size: s } as CrvButtonProps)}
                >
                  {`${c} ${s}`}
                </CrvButton>
              )),
            )}
          </div>
        ))}
      </div>
    );
  }
};
