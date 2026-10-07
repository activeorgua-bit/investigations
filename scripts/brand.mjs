// Regenerates the site's logo, favicons and social card from SVG.
//   node scripts/brand.mjs
// Outputs go to public/ and are committed (GitHub Pages serves them as-is).
import { writeFileSync } from 'node:fs'
import sharp from 'sharp'

const MONO = "'Consolas','DejaVu Sans Mono','Courier New',monospace"
const SANS = "'Segoe UI','Arial','DejaVu Sans',sans-serif"

const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#050505"/>
  <rect x="3.5" y="3.5" width="57" height="57" rx="11" fill="none" stroke="#ffffff" stroke-opacity="0.18"/>
  <path d="M10 32 C18 20 46 20 54 32 C46 44 18 44 10 32 Z" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="7.5" fill="#ffffff"/>
  <circle cx="34.5" cy="29.5" r="2.2" fill="#050505"/>
</svg>`

// the ASCII field of the landing page, reduced to a deterministic glyph grid
function asciiField(w, h, step = 22) {
  const glyphs = ['.', ':', '·', '-', '+', '=', '*', '#', '/', '\\']
  let s = '', seed = 7
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  for (let y = step; y < h; y += step) {
    for (let x = step / 2; x < w; x += step * 0.62) {
      const d = Math.hypot(x - w * 0.82, y - h * 0.32) / w
      const p = Math.max(0, 0.95 - d * 1.9)
      if (rnd() > p) continue
      const g = glyphs[Math.min(glyphs.length - 1, Math.floor(rnd() * p * glyphs.length * 1.4))]
      s += `<text x="${x.toFixed(1)}" y="${y}" fill-opacity="${(0.08 + p * 0.38).toFixed(2)}">${g === '\\' ? '\\' : g}</text>`
    }
  }
  return `<g font-family="${MONO}" font-size="16" fill="#ffffff">${s}</g>`
}

const card = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#050505"/>
  ${asciiField(w, h)}
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#fade)"/>
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#050505" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#050505" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#050505" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <text x="72" y="104" font-family="${MONO}" font-size="20" letter-spacing="6" fill="#ffffff" fill-opacity="0.5">РОЗСЛІДУВАННЯ НА ОСНОВІ ВІДКРИТИХ ДАНИХ</text>
  <g font-family="${SANS}" font-weight="700" fill="#ffffff" letter-spacing="-4">
    <text x="62" y="250" font-size="142" fill-opacity="0.4">PEOPLE</text>
    <text x="62" y="384" font-size="142" fill-opacity="0.4">ARE</text>
    <text x="62" y="518" font-size="142">WATCHING</text>
  </g>
  <text x="72" y="${h - 62}" font-family="${MONO}" font-size="20" letter-spacing="3" fill="#ffffff" fill-opacity="0.42">кожне число — з документа · посилання на першоджерела</text>
</svg>`

const png = (svg, out, size) =>
  sharp(Buffer.from(svg)).resize(size?.[0], size?.[1]).png().toFile(out)

// ICO = header + one entry + embedded PNG (supported by every current browser)
async function ico(svg, out, size = 48) {
  const data = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
  const head = Buffer.alloc(22)
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4)
  head.writeUInt8(size, 6); head.writeUInt8(size, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9)
  head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12)
  head.writeUInt32LE(data.length, 14); head.writeUInt32LE(22, 18)
  writeFileSync(out, Buffer.concat([head, data]))
}

writeFileSync('public/favicon.svg', mark(64).trim())
writeFileSync('public/static/logo.svg', mark(256).trim())
writeFileSync('public/static/brand-card.svg', card(1200, 630).trim())
await Promise.all([
  png(mark(512), 'public/static/logo.png', [256, 256]),
  png(mark(512), 'public/favicon-96x96.png', [96, 96]),
  png(mark(512), 'public/apple-touch-icon.png', [180, 180]),
  png(mark(512), 'public/web-app-manifest-192x192.png', [192, 192]),
  png(mark(512), 'public/web-app-manifest-512x512.png', [512, 512]),
  png(card(1200, 630), 'public/static/1200x630.png'),
  png(card(1200, 630), 'public/static/twitter-card.png'),
  ico(mark(256), 'public/favicon.ico'),
])
console.log('brand assets written')
