// After `astro build`: every root-relative link in dist/ must carry the base path and resolve
// to a real file. Catches template links that bypass withBase() (they work on localhost /
// and 404 on GitHub Pages under /investigations/).
//   node scripts/check-links.mjs [dist] [/investigations]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = process.argv[2] ?? 'dist'
const BASE = (process.argv[3] ?? process.env.PUBLIC_BASE_PATH ?? '/investigations').replace(/\/+$/, '')

const files = []
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f)
  statSync(p).isDirectory() ? walk(p) : /\.(html|css|xml|webmanifest)$/.test(f) && files.push(p)
})
walk(DIST)

const RE = /(?:href|src|content)="(\/[^"#?]*)|url\(\s*['"]?(\/[^'")#?]*)/g
const bad = new Map()
let checked = 0
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  for (const m of text.matchAll(RE)) {
    const url = m[1] ?? m[2]
    if (url.startsWith('//')) continue
    checked++
    let problem = ''
    if (BASE && url !== BASE && !url.startsWith(BASE + '/')) problem = 'no base path'
    else {
      const rel = decodeURIComponent(url.slice(BASE.length)) || '/'
      const p = join(DIST, rel)
      const ok = existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')))
      if (!ok && !existsSync(p + '.html')) problem = 'missing'
    }
    if (problem) bad.set(`${url} (${problem})`, (bad.get(`${url} (${problem})`) ?? new Set()).add(f.slice(DIST.length + 1)))
  }
}
console.log(`checked ${checked} links in ${files.length} files`)
if (bad.size) {
  for (const [k, v] of bad) console.log(`BROKEN ${k}  ← ${[...v].slice(0, 3).join(', ')}${v.size > 3 ? ' …' : ''}`)
  process.exit(1)
}
console.log('all internal links ok')
