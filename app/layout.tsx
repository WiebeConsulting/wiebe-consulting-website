import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GTM_ID = 'GTM-K83T3NPQ'

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
  metadataBase: new URL('https://wiebe-consulting.com'),
  title: {
    default: 'Sports PT Consulting | Add $30K in 60 Days | Wiebe Consulting',
    template: '%s | Wiebe Consulting'
  },
  description: 'Done-for-you patient retention system for sports & ortho PT clinics. Cut no-shows, complete more plans of care, reactivate lapsed patients. Pay only if we hit targets.',
  keywords: 'sports PT consulting, physical therapy patient retention, PT no-show reduction, patient reactivation campaigns, ortho PT revenue, EMR patient data, PT clinic consulting',
  authors: [{ name: 'Ben Wiebe' }],
  creator: 'Wiebe Consulting',
  publisher: 'Wiebe Consulting',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wiebe-consulting.com',
    siteName: 'Wiebe Consulting',
    title: 'Sports PT Consulting | Add $30K in 60 Days',
    description: 'Done-for-you patient retention system for sports & ortho PT clinics. Cut no-shows, complete more plans, reactivate lapsed patients.',
    images: [
      {
        url: '/og-social.png',
        width: 1200,
        height: 630,
        alt: 'Wiebe Consulting - Sports PT Revenue & Retention System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports PT Consulting | Add $30K in 60 Days',
    description: 'Done-for-you patient retention system for sports & ortho PT clinics.',
    images: ['/og-social.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wiebe-consulting.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
