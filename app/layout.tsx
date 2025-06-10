import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Keep Notes',
  description: 'A simple note-taking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
