import { useMemo, useState } from 'react'
import { FileText, Library, ShieldAlert } from 'lucide-react'
import { US_STATES } from './lib/usStates'
import { buildCeaseAndDesistLetter, type LetterInputs } from './lib/letter'
import { researchStateLawWeb } from './lib/research'
import { PrintButton } from './components/PrintButton'

function App() {
  const [stateCode, setStateCode] = useState('CA')
  const stateName = useMemo(
    () => US_STATES.find((s) => s.code === stateCode)?.name ?? 'California',
    [stateCode],
  )

  const [issueDescription, setIssueDescription] = useState(
    'Describe what happened, who is involved, and what outcome you want. Include dates, amounts, and any written communications.'
  )

  const [inputs, setInputs] = useState<Omit<LetterInputs, 'stateName' | 'issueDescription'>>({
    senderName: 'Your Name',
    senderAddress: 'Your Address',
    senderEmail: 'you@email.com',
    senderPhone: '(555) 555-5555',
    recipientName: 'Other Party Name',
    recipientAddress: 'Other Party Address',
    subject: 'Cease and Desist / Demand to Stop Unlawful Conduct',
    facts: 'Write a clear timeline of facts (bullets or short paragraphs).',
    demands: 'State exactly what you want the recipient to do or stop doing.',
    deadlineDays: 10,
  })

  const [researchSummary, setResearchSummary] = useState<string>('')
  const [sources, setSources] = useState<{ title: string; url: string; note?: string }[]>([])
  const [loading, setLoading] = useState(false)

  const letter = useMemo(() => {
    return buildCeaseAndDesistLetter({
      stateName,
      issueDescription,
      ...inputs,
    })
  }, [inputs, issueDescription, stateName])

  const runResearch = async () => {
    setLoading(true)
    try {
      const res = await researchStateLawWeb(stateName, issueDescription)
      setResearchSummary(res.summary)
      setSources(res.sources)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
              <Library className="h-3.5 w-3.5" />
              State-law research & letter builder
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Legal Research Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              Select a state, describe your issue, generate a research checklist with links to real sources, and
              draft a printable cease-and-desist style letter.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <PrintButton targetId="print-letter" />
          </div>
        </header>

        <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-300" />
            <div className="text-sm text-amber-100/90">
              <div className="font-medium text-amber-200">Important</div>
              This app does <span className="font-semibold">not</span> provide legal advice. "AI legal research" is
              implemented as a real-source research checklist with links to public resources; verify statutes and
              consult a licensed attorney in {stateName} for advice.
            </div>
          </div>
        </div>

        <main className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">Inputs</h2>
              <div className="text-xs text-zinc-400">Draft updates live</div>
            </div>

            <div className="mt-4 grid gap-4">
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">State</span>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-500"
                >
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Describe your legal issue</span>
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={6}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Your name</span>
                  <input
                    value={inputs.senderName}
                    onChange={(e) => setInputs((p) => ({ ...p, senderName: e.target.value }))}
                    className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Recipient name</span>
                  <input
                    value={inputs.recipientName}
                    onChange={(e) => setInputs((p) => ({ ...p, recipientName: e.target.value }))}
                    className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                  />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Your address</span>
                <input
                  value={inputs.senderAddress}
                  onChange={(e) => setInputs((p) => ({ ...p, senderAddress: e.target.value }))}
                  className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Email</span>
                  <input
                    value={inputs.senderEmail}
                    onChange={(e) => setInputs((p) => ({ ...p, senderEmail: e.target.value }))}
                    className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Phone</span>
                  <input
                    value={inputs.senderPhone}
                    onChange={(e) => setInputs((p) => ({ ...p, senderPhone: e.target.value }))}
                    className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                  />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Recipient address</span>
                <input
                  value={inputs.recipientAddress}
                  onChange={(e) => setInputs((p) => ({ ...p, recipientAddress: e.target.value }))}
                  className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Subject</span>
                <input
                  value={inputs.subject}
                  onChange={(e) => setInputs((p) => ({ ...p, subject: e.target.value }))}
                  className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Facts (timeline)</span>
                <textarea
                  value={inputs.facts}
                  onChange={(e) => setInputs((p) => ({ ...p, facts: e.target.value }))}
                  rows={4}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-zinc-300">Demands</span>
                <textarea
                  value={inputs.demands}
                  onChange={(e) => setInputs((p) => ({ ...p, demands: e.target.value }))}
                  rows={4}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-zinc-300">Response deadline (days)</span>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={inputs.deadlineDays}
                    onChange={(e) => setInputs((p) => ({ ...p, deadlineDays: Number(e.target.value) }))}
                    className="h-10 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-500"
                  />
                </label>
                <button
                  type="button"
                  onClick={runResearch}
                  disabled={loading}
                  className="h-10 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Researching…' : 'Run research'}
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-zinc-300" />
                <h2 className="text-base font-semibold">Printable draft</h2>
              </div>
              <div className="mt-3 rounded-xl bg-white p-5 text-zinc-900">
                <div id="print-letter">
                  <pre className="whitespace-pre-wrap font-serif text-[12.5px] leading-relaxed">
                    {letter.text}
                  </pre>
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-400">
                Tip: Review tone, facts, and demands carefully. Consider certified mail and keeping proof of delivery.
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold">Research (real sources)</h2>
                <a
                  className="text-xs text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
                  href="https://www.law.cornell.edu/wex/state_law"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn how to verify state law
                </a>
              </div>

              <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <pre className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-200">
                  {researchSummary ||
                    `Click "Run research" to generate a checklist and links for ${stateName}.`}
                </pre>
              </div>

              <div className="mt-4 grid gap-2">
                {sources.length === 0 ? (
                  <div className="text-xs text-zinc-400">Sources will appear here.</div>
                ) : (
                  sources.map((s) => (
                    <a
                      key={s.url}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm hover:border-zinc-700"
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="font-medium text-zinc-100">{s.title}</div>
                      <div className="mt-1 break-all text-xs text-zinc-400">{s.url}</div>
                      {s.note ? <div className="mt-2 text-xs text-zinc-300">{s.note}</div> : null}
                    </a>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-10 border-t border-zinc-800 pt-6 text-xs text-zinc-500">
          Built as a client-side demo. To enable true automated legal research, connect a secure server that queries
          official state code sources and (optionally) a paid research provider, then have the server generate a
          citation-backed memo and letter.
        </footer>
      </div>
    </div>
  )
}

export default App
