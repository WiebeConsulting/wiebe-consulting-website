import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
  content: string
  readingTime: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
  readingTime: string
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const files = fs.readdirSync(blogDirectory)
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace('.md', '')
      const fullPath = path.join(blogDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'Ben Wiebe',
        image: data.image || '/og-social-final.png',
        tags: data.tags || [],
        readingTime: readingTime(content).text,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Ben Wiebe',
    image: data.image || '/og-social-final.png',
    tags: data.tags || [],
    content,
    readingTime: readingTime(content).text,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const files = fs.readdirSync(blogDirectory)
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
}
