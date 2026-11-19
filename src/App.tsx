import { useCallback, useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  EarnIcon,
  InfoIcon,
  LaptopIcon,
  LearningIcon,
  LogoMark,
  MenuIcon,
  MoonIcon,
  PlayIcon,
  ShieldIcon,
} from './components/Icons'
import { TextureOverlay } from './components/TextureOverlay'

type Theme = 'light' | 'dark'
type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms'
type Role = 'student' | 'agent'
type FormStatus = 'idle' | 'pending' | 'success' | 'error'

type Course = {
  id: string
  title: string
  topics: string
  lessons: number
  image: string
  alt: string
}

const courses: Course[] = [
  {
    id: 'web',
    title: 'Web Development',
    topics: 'HTML · CSS · JavaScript · React',
    lessons: 24,
    image: '/images/course-web-development.jpg',
    alt: 'Code on a monitor',
  },
  {
    id: 'python',
    title: 'Python Programming',
    topics: 'Syntax · Functions · Projects · Automation',
    lessons: 18,
    image: '/images/course-python.jpg',
    alt: 'Python code on screen',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    topics: 'Figma · Wireframes · Prototyping · Principles',
    lessons: 15,
    image: '/images/course-ui-ux.jpg',
    alt: 'Designer reviewing a UI on screen',
  },
]

const agentSteps = [
  {
    title: 'Register your laptop and set your location',
    body: 'Add your device details and pin your usual spot on campus. Students nearby will find you.',
  },
  {
    title: 'Toggle availability when you are free',
    body: 'Go live or offline with one tap. You are only shown to students when you choose to be.',
  },
  {
    title: 'Accept bookings and earn per session',
    body: 'Confirm a student request, show up, and get paid automatically after the session ends.',
  },
]

const studentSteps = [
  {
    title: 'Create an account with your university email',
    body: 'Sign up using your university email. Your identity is verified before you can book.',
  },
  {
    title: 'Find a verified agent near you on campus',
    body: 'Browse agents sorted by distance, rating, and price — all within your campus.',
  },
  {
    title: 'Pay securely in-app and show up to learn',
    body: 'Complete payment via Paystack, then meet your agent at the agreed spot and get to work.',
  },
]

const agentBenefits = [
  'Earn per session — automatic payout after each booking',
  'Set your own hours, go live only when you want',
  'Keep 87% of every booking, every time',
  'Help your campus community build real skills',
]

const studentBenefits = [
  'Affordable access from 500 NGN per 1.5-hour session',
  'Verified agents only — no unverified strangers',
  'Structured learning included in every session',
  'Pay securely in-app via Paystack, no cash',
]

const reasons = [
  {
    title: 'Affordable Access',
    body: 'Sessions from 500 NGN per 1.5 hours — more affordable than any cyber cafe near campus.',
    icon: ClockIcon,
  },
  {
    title: 'Safe and Verified',
    body: 'Every user verified with their university email and student ID before they can participate.',
    icon: ShieldIcon,
  },
  {
    title: 'Earn From Your Laptop',
    body: 'Agents keep 87% of every booking. A spare device becomes a real income stream on campus.',
    icon: EarnIcon,
  },
  {
    title: 'Structured Learning',
    body: 'Curated YouTube courses, learning roadmaps, and quizzes — built into every session by default.',
    icon: LearningIcon,
  },
]

const paymentPoints = [
  'Payments processed securely via Paystack',
  'No cash. No bank transfers. No disputes.',
  'Agents are paid automatically after each session',
  'All amounts shown in Nigerian Naira (NGN)',
]

