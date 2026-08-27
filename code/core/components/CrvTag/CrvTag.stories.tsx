import type { Meta, StoryObj } from '@storybook/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CrvTag, CrvTagColor } from './CrvTag';
import type {
  CrvTagColor as CrvTagStandardColor,
  CrvTagColorVariant,
  CrvTagSize,
  CrvTagVariant,
} from './CrvTag.types';

const STANDARD_COLORS: CrvTagStandardColor[] = [
  'default',
  'secondary',
  'error',
  'success',
  'warning',
];

const COLOR_TAGS: CrvTagColorVariant[] = [
  'primary',
  'sky',
  'cyan',
  'pink',
  'purple',
  'emerald',
  'amber',
  'orange',
];

const SIZES: CrvTagSize[] = ['small', 'medium', 'large'];
const VARIANTS: CrvTagVariant[] = ['filled', 'outlined'];

const meta: Meta<typeof CrvTag> = {
  title: 'Data Display/CrvTag',
  component: CrvTag,
  parameters: {
    docs: {
      description: {
        component:
          'Standalone pill label for status, category, or content attributes. Maps to Figma Tag node 3918:825.',
      },
    },
    controls: {
      include: [
        'variant',
        'color',
        'content',
        'size',
        'label',
        'badgeContent',
        'startIconVisible',
        'endIconVisible',
      ],
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    color: { control: 'select', options: STANDARD_COLORS },
    content: { control: 'inline-radio', options: ['label', 'number'] },
    size: { control: 'inline-radio', options: SIZES },
    label: { control: 'text' },
    badgeContent: { control: 'text' },
    startIconVisible: { control: 'boolean' },
    endIconVisible: { control: 'boolean' },
    startIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    variant: 'filled',
    color: 'default',
    content: 'label',
    size: 'small',
    label: 'Label',
    badgeContent: '8',
    startIconVisible: false,
    endIconVisible: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvTag>;

export const Standard: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'default',
  },
};

export const Number: Story = {
  args: {
    content: 'number',
    size: 'large',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIconVisible: true,
    endIcon: <CloseRoundedIcon />,
  },
};

export const ColorTag: Story = {
  parameters: { controls: { disable: true } },
  render: () => <CrvTagColor color="sky" label="Label" />,
};

export const AllStandard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{size}</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {STANDARD_COLORS.map((color) => (
              <CrvTag key={`${size}-${color}`} size={size} color={color} label="Label" />
            ))}
            <CrvTag size={size} variant="outlined" color="default" label="Label" />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {STANDARD_COLORS.map((color) => (
              <CrvTag
                key={`${size}-${color}-number`}
                size={size}
                color={color}
                content="number"
                badgeContent="8"
              />
            ))}
            <CrvTag
              size={size}
              variant="outlined"
              color="default"
              content="number"
              badgeContent="8"
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllColorTags: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {COLOR_TAGS.map((color) => (
        <CrvTagColor key={color} color={color} label="Label" />
      ))}
    </div>
  ),
};
