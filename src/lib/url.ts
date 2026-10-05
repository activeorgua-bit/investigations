// The site is served from a GitHub Pages project path (/investigations/), so every
// root-relative link has to carry Astro's `base`. The template hardcodes links like
// '/blog' in many places; they all go through this helper instead.
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')

export function withBase(href: string): string
export function withBase(href: string | undefined): string | undefined
export function withBase(href: string | undefined) {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return href
  if (BASE && (href === BASE || href.startsWith(`${BASE}/`))) return href
  return `${BASE}${href}`
}
