import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Topics pool for PT clinic content
const TOPIC_TEMPLATES = [
  {
    category: 'no-shows',
    prompts: [
      'How to reduce patient no-shows in your PT clinic',
      'The real cost of no-shows for physical therapy practices',
      'Automated reminder systems that cut no-shows by 50%',
      'Why patients ghost their PT appointments (and how to prevent it)',
    ],
  },
  {
    category: 'retention',
    prompts: [
      'Patient retention strategies for sports PT clinics',
      'How to get patients to complete their full plan of care',
      'The psychology of patient drop-off and how to prevent it',
      'Building long-term relationships with PT patients',
    ],
  },
  {
    category: 'reactivation',
    prompts: [
      'How to reactivate lapsed PT patients',
      'Email campaigns that bring back inactive patients',
      'The hidden revenue in your dormant patient list',
      'Win-back strategies for physical therapy practices',
    ],
  },
  {
    category: 'revenue',
    prompts: [
      'How to add $30K to your PT clinic in 60 days',
      'Maximizing revenue per patient in sports PT',
      'The math behind completed plans of care',
      'Revenue opportunities most PT clinics miss',
    ],
  },
  {
    category: 'operations',
    prompts: [
      'Streamlining PT clinic operations for growth',
      'EMR optimization for patient retention',
      'Automating patient communication in your PT practice',
      'Building systems that scale your PT clinic',
    ],
  },
]

export interface GeneratedBlogPost {
  title: string
  description: string
  content: string
  tags: string[]
  slug: string
}

export async function generateBlogTopic(): Promise<{ topic: string; category: string }> {
  // Pick a random category and topic
  const category = TOPIC_TEMPLATES[Math.floor(Math.random() * TOPIC_TEMPLATES.length)]
  const topicBase = category.prompts[Math.floor(Math.random() * category.prompts.length)]

  // Use Claude to refine the topic based on current trends
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `You are a content strategist for a B2B consulting company that helps sports and orthopedic physical therapy clinics grow revenue through patient retention systems.

Based on this topic idea: "${topicBase}"

Generate a compelling, specific blog post title that:
1. Addresses a real pain point PT clinic owners face
2. Includes a specific number or metric when possible
3. Is SEO-friendly (60-70 characters ideal)
4. Would make a clinic owner want to click and read

Respond with ONLY the title, nothing else.`,
      },
    ],
  })

  const topic =
    response.content[0].type === 'text' ? response.content[0].text.trim() : topicBase

  return { topic, category: category.category }
}

export async function generateBlogPost(topic: string, category: string): Promise<GeneratedBlogPost> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `You are an expert content writer for Wiebe Consulting, a B2B company that helps sports and orthopedic physical therapy clinics increase revenue through done-for-you patient retention systems.

Write a comprehensive, authoritative blog post on the topic: "${topic}"

Requirements:
1. Length: 1,000-1,500 words
2. Tone: Professional but approachable, expert-driven, B2B focused
3. Structure:
   - Compelling introduction that hooks the reader with a relatable problem
   - Clear subheadings (use ## for H2, ### for H3)
   - Practical, actionable advice
   - Specific numbers, statistics, or examples when possible
   - A conclusion with a clear takeaway
4. Include real-world scenarios PT clinic owners face
5. Subtly position Wiebe Consulting's services as a solution (don't be salesy)
6. Focus on depth over breadth - be the definitive resource on this topic

Format your response as JSON with this structure:
{
  "title": "The blog post title",
  "description": "A 150-160 character meta description for SEO",
  "content": "The full markdown content of the blog post",
  "tags": ["tag1", "tag2", "tag3"] // 3-5 relevant tags
}

Only respond with the JSON, no other text.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to parse blog post JSON from Claude response')
  }

  const parsed = JSON.parse(jsonMatch[0])

  // Generate slug from title
  const slug = parsed.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

  return {
    title: parsed.title,
    description: parsed.description,
    content: parsed.content,
    tags: parsed.tags,
    slug,
  }
}

export async function generateBlogImage(title: string, slug: string): Promise<string> {
  // Generate image with DALL-E 3
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `Create a professional blog header image for an article titled "${title}".

Style: Modern, clean, corporate-tech aesthetic
Colors: Dark navy blue (#0f172a) background with cyan/teal (#22d3ee) and white accents
Elements: Abstract data visualization, subtle medical/healthcare symbols, professional business imagery
Mood: Trustworthy, innovative, results-driven

DO NOT include any text in the image. The image should be purely visual.
Landscape format, suitable for a blog header.`,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
  })

  const imageUrl = response.data[0].url
  if (!imageUrl) {
    throw new Error('Failed to generate image')
  }

  // Download and save the image
  const imageResponse = await fetch(imageUrl)
  const buffer = Buffer.from(await imageResponse.arrayBuffer())

  // Resize to blog header dimensions
  const outputPath = path.join(process.cwd(), 'public', 'blog', `${slug}.png`)

  // Ensure blog directory exists
  const blogDir = path.join(process.cwd(), 'public', 'blog')
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true })
  }

  await sharp(buffer).resize(1200, 630, { fit: 'cover' }).toFile(outputPath)

  return `/blog/${slug}.png`
}

export async function saveBlogPost(
  post: GeneratedBlogPost,
  imagePath: string
): Promise<string> {
  const date = new Date().toISOString().split('T')[0]

  const frontmatter = `---
title: "${post.title}"
description: "${post.description}"
date: "${date}"
author: "Ben Wiebe"
image: "${imagePath}"
tags: [${post.tags.map((t) => `"${t}"`).join(', ')}]
---

${post.content}`

  const filePath = path.join(process.cwd(), 'content', 'blog', `${post.slug}.md`)

  // Ensure directory exists
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, frontmatter)

  return post.slug
}

export async function generateAndPublishBlogPost(): Promise<{
  slug: string
  title: string
  success: boolean
}> {
  try {
    // 1. Generate topic
    console.log('Generating blog topic...')
    const { topic, category } = await generateBlogTopic()
    console.log(`Topic: ${topic} (${category})`)

    // 2. Generate blog content
    console.log('Generating blog content with Claude...')
    const post = await generateBlogPost(topic, category)
    console.log(`Generated: ${post.title}`)

    // 3. Generate featured image
    console.log('Generating featured image with DALL-E...')
    const imagePath = await generateBlogImage(post.title, post.slug)
    console.log(`Image saved: ${imagePath}`)

    // 4. Save the post
    console.log('Saving blog post...')
    const slug = await saveBlogPost(post, imagePath)
    console.log(`Post saved: ${slug}`)

    return { slug, title: post.title, success: true }
  } catch (error) {
    console.error('Error generating blog post:', error)
    return { slug: '', title: '', success: false }
  }
}
