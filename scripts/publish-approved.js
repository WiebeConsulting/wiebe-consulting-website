// Script for publishing approved blog posts and posting to LinkedIn
// Runs via GitHub Actions at 8 AM Israel time on Monday/Tuesday

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// LinkedIn posting function
async function postToLinkedIn(accessToken, personUrn, title, description, url, tags) {
  if (!accessToken || !personUrn) {
    console.log('⚠️ LinkedIn credentials not configured - skipping LinkedIn post')
    return false
  }

  const hashtags = tags.slice(0, 3).map((tag) => `#${tag.replace(/\s+/g, '')}`)

  const text = `🎯 New article: ${title}

${description}

Read the full article: ${url}

${hashtags.join(' ')} #PhysicalTherapy #PTClinic #HealthcareBusiness`

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
            shareCommentary: { text },
            shareMediaCategory: 'ARTICLE',
            media: [{ status: 'READY', originalUrl: url }],
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
      return false
    }

    console.log('✅ Posted to LinkedIn successfully!')
    return true
  } catch (error) {
    console.error('LinkedIn posting error:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Starting publish process...')

  const approvedDir = path.join(process.cwd(), 'content', 'blog', 'approved')
  const publishedDir = path.join(process.cwd(), 'content', 'blog')

  // Check if approved directory exists
  if (!fs.existsSync(approvedDir)) {
    console.log('📭 No approved posts to publish')
    return
  }

  const files = fs.readdirSync(approvedDir).filter((f) => f.endsWith('.md'))

  if (files.length === 0) {
    console.log('📭 No approved posts to publish')
    return
  }

  console.log(`📝 Found ${files.length} approved post(s) to publish`)

  for (const filename of files) {
    const slug = filename.replace('.md', '')
    const approvedPath = path.join(approvedDir, filename)
    const publishedPath = path.join(publishedDir, filename)

    console.log(`\n📄 Publishing: ${slug}`)

    // Read the post
    const content = fs.readFileSync(approvedPath, 'utf-8')
    const { data } = matter(content)

    // Move to published folder
    fs.renameSync(approvedPath, publishedPath)
    console.log('✅ Moved to published folder')

    // Post to LinkedIn
    const postUrl = `https://wiebe-consulting.com/blog/${slug}`
    await postToLinkedIn(
      process.env.LINKEDIN_ACCESS_TOKEN,
      process.env.LINKEDIN_PERSON_URN,
      data.title,
      data.description,
      postUrl,
      data.tags || []
    )

    console.log(`✅ Published: ${data.title}`)
  }

  // Clean up empty approved directory
  const remaining = fs.readdirSync(approvedDir)
  if (remaining.length === 0) {
    fs.rmdirSync(approvedDir)
  }

  console.log('\n🎉 All approved posts published!')
}

main().catch((error) => {
  console.error('❌ Error publishing:', error)
  process.exit(1)
})
