import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './index'

const meta: Meta<typeof DatePicker> = {
  title: 'UI Kit/DatePicker',
  component: DatePicker,
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    id: 'date-picker',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Check-in Date',
    id: 'checkin-date',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Check-out Date',
    id: 'checkout-date',
    defaultValue: '2025-01-20',
  },
}

export const DateRange: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <DatePicker label="Check-in" id="checkin" defaultValue="2025-01-15" />
      <DatePicker label="Check-out" id="checkout" defaultValue="2025-01-20" />
    </div>
  ),
}
