'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CrvButton } from '../CrvButton';
import { CrvInput } from '../CrvInput';
import { CrvModal } from './CrvModal';
import { colors } from '../../tokens';
import type { CrvModalBreakpoint, CrvModalType } from './CrvModal.types';

function SignInContentSlot() {
  return (
    <>
      <CrvInput label="Email" placeholder="example@email.com" size="medium" />
      <CrvInput label="Password" placeholder="password" type="password" size="medium" />
    </>
  );
}

function SignInActions({ breakpoint }: { breakpoint: CrvModalBreakpoint }) {
  const fullWidth = breakpoint === 'sm';

  if (breakpoint === 'sm') {
    return (
      <>
        <CrvButton variant="contained" color="primary" size="small" fullWidth={fullWidth}>
          Sign In
        </CrvButton>
        <CrvButton variant="text" color="primary" size="small" fullWidth={fullWidth}>
          Close
        </CrvButton>
      </>
    );
  }

  return (
    <>
      <CrvButton variant="text" color="primary" size="small">
        Close
      </CrvButton>
      <CrvButton variant="contained" color="primary" size="small">
        Sign In
      </CrvButton>
    </>
  );
}

function DefaultActions({ breakpoint }: { breakpoint: CrvModalBreakpoint }) {
  const fullWidth = breakpoint === 'sm';

  if (breakpoint === 'sm') {
    return (
      <>
        <CrvButton variant="contained" color="primary" size="small" fullWidth={fullWidth}>
          Confirm
        </CrvButton>
        <CrvButton variant="text" color="primary" size="small" fullWidth={fullWidth}>
          Close
        </CrvButton>
      </>
    );
  }

  return (
    <>
      <CrvButton variant="text" color="primary" size="small">
        Close
      </CrvButton>
      <CrvButton variant="contained" color="primary" size="small">
        Confirm
      </CrvButton>
    </>
  );
}

function ModalDemo({
  type = 'default',
  breakpoint = 'sm',
  actions,
  defaultOpen = false,
  ...rest
}: React.ComponentProps<typeof CrvModal> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      {!open ? (
        <CrvButton variant="contained" color="primary" onClick={() => setOpen(true)}>
          Open modal
        </CrvButton>
      ) : null}
      <CrvModal
        {...rest}
        type={type}
        breakpoint={breakpoint}
        open={open}
        onClose={() => setOpen(false)}
        actions={actions ?? <DefaultActions breakpoint={breakpoint} />}
      />
    </>
  );
}

function PlaygroundDemo({
  breakpoint = 'sm',
  showContent = true,
  ...rest
}: React.ComponentProps<typeof CrvModal>) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open ? (
        <CrvButton variant="contained" color="primary" onClick={() => setOpen(true)}>
          Open modal
        </CrvButton>
      ) : null}
      <CrvModal
        {...rest}
        breakpoint={breakpoint}
        showContent={showContent}
        open={open}
        onClose={() => setOpen(false)}
        actions={
          showContent ? (
            <SignInActions breakpoint={breakpoint} />
          ) : (
            <DefaultActions breakpoint={breakpoint} />
          )
        }
      >
        {showContent ? <SignInContentSlot /> : null}
      </CrvModal>
    </>
  );
}

const meta: Meta<typeof CrvModal> = {
  title: 'Feedback/CrvModal',
  component: CrvModal,
  parameters: {
    docs: {
      description: {
        component:
          'Dialog for important information and actions. Maps to Figma crv-modal (4712:1805). ' +
          'Toggle `showContent` in Playground to demo the Figma `contentSlot` (Sign In form, node 4712:2393).',
      },
    },
    controls: {
      include: [
        'type',
        'breakpoint',
        'title',
        'description',
        'showContent',
        'showDescription',
        'showIcon',
        'showCTA',
      ],
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'alignCenter'] satisfies CrvModalType[] },
    breakpoint: { control: 'inline-radio', options: ['sm', 'md+'] satisfies CrvModalBreakpoint[] },
    title: { control: 'text' },
    description: { control: 'text' },
    showContent: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    showCTA: { control: 'boolean' },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    actions: { table: { disable: true } },
    icon: { table: { disable: true } },
    children: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    type: 'default',
    breakpoint: 'sm',
    title: 'Sign In',
    description: 'Description',
    showContent: true,
    showDescription: false,
    showIcon: false,
    showCTA: true,
  },
};

export default meta;
type Story = StoryObj<typeof CrvModal>;

export const Playground: Story = {
  render: (args) => <PlaygroundDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Modal opens by default. Toggle `showContent` off for header-only dialog. ' +
          'When on, `children` renders Email + Password fields (Figma [4712:2393](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4712-2393)). ' +
          'Switch `breakpoint` between sm and md+ to compare CTA layout.',
      },
    },
  },
};

export const DefaultSm: Story = {
  render: () => <ModalDemo type="default" breakpoint="sm" showContent={false} />,
  parameters: { controls: { disable: true } },
};

export const DefaultMd: Story = {
  render: () => <ModalDemo type="default" breakpoint="md+" showContent={false} />,
  parameters: { controls: { disable: true } },
};

export const AlignCenterSm: Story = {
  render: () => <ModalDemo type="alignCenter" breakpoint="sm" showContent={false} />,
  parameters: { controls: { disable: true } },
};

export const AlignCenterMd: Story = {
  render: () => <ModalDemo type="alignCenter" breakpoint="md+" showContent={false} />,
  parameters: { controls: { disable: true } },
};

export const SemanticIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <CrvButton variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete item
        </CrvButton>
        <CrvModal
          type="alignCenter"
          breakpoint="sm"
          open={open}
          onClose={() => setOpen(false)}
          title="Delete this item?"
          description="This action cannot be undone."
          icon={<ErrorOutlineIcon />}
          iconContainerSx={{
            backgroundColor: colors.status.error.onSurface.subtle,
            color: colors.status.error.onSurface.default,
          }}
          showContent={false}
          actions={<DefaultActions breakpoint="sm" />}
        />
      </>
    );
  },
  parameters: { controls: { disable: true } },
};

export const SuccessDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <CrvModal
        type="alignCenter"
        breakpoint="sm"
        open={open}
        onClose={() => setOpen(false)}
        title="Payment successful"
        description="Your transaction has been completed."
        icon={<CheckCircleOutlineIcon />}
        iconContainerSx={{
          backgroundColor: colors.status.success.onSurface.subtle,
          color: colors.status.success.onSurface.default,
        }}
        showContent={false}
        actions={
          <CrvButton variant="contained" color="primary" size="small" fullWidth>
            Done
          </CrvButton>
        }
      />
    );
  },
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {(['default', 'alignCenter'] as CrvModalType[]).map((type) =>
        (['sm', 'md+'] as CrvModalBreakpoint[]).map((breakpoint) => (
          <Box key={`${type}-${breakpoint}`}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              {type} / {breakpoint}
            </Typography>
            <ModalDemo type={type} breakpoint={breakpoint} showContent={false} />
          </Box>
        )),
      )}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