const launchFacts = [
  ['Now', 'Pre-registrations open'],
  ['Q2 2027', 'Target launch'],
  ['3 campuses', 'Universities at launch'],
  ['Limited', 'Agent slots available'],
]

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [page, setPage] = useState<Page>('home')
  const [role, setRole] = useState<Role>('student')
  const [menuOpen, setMenuOpen] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('lapshare-theme', theme)
  }, [theme])

  const closeCourse = useCallback(() => setCourse(null), [])

  function showPage(next: Page) {
    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }

  function goToSection(id: string) {
    setPage('home')
    setMenuOpen(false)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  function openWaitlist(next: Role) {
    setRole(next)
    setPage('home')
    setMenuOpen(false)
    window.setTimeout(() => {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.getElementById('university-email')?.focus()
    }, 60)
  }

  return (
    <div className="relative min-h-screen bg-[var(--page)] text-[var(--text)]">
      <TextureOverlay />
      <Header
        theme={theme}
        menuOpen={menuOpen}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={showPage}
        onSection={goToSection}
        onWaitlist={openWaitlist}
        page={page}
      />
      <main>
        {page === 'home' ? (
          <Home role={role} onRole={setRole} onWaitlist={openWaitlist} onCourse={setCourse} onPage={showPage} />
        ) : (
          <InfoPage page={page} onPage={showPage} onWaitlist={openWaitlist} />
        )}
      </main>
      <Footer onPage={showPage} onSection={goToSection} onWaitlist={openWaitlist} />
      {course ? <CourseDialog course={course} onClose={closeCourse} onWaitlist={openWaitlist} /> : null}
    </div>
  )
}

function Wordmark() {
  return (
    <span className="flex items-center gap-[11px]">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="text-[24px] leading-none font-black tracking-[-0.04em]">
        <span className="text-[var(--text)]">Lap</span>
        <span className="text-primary">share</span>
      </span>
    </span>
  )
}

