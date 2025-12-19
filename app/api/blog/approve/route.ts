import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendBlogPublishedEmail } from '@/lib/blog-email'
import { generateLinkedInPost, postToLinkedIn } from '@/lib/linkedin'
import matter from 'gray-matter'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const action = searchParams.get('action')

  if (!slug || !action) {
    return NextResponse.json({ error: 'Missing slug or action' }, { status: 400 })
  }

  const draftPath = path.join(process.cwd(), 'content', 'blog', 'drafts', `${slug}.md`)
  const publishedPath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

  if (!fs.existsSync(draftPath)) {
    // Check if already published
    if (fs.existsSync(publishedPath)) {
      return new NextResponse(
        `<html><body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>✅ Already Published</h1>
          <p>This post has already been published.</p>
          <a href="https://wiebe-consulting.com/blog/${slug}">View Post</a>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }
    return new NextResponse(
      `<html><body style="font-family: Arial; padding: 40px; text-align: center;">
        <h1>❌ Draft Not Found</h1>
        <p>The draft "${slug}" was not found.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (action === 'approve') {
    // Move from drafts to published
    const content = fs.readFileSync(draftPath, 'utf-8')
    const { data } = matter(content)

    // Ensure published directory exists
    const publishedDir = path.dirname(publishedPath)
    if (!fs.existsSync(publishedDir)) {
      fs.mkdirSync(publishedDir, { recursive: true })
    }

    // Move file
    fs.renameSync(draftPath, publishedPath)

    const postUrl = `https://wiebe-consulting.com/blog/${slug}`

    // Send published confirmation email
    await sendBlogPublishedEmail(data.title, postUrl)

    // Try to post to LinkedIn if credentials are available
    if (process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_PERSON_URN) {
      const linkedInPost = generateLinkedInPost(
        data.title,
        data.description,
        postUrl,
        data.tags || []
      )
      await postToLinkedIn(
        process.env.LINKEDIN_ACCESS_TOKEN,
        process.env.LINKEDIN_PERSON_URN,
        linkedInPost
      )
    }

    return new NextResponse(
      `<html><body style="font-family: Arial; padding: 40px; text-align: center; background: #f0fdf4;">
        <h1 style="color: #22c55e;">✅ Blog Post Published!</h1>
        <p style="font-size: 18px;">"${data.title}" is now live.</p>
        <p><a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: white; text-decoration: none; border-radius: 6px;">View Post →</a></p>
        <p style="margin-top: 30px; color: #64748b;">You can close this window.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } else if (action === 'reject') {
    // Delete the draft
    fs.unlinkSync(draftPath)

    // Also delete the image if it exists
    const imagePath = path.join(process.cwd(), 'public', 'blog', `${slug}.png`)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }

    return new NextResponse(
      `<html><body style="font-family: Arial; padding: 40px; text-align: center; background: #fef2f2;">
        <h1 style="color: #ef4444;">❌ Blog Post Rejected</h1>
        <p>The draft has been deleted.</p>
        <p style="margin-top: 30px; color: #64748b;">You can close this window.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
