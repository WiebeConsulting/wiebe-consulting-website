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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          position: 'relative',
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
            top: '-100px',
            left: '-100px',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
            bottom: '-150px',
            right: '-100px',
            borderRadius: '50%',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0ea5e9',
            marginBottom: '40px',
            letterSpacing: '-0.5px',
          }}
        >
          WIEBE CONSULTING
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-2px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <span>Add </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            $30K+
          </span>
          <span> in 60 Days</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            fontWeight: 500,
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          Revenue & Retention System for Sports PT Clinics
        </div>

        {/* Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 700,
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
