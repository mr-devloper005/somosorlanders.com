'use client'

import { Bookmark, Layers3, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Bookmark, title: 'Resource suggestions', body: 'Send a link, explain why it is useful, and point us toward the right collection.' },
  { icon: Layers3, title: 'Collection improvements', body: 'Report stale resources, category issues, duplicate links, or missing context.' },
  { icon: Sparkles, title: 'Curation partnerships', body: 'Share an idea for a themed shelf, editorial collaboration, or reference hub.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <main className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-5 text-5xl font-normal leading-[1] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-3">
              {lanes.map((lane) => (
                <div key={lane.title} className="flex gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5">
                  <lane.icon className="mt-1 h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                  <div>
                    <h2 className="text-base font-bold">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7">
            <h2 className="editable-display text-2xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
