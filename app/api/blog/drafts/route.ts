import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  const draftsDir = path.join(process.cwd(), 'content', 'blog', 'drafts')

  if (!fs.existsSync(draftsDir)) {
    return NextResponse.json({ drafts: [] })
  }

  const files = fs.readdirSync(draftsDir).filter((f) => f.endsWith('.md'))

  const drafts = files.map((filename) => {
    const filePath = path.join(draftsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      image: data.image || '',
      content: content.substring(0, 2000),
    }
  })

  return NextResponse.json({ drafts })
}
