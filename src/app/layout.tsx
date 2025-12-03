import type { Metadata } from 'next'
import { StyledComponentsRegistry } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'Hotel Booking Dashboard',
  description: 'Find and book your perfect hotel stay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f8fafc' }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
