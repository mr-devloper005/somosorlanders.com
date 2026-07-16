'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const collectionLinks = [
  ['Business', '/sbm?category=business'],
  ['Health', '/sbm?category=health'],
  ['Technology', '/sbm?category=technology'],
  ['Travel', '/sbm?category=travel'],
  ['Education', '/sbm?category=education'],
]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span>
              <span className="editable-display block text-2xl leading-none">{SITE_CONFIG.name}</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{globalContent.footer.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Collections</h3>
          <div className="mt-5 grid gap-3">
            {collectionLinks.map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition duration-[400ms] hover:text-[var(--slot4-page-text)]">
                {label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Site</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition duration-[400ms] hover:text-[var(--slot4-page-text)]">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition duration-[400ms] hover:text-[var(--slot4-page-text)]">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-5 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-soft-muted-text)]">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
