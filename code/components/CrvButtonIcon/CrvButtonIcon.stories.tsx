import type { Meta, StoryObj } from '@storybook/react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { CrvButtonIcon } from './CrvButtonIcon';

const ICONS = {
  close: <CloseIcon />,
  edit: <EditIcon />,
  delete: <DeleteIcon />,
  search: <SearchIcon />,
  more: <MoreVertIcon />,
  add: <AddIcon />,
  download: <DownloadIcon />,
};

type IconKey = keyof typeof ICONS;

const meta: Meta<typeof CrvButtonIcon> = {
  title: 'Buttons/CrvButtonIcon',
  component: CrvButtonIcon,
  parameters: {
    docs: {
      description: {
        component:
          'Icon-only button. Variants: contained / outlined / ghost × primary / error × small (32) / medium (40) / large (48).',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['contained', 'outlined', 'ghost'] },
    color: { control: 'inline-radio', options: ['primary', 'error'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    children: {
      control: { type: 'select' },
      options: Object.keys(ICONS),
      mapping: ICONS,
      description: 'เลือก icon',
    },
    component: { table: { disable: true } },
    sx: { table: { disable: true } },
    classes: { table: { disable: true } },
    style: { table: { disable: true } },
    ref: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
  },
  args: {
    'aria-label': 'edit',
    children: 'edit' as IconKey,
  },
};

export default meta;
type Story = StoryObj<typeof CrvButtonIcon>;

export const Default: Story = {
  args: { variant: 'contained', color: 'primary', size: 'medium' },
};

export const ContainedPrimary: Story = { args: { variant: 'contained', color: 'primary' } };
export const ContainedError: Story = {
  args: { variant: 'contained', color: 'error', children: 'delete' as IconKey, 'aria-label': 'delete' },
};
export const OutlinedPrimary: Story = { args: { variant: 'outlined', color: 'primary' } };
export const OutlinedError: Story = {
  args: { variant: 'outlined', color: 'error', children: 'delete' as IconKey, 'aria-label': 'delete' },
};
export const GhostPrimary: Story = { args: { variant: 'ghost', color: 'primary' } };
export const GhostError: Story = {
  args: { variant: 'ghost', color: 'error', children: 'delete' as IconKey, 'aria-label': 'delete' },
};

export const Small: Story = { args: { size: 'small' } };
export const Medium: Story = { args: { size: 'medium' } };
export const Large: Story = { args: { size: 'large' } };

export const Disabled: Story = { args: { disabled: true } };

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
    const variants = ['contained', 'outlined', 'ghost'] as const;
    const colorList = ['primary', 'error'] as const;
    const sizes = ['small', 'medium', 'large'] as const;
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {variants.map((v) => (
          <div key={v} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ width: 90, fontSize: 12 }}>{v}</span>
            {colorList.map((c) =>
              sizes.map((s) => (
                <CrvButtonIcon
                  key={`${v}-${c}-${s}`}
                  variant={v}
                  color={c}
                  size={s}
                  aria-label={`${v}-${c}-${s}`}
                >
                  {c === 'error' ? <DeleteIcon /> : <CloseIcon />}
                </CrvButtonIcon>
              )),
            )}
          </div>
        ))}
      </div>
    );
  },
};
