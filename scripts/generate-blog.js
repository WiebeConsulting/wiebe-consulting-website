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

// Deep research to find real statistics and data
async function conductResearch(topic, category) {
  console.log('🔬 Conducting deep research for real statistics...')

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: `You are a healthcare research analyst. Find REAL, VERIFIABLE statistics and data related to this topic for a physical therapy clinic blog post:

Topic: "${topic}"
Category: ${category}

Research and provide:

1. INDUSTRY STATISTICS (must be from reputable sources):
   - No-show rates in healthcare/PT (cite MGMA, APTA, or peer-reviewed studies)
   - Patient retention statistics
   - Revenue impact data
   - Treatment outcome correlations

2. VERIFIABLE FACTS:
   - Only include statistics that can be traced to real organizations
   - Include the source name for each statistic
   - Use conservative estimates when ranges exist
   - Prefer data from: APTA, MGMA, CMS, peer-reviewed journals, industry surveys

3. REALISTIC BENCHMARKS:
   - What improvements are actually achievable?
   - What timeframes are realistic?
   - What do studies actually show?

IMPORTANT RULES:
- Do NOT make up statistics
- Do NOT use specific percentages unless from a real source
- Use ranges when exact figures aren't available (e.g., "studies suggest 15-20%")
- Say "industry reports indicate" or "research suggests" for general trends
- If you're unsure about a statistic, indicate that it needs verification

Format your response as JSON:
{
  "verified_statistics": [
    {
      "stat": "The statistic",
      "source": "Source name/organization",
      "confidence": "high/medium/low",
      "notes": "Any caveats"
    }
  ],
  "industry_benchmarks": {
    "typical_no_show_rate": "X-Y%",
    "realistic_improvement": "X-Y% over Z months",
    "average_session_value": "$X-Y range"
  },
  "safe_claims": [
    "Claims that are defensible and backed by general industry knowledge"
  ],
  "claims_to_avoid": [
    "Specific claims that should NOT be made without verification"
  ],
  "recommended_framing": "How to present data conservatively and professionally"
}

Only respond with the JSON, no other text.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    console.log('⚠️ Research returned non-JSON, using conservative defaults')
    return {
      verified_statistics: [],
      industry_benchmarks: {
        typical_no_show_rate: '10-20%',
        realistic_improvement: '15-25% over 3-6 months',
        average_session_value: '$100-150',
      },
      safe_claims: [
        'No-show rates vary by practice but commonly range from 10-20%',
        'Consistent reminder systems can help reduce missed appointments',
        'Patient engagement correlates with better treatment outcomes',
      ],
      claims_to_avoid: [
        'Specific percentage guarantees',
        'Exact revenue figures without context',
        'Timeframes shorter than 60 days',
      ],
      recommended_framing: 'Use conservative language like "can help reduce" rather than "will reduce by X%"',
    }
  }

  try {
    const research = JSON.parse(jsonMatch[0])
    console.log(`   Found ${research.verified_statistics?.length || 0} verified statistics`)
    console.log(`   Identified ${research.claims_to_avoid?.length || 0} claims to avoid`)
    return research
  } catch (error) {
    console.log('⚠️ Failed to parse research, using conservative defaults')
    return {
      verified_statistics: [],
      industry_benchmarks: {
        typical_no_show_rate: '10-20%',
        realistic_improvement: '15-25% over 3-6 months',
        average_session_value: '$100-150',
      },
      safe_claims: [],
      claims_to_avoid: [],
      recommended_framing: 'Use conservative, defensible language throughout',
    }
  }
}

async function generateBlogPost(topic, category, research) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `You are an expert content writer for Wiebe Consulting, a B2B company that helps sports and orthopedic physical therapy clinics increase revenue through done-for-you patient retention systems.

Write a comprehensive, authoritative blog post on the topic: "${topic}"

IMPORTANT - USE THIS RESEARCH DATA:
${JSON.stringify(research, null, 2)}

CRITICAL RULES FOR STATISTICS AND CLAIMS:
1. ONLY use statistics from the "verified_statistics" list above
2. Use the "industry_benchmarks" for any numbers you cite
3. Follow the "recommended_framing" guidance
4. AVOID all claims listed in "claims_to_avoid"
5. When citing a statistic, mention it's from industry research/studies
6. Use conservative language: "can help," "typically," "research suggests"
7. NEVER claim specific percentage improvements without verified source
8. NEVER use timeframes shorter than 60-90 days for measurable results

Requirements:
1. Length: 1,000-1,500 words
2. Tone: Professional but approachable, expert-driven, B2B focused
3. Structure:
   - Compelling introduction that hooks the reader with a relatable problem
   - Clear subheadings (use ## for H2, ### for H3)
   - Practical, actionable advice
   - Use ONLY the verified statistics provided above
   - A conclusion with a clear takeaway
4. Include real-world scenarios PT clinic owners face
5. Subtly position Wiebe Consulting's services as a solution (don't be salesy)
6. Focus on depth over breadth - be the definitive resource on this topic

Format your response as JSON with this structure:
{
  "title": "The blog post title (NO specific percentages in title unless verified)",
  "description": "A 150-160 character meta description for SEO",
  "content": "The full markdown content of the blog post",
  "tags": ["tag1", "tag2", "tag3"],
  "sources_used": ["List of sources/statistics used from the research"]
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

  console.log(`   Sources used: ${parsed.sources_used?.join(', ') || 'None specified'}`)

  return {
    title: parsed.title,
    description: parsed.description,
    content: parsed.content,
    tags: parsed.tags,
    slug,
    sourcesUsed: parsed.sources_used,
  }
}

// SEO, quality, and fact-checking validation
async function validateAndOptimizePost(post) {
  console.log('🔍 Running SEO optimization and quality validation...')

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 5000,
    messages: [
      {
        role: 'user',
        content: `You are a senior editor and SEO specialist. Review and improve this blog post for a B2B consulting company targeting physical therapy clinic owners.

CURRENT POST:
Title: "${post.title}"
Description: "${post.description}"
Tags: ${JSON.stringify(post.tags)}

Content:
${post.content}

PERFORM THESE CHECKS AND IMPROVEMENTS:

1. SEO OPTIMIZATION:
   - Title: Must be 50-60 characters, include primary keyword, be compelling for clicks
   - Meta description: Must be 150-160 characters, include call-to-action, summarize value
   - Ensure H2/H3 headings include relevant keywords naturally
   - Check keyword density is appropriate (not stuffed)
   - Ensure the first paragraph contains the main keyword

2. FACT VALIDATION:
   - Verify all statistics and numbers are realistic and industry-standard
   - If any claims seem exaggerated or unverifiable, adjust to conservative, defensible figures
   - Ensure medical/healthcare claims are accurate and don't make promises that could be problematic
   - Remove or revise any dubious statistics

3. GRAMMAR & PROFESSIONALISM:
   - Fix ALL grammar, spelling, and punctuation errors
   - Ensure consistent tone throughout (professional but approachable)
   - Remove any awkward phrasing or redundancies
   - Ensure proper capitalization and formatting

4. CONVERSION OPTIMIZATION:
   - Ensure clear value proposition in the introduction
   - Add subtle conversion hooks without being salesy
   - Strong conclusion with clear next step/takeaway
   - Include social proof elements where appropriate

5. CONTENT QUALITY:
   - Ensure logical flow between sections
   - Verify all advice is actionable and specific
   - Remove any filler content
   - Ensure examples are realistic and relatable

Respond with the IMPROVED version in this exact JSON format:
{
  "title": "Optimized SEO title (50-60 chars)",
  "description": "Optimized meta description (150-160 chars)",
  "content": "The fully corrected and optimized markdown content",
  "tags": ["optimized", "seo", "tags"],
  "changes_made": ["List of significant changes you made"],
  "seo_score": "A brief assessment: Excellent/Good/Needs Work",
  "quality_score": "A brief assessment: Excellent/Good/Needs Work"
}

Only respond with the JSON, no other text.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    console.log('⚠️ Validation returned non-JSON, using original post')
    return post
  }

  try {
    const validated = JSON.parse(jsonMatch[0])

    console.log(`📊 SEO Score: ${validated.seo_score}`)
    console.log(`📊 Quality Score: ${validated.quality_score}`)
    console.log(`📝 Changes made:`)
    validated.changes_made.forEach((change) => console.log(`   - ${change}`))

    // Update slug if title changed significantly
    const newSlug = validated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)

    return {
      title: validated.title,
      description: validated.description,
      content: validated.content,
      tags: validated.tags,
      slug: newSlug,
      seoScore: validated.seo_score,
      qualityScore: validated.quality_score,
      changesMade: validated.changes_made,
    }
  } catch (error) {
    console.log('⚠️ Failed to parse validation response, using original post')
    return post
  }
}

// Final grammar and style check
async function finalProofread(post) {
  console.log('✏️ Running final proofread...')

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 5000,
    messages: [
      {
        role: 'user',
        content: `You are a professional proofreader. Perform a FINAL check on this blog post.

Title: "${post.title}"
Description: "${post.description}"

Content:
${post.content}

Check for and fix:
1. Any remaining grammar or spelling errors
2. Punctuation issues
3. Inconsistent formatting
4. Awkward sentence structures
5. Missing or extra spaces
6. Proper use of em-dashes, hyphens, and other punctuation

Return the corrected content in this JSON format:
{
  "title": "Proofread title",
  "description": "Proofread description",
  "content": "Proofread content with all corrections applied",
  "corrections_count": 0,
  "ready_for_publication": true
}

Only respond with the JSON, no other text.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return post
  }

  try {
    const proofread = JSON.parse(jsonMatch[0])
    console.log(`✅ Proofread complete: ${proofread.corrections_count} corrections made`)
    console.log(`📋 Ready for publication: ${proofread.ready_for_publication ? 'Yes' : 'Needs review'}`)

    return {
      ...post,
      title: proofread.title,
      description: proofread.description,
      content: proofread.content,
    }
  } catch (error) {
    return post
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
  console.log('━'.repeat(50))

  try {
    // 1. Generate topic
    console.log('\n📝 STEP 1: Generating topic...')
    const { topic, category } = await generateBlogTopic()
    console.log(`   Topic: ${topic}`)
    console.log(`   Category: ${category}`)

    // 2. Deep research for real statistics
    console.log('\n🔬 STEP 2: Conducting deep research...')
    const research = await conductResearch(topic, category)

    // 3. Generate blog content using research
    console.log('\n✍️ STEP 3: Generating content with verified data...')
    let post = await generateBlogPost(topic, category, research)
    console.log(`   Generated: ${post.title}`)
    console.log(`   Word count: ~${post.content.split(/\s+/).length} words`)

    // 4. SEO optimization and fact validation
    console.log('\n🔍 STEP 4: SEO optimization & fact validation...')
    post = await validateAndOptimizePost(post)
    if (post.seoScore) {
      console.log(`   SEO Score: ${post.seoScore}`)
      console.log(`   Quality Score: ${post.qualityScore}`)
    }

    // 5. Final proofreading
    console.log('\n✏️ STEP 5: Final proofreading...')
    post = await finalProofread(post)

    // 6. Generate featured image
    console.log('\n🎨 STEP 6: Generating image with DALL-E...')
    const imagePath = await generateBlogImage(post.title, post.slug)
    console.log(`   Image saved: ${imagePath}`)

    // 7. Save as draft (not published yet)
    console.log('\n💾 STEP 7: Saving blog post as draft...')
    const slug = await saveBlogPostAsDraft(post, imagePath)
    console.log(`   Draft saved: ${slug}`)

    // 8. Send approval email
    console.log('\n📧 STEP 8: Sending approval email...')
    await sendApprovalEmail(post, imagePath)

    console.log('\n' + '━'.repeat(50))
    console.log('✅ BLOG POST GENERATION COMPLETE!')
    console.log('━'.repeat(50))
    console.log(`\n📌 Title: ${post.title}`)
    console.log(`📝 Description: ${post.description}`)
    if (post.sourcesUsed && post.sourcesUsed.length > 0) {
      console.log(`📊 Sources: ${post.sourcesUsed.join(', ')}`)
    }
    console.log(`🔗 Approval URL: https://wiebe-consulting.com/api/blog/approve?slug=${slug}&action=approve`)
    console.log('\n⏳ Awaiting your approval before publishing.')
  } catch (error) {
    console.error('\n❌ Error generating blog post:', error)
    process.exit(1)
  }
}

main()
