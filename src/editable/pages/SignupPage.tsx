import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Layers3, Library, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="self-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_24px_70px_rgba(38,53,42,0.12)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">Create curator access</p>
            <h1 className="editable-display mt-2 text-4xl font-normal">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              Already have an account? <Link href="/login" className="inline-flex items-center gap-1 font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta} <ArrowRight className="h-3.5 w-3.5" /></Link>
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="editable-display mt-5 max-w-2xl text-5xl font-normal leading-[1] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-3">
              {[
                [PenLine, 'Submit resource drafts'],
                [Layers3, 'Organize collection context'],
                [Library, 'Help the public library improve'],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <Icon className="h-5 w-5 text-[var(--slot4-muted-text)]" />
                  <p className="text-sm font-bold">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
