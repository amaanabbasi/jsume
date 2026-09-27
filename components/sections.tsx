import { FaXTwitter } from 'react-icons/fa6'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import Glyph from './Glyphs'
import { AskChatButton, CountUp, Reveal, SectionHeading } from './ui'
import { certifications, education, experience, focusAreas, profile, projects, skills, testimonials } from '@/data/profile'

export function Focus() {
  return (
    <section id="focus" className="mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="What I work on"
        title="AI that ships, stays up, and stays on budget."
        intro="Most AI prototypes stall on the same three things: reliability, integration and cost. Those are the parts I like best."
      />
      <div className="grid mt-14 gap-4 md:grid-cols-3">
        {focusAreas.map((area, index) => (
          <Reveal key={area.id} delay={index * 0.08} className="h-full">
            <article className="bg-surface border-line hover:border-muted/40 h-full flex flex-col border rounded-2xl p-6 transition-colors">
              <Glyph id={area.id} />
              <h3 className="text-ink mt-6 text-2xl font-serif">{area.title}</h3>
              <p className="text-muted mt-2 text-[15px] leading-relaxed">{area.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Systems that got faster, sturdier and cheaper."
      />
      <div className="border-line divide-line mt-14 border-y divide-y">
        {projects.map(project => (
          <Reveal key={project.slug}>
            <article className="grid gap-8 py-10 md:grid-cols-[1fr_200px] md:gap-14">
              <div>
                <h3 className="text-ink text-[28px] leading-tight font-serif sm:text-3xl">{project.title}</h3>
                <p className="text-muted mt-2 text-lg">{project.summary}</p>
                <div className="grid mt-6 gap-5 text-[15px] leading-relaxed sm:grid-cols-2">
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">Problem</p>
                    <p className="text-ink/90 mt-1.5">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">Approach</p>
                    <p className="text-ink/90 mt-1.5">{project.solution}</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {project.tech.map(tech => (
                    <li key={tech} className="text-muted bg-surface-2 rounded-md px-2 py-1 text-xs">{tech}</li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap gap-x-10 gap-y-5 md:flex-col md:gap-6 md:text-right" aria-label="Results">
                {project.metrics.map(metric => (
                  <li key={metric.label}>
                    <p className="text-ink text-4xl tracking-tight font-serif sm:text-[44px]">
                      <CountUp value={metric.value} />
                    </p>
                    <p className="text-muted mt-1 text-sm">{metric.label}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Experience" title="From shipping websites to owning critical systems." />
      <div className="grid mt-14 gap-14 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ol className="border-line relative ml-1 border-l">
            {experience.map((job, index) => (
              <li key={`${job.company}-${job.role}`} className="relative pb-9 pl-7 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-2 size-[9px] rounded-full ring-4 ring-bg ${index === 0 ? 'bg-accent-bright' : 'bg-muted/40'}`}
                />
                <p className="text-muted text-sm">{job.period}</p>
                <h3 className="text-ink mt-1 text-lg font-medium">{job.role}</h3>
                <p className="text-muted">{job.company}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1} className="space-y-10">
          <div>
            <h3 className="text-muted text-xs font-medium tracking-wider uppercase">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map(item => (
                <li key={item.school}>
                  <p className="text-ink font-medium">{item.school}</p>
                  <p className="text-muted text-sm">{item.degree}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-muted text-xs font-medium tracking-wider uppercase">Certification</h3>
            <ul className="mt-4 space-y-2">
              {certifications.map(name => <li key={name} className="text-ink font-medium">{name}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-muted text-xs font-medium tracking-wider uppercase">Toolbox</h3>
            <dl className="mt-4 text-[15px] space-y-3">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <dt className="text-muted text-sm">{group}</dt>
                  <dd className="text-ink">{items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section aria-label="What people say" className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item, index) => (
          <Reveal key={item.source} delay={index * 0.08} className="h-full">
            <figure className="border-line bg-surface h-full flex flex-col border rounded-2xl p-8">
              <blockquote className="flex-1">
                <p className="text-ink text-[26px] leading-snug font-serif sm:text-[28px]">
                  “
                  {item.quote}
                  ”
                </p>
                <p className="text-muted mt-4 text-[15px] leading-relaxed">
                  “
                  {item.detail}
                  ”
                </p>
              </blockquote>
              <figcaption className="text-accent-text mt-6 text-sm font-medium">{item.source}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const secondary = 'inline-flex items-center gap-2 rounded-xl border border-line bg-bg px-4 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2'
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <Reveal>
        <div className="border-line bg-surface relative isolate overflow-hidden border rounded-3xl px-6 py-16 text-center sm:px-12">
          <div aria-hidden className="bg-accent-bright/15 absolute left-1/2 top-0 h-64 w-[36rem] rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />
          <p className="text-accent-text text-sm font-medium">Let’s talk</p>
          <h2 className="text-ink mx-auto mt-3 max-w-2xl text-balance text-4xl leading-[1.1] tracking-tight font-serif sm:text-5xl">
            Hiring for AI, or building something ambitious?
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-xl text-lg leading-relaxed">
            I’m open to AI engineering roles and select partnerships. The fastest way to reach me is email.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="bg-accent inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] text-white font-medium transition hover:brightness-110"
            >
              <FiMail className="size-4" aria-hidden />
              {profile.email}
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
              <FiLinkedin className="size-4" aria-hidden />
              LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={secondary}>
              <FiGithub className="size-4" aria-hidden />
              GitHub
            </a>
          </div>
          <AskChatButton className="text-muted hover:text-ink mt-8 inline-flex items-center gap-1.5 text-sm transition-colors">
            Or ask my chat a question
            <FiArrowUp className="size-3.5" aria-hidden />
          </AskChatButton>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const social = [
    { href: profile.links.github, label: 'GitHub', icon: FiGithub },
    { href: profile.links.linkedin, label: 'LinkedIn', icon: FiLinkedin },
    { href: profile.links.x, label: 'X', icon: FaXTwitter },
    { href: `mailto:${profile.email}`, label: 'Email', icon: FiMail },
  ]
  return (
    <footer className="border-line border-t">
      <div className="text-muted mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 px-5 py-8 text-sm sm:flex-row">
        <p>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {profile.name}
        </p>
        <ul className="flex items-center gap-1">
          {social.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="size-9 hover:bg-surface-2 hover:text-ink grid place-items-center rounded-lg transition-colors"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