function Header({
  theme,
  menuOpen,
  page,
  onToggleTheme,
  onToggleMenu,
  onNavigate,
  onSection,
  onWaitlist,
}: {
  theme: Theme
  menuOpen: boolean
  page: Page
  onToggleTheme: () => void
  onToggleMenu: () => void
  onNavigate: (page: Page) => void
  onSection: (id: string) => void
  onWaitlist: (role: Role) => void
}) {
  const links = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'For Agents', href: '#roles' },
    { label: 'Courses', href: '#courses' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--nav)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        <button type="button" onClick={() => onNavigate('home')} className="rounded-lg" aria-label="Lapshare home">
          <Wordmark />
        </button>
        {page === 'home' ? (
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Page">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-[var(--text)] transition-opacity hover:opacity-60">
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Page">
            {links.map((link) => (
                <button key={link.href} type="button" onClick={() => onSection(link.href.slice(1))} className="text-sm font-medium transition-opacity hover:opacity-60">
                {link.label}
              </button>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--card)] text-[var(--text)] transition-opacity hover:opacity-70"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <EarnIcon className="h-[18px] w-[18px]" /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={() => onWaitlist('agent')}
            className="hidden rounded-lg border border-[var(--line)] bg-[var(--card)]/60 px-5 py-2.5 text-sm font-semibold text-[var(--text)] transition-all hover:bg-[var(--card)] hover:border-[var(--text)]/30 sm:block"
          >
            Become an Agent
          </button>
          <button
            type="button"
            onClick={() => onWaitlist('student')}
            className="group relative overflow-hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] sm:px-5"
          >
            <span className="button-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
            <span className="relative z-10">Join Waitlist</span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={onToggleMenu}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-[var(--line)] bg-[var(--page)] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) =>
              page === 'home' ? (
                <a key={link.href} href={link.href} onClick={onToggleMenu} className="rounded-lg px-2 py-3 text-base font-semibold">
                  {link.label}
                </a>
              ) : (
                <button key={link.href} type="button" onClick={() => onSection(link.href.slice(1))} className="rounded-lg px-2 py-3 text-left text-base font-semibold">
                  {link.label}
                </button>
              ),
            )}
            <button type="button" onClick={() => onWaitlist('agent')} className="mt-2 rounded-lg border border-[var(--text)] px-4 py-3 text-left text-sm font-semibold">
              Become an Agent
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Home({
  role,
  onRole,
  onWaitlist,
  onCourse,
  onPage,
}: {
  role: Role
  onRole: (role: Role) => void
  onWaitlist: (role: Role) => void
  onCourse: (course: Course) => void
  onPage: (page: Page) => void
}) {
  return (
    <>
      <section className="hero-surface relative overflow-hidden bg-[var(--page)] pt-12 lg:pt-16">
        {/* Stripe Aurora Mesh Gradient Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[650px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-[120px]" aria-hidden="true">
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-amber-400/25 mix-blend-multiply dark:bg-[#f5c518]/15 dark:mix-blend-screen" />
          <div className="absolute top-12 right-1/4 h-96 w-96 rounded-full bg-indigo-500/15 mix-blend-multiply dark:bg-indigo-500/18 dark:mix-blend-screen" />
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-400/12 mix-blend-multiply dark:bg-rose-500/10 dark:mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1440px] items-end gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="pb-4 lg:pb-20">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--card)]/80 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-[var(--text)] uppercase stripe-glass-card">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span>Launching soon — Campus Beta 2027</span>
            </div>
            <h1 className="mb-6 max-w-[640px] text-[42px] leading-[1.05] font-black tracking-[-0.035em] sm:text-[56px] lg:text-[70px]">
              Borrow a Laptop.
              <br />
              <span className="stripe-gradient-text">Learn a Skill.</span>
            </h1>
            <p className="mb-10 max-w-[500px] text-base leading-[1.7] text-[var(--body)] sm:text-lg">
              Lapshare connects students who need a PC with students who have one to spare — right on your campus. Book a session, access structured courses, and build real skills.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#waitlist"
                onClick={() => onRole('student')}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[12px] bg-primary px-7 py-4 text-base font-bold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="button-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
                <span>Join the Waitlist</span>
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => onWaitlist('agent')}
                className="rounded-[12px] border border-[var(--line)] bg-[var(--card)]/60 px-7 py-4 text-base font-bold text-[var(--text)] backdrop-blur-sm transition-all duration-200 hover:bg-[var(--card)] hover:border-[var(--text)]/40 hover:scale-[1.01] active:scale-[0.99] shadow-sm"
              >
                Become an Agent
              </button>
            </div>
            <p className="mt-5 text-sm text-[var(--hero-note)]">Be among the first students on your campus when we launch.</p>
          </div>
          <div className="relative flex items-end justify-center">
            {/* Ambient glow behind hero mockup */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-primary/20 to-indigo-500/20 blur-2xl opacity-60" aria-hidden="true" />

            {/* Main Visual Frame */}
            <div className="stripe-glass-card stripe-interactive-card relative w-full overflow-hidden rounded-2xl p-2 sm:p-3">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase">
                  Verified Device Network · UNILAG
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  12 Active
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/hero-student.jpg"
                  alt="Student using a laptop on campus"
                  width={900}
                  height={1000}
                  className="h-[360px] w-full object-cover object-top sm:h-[460px] lg:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

                {/* Floating Top-Right Agent Verification Chip */}
                <div className="stripe-glass-card absolute top-4 right-4 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-[var(--text)] shadow-lg backdrop-blur-md">
                  <ShieldIcon className="h-3.5 w-3.5 text-emerald-500" />
                  <span>ID & Email Verified</span>
                </div>

                {/* Bottom Floating Interactive Booking Widget */}
                <div className="stripe-glass-card absolute bottom-4 left-3 right-3 sm:left-5 sm:right-5 flex flex-col gap-3 rounded-xl p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-ink shadow-sm">
                        <LaptopIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="block text-sm font-bold text-[var(--text)]">MacBook Air M2 · 16GB RAM</span>
                        <span className="block text-xs text-[var(--muted)]">Chukwuemeka O. · Faculty of Engineering</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-extrabold text-primary">₦500</span>
                      <span className="block text-[10px] text-[var(--muted)]">per 1.5 hrs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--line)] pt-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Available for booking
                    </span>
                    <span className="font-medium text-[var(--body)]">
                      Instant split via Paystack
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="launch-band bg-ink py-5 text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-5 md:px-8 lg:flex lg:items-center lg:justify-center lg:gap-16 lg:px-12">
          {launchFacts.map(([value, label]) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="text-lg font-black text-primary sm:text-xl">{value}</span>
              <span className="mt-0.5 text-xs font-medium text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="how-it-works" className="scroll-mt-24 bg-[var(--page)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="mb-14 max-w-xl">
            <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">How it works</p>
            <h2 className="mb-4 text-[34px] leading-[1.1] font-black tracking-[-0.03em] sm:text-[44px]">Simple by design.</h2>
            <p className="text-lg leading-7 text-[var(--body)]">Whether you own a laptop or need one, getting started takes minutes.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <StepCard
              kicker="For Agents"
              title="For Agents — Laptop Owners"
              steps={agentSteps}
              tone="agent"
            />
            <StepCard
              kicker="For Students"
              title="For Students — Borrowers"
              steps={studentSteps}
              tone="student"
            />
          </div>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 bg-[var(--page-alt)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Two roles</p>
            <h2 className="mb-4 text-[34px] leading-[1.1] font-black tracking-[-0.03em] sm:text-[44px]">One platform. Two ways in.</h2>
            <p className="text-lg leading-7 text-[var(--body)]">Choose your role at registration. Everything on Lapshare is built around it.</p>
          </div>
          <div className="mb-6 grid gap-8 lg:grid-cols-2">
            <RoleCard
              image="/images/agent-laptop.jpg"
              alt="A student agent with their laptop"
              kicker="For Agents"
              title={
                <>
                  Own a laptop?
                  <br />
                  Earn from it.
                </>
              }
              items={agentBenefits}
              action="Pre-register as an Agent"
              tone="agent"
              onAction={() => onWaitlist('agent')}
            />
            <RoleCard
              image="/images/students-studying.jpg"
              alt="Students studying together at the library"
              kicker="For Students"
              title={
                <>
                  Need a laptop?
                  <br />
                  Book one.
                </>
              }
              items={studentBenefits}
              action="Join as a Student"
              tone="student"
              onAction={() => onWaitlist('student')}
            />
          </div>
          <div className="flex items-start gap-3.5 rounded-xl border border-[var(--line)] bg-[var(--card)] px-6 py-4">
            <InfoIcon className="mt-0.5 shrink-0 text-primary" />
            <p className="text-sm leading-5 text-[var(--body)]">
              <strong className="font-bold text-[var(--text)]">Important:</strong> Each account is either an Agent or a Student. Roles are fixed at registration and cannot be changed later.
            </p>
          </div>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24 bg-[var(--page)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="mb-14 grid items-start gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Courses</p>
              <h2 className="mb-4 text-[34px] leading-[1.1] font-black tracking-[-0.03em] sm:text-[44px]">Learn While You Borrow</h2>
              <p className="text-lg leading-[1.7] text-[var(--body)]">Every session comes with access to structured learning tracks — built for complete beginners.</p>
            </div>
            <div className="stripe-glass-card stripe-interactive-card rounded-2xl px-7 py-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-ink">
                  <PlayIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="mb-2 text-base font-bold">How Lapshare Courses Work</h3>
                  <p className="text-sm leading-6 text-[var(--body)]">
                    Our courses are hand-selected, organised YouTube lessons — not random playlists. Each track is curated by topic, sequenced for beginners, and plays directly inside the Lapshare app. No ads, no rabbit holes, no distractions. Just the right videos, in the right order.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((item) => (
              <article key={item.id} className="stripe-interactive-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
                <div className="relative h-[190px] overflow-hidden">
                  <img src={item.image} alt={item.alt} width={700} height={380} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm">
                    <PlayIcon className="h-7 w-7" />
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-md bg-ink/70 px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">YouTube curated</span>
                </div>
                <div className="px-[22px] pt-[22px] pb-[26px]">
                  <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
                  <p className="mb-3 text-sm text-[var(--body)]">{item.topics}</p>
                  <p className="mb-5 text-sm text-[var(--muted)]">{item.lessons} curated lessons · Plays in-app</p>
                  <button type="button" onClick={() => onCourse(item)} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text)] transition-opacity hover:opacity-70">
                    View Course
                    <ArrowRightIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[420px] overflow-hidden sm:h-[480px]" aria-label="Mission">
        <img src="/images/mission-group-study.jpg" alt="Group of students collaborating around a laptop" width={1200} height={600} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex items-center px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[13px] font-bold tracking-[0.16em] text-primary uppercase">The mission</p>
            <p className="text-[28px] leading-[1.2] font-black text-white sm:text-4xl">“Every Nigerian student deserves access to a laptop and the skills to use it.”</p>
            <p className="mt-4 text-sm text-white/50">Lapshare — launching Q2 2027</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--page-alt)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Why Lapshare</p>
            <h2 className="mb-4 text-[34px] leading-[1.1] font-black tracking-[-0.03em] sm:text-[44px]">Built for the Nigerian campus.</h2>
            <p className="text-lg leading-7 text-[var(--body)]">Not a generic global product. Lapshare is designed around the specific realities of studying in Nigeria.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <article key={reason.title} className="stripe-glass-card stripe-interactive-card rounded-2xl px-7 py-8">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--card-muted)] text-primary">
                  <reason.icon />
                </span>
                <h3 className="mb-2 text-base font-bold">{reason.title}</h3>
                <p className="text-sm leading-[1.65] text-[var(--body)]">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-[var(--page)] py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Pricing</p>
            <h2 className="mb-4 text-[34px] leading-[1.1] font-black tracking-[-0.03em] sm:text-[44px]">How payments work.</h2>
            <p className="mb-8 text-lg leading-[1.7] text-[var(--body)]">Simple, transparent, and automatic. When a student pays, the money is split instantly — no chasing, no transfers.</p>
            <ul className="flex flex-col gap-3">
              {paymentPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-[var(--body)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="stripe-glass-card stripe-interactive-card rounded-[20px] p-8 sm:p-10">
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--muted)] uppercase">Per 1.5-hour session</p>
            <p className="mt-3 text-6xl font-black tracking-[-0.04em]">₦500</p>
            <p className="mt-1 text-sm text-[var(--body)]">student pays</p>
            <div className="mt-8 flex h-3 overflow-hidden rounded-full bg-[var(--line)]" aria-hidden="true">
              <div className="h-full w-[87%] bg-primary" />
              <div className="h-full w-[13%] bg-ink/25" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--body)]">Agent earns</p>
                <p className="text-2xl font-black">87%</p>
                <p className="text-sm font-semibold text-[var(--text)]">₦437</p>
              </div>
              <div>
                <p className="text-sm text-[var(--body)]">Lapshare platform fee</p>
                <p className="text-2xl font-black">13%</p>
                <p className="text-sm font-semibold text-[var(--text)]">₦63</p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-6 text-[var(--muted)]">Payments are processed securely in-app via Paystack. No cash. No transfers. Funds are automatically split at the point of payment.</p>
          </div>
        </div>
      </section>

      <Waitlist role={role} onRole={onRole} onPrivacy={() => onPage('privacy')} />
    </>
  )
}

