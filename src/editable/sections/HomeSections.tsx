import Link from 'next/link'
import { ArrowRight, Bookmark, Check, ExternalLink, Search, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = dc.shell.section

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function resourceUrl(post?: SitePost | null) {
  const content = getContent(post)
  return [content.website, content.url, content.link].find((value): value is string => typeof value === 'string' && value.length > 0) || ''
}

function domainOf(post?: SitePost | null) {
  const url = resourceUrl(post)
  if (!url) return 'Saved source'
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0]
  }
}

function ResourceCard({ post, href, index, compact = false }: { post: SitePost; href: string; index: number; compact?: boolean }) {
  return (
    <Link href={href} className={`group block rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-[400ms] hover:-translate-y-1 hover:border-[var(--slot4-accent)]/55 hover:bg-[var(--slot4-warm)] ${compact ? '' : 'min-h-[260px]'}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-[var(--editable-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">No. {String(index + 1).padStart(2, '0')}</span>
        <span className="text-xs font-semibold text-[var(--slot4-accent)]">{domainOf(post)}</span>
      </div>
      <h3 className={`editable-display mt-6 line-clamp-3 ${compact ? 'text-2xl' : 'text-3xl'} leading-[1.05] text-[var(--slot4-page-text)]`}>{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, compact ? 110 : 150)}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-muted-text)] transition duration-[400ms] group-hover:text-[var(--slot4-accent)]">
          Open <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool[0]
  const stats = [
    [String(pool.length || posts.length || 0).padStart(2, '0'), 'fresh resources'],
    [String(new Set(pool.map((post) => getEditableCategory(post))).size || 1).padStart(2, '0'), 'collections'],
    ['1', 'public library'],
  ]

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(136,171,142,0.25),transparent_42%)]" />
      <div className={`${container} relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:py-[150px]`}>
        <EditableReveal className="flex flex-col justify-center" index={0}>
          <h1 className={`${dc.type.heroTitle} max-w-4xl text-[var(--slot4-page-text)]`}>{pagesContent.home.hero.title.join(' ')}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <form action="/search" className="mt-8 flex max-w-xl overflow-hidden rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </label>
            <button className="bg-[var(--slot4-accent)] px-5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-[400ms] hover:bg-[var(--slot4-surface-bg)]">Search</button>
          </form>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryRoute} className={dc.button.primary}>Explore collections <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/about" className={dc.button.secondary}>How curation works</Link>
          </div>
        </EditableReveal>

        <EditableReveal index={1} className="relative">
          <div className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Featured resource</span>
                <Sparkles className="h-5 w-5 text-[var(--slot4-accent)]" />
              </div>
              <h2 className="editable-display mt-16 text-4xl leading-[1.05] text-[var(--slot4-page-text)] sm:text-5xl">{featured?.title || 'Curated bookmarks for work worth returning to.'}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">{featured ? getEditableExcerpt(featured, 170) : 'Browse compact shelves of links, references, tools, and notes organized for quick discovery.'}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
                    <p className="editable-display text-3xl text-[var(--slot4-page-text)]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const categories = Array.from(new Set(pool.map((post) => getEditableCategory(post)).filter(Boolean))).slice(0, 8)
  if (!categories.length) return null

  return (
    <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
      <EditableReveal as="div" index={0} className={`${container} py-6`}>
        <div className="flex gap-3 overflow-hidden">
          {[...categories, ...categories].map((category, index) => (
            <Link key={`${category}-${index}`} href={`${primaryRoute}?category=${encodeURIComponent(category.toLowerCase())}`} className="shrink-0 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] px-5 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition duration-[400ms] hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              {category}
            </Link>
          ))}
        </div>
      </EditableReveal>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool.slice(0, 3)
  const featureCopy = [
    'Save useful links in collections that are easy to scan later.',
    'Surface domain, category, and verified context before visitors click out.',
    'Keep discovery public while identity pages stay direct-link only.',
  ]

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
        <EditableReveal index={0} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className={dc.type.eyebrow}>Why collections work</p>
            <h2 className={`${dc.type.sectionTitle} mt-4 max-w-3xl text-[var(--slot4-page-text)]`}>Useful resources need rhythm, context, and a reason to return.</h2>
          </div>
          <div className="grid gap-3">
            {featureCopy.map((item) => (
              <div key={item} className="flex gap-4 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]"><Check className="h-4 w-4" /></span>
                <p className="text-sm leading-7 text-[var(--slot4-muted-text)]">{item}</p>
              </div>
            ))}
          </div>
        </EditableReveal>

        {featured.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featured.map((post, index) => (
              <EditableReveal key={post.id || post.slug} index={index}>
                <ResourceCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              </EditableReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const labels: Record<string, string> = {
    spotlight: 'Newly saved',
    browse: 'Collection shelf',
    index: 'Evergreen resources',
  }
  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => (
        <section key={section.key} className={sectionIndex % 2 === 0 ? 'bg-[var(--slot4-dark-bg)]' : 'bg-[var(--slot4-panel-bg)]'}>
          <div className={`${container} py-16 sm:py-20`}>
            <EditableReveal index={0} className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className={dc.type.eyebrow}>{labels[section.key] || 'Discover'}</p>
                <h2 className="editable-display mt-3 text-4xl leading-[1.05] text-[var(--slot4-page-text)] sm:text-5xl">Browse resources by shelf.</h2>
              </div>
              <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)]">
                View shelf <ArrowRight className="h-4 w-4" />
              </Link>
            </EditableReveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {section.posts.slice(0, 8).map((post, index) => (
                <EditableReveal key={post.id || post.slug} index={index}>
                  <ResourceCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} compact />
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function EditableHomeCta() {
  const faqs = [
    ['What belongs here?', 'Bookmarks, tools, references, articles, guides, and useful resource pages that help people find their next best link.'],
    ['Can I suggest a resource?', 'Yes. Signed-in users can add a resource draft, and visitors can contact the curation team with suggestions.'],
    ['Where are member pages?', 'Identity detail pages remain available only by direct URL and are not promoted in public discovery.'],
  ]

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-20 sm:py-[120px]`}>
        <EditableReveal index={0} className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className={dc.type.eyebrow}>Questions</p>
              <h2 className={`${dc.type.sectionTitle} mt-4 text-[var(--slot4-page-text)]`}>A calmer way to discover what is worth saving.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">Explore the public library, search by topic, or add a resource when you have something useful to contribute.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/sbm" className={dc.button.primary}>Explore collections <Bookmark className="h-4 w-4" /></Link>
                <Link href="/create" className={dc.button.secondary}>Add a resource <ExternalLink className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="grid gap-3">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-5" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--slot4-page-text)]">
                    {question}
                    <Star className="h-4 w-4 text-[var(--slot4-accent)] transition duration-[400ms] group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
