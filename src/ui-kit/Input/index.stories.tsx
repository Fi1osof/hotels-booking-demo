import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'

const meta: Meta<typeof Input> = {
  title: 'UI Kit/Input',
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Search hotels...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter hotel name or city',
    id: 'search-input',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}