function StepCard({
  kicker,
  title,
  steps,
  tone,
}: {
  kicker: string
  title: string
  steps: { title: string; body: string }[]
  tone: 'agent' | 'student'
}) {
  const agent = tone === 'agent'
  return (
    <article
      className="stripe-interactive-card rounded-[20px] px-7 py-9 sm:px-10 sm:py-11"
      style={{
        background: agent ? 'var(--agent-card)' : 'var(--student-card)',
        color: agent ? 'var(--on-agent)' : 'var(--text)',
        border: agent ? '1px solid transparent' : '1px solid var(--line)',
      }}
    >
      <span className={`mb-5 inline-flex rounded-md px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase ${agent ? 'bg-primary text-ink' : 'bg-[var(--badge-student)] text-[var(--text)]'}`}>
        {kicker}
      </span>
      <h3 className="mb-8 text-[24px] font-bold sm:text-[28px]">{title}</h3>
      <ol className="flex flex-col gap-7">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] text-sm font-black"
              style={{
                background: agent ? '#F5C518' : 'var(--student-step)',
                color: agent ? '#1A1A2E' : 'var(--student-step-text)',
              }}
            >
              0{index + 1}
            </span>
            <span>
              <span className="block font-bold">{step.title}</span>
              <span className="mt-1 block text-sm leading-6" style={{ color: agent ? 'var(--on-agent-muted)' : 'var(--body)' }}>
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </article>
  )
}

