import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khalin Meet AI',
  description: 'Видеозвонки с ИИ и аквариумным фоном',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}