// Single source of truth for the facts on the site. Edit here; every section and chat answer reads from it.

export const profile = {
  name: 'Amaan Abbasi',
  firstName: 'Amaan',
  initials: 'AA',
  title: 'Software Engineer',
  location: 'USA',
  headline: 'AI agents, LLM systems & cost optimization',
  tagline:
    'Software engineer focused on AI agents and LLM systems\u00A0— and on the part most teams underestimate: what they cost to run.',
  availability: 'Open to AI engineering roles & partnerships',
  site: 'https://amaanabbasi.me',
  email: 'hello@amaanabbasi.me',
  links: {
    github: 'https://github.com/amaanabbasi',
    linkedin: 'https://www.linkedin.com/in/amaanabbasi/',
    x: 'https://x.com/amaancypy',
  },
}

export const focusAreas = [
  {
    id: 'agents',
    title: 'AI agents',
    body: 'Agents that do real work: tool use, retrieval and clear guardrails, measured with evals before they are scaled.',
  },
  {
    id: 'llm',
    title: 'LLM products',
    body: 'From prototype to production: structured outputs, streaming UX, observability and graceful fallbacks.',
  },
  {
    id: 'cost',
    title: 'Cost optimization',
    body: 'Inference is the new cloud bill. Model routing, caching, batching and right-sizing, so the unit economics work.',
  },
] as const

export interface Project {
  slug: string
  title: string
  summary: string
  problem: string
  solution: string
  metrics: { value: string, label: string }[]
  tech: string[]
}

export const projects: Project[] = [
  {
    slug: 'log-analytics-platform',
    title: 'Log analytics platform',
    summary: 'Scalable log processing handling tens of millions of logs a day.',
    problem: 'The legacy system could not keep up with growing log volume, causing bottlenecks and data loss.',
    solution: 'A cloud-based pipeline with distributed processing, real-time indexing and intelligent caching.',
    metrics: [
      { value: '−40%', label: 'infrastructure cost' },
      { value: '10×', label: 'faster queries' },
      { value: '99.9%', label: 'uptime' },
    ],
    tech: ['AWS', 'Kafka', 'Elasticsearch', 'Node.js', 'TypeScript'],
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud infrastructure optimization',
    summary: 'Auto-scaling infrastructure with monitoring and cost controls.',
    problem: 'Unpredictable traffic spikes caused downtime and high infrastructure costs.',
    solution: 'Auto-scaling architecture with intelligent load balancing and right-sized workloads.',
    metrics: [
      { value: '−35%', label: 'infrastructure cost' },
      { value: '0', label: 'downtime during spikes' },
    ],
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
  },
  {
    slug: 'legacy-migration',
    title: 'Legacy application migration',
    summary: 'Modernized an enterprise application from a legacy framework to Next.js.',
    problem: 'An outdated stack made maintenance difficult and slowed feature development.',
    solution: 'Migrated to Next.js and TypeScript with modern CI/CD and a better developer experience.',
    metrics: [
      { value: '50%', label: 'faster page loads' },
      { value: '−30%', label: 'bugs' },
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CI/CD'],
  },
]

// From the Indeed profile. `period` is the start date; the most recent role has no date on record.
export const experience = [
  { role: 'Software Development Engineer', company: 'Lakshmikumaran & Sridharan', period: 'Most recent' },
  { role: 'Python Developer', company: 'Flipkoins', period: 'Nov 2021' },
  { role: 'Web Application Developer', company: 'Hrdfi', period: 'Jul 2021' },
  { role: 'Backend Developer', company: 'Incupad', period: 'Sep 2020' },
  { role: 'Web Designer', company: 'RSTech Softwares', period: 'Oct 2019' },
  { role: 'Web Developer', company: 'ARK Security Service', period: 'May 2019' },
]

export const education = [
  { degree: 'Master\'s degree', school: 'Westcliff University' },
  { degree: 'Bachelor\'s degree', school: 'Jamia Hamdard' },
]

export const certifications = ['Cloud Computing with AWS']

export const skills = {
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  'Backend': ['Django', 'Flask', 'Node.js', 'REST APIs'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS'],
  'Cloud & infra': ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
  'Data': ['Kafka', 'Elasticsearch', 'MySQL', 'SQL Server', 'Pandas'],
  'AI / ML': ['LLM APIs', 'Keras', 'OpenCV'],
}

export const testimonials = [
  {
    quote: 'The calm problem-solver who sees around the corner.',
    source: 'How clients describe me',
    detail: 'Very detailed and patient. Brings foresight to run multiple projects. Highly recommended.',
  },
  {
    quote: 'The go-getter who can be trusted with the hard problems.',
    source: 'How managers describe me',
    detail: 'Consistently handles critical projects. A go-getter we trust with the hard problems.',
  },
]
