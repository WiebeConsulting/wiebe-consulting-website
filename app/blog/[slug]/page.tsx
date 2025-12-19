import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import BookingCTA from '@/components/BookingCTA'
import BlogHeader from '@/components/BlogHeader'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Wiebe Consulting',
    }
  }

  return {
    title: `${post.title} | Wiebe Consulting Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

// Simple markdown to HTML converter with light/dark theme support
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 dark:text-white mt-10 mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-500 dark:text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Lists
    .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 text-slate-600 dark:text-slate-300">$1</li>')
    .replace(/(<li.*<\/li>)\n(<li)/g, '$1$2')
    // Blockquotes
    .replace(/^>\s+(.*$)/gim, '<blockquote class="border-l-4 border-primary-500 dark:border-cyan-500 pl-4 my-4 text-slate-600 dark:text-slate-300 italic">$1</blockquote>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm text-slate-700 dark:text-slate-300">$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-primary-600 dark:text-cyan-400 text-sm">$1</code>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">')

  // Wrap in paragraph tags
  html = '<p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">' + html + '</p>'

  // Clean up empty paragraphs
  html = html.replace(/<p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4"><\/p>/g, '')

  // Wrap lists in ul
  html = html.replace(/(<li.*?<\/li>)+/g, '<ul class="list-disc my-4 space-y-2">$&</ul>')

  return html
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const htmlContent = markdownToHtml(post.content)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <BlogHeader currentPage="post" />

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
          <span>By {post.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">{post.description}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share this article:
            </span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://wiebe-consulting.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 dark:text-cyan-400 hover:text-primary-600 dark:hover:text-cyan-300 transition"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://wiebe-consulting.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 dark:text-cyan-400 hover:text-primary-600 dark:hover:text-cyan-300 transition"
            >
              Twitter
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-500/10 dark:from-cyan-500/10 to-accent-500/10 dark:to-purple-500/10 rounded-xl p-8 border border-gray-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Add $30K+ to Your PT Clinic?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Book a free strategy call to see how we can help reduce no-shows, increase patient retention, and grow your revenue.
          </p>
          <BookingCTA source="blog_post_cta" />
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Wiebe Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
