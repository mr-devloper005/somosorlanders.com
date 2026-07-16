'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const links = [
    ...navItems,
    ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto grid min-h-[76px] w-full max-w-[var(--editable-container)] grid-cols-[1fr_auto] items-center gap-5 px-5 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-[400ms] group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[240px] truncate text-2xl leading-none">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[240px] truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
              {globalContent.nav.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition duration-[400ms] ${active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/search" aria-label="Search resources" className="rounded-md border border-[var(--editable-border)] p-2.5 text-[var(--slot4-muted-text)] transition duration-[400ms] hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition duration-[400ms] hover:bg-[var(--slot4-surface-bg)]">
                <PlusCircle className="h-4 w-4" /> Add resource
              </Link>
              <button type="button" onClick={logout} className="px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition duration-[400ms] hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition duration-[400ms] hover:text-[var(--slot4-page-text)]">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition duration-[400ms] hover:bg-[var(--slot4-surface-bg)]">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="justify-self-end rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, { label: 'Search', href: '/search' }, ...links].map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-semibold ${active ? 'bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]' : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--slot4-page-text)]'}`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-md px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
