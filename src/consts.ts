import type {
  FooterContent,
  IconMap,
  LandingContent,
  Profile,
  SocialLink,
  Site,
} from '@/types'
import { resolveSiteUrl } from '@/lib/site-config'

const SITE_URL = resolveSiteUrl({
  ...process.env,
  ...(import.meta.env ?? {}),
})

const REPO = 'https://github.com/activeorgua-bit/investigations'

export const SITE: Site = {
  title: 'People are watching',
  description:
    'Розслідування на основі відкритих даних: кожне число — з факту, кожна цитата — з першоджерела, кожне джерело — з посиланням на документ.',
  href: SITE_URL,
  author: 'People are watching',
  locale: 'uk-UA',
  featuredPostCount: 3,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  { href: '/blog', label: 'розслідування' },
  // { href: '/tags', label: 'теми' },  // розділ «Теми» тимчасово прихований
  { href: '/about', label: 'метод' },
]

// The template's about page was a CV; ours is a methodology page that only
// reads `summary`, `about` and `links`. The remaining fields stay empty so the
// shared types keep compiling.
export const PROFILE: Profile = {
  summary:
    'Ми пишемо розслідування з документів, а не з переказів: реєстри, декларації, судові рішення, звіти, публікації самих фігурантів.',
  about: [
    'Кожне твердження в тексті спирається на факт із джерела. Число в статті — лише те, що є в процитованому документі; цитата — дослівно, мовою оригіналу.',
    'Виноски ведуть на першоджерела. Згенеровані довідки, досьє й огляди не є джерелами: якщо факт узято з них, у виносці стоїть документ, на який вони посилаються.',
    'Підозра — не вина, обвинувачення — не вирок. Оцінки належать тим, хто їх висловив, і підписані їхніми іменами.',
  ],
  links: [
    {
      href: REPO,
      label: 'GitHub',
      note: 'Код сайту й історія кожної публікації.',
    },
    {
      href: '/rss.xml',
      label: 'RSS',
      note: 'Нові розслідування у вашому читачі.',
    },
  ],
  facts: [],
  metrics: [],
  hackathonStats: [],
  experience: [],
  education: [],
  awards: [],
  hackathonWins: [],
  initiatives: [],
  leadership: [],
  skills: [],
  certifications: [],
}

export const LANDING: LandingContent = {
  name: 'People are watching',
  monogram: '👁︎',
  eyebrow: 'Розслідування на основі відкритих даних',
  description: SITE.description,
  manifesto:
    'Ми не переказуємо чужі висновки. Ми відкриваємо реєстри, декларації й судові рішення — і показуємо, звідки взялося кожне число.',
  featuredWorkTitle: '',
  featuredWorkIntro: '',
  archiveTitle: 'Останні розслідування',
  archiveIntro:
    'Кожне джерело в тексті — з посиланням на першоджерело. Відкрийте будь-яке й перевірте самі.',
  primaryLink: {
    href: '/blog',
    label: 'Читати розслідування',
    note: 'усі публікації',
  },
  secondaryLink: {
    href: '/about',
    label: 'Як ми працюємо',
    note: 'метод і джерела',
  },
  marqueeLines: [
    'Реєстри',
    'Декларації',
    'Судові рішення',
    'Звіти партій',
    'Телеграм-канали',
    'Першоджерела',
  ],
  capabilityLines: [
    { label: '01', title: 'Факти' },
    { label: '02', title: 'Джерела' },
    { label: '03', title: 'Зв’язки' },
  ],
}

const currentYear = new Date().getFullYear()

export const FOOTER: FooterContent = {
  eyebrow: 'People are watching',
  headline: 'Кожне число — з документа.',
  copy: PROFILE.summary,
  primaryContact: {
    href: REPO,
    label: 'github.com/activeorgua-bit/investigations',
  },
  baseLabel: 'Країна',
  baseValue: 'Україна',
  linksLabel: 'Посилання',
  contactLinks: [
    { href: '/blog', label: 'Розслідування' },
    { href: '/about', label: 'Метод' },
    { href: '/rss.xml', label: 'RSS' },
    { href: REPO, label: 'GitHub' },
  ],
  signature: `People are watching / ${currentYear}`,
}

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