function RoleCard({
  image,
  alt,
  kicker,
  title,
  items,
  action,
  tone,
  onAction,
}: {
  image: string
  alt: string
  kicker: string
  title: ReactNode
  items: string[]
  action: string
  tone: 'agent' | 'student'
  onAction: () => void
}) {
  const agent = tone === 'agent'
  return (
    <article className="stripe-interactive-card overflow-hidden rounded-[20px] border border-[var(--line)]">
      <div className="relative h-[280px] sm:h-[320px]">
        <img src={image} alt={alt} className="h-full w-full object-cover object-top" width={700} height={500} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span className={`absolute top-5 left-5 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase ${agent ? 'bg-primary text-ink' : 'bg-white text-ink'}`}>
          {kicker}
        </span>
      </div>
      <div className="px-7 pt-8 pb-9" style={{ background: agent ? 'var(--agent-card)' : 'var(--student-card)', color: agent ? 'var(--on-agent)' : 'var(--text)' }}>
        <h3 className="mb-5 text-[28px] leading-tight font-black">{title}</h3>
        <ul className="mb-8 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${agent ? 'bg-primary text-ink' : 'bg-ink text-white'}`}>
                <CheckIcon />
              </span>
              <span style={{ color: agent ? 'var(--on-agent-muted)' : 'var(--body)' }}>{item}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onAction}
          className={`inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-bold transition-[filter,opacity] ${agent ? 'bg-primary text-ink hover:brightness-95' : 'border border-[var(--text)] hover:opacity-70'}`}
        >
          {action}
          <ArrowRightIcon />
        </button>
      </div>
    </article>
  )
}

