import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Wiebe Consulting - Sports PT Revenue & Retention System'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundImage: 'url(https://wiebe-consulting.com/og-bg.png)',
          backgroundSize: '60%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0f172a',
        }}
      >
        {/* Semi-transparent overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#22d3ee',
              marginBottom: 20,
              display: 'flex',
            }}
          >
            WIEBE CONSULTING
          </div>

          {/* Main Headline */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: 20,
              display: 'flex',
            }}
          >
            Add $30K+ in 60 Days
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: 28,
              color: '#e2e8f0',
              textAlign: 'center',
              maxWidth: 800,
              display: 'flex',
            }}
          >
            Done-for-you patient retention for Sports & Ortho PT Clinics
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
