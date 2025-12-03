import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './index'

const meta: Meta<typeof Popover> = {
  title: 'UI Kit/Popover',
  component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    trigger: 'Click me',
    children: <div style={{ padding: '8px' }}>Popover content here</div>,
  },
}
