# We Watch

Сайт розслідувань: https://activeorgua-bit.github.io/investigations/

Кожна стаття — тека `src/content/blog/<slug>/` з `index.md` і зображеннями. Статті сюди публікує
[Ghost](https://ghost.trustno.one) кнопкою «Опублікувати на сайті» (етап «Стаття → Публікація»):
він збирає текст із виносками на першоджерела, знімки графіків, робить коміт від `activeorgua-bit` і
пушить у `main`. GitHub Actions (`.github/workflows/deploy.yml`) збирає статичний сайт і викладає на Pages.

## Локально

```bash
npm ci
npm run dev      # http://localhost:1234/investigations/
npm run build    # dist/
```

`PUBLIC_SITE_URL` задає домен (у CI — `https://activeorgua-bit.github.io`), `PUBLIC_BASE_PATH` — префікс
шляху (типово `/investigations`; для власного домену — `/`). Логотип і картка для соцмереж генеруються
`node scripts/brand.mjs`.

## Формат статті

```md
---
title: 'Заголовок'
description: 'Лід для картки й соцмереж'
date: 2026-10-05T12:00:00+03:00
image: ./01.png          # обкладинка (необов'язково)
authors: ['wewatch']
---

Текст із виносками[^1].

![Підпис графіка](./01.png)

[^1]: Назва джерела — <https://…>
```

## Ліцензія

Дизайн — шаблон [ascii-astro-erudite](https://github.com/Ducksss/ascii-astro-erudite) (MIT, © Chai Pin Zheng),
адаптований під розслідування. Тексти статей — © We Watch.