function Waitlist({ role, onRole, onPrivacy }: { role: Role; onRole: (role: Role) => void; onPrivacy: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const errorId = useId()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error')
      setMessage('Enter a valid email address.')
      return
    }

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()
    if (!formId) {
      setStatus('error')
      setMessage('Waitlist signups are not configured yet. Please try again later.')
      return
    }

    setStatus('pending')
    setMessage('')

    try {
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: value,
          role,
          _subject: 'New Lapshare waitlist signup',
        }),
      })

      if (!response.ok) {
        setStatus('error')
        setMessage('We could not submit your signup. Please try again in a moment.')
        return
      }

      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
      setMessage('Could not connect to the waitlist. Check your connection and try again.')
    }
  }

  return (
    <section id="waitlist" className="waitlist-surface relative scroll-mt-24 overflow-hidden bg-ink py-20 text-[#FFF8E7] lg:py-24">
      <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 -bottom-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[640px] px-5 text-center md:px-8">
        <p className="mb-4 text-sm font-bold tracking-[0.16em] text-primary uppercase">Early access</p>
        <h2 className="mb-5 text-[36px] leading-[1.15] font-black tracking-[-0.03em] text-white sm:text-[48px]">
          Be the first on
          <br />
          your campus.
        </h2>
        <p className="mb-10 text-lg leading-[1.7] text-white/55">
          Lapshare is not live yet. Join the waitlist and we will notify you the moment we launch on your campus. Agents who pre-register get priority placement.
        </p>
        {status === 'success' ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8" role="status">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-ink">
              <CheckIcon className="h-4 w-4" />
            </span>
            <p className="text-xl font-black text-white">You are on the list.</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Your {role === 'agent' ? 'Agent' : 'Student'} signup has been submitted. We will email you when Lapshare is ready to launch.
            </p>
            <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Add another email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <fieldset className="mb-4">
              <legend className="sr-only">Choose your role</legend>
              <div className="inline-flex gap-1 rounded-xl bg-white/[0.07] p-1" role="group" aria-label="Waitlist role">
                <RoleToggle pressed={role === 'student'} onClick={() => onRole('student')}>
                  I am a student
                </RoleToggle>
                <RoleToggle pressed={role === 'agent'} onClick={() => onRole('agent')}>
                  I am an agent
                </RoleToggle>
              </div>
            </fieldset>
            <label htmlFor="university-email" className="mb-2 block text-left text-sm font-semibold text-white/80">
              University email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="university-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                placeholder="Enter your university email"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? errorId : undefined}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                className="h-[52px] flex-1 rounded-[10px] border border-white/15 bg-white px-4 text-base text-ink outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                disabled={status === 'pending'}
                className="group relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-[10px] bg-primary px-6 text-sm font-bold text-ink transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]"
              >
                <span className="button-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
                <span className="relative z-10">{status === 'pending' ? 'Joining…' : 'Join Waitlist'}</span>
              </button>
            </div>
            {status === 'error' ? (
              <p id={errorId} className="mt-3 text-left text-sm text-[#FCA5A5]" role="alert">
                {message}
              </p>
            ) : null}
            <p className="mt-4 text-xs text-white/30">
              No spam. Your email and selected role are sent through Formspree to manage the waitlist. See our{' '}
              <button type="button" onClick={onPrivacy} className="underline underline-offset-2 hover:text-white/60">
                Privacy Policy
              </button>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

function RoleToggle({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${pressed ? 'bg-primary text-ink' : 'text-white/70 hover:text-white'}`}
    >
      {children}
    </button>
  )
}

function CourseDialog({ course, onClose, onWaitlist }: { course: Course; onClose: () => void; onWaitlist: (role: Role) => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-4 sm:items-center" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-title"
        className="w-full max-w-lg overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--card)] text-[var(--text)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={course.image} alt="" className="h-44 w-full object-cover" />
        <div className="p-6 sm:p-7">
          <p className="text-[11px] font-bold tracking-[0.14em] text-primary uppercase">YouTube curated · not live yet</p>
          <h2 id="course-title" className="mt-2 text-2xl font-black">
            {course.title}
          </h2>
          <p className="mt-2 text-sm text-[var(--body)]">{course.topics}</p>
          <p className="mt-4 text-sm leading-6 text-[var(--body)]">
            {course.lessons} lessons, organised by topic for beginners. They are curated YouTube videos planned to play inside the Lapshare app — Lapshare does not own the footage, and the player is not available until launch.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                onClose()
                onWaitlist('student')
              }}
              className="rounded-[10px] bg-primary px-5 py-3 text-sm font-bold text-ink"
            >
              Join as a Student
            </button>
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[var(--line)] px-5 py-3 text-sm font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer({
  onPage,
  onSection,
  onWaitlist,
}: {
  onPage: (page: Page) => void
  onSection: (id: string) => void
  onWaitlist: (role: Role) => void
}) {
  return (
    <footer className="bg-night py-16 text-white">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="mb-12 grid gap-10 md:grid-cols-3 md:gap-16">
          <div>
            <button type="button" onClick={() => onPage('home')} className="mb-4 rounded-lg" aria-label="Lapshare home">
              <span className="flex items-center gap-[11px]">
                <LogoMark className="h-10 w-10" />
                <span className="text-[24px] leading-none font-black tracking-[-0.04em]">
                  <span className="text-white">Lap</span>
                  <span className="text-primary">share</span>
                </span>
              </span>
            </button>
            <p className="text-sm leading-[1.65] text-white/40">Borrow a Laptop. Learn a Skill.</p>
            <p className="mt-2 text-xs text-white/20">A campus peer-to-peer platform for Nigerian students.</p>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-white/30 uppercase">Platform</p>
            <div className="flex flex-col items-start gap-3 text-sm text-white/70">
              <button type="button" onClick={() => onSection('how-it-works')} className="hover:text-white">
                How it Works
              </button>
              <button type="button" onClick={() => onSection('courses')} className="hover:text-white">
                Courses
              </button>
              <button type="button" onClick={() => onWaitlist('agent')} className="hover:text-white">
                Become an Agent
              </button>
              <button type="button" onClick={() => onSection('pricing')} className="hover:text-white">
                Pricing
              </button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-white/30 uppercase">Company</p>
            <div className="flex flex-col items-start gap-3 text-sm text-white/70">
              <button type="button" onClick={() => onPage('about')} className="hover:text-white">
                About Us
              </button>
              <button type="button" onClick={() => onPage('contact')} className="hover:text-white">
                Contact
              </button>
              <button type="button" onClick={() => onPage('privacy')} className="hover:text-white">
                Privacy Policy
              </button>
              <button type="button" onClick={() => onPage('terms')} className="hover:text-white">
                Terms of Use
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>2027 Lapshare. All rights reserved.</p>
          <p>Made for Nigerian students.</p>
        </div>
      </div>
    </footer>
  )
}

function InfoPage({ page, onPage, onWaitlist }: { page: Exclude<Page, 'home'>; onPage: (page: Page) => void; onWaitlist: (role: Role) => void }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 lg:py-24">
      <button type="button" onClick={() => onPage('home')} className="mb-8 text-sm font-semibold text-[var(--body)] hover:text-[var(--text)]">
        ← Back to Lapshare
      </button>
      {page === 'about' ? <About /> : null}
      {page === 'contact' ? <Contact /> : null}
      {page === 'privacy' ? <Privacy /> : null}
      {page === 'terms' ? <Terms /> : null}
      <button type="button" onClick={() => onWaitlist('student')} className="mt-10 rounded-[10px] bg-primary px-6 py-3 text-sm font-bold text-ink">
        Join the Waitlist
      </button>
    </article>
  )
}

function About() {
  return (
    <>
      <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">About</p>
      <h1 className="mb-6 text-4xl font-black tracking-[-0.03em] sm:text-5xl">A campus tool, still being built.</h1>
      <div className="space-y-4 text-base leading-7 text-[var(--body)]">
        <p>Lapshare is a planned peer-to-peer platform for Nigerian university students. Students who need a computer will be able to book a session with a student who has a laptop to spare, then follow a structured learning track during that time.</p>
        <p>The product is not live. There are no active bookings, payouts, or verified campuses yet. This site collects waitlist interest so we can tell you when a campus launch is actually ready.</p>
        <p>Agents and Students are separate accounts. The role is chosen at registration and stays fixed, so the product can stay clear about who is lending a device and who is learning on it.</p>
      </div>
    </>
  )
}

function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [note, setNote] = useState({ name: '', email: '', message: '' })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(note.email.trim()) || note.message.trim().length < 8 || note.name.trim().length < 2) {
      setStatus('error')
      return
    }
    setStatus('pending')
    window.setTimeout(() => {
      sessionStorage.setItem('lapshare-contact', JSON.stringify({ ...note, at: Date.now() }))
      setStatus('success')
    }, 400)
  }

  if (status === 'success') {
    return (
      <div role="status">
        <h1 className="mb-4 text-4xl font-black">Message noted.</h1>
        <p className="text-[var(--body)]">This preview keeps your note in this browser. A public inbox is not connected yet, so nobody on the Lapshare team will see it until that is built.</p>
      </div>
    )
  }

  return (
    <>
      <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Contact</p>
      <h1 className="mb-4 text-4xl font-black tracking-[-0.03em]">Talk to us.</h1>
      <p className="mb-8 text-[var(--body)]">Questions about the waitlist or a campus launch. This form is a local preview and does not send email yet.</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="Name" id="contact-name">
          <input id="contact-name" value={note.name} onChange={(event) => setNote({ ...note, name: event.target.value })} className={fieldClass} required />
        </Field>
        <Field label="Email" id="contact-email">
          <input id="contact-email" type="email" value={note.email} onChange={(event) => setNote({ ...note, email: event.target.value })} className={fieldClass} required />
        </Field>
        <Field label="Message" id="contact-message">
          <textarea id="contact-message" rows={5} value={note.message} onChange={(event) => setNote({ ...note, message: event.target.value })} className={fieldClass} required />
        </Field>
        {status === 'error' ? (
          <p className="text-sm text-red-600" role="alert">
            Add your name, a valid email, and a short message.
          </p>
        ) : null}
        <button type="submit" disabled={status === 'pending'} className="h-12 rounded-[10px] bg-primary text-sm font-bold text-ink disabled:opacity-70">
          {status === 'pending' ? 'Saving…' : 'Send message'}
        </button>
      </form>
    </>
  )
}

const fieldClass = 'w-full rounded-[10px] border border-[var(--line)] bg-[var(--input)] px-4 py-3 text-[var(--text)] outline-none'

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
      <span className="mt-2 block font-normal">{children}</span>
    </label>
  )
}

function Privacy() {
  return (
    <>
      <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Privacy</p>
      <h1 className="mb-6 text-4xl font-black tracking-[-0.03em]">Privacy Policy</h1>
      <div className="space-y-4 text-base leading-7 text-[var(--body)]">
        <p>When you join the waitlist, this site sends your email address and selected role (Student or Agent) to Formspree on Lapshare's behalf so we can manage pre-launch interest and contact you about the launch. Formspree processes this information under its <a className="underline" href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.</p>
        <p>The contact form on this preview stores its contents in your browser session only; it is not sent to Lapshare. Do not submit sensitive information through either form.</p>
        <p>When the product launches, accounts are planned to use a university email and student ID so both Agents and Students can be verified before a booking. Payment details are planned to be handled by Paystack, not stored as raw card data by Lapshare.</p>
        <p>This notice covers the pre-launch waitlist. We will update it before collecting information for product accounts.</p>
      </div>
    </>
  )
}

function Terms() {
  return (
    <>
      <p className="mb-3 text-sm font-bold tracking-[0.16em] text-primary uppercase">Terms</p>
      <h1 className="mb-6 text-4xl font-black tracking-[-0.03em]">Terms of Use</h1>
      <div className="space-y-4 text-base leading-7 text-[var(--body)]">
        <p>Lapshare is not open for bookings. Nothing on this page is an offer to rent a device, process a payment, or guarantee a campus launch date.</p>
        <p>Planned session pricing is ₦500 for 1.5 hours, with 87% intended for the Agent and 13% as a platform fee. Those figures describe the product we are designing. They are not a live checkout.</p>
        <p>Course tracks are curated YouTube lessons. Lapshare does not claim ownership of that video content. Joining the waitlist does not create an Agent or Student account.</p>
      </div>
    </>
  )
}
