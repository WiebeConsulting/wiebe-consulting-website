import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const action = searchParams.get('action')
  const immediate = searchParams.get('immediate') === 'true'

  if (!slug || !action) {
    return NextResponse.json({ error: 'Missing slug or action' }, { status: 400 })
  }

  const draftPath = path.join(process.cwd(), 'content', 'blog', 'drafts', `${slug}.md`)
  const approvedPath = path.join(process.cwd(), 'content', 'blog', 'approved', `${slug}.md`)
  const publishedPath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

  if (!fs.existsSync(draftPath)) {
    // Check if already approved or published
    if (fs.existsSync(approvedPath)) {
      return new NextResponse(
        `<html><body style="font-family: Arial; padding: 40px; text-align: center; background: #fef3c7;">
          <h1 style="color: #d97706;">⏳ Already Approved</h1>
          <p>This post has been approved and will be published at 8 AM Israel time.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }
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
    const content = fs.readFileSync(draftPath, 'utf-8')
    const { data } = matter(content)

    if (immediate) {
      // Publish immediately
      const publishedDir = path.dirname(publishedPath)
      if (!fs.existsSync(publishedDir)) {
        fs.mkdirSync(publishedDir, { recursive: true })
      }
      fs.renameSync(draftPath, publishedPath)

      const postUrl = `https://wiebe-consulting.com/blog/${slug}`

      return new NextResponse(
        `<html><body style="font-family: Arial; padding: 40px; text-align: center; background: #f0fdf4;">
          <h1 style="color: #22c55e;">✅ Blog Post Published!</h1>
          <p style="font-size: 18px;">"${data.title}" is now live.</p>
          <p><a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: white; text-decoration: none; border-radius: 6px;">View Post →</a></p>
          <p style="margin-top: 30px; color: #64748b;">You can close this window.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    // Move to approved folder for scheduled publishing
    const approvedDir = path.dirname(approvedPath)
    if (!fs.existsSync(approvedDir)) {
      fs.mkdirSync(approvedDir, { recursive: true })
    }
    fs.renameSync(draftPath, approvedPath)

    return new NextResponse(
      `<html><body style="font-family: Arial; padding: 40px; text-align: center; background: #f0fdf4;">
        <h1 style="color: #22c55e;">✅ Blog Post Approved!</h1>
        <p style="font-size: 18px;">"${data.title}" will be published at 8 AM Israel time.</p>
        <p style="color: #64748b;">It will also be posted to LinkedIn automatically.</p>
        <p style="margin-top: 20px;">
          <a href="https://wiebe-consulting.com/api/blog/approve?slug=${slug}&action=approve&immediate=true"
             style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
            Publish Now Instead →
          </a>
        </p>
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
