'use client'

import Link from 'next/link'
import BookingCTA from './BookingCTA'
import ThemeToggle from './ThemeToggle'

interface BlogHeaderProps {
  currentPage?: 'blog' | 'post'
}

export default function BlogHeader({ currentPage = 'post' }: BlogHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
            Wiebe Consulting
          </Link>
          <nav className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
              Home
            </Link>
            <Link
              href="/blog"
              className={currentPage === 'blog'
                ? "text-primary-500 dark:text-cyan-400 font-medium"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              }
            >
              Blog
            </Link>
            <ThemeToggle />
            <BookingCTA
              source={`blog_${currentPage}_header`}
              buttonText="Book a Call"
              className="text-sm px-4 py-2"
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
