import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  title: 'UI Kit/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: '3 filters',
  },
}

export const Primary: Story = {
  args: {
    children: 'Active',
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Available',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Limited',
    variant: 'warning',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
}
