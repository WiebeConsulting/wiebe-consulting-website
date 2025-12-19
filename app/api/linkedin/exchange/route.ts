import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code, clientId, clientSecret, redirectUri } = await request.json()

    if (!code || !clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('Token exchange failed:', error)
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Get user profile to get person URN
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!profileResponse.ok) {
      // Try legacy endpoint
      const legacyResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!legacyResponse.ok) {
        return NextResponse.json({
          accessToken,
          personUrn: 'Unable to fetch - check LinkedIn app permissions',
          error: 'Could not fetch profile. You may need to manually find your person URN.',
        })
      }

      const legacyData = await legacyResponse.json()
      return NextResponse.json({
        accessToken,
        personUrn: `urn:li:person:${legacyData.id}`,
      })
    }

    const profileData = await profileResponse.json()

    return NextResponse.json({
      accessToken,
      personUrn: `urn:li:person:${profileData.sub}`,
    })
  } catch (error) {
    console.error('LinkedIn exchange error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
