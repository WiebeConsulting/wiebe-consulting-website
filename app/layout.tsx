import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wiebe Consulting | Add $30K+ in 60 Days for Sports PT Clinics',
  description: 'Revenue & Retention System for owner-led sports & ortho PT clinics. Cut no-shows, complete more plans, reactivate lapsed patients. 60-day guarantee.',
  keywords: 'sports PT, physical therapy automation, patient retention, clinic revenue, GoHighLevel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
