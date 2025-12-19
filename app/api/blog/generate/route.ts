import { NextResponse } from 'next/server'
import { generateAndPublishBlogPost } from '@/lib/blog-generator'

// Secret key to protect this endpoint
const CRON_SECRET = process.env.CRON_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  // Verify the request is authorized
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await generateAndPublishBlogPost()

    if (result.success) {
      return NextResponse.json({
        success: true,
        slug: result.slug,
        title: result.title,
        url: `https://wiebe-consulting.com/blog/${result.slug}`,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to generate blog post' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Vercel Cron handler
export async function GET(request: Request) {
  // Check for Vercel Cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await generateAndPublishBlogPost()

    if (result.success) {
      return NextResponse.json({
        success: true,
        slug: result.slug,
        title: result.title,
        url: `https://wiebe-consulting.com/blog/${result.slug}`,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to generate blog post' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
