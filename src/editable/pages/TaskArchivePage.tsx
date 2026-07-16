import Link from 'next/link'
import { ArrowUpRight, ChevronDown, FileText, Globe, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { buildPostUrl, fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getTaskTheme, taskThemeStyle } from '@/editable/theme/task-themes'
import { Ads, getSlotSizes } from '@/lib/ads'

export const revalidate = 3

const pickRandom = (sizes: string[]) => sizes[Math.floor(Math.random() * sizes.length)]

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const stripHtml = (value: string) => value
  .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#0?39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const cleanDomain = (value: string) => value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').split('/')[0]
const taskLabel = (task: TaskKey, fallback?: string) => task === 'sbm' ? 'Collections · Curators' : fallback || task

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskGrid: Record<TaskKey, string> = {
  article: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  listing: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  classified: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  image: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  sbm: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  pdf: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  profile: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const theme = getTaskTheme(task)
  const page = pagination.page || 1
  const label = taskLabel(task, taskConfig?.label)
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--tk-bg)] text-[var(--tk-text)]">
        <header className="relative overflow-hidden border-b border-[var(--tk-line)] bg-[var(--slot4-dark-bg)]">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,var(--tk-glow),transparent_70%)]" />
          <div className="relative mx-auto max-w-[var(--editable-container)] px-6 py-20 sm:py-28 lg:px-8">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--tk-accent)]">
              <span>{theme.kicker}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--tk-accent)] opacity-50" />
              <span className="text-[var(--tk-muted)]">{label}</span>
            </div>
            <h1 className="editable-display mt-6 max-w-4xl text-balance text-[2.5rem] font-normal leading-[1.04] sm:text-6xl lg:text-7xl">
              {voice?.headline || `Browse ${label}`}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--tk-muted)]">{voice?.description || theme.note}</p>
            {voice?.chips?.length ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {voice.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-[var(--tk-line)] bg-[var(--tk-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--tk-muted)]">{chip}</span>
                ))}
              </div>
            ) : null}

            <div className="mt-12 flex flex-col gap-4 border-t border-[var(--tk-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--tk-muted)]">
                <span className="font-semibold text-[var(--tk-text)]">{posts.length}</span> {posts.length === 1 ? 'resource' : 'resources'} · {categoryLabel}
              </p>
              <form action={basePath} className="flex items-center gap-2.5">
                <div className="relative">
                  <select
                    name="category"
                    defaultValue={category}
                    className="h-11 appearance-none rounded-md border border-[var(--tk-line)] bg-[var(--tk-surface)] pl-4 pr-10 text-sm font-medium text-[var(--tk-text)] outline-none transition focus:border-[var(--tk-accent)]"
                    aria-label={voice?.filterLabel || 'Filter category'}
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tk-muted)]" />
                </div>
                <button className="inline-flex h-11 items-center rounded-md bg-[var(--tk-accent)] px-5 text-sm font-semibold text-[var(--tk-on-accent)] transition hover:bg-[var(--slot4-surface-bg)]">Apply</button>
              </form>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-16 sm:py-20 lg:px-8">
          {posts.length ? (
            <div className={taskGrid[task]}>
              {posts.map((post, index) => (
                <div key={post.id || post.slug} className={task === 'sbm' && index === 6 ? 'contents xl:col-span-3' : undefined}>
                  {task === 'sbm' && index === 6 ? (
                    <div className="md:col-span-2 xl:col-span-3">
                      <Ads slot="in-feed" size={pickRandom(getSlotSizes('in-feed'))} showLabel />
                    </div>
                  ) : null}
                  <ArchivePostCard post={post} task={task} basePath={basePath} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[var(--tk-radius)] border border-dashed border-[var(--tk-line)] bg-[var(--tk-surface)] px-8 py-16 text-center">
              <Search className="mx-auto h-7 w-7 text-[var(--tk-muted)]" />
              <h2 className="editable-display mt-5 text-2xl font-normal">Nothing here yet</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--tk-muted)]">Try another category, or check back after new {label.toLowerCase()} are added.</p>
            </div>
          )}

          {posts.length ? (
            <nav className="mt-16 flex items-center justify-center gap-3 text-sm">
              {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-md border border-[var(--tk-line)] px-5 py-2.5 font-medium transition hover:border-[var(--tk-accent)]">Previous</Link> : null}
              <span className="rounded-md border border-[var(--tk-line)] bg-[var(--tk-surface)] px-5 py-2.5 font-medium text-[var(--tk-muted)]">Page {page} of {pagination.totalPages || 1}</span>
              {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-md border border-[var(--tk-line)] px-5 py-2.5 font-medium transition hover:border-[var(--tk-accent)]">Next</Link> : null}
            </nav>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'profile') return <IdentityArchiveCard post={post} href={href} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  return <GenericArchiveCard post={post} href={href} index={index} task={task} />
}

function GenericArchiveCard({ post, href, index, task }: { post: SitePost; href: string; index: number; task: TaskKey }) {
  return (
    <Link href={href} className="group block rounded-xl border border-[var(--tk-line)] bg-[var(--tk-surface)] p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--tk-accent)]/55 hover:bg-[var(--tk-raised)]">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-[var(--tk-line)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--tk-muted)]">{getCategory(post, task)} {String(index + 1).padStart(2, '0')}</span>
        <FileText className="h-5 w-5 text-[var(--tk-accent)]" />
      </div>
      <h2 className="editable-display mt-7 text-3xl font-normal leading-[1.05] text-[var(--slot4-page-text)]">{post.title}</h2>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tk-accent)]">
        Open <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-xl border border-[var(--tk-line)] bg-[var(--tk-surface)] p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--tk-accent)]/55 hover:bg-[var(--tk-raised)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--tk-accent-soft)] text-[var(--tk-accent)]">
          <Globe className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-[var(--tk-line)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--tk-muted)]">Resource {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mt-7 min-w-0">
        <h2 className="editable-display text-3xl font-normal leading-[1.05] text-[var(--slot4-page-text)]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
        {website ? <p className="mt-4 truncate text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tk-accent)]">{cleanDomain(website)}</p> : null}
      </div>
    </Link>
  )
}

function IdentityArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group flex flex-col items-center rounded-xl border border-[var(--tk-line)] bg-[var(--tk-surface)] p-7 text-center transition duration-500 hover:-translate-y-1 hover:border-[var(--tk-accent)]/55">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--tk-line)] bg-[var(--tk-raised)]">
        <UserRound className="h-10 w-10 text-[var(--tk-muted)]" />
      </div>
      <h2 className="editable-display mt-5 text-xl font-normal">{post.title}</h2>
      {role ? <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--tk-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[var(--tk-muted)]">{getSummary(post)}</p>
    </Link>
  )
}
