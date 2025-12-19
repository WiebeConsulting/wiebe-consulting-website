// Script for generating blog posts via GitHub Actions
// This runs standalone without Next.js server

const Anthropic = require('@anthropic-ai/sdk').default
const OpenAI = require('openai').default
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { Resend } = require('resend')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Topics pool for PT clinic content
const TOPIC_TEMPLATES = [
  {
    category: 'no-shows',
    prompts: [
      'How to reduce patient no-shows in your PT clinic',
      'The real cost of no-shows for physical therapy practices',
      'Automated reminder systems that cut no-shows by 50%',
      'Why patients ghost their PT appointments (and how to prevent it)',
      '5 proven strategies to eliminate PT appointment no-shows',
    ],
  },
  {
    category: 'retention',
    prompts: [
      'Patient retention strategies for sports PT clinics',
      'How to get patients to complete their full plan of care',
      'The psychology of patient drop-off and how to prevent it',
      'Building long-term relationships with PT patients',
      'Why patients quit physical therapy early (and how to stop it)',
    ],
  },
  {
    category: 'reactivation',
    prompts: [
      'How to reactivate lapsed PT patients',
      'Email campaigns that bring back inactive patients',
      'The hidden revenue in your dormant patient list',
      'Win-back strategies for physical therapy practices',
      'Turn your inactive patient list into a revenue goldmine',
    ],
  },
  {
    category: 'revenue',
    prompts: [
      'How to add $30K to your PT clinic in 60 days',
      'Maximizing revenue per patient in sports PT',
      'The math behind completed plans of care',
      'Revenue opportunities most PT clinics miss',
      'Calculate the true lifetime value of a PT patient',
    ],
  },
  {
    category: 'operations',
    prompts: [
      'Streamlining PT clinic operations for growth',
      'EMR optimization for patient retention',
      'Automating patient communication in your PT practice',
      'Building systems that scale your PT clinic',
      'The 3 systems every profitable PT clinic needs',
    ],
  },
]

async function generateBlogTopic() {
  const category = TOPIC_TEMPLATES[Math.floor(Math.random() * TOPIC_TEMPLATES.length)]
  const topicBase = category.prompts[Math.floor(Math.random() * category.prompts.length)]

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

  const topic = response.content[0].type === 'text' ? response.content[0].text.trim() : topicBase
  return { topic, category: category.category }
}

async function generateBlogPost(topic, category) {
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
  "tags": ["tag1", "tag2", "tag3"]
}

Only respond with the JSON, no other text.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to parse blog post JSON from Claude response')
  }

  const parsed = JSON.parse(jsonMatch[0])
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

async function generateBlogImage(title, slug) {
  console.log('Generating image with DALL-E 3...')

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

  // Ensure blog directory exists
  const blogDir = path.join(process.cwd(), 'public', 'blog')
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true })
  }

  const outputPath = path.join(blogDir, `${slug}.png`)
  await sharp(buffer).resize(1200, 630, { fit: 'cover' }).toFile(outputPath)

  return `/blog/${slug}.png`
}

async function saveBlogPostAsDraft(post, imagePath) {
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

  // Save to drafts directory for approval workflow
  const draftsDir = path.join(process.cwd(), 'content', 'blog', 'drafts')
  if (!fs.existsSync(draftsDir)) {
    fs.mkdirSync(draftsDir, { recursive: true })
  }

  const filePath = path.join(draftsDir, `${post.slug}.md`)
  fs.writeFileSync(filePath, frontmatter)

  return post.slug
}

async function sendApprovalEmail(post, imagePath) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wiebe-consulting.com'
  const approvalUrl = `${baseUrl}/api/blog/approve?slug=${post.slug}&action=approve`
  const rejectUrl = `${baseUrl}/api/blog/approve?slug=${post.slug}&action=reject`

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px; }
    .header h1 { color: #22d3ee; margin: 0 0 10px 0; font-size: 24px; }
    .header p { color: #94a3b8; margin: 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
    .post-title { color: #0f172a; font-size: 20px; font-weight: bold; margin-bottom: 10px; }
    .post-description { color: #64748b; margin-bottom: 20px; }
    .post-preview { background: white; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; max-height: 300px; overflow: hidden; }
    .buttons { margin-top: 20px; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; text-align: center; margin-right: 10px; margin-bottom: 10px; }
    .btn-approve { background: #22c55e; color: white; }
    .btn-reject { background: #ef4444; color: white; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📝 New Blog Post Ready for Review</h1>
    <p>A new blog post has been generated and is waiting for your approval.</p>
  </div>

  <div class="content">
    <div class="post-title">${post.title}</div>
    <div class="post-description">${post.description}</div>

    <div class="post-preview">
      <strong>Preview:</strong><br><br>
      ${post.content.substring(0, 800).replace(/\n/g, '<br>')}...
    </div>

    <div class="buttons">
      <a href="${approvalUrl}" class="btn btn-approve">✅ Approve & Publish</a>
      <a href="${rejectUrl}" class="btn btn-reject">❌ Reject</a>
    </div>
  </div>

  <div class="footer">
    <p>This email was automatically generated by your Wiebe Consulting blog system.</p>
    <p>The post will NOT be published until you approve it.</p>
  </div>
</body>
</html>
`

  try {
    if (!resend) {
      console.log('⚠️ Resend API key not configured - skipping email')
      console.log(`Approval URL: ${approvalUrl}`)
      return false
    }
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Wiebe Consulting <ben@wiebe-consulting.com>',
      to: process.env.EMAIL_REPLY_TO || 'ben@wiebe-consulting.com',
      subject: `📝 Blog Review: ${post.title}`,
      html: emailHtml,
    })
    console.log('📧 Approval email sent!')
    return true
  } catch (error) {
    console.error('Error sending approval email:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Starting blog post generation...')

  try {
    // 1. Generate topic
    console.log('📝 Generating topic...')
    const { topic, category } = await generateBlogTopic()
    console.log(`Topic: ${topic} (${category})`)

    // 2. Generate blog content
    console.log('✍️ Generating content with Claude...')
    const post = await generateBlogPost(topic, category)
    console.log(`Generated: ${post.title}`)

    // 3. Generate featured image
    console.log('🎨 Generating image with DALL-E...')
    const imagePath = await generateBlogImage(post.title, post.slug)
    console.log(`Image saved: ${imagePath}`)

    // 4. Save as draft (not published yet)
    console.log('💾 Saving blog post as draft...')
    const slug = await saveBlogPostAsDraft(post, imagePath)
    console.log(`Draft saved: ${slug}`)

    // 5. Send approval email
    console.log('📧 Sending approval email...')
    await sendApprovalEmail(post, imagePath)

    console.log('✅ Blog post draft created and approval email sent!')
    console.log(`Approval URL: https://wiebe-consulting.com/api/blog/approve?slug=${slug}&action=approve`)
  } catch (error) {
    console.error('❌ Error generating blog post:', error)
    process.exit(1)
  }
}

main()
