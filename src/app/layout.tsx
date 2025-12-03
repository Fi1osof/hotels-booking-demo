import type { Metadata } from 'next'
import { StyledComponentsRegistry } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'Hotel Booking Dashboard',
  description: 'Find and book your perfect hotel stay',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
