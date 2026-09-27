import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import PrintButton from '@/components/PrintButton'
import { certifications, company, education, experience, profile, skills } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Résumé',
  description: profile.resumeSummary,
  alternates: { canonical: '/resume' },
  openGraph: {
    title: `${profile.name} — Résumé`,
    description: profile.resumeSummary,
    url: `${profile.site}/resume`,
    type: 'profile',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${profile.name}: ${profile.headline}` }],
  },
}

function Section({ title, children }: { title: string, children: ReactNode }) {
  return (
    <section className="mt-10 break-inside-avoid">
      <h2 className="border-line text-accent-text border-b pb-2 text-xs font-semibold tracking-wider uppercase">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function Resume() {
  const [current, ...earlier] = experience
  const contacts = [
    { href: profile.site, label: 'amaanabbasi.me' },
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: profile.links.linkedin, label: 'linkedin.com/in/amaanabbasi' },
    { href: profile.links.github, label: 'github.com/amaanabbasi' },
  ]

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 print:max-w-none print:p-0">
      <div className="mb-8 flex items-center justify-between print:hidden">
        <a href="/" className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors">
          <FiArrowLeft className="size-4" aria-hidden />
          amaanabbasi.me
        </a>
        <PrintButton />
      </div>

      <article className="border-line bg-surface border rounded-2xl p-7 print:border-0 print:p-0 sm:p-12">
        <header>
          <h1 className="text-ink text-4xl tracking-tight font-serif sm:text-5xl">{profile.name}</h1>
          <p className="text-muted mt-2 text-lg">{profile.headline}</p>
          <ul className="text-muted mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {contacts.map(item => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-ink underline-offset-2 hover:underline">{item.label}</a>
              </li>
            ))}
          </ul>
        </header>

        <Section title="Summary">
          <p className="text-ink/90 text-[15px] leading-relaxed">{profile.resumeSummary}</p>
        </Section>

        <Section title="Experience">
          <div className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-ink text-lg font-medium">
                {current.role}
                <span className="text-muted font-normal">
                  {' · '}
                  {current.company}
                </span>
              </h3>
              <p className="text-muted text-sm">{current.period}</p>
            </div>
            <ul className="text-ink/90 marker:text-muted mt-3 list-disc pl-5 text-[15px] leading-relaxed space-y-1.5">
              {(current.points ?? []).map(point => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <ul className="mt-6 space-y-2">
            {earlier.map(job => (
              <li key={`${job.company}-${job.role}`} className="flex flex-wrap items-baseline justify-between gap-x-4 text-[15px]">
                <span className="text-ink">
                  {job.role}
                  <span className="text-muted">
                    {' · '}
                    {job.company}
                  </span>
                </span>
                <span className="text-muted text-sm">{job.period}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="text-[15px] space-y-2">
            {education.map(item => (
              <li key={item.school} className="text-ink">
                {item.degree}
                <span className="text-muted">
                  {' · '}
                  {item.school}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Certification">
          <ul className="text-ink text-[15px] space-y-2">
            {certifications.map(name => <li key={name}>{name}</li>)}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[140px_1fr]">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="contents">
                <dt className="text-muted">{group}</dt>
                <dd className="text-ink">{items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <p className="text-muted mt-10 text-xs print:hidden">
          Currently at
          {' '}
          {company}
          . More at
          {' '}
          <a href="/" className="hover:text-ink underline underline-offset-2">amaanabbasi.me</a>
          .
        </p>
      </article>
    </main>
  )
}
