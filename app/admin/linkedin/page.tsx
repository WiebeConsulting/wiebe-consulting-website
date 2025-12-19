'use client'

import { useState } from 'react'

export default function LinkedInSetupPage() {
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [code, setCode] = useState('')
  const [result, setResult] = useState<{
    accessToken?: string
    personUrn?: string
    error?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const redirectUri = typeof window !== 'undefined'
    ? `${window.location.origin}/admin/linkedin`
    : 'https://wiebe-consulting.com/admin/linkedin'

  const authUrl = clientId
    ? `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent('openid profile w_member_social')}`
    : ''

  async function exchangeCode() {
    if (!code || !clientId || !clientSecret) {
      setResult({ error: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/linkedin/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, clientId, clientSecret, redirectUri }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to exchange code' })
    } finally {
      setLoading(false)
    }
  }

  // Check for code in URL on mount
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const urlCode = urlParams.get('code')
    if (urlCode && !code) {
      setCode(urlCode)
      // Clean URL
      window.history.replaceState({}, '', '/admin/linkedin')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">LinkedIn Integration Setup</h1>
        <p className="text-slate-400 mb-8">
          Connect your LinkedIn account to auto-post blog content.
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-cyan-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Enter App Credentials
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              From your LinkedIn Developer App → Auth tab
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                  placeholder="Your Client ID"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Client Secret</label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                  placeholder="Your Client Secret"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-cyan-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Add Redirect URI to LinkedIn App
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              In your LinkedIn App → Auth → OAuth 2.0 settings → Add this redirect URL:
            </p>
            <code className="block bg-slate-700 p-3 rounded text-cyan-400 text-sm break-all">
              {redirectUri}
            </code>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-cyan-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Authorize with LinkedIn
            </h2>
            {clientId ? (
              <a
                href={authUrl}
                className="inline-block bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold px-6 py-3 rounded-lg"
              >
                Connect LinkedIn Account →
              </a>
            ) : (
              <p className="text-slate-500">Enter your Client ID first</p>
            )}
          </div>

          {/* Step 4 */}
          {code && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="bg-green-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Exchange Code for Token
              </h2>
              <p className="text-green-400 text-sm mb-4">
                Authorization code received!
              </p>
              <button
                onClick={exchangeCode}
                disabled={loading || !clientId || !clientSecret}
                className="bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg"
              >
                {loading ? 'Exchanging...' : 'Get Access Token'}
              </button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`rounded-lg p-6 ${result.error ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
              {result.error ? (
                <p className="text-red-400">{result.error}</p>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-400">Success!</h2>
                  <p className="text-slate-300">Add these to your GitHub Secrets:</p>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1">LINKEDIN_ACCESS_TOKEN</label>
                    <code className="block bg-slate-800 p-3 rounded text-cyan-400 text-xs break-all">
                      {result.accessToken}
                    </code>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1">LINKEDIN_PERSON_URN</label>
                    <code className="block bg-slate-800 p-3 rounded text-cyan-400 text-sm">
                      {result.personUrn}
                    </code>
                  </div>

                  <p className="text-slate-400 text-sm mt-4">
                    Go to: <a href="https://github.com/WiebeConsulting/wiebe-consulting-website/settings/secrets/actions" className="text-cyan-400 underline" target="_blank">GitHub Secrets</a> and add these values.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
