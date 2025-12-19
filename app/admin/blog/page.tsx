'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogDraft {
  slug: string
  title: string
  description: string
  date: string
  image: string
  content: string
}

export default function BlogAdminPage() {
  const [drafts, setDrafts] = useState<BlogDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedDraft, setSelectedDraft] = useState<BlogDraft | null>(null)

  useEffect(() => {
    fetchDrafts()
  }, [])

  async function fetchDrafts() {
    try {
      const res = await fetch('/api/blog/drafts')
      const data = await res.json()
      setDrafts(data.drafts || [])
    } catch (error) {
      console.error('Error fetching drafts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(slug: string, action: 'approve' | 'reject') {
    setActionLoading(slug)
    try {
      const res = await fetch(`/api/blog/approve?slug=${slug}&action=${action}`)
      if (res.ok) {
        setDrafts(drafts.filter(d => d.slug !== slug))
        setSelectedDraft(null)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading drafts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Blog Draft Review</h1>
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Blog
          </Link>
        </div>

        {drafts.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-semibold mb-2">No Drafts Pending</h2>
            <p className="text-slate-400">
              All caught up! New drafts will appear here every Monday at 10 AM.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {drafts.map((draft) => (
              <div
                key={draft.slug}
                className="bg-slate-800 rounded-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {draft.image && (
                    <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                      <Image
                        src={draft.image}
                        alt={draft.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{draft.title}</h2>
                        <p className="text-slate-400 mb-4">{draft.description}</p>
                        <p className="text-sm text-slate-500">
                          Generated: {new Date(draft.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => setSelectedDraft(draft)}
                          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => handleAction(draft.slug, 'approve')}
                          disabled={actionLoading === draft.slug}
                          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm disabled:opacity-50"
                        >
                          {actionLoading === draft.slug ? '...' : '✓ Approve'}
                        </button>
                        <button
                          onClick={() => handleAction(draft.slug, 'reject')}
                          disabled={actionLoading === draft.slug}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm disabled:opacity-50"
                        >
                          {actionLoading === draft.slug ? '...' : '✗ Reject'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        {selectedDraft && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedDraft.title}</h2>
                <button
                  onClick={() => setSelectedDraft(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-400 text-lg mb-6">{selectedDraft.description}</p>
                  <div className="whitespace-pre-wrap">{selectedDraft.content}</div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-700 flex justify-end gap-3">
                <button
                  onClick={() => handleAction(selectedDraft.slug, 'reject')}
                  disabled={actionLoading === selectedDraft.slug}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAction(selectedDraft.slug, 'approve')}
                  disabled={actionLoading === selectedDraft.slug}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg disabled:opacity-50"
                >
                  Approve & Publish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
