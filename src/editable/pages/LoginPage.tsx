import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Search, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
            <h1 className="editable-display mt-5 max-w-2xl text-5xl font-normal leading-[1] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [Bookmark, 'Saved drafts'],
                [Search, 'Faster review'],
                [ShieldCheck, 'Local access'],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-3 text-sm font-bold">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="self-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_24px_70px_rgba(38,53,42,0.12)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">Secure workspace</p>
                <h2 className="editable-display mt-2 text-4xl font-normal">{pagesContent.auth.login.formTitle}</h2>
              </div>
              <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--slot4-page-text)]">Member</span>
            </div>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              New here? <Link href="/signup" className="inline-flex items-center gap-1 font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta} <ArrowRight className="h-3.5 w-3.5" /></Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
