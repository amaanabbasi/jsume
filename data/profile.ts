// Single source of truth for the facts on the site. Edit here; every section, the chat, /resume and /llms.txt read from it.

export const profile = {
  name: 'Amaan Abbasi',
  firstName: 'Amaan',
  initials: 'AA',
  title: 'Software Development Engineer',
  headline: 'Software engineer & technical lead',
  focusLine: 'Business systems, AI agents & cost optimization',
  current: 'Software engineer at Lakshmikumaran & Sridharan',
  tagline:
    'I lead in-house and vendor teams to ship business systems people rely on, and I cut what they cost to run. Next up: AI agents inside those workflows.',
  resumeSummary:
    'Software engineer and technical lead at Lakshmikumaran & Sridharan. Leads in-house and vendor teams to deliver business systems used by hundreds of people, and owns cost optimization alongside engineering. Next focus: AI agents inside business workflows.',
  site: 'https://amaanabbasi.me',
  email: 'hello@amaanabbasi.me',
  links: {
    github: 'https://github.com/amaanabbasi',
    linkedin: 'https://www.linkedin.com/in/amaanabbasi/',
    x: 'https://x.com/amaancypy',
  },
}

export const company = 'Lakshmikumaran & Sridharan'

// Headline numbers, reused by "How I lead", the résumé and the chat.
export const impact = [
  { value: '100s', label: 'people using the internal apps I delivered' },
  { value: '21', label: 'vendor team members coordinated, across teams of 7 and 14' },
  { value: '4', label: 'interns led and mentored' },
]

export const leadershipPrinciples = [
  {
    title: 'Start with the business',
    body: 'I work with the people who will use the system to pin down the real requirement and what success looks like, before anyone writes code.',
  },
  {
    title: 'Run one team, even across vendors',
    body: 'Clear scope, owners, milestones and acceptance criteria, whether the work sits with my interns or with vendor teams of 7 and 14 people.',
  },
  {
    title: 'Ship in small, visible steps',
    body: 'Working software early and often, so stakeholders see progress and problems surface while they are still cheap to fix.',
  },
  {
    title: 'Own the outcome, including the bill',
    body: 'Adoption, data that reconciles, and costs tracked from day one. Cost is part of the result, not an afterthought.',
  },
]

export const focusAreas = [
  {
    id: 'systems',
    title: 'Business systems',
    body: 'Finance, expense and CRM workflows, from invoicing and GST e-invoicing to expense claims, built for the people who use them every day.',
  },
  {
    id: 'cost',
    title: 'Cost optimization',
    body: 'A core part of my role now. I find where the money goes, fix the biggest line items first, and keep reliability non-negotiable.',
  },
  {
    id: 'agents',
    title: 'AI agents, next',
    body: 'Agents that take on the repetitive work inside these workflows: grounded in real data, checked before they act, and cost-aware from day one.',
  },
] as const

export interface Project {
  slug: string
  title: string
  summary: string
  points?: string[]
  metrics?: { value: string, label: string }[]
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'vendor-delivery',
    title: 'Internal applications, delivered with vendors',
    summary: 'Gathered requirements and coordinated vendor teams to deliver applications used across the firm.',
    points: [
      'Turned business requirements into scope vendors could build against',
      'Coordinated vendor teams of 7 and 14 people through delivery',
    ],
    metrics: [
      { value: '100s', label: 'internal users' },
      { value: '21', label: 'vendor team members' },
    ],
    tags: ['Requirements', 'Vendor management', 'Delivery'],
  },
  {
    slug: 'finance-system',
    title: 'Finance system: Business Central replication',
    summary: 'Replicated Microsoft Dynamics 365 Business Central finance workflows inside a legacy system.',
    points: [
      'Invoicing and customer ledger entries',
      'GST e-invoicing: each invoice is reported and receives its IRN',
    ],
    tags: ['Business Central', 'GST e-invoicing (IRN)', 'Finance'],
  },
  {
    slug: 'expense-management',
    title: 'Expense management and CRM integration',
    summary: 'Built an expense management system and integrated the firm’s CRM with travel and expense apps.',
    tags: ['Expense management', 'CRM', 'Integrations'],
  },
  {
    slug: 'cost-optimization',
    title: 'Cost optimization',
    summary: `Took ownership of cost optimization alongside my engineering work, cutting recurring costs for the firm.`,
    tags: ['Cost optimization'],
  },
]

export interface Job {
  role: string
  company: string
  period: string
  note?: string
  points?: string[]
}

// Earlier roles come from the Indeed profile, where `period` is the start date.
export const experience: Job[] = [
  {
    role: 'Software Development Engineer',
    company,
    period: 'Current',
    note: 'Engineering, requirements, vendor delivery, finance systems and cost optimization',
    points: [
      'Grew the role from engineering into requirements gathering, vendor delivery and cost optimization',
      'Coordinated vendor teams of 7 and 14 people to deliver internal applications used by hundreds of people',
      'Led and mentored a team of four interns',
      'Replicated Business Central finance workflows in a legacy system: invoicing, GST e-invoicing with IRN generation, and customer ledger entries',
      'Built an expense management system and integrated the CRM with travel and expense apps',
    ],
  },
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
  'Leadership': ['Requirements gathering', 'Vendor management', 'Mentoring', 'Cost optimization'],
  'Business systems': ['Business Central', 'GST & e-invoicing (IRN)', 'CRM integrations', 'Expense management'],
  'Languages': ['Python', 'JavaScript', 'SQL'],
  'Backend & data': ['Django', 'Flask', 'REST APIs', 'MySQL', 'SQL Server', 'Pandas'],
  'Cloud': ['AWS', 'Linux'],
  'AI / ML': ['Keras', 'OpenCV'],
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
