// LinkedIn API Integration for auto-posting blog content
// Note: LinkedIn requires OAuth2 authentication with user consent

export interface LinkedInPost {
  text: string
  url?: string
  imageUrl?: string
}

export interface LinkedInMicroPost {
  text: string
  hashtags: string[]
}

// Generate LinkedIn post content from blog post
export function generateLinkedInPost(
  title: string,
  description: string,
  url: string,
  tags: string[]
): LinkedInPost {
  const hashtags = tags.slice(0, 3).map((tag) => `#${tag.replace(/\s+/g, '')}`)

  const text = `🎯 New article: ${title}

${description}

Read the full article: ${url}

${hashtags.join(' ')} #PhysicalTherapy #PTClinic #HealthcareBusiness`

  return { text, url }
}

// Generate micro-posts for daily LinkedIn content
export function generateMicroPosts(
  title: string,
  content: string,
  url: string
): LinkedInMicroPost[] {
  // Extract key insights from content for micro-posts
  const microPosts: LinkedInMicroPost[] = [
    {
      text: `💡 Key insight from our latest article on "${title}":

The difference between a struggling PT clinic and a thriving one often comes down to patient follow-through.

Most clinics lose 30-40% of patients before they complete their plan of care.

That's not just bad outcomes—it's lost revenue.

Read more: ${url}`,
      hashtags: ['PhysicalTherapy', 'PatientRetention', 'PTBusiness'],
    },
    {
      text: `📊 Quick PT clinic math:

Average patient value with full plan completion: $2,400
Average patient value with typical drop-off: $960

That's $1,440 left on the table PER PATIENT.

For a clinic seeing 50 new patients/month, that's $72,000/month in potential revenue.

The fix? Systems, not more marketing.`,
      hashtags: ['PTRevenue', 'HealthcareMarketing', 'ClinicGrowth'],
    },
    {
      text: `🔑 The no-show problem isn't about patients being flaky.

It's about:
→ Unclear expectations
→ Poor communication
→ Life getting in the way

The clinics that solve this? They don't chase patients.

They build systems that keep patients engaged automatically.

More on this: ${url}`,
      hashtags: ['NoShows', 'PatientExperience', 'PTClinic'],
    },
  ]

  return microPosts
}

// Post to LinkedIn (requires access token)
export async function postToLinkedIn(
  accessToken: string,
  personUrn: string,
  post: LinkedInPost
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: post.text,
            },
            shareMediaCategory: post.url ? 'ARTICLE' : 'NONE',
            ...(post.url && {
              media: [
                {
                  status: 'READY',
                  originalUrl: post.url,
                },
              ],
            }),
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('LinkedIn API error:', error)
      return { success: false, error }
    }

    const data = await response.json()
    return { success: true, id: data.id }
  } catch (error) {
    console.error('LinkedIn posting error:', error)
    return { success: false, error: String(error) }
  }
}

// LinkedIn OAuth URLs
export function getLinkedInAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const scope = 'w_member_social openid profile'
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`
}

export async function exchangeCodeForToken(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; expiresIn: number } | null> {
  try {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
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

    if (!response.ok) {
      console.error('Token exchange failed:', await response.text())
      return null
    }

    const data = await response.json()
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    }
  } catch (error) {
    console.error('Token exchange error:', error)
    return null
  }
}
