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
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
          backgroundImage: 'url(https://wiebe-consulting.com/og-background.png)',
          backgroundSize: '115%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0f172a',
        }}
      >
        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: '26px',
            fontWeight: 700,
            color: '#0ea5e9',
            marginBottom: '32px',
            letterSpacing: '2px',
            position: 'relative',
            zIndex: 10,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          WIEBE CONSULTING
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-2px',
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 10,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <span>Add </span>
          <span
            style={{
              color: '#0ea5e9',
              marginLeft: '16px',
              marginRight: '16px',
            }}
          >
            $30K+
          </span>
          <span> in 60 Days</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: '30px',
            color: '#e2e8f0',
            fontWeight: 500,
            maxWidth: '800px',
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 10,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Revenue & Retention System for Sports PT Clinics
        </div>

        {/* Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '60px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
            color: 'white',
            padding: '18px 36px',
            borderRadius: '14px',
            fontSize: '20px',
            fontWeight: 700,
            zIndex: 10,
            boxShadow: '0 4px 20px rgba(14, 165, 233, 0.4)',
          }}
        >
          Book a Fit Call →
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
