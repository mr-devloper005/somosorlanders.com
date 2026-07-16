import { Bookmark, CheckCircle2, Compass, Library, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const process = [
  'Collect useful resources with enough context to evaluate them quickly.',
  'Group links into browsable collections instead of loose, disconnected lists.',
  'Keep public discovery focused on resources while private identity pages stay direct-link only.',
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-5 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <article className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="editable-display mt-5 max-w-4xl text-5xl font-normal leading-[1] sm:text-6xl lg:text-7xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 grid gap-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <Library className="h-7 w-7" />
              </div>
              <h2 className="editable-display mt-8 text-4xl font-normal leading-[1.05]">A library shaped for return visits.</h2>
              <div className="mt-8 grid gap-3">
                {process.map((item, index) => (
                  <div key={item} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-sm font-bold">{index + 1}</span>
                    <p className="text-sm leading-7 text-[var(--slot4-muted-text)]">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            {pagesContent.about.values.map((value, index) => {
              const icons = [Bookmark, Compass, Sparkles]
              const Icon = icons[index] || CheckCircle2
              return (
                <div key={value.title} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
                  <Icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <h2 className="editable-display mt-5 text-3xl font-normal leading-[1.05]">{value.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              )
            })}
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
