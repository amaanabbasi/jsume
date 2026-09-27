// Pre-written answers for the "Ask me" chat. Answers use a tiny markdown subset:
// blank-line paragraphs, "- " / "1. " lists, **bold** and [links](url).
import type { IconType } from 'react-icons'
import { FiCpu, FiLayers, FiMessageCircle, FiTrendingDown, FiUser, FiUsers } from 'react-icons/fi'
import { company, profile } from './profile'

export type CategoryId = 'story' | 'lead' | 'ai' | 'cost' | 'work' | 'hire'

export interface Category {
  id: CategoryId
  label: string
  icon: IconType
}

export interface QA {
  id: string
  category: CategoryId
  question: string
  keywords: string[]
  answer: string
  followUps: string[]
}

export const categories: Category[] = [
  { id: 'story', label: 'My story', icon: FiUser },
  { id: 'lead', label: 'How I lead', icon: FiUsers },
  { id: 'cost', label: 'Cost optimization', icon: FiTrendingDown },
  { id: 'work', label: 'Projects', icon: FiLayers },
  { id: 'ai', label: 'AI & agents', icon: FiCpu },
  { id: 'hire', label: 'Work with me', icon: FiMessageCircle },
]

const email = `[${profile.email}](mailto:${profile.email})`

export const qas: QA[] = [
  {
    id: 'intro',
    category: 'story',
    question: 'Who is Amaan?',
    keywords: ['who', 'about you', 'yourself', 'introduce', 'intro', 'amaan', 'summary', 'hello', 'hi'],
    answer: `Hi! I'm Amaan, a software engineer and technical lead at ${company}, a law firm.

My role started in engineering and grew into owning outcomes: I gather requirements, lead interns, coordinate vendor teams, and deliver internal systems that hundreds of people use, from finance and GST compliance to expense management and CRM integrations.

Along the way I took on **cost optimization** too, cutting recurring costs. Next, I'm bringing AI agents into exactly these kinds of workflows.`,
    followUps: ['lead', 'cost-wins', 'projects'],
  },
  {
    id: 'history',
    category: 'story',
    question: 'Walk me through your career so far',
    keywords: ['history', 'career', 'experience', 'background', 'journey', 'worked', 'jobs', 'resume', 'cv', 'past', 'education', 'degree', 'university'],
    answer: `Sure, here's the short version:

- **2019** — Started as a web developer at ARK Security Service, then a web designer at RSTech Softwares.
- **2020** — Backend developer at Incupad, building APIs and the data layer behind them.
- **2021** — Web application developer at Hrdfi, then Python developer at Flipkoins.
- **Now** — Software development engineer at ${company}, where the role grew into requirements, vendor delivery, finance systems and cost optimization.

Along the way I earned a Bachelor's from Jamia Hamdard, a Master's from Westcliff University, and a certification in Cloud Computing with AWS. The full version is on my [résumé](/resume).`,
    followUps: ['lead', 'projects', 'reputation'],
  },
  {
    id: 'reputation',
    category: 'story',
    question: 'What do people say about working with you?',
    keywords: ['people say', 'colleagues', 'reputation', 'feedback', 'testimonial', 'reference', 'recommend', 'teammates', 'manager', 'clients', 'strengths', 'personality'],
    answer: `Two phrases come up a lot.

Clients describe me as **"the calm problem-solver who sees around the corner"**: someone who brings patience when projects get chaotic, and clarity when teams are juggling priorities.

Managers call me **"the go-getter who can be trusted with the hard problems."** I take ownership, learn the business, and care about outcomes more than lines of code.

In one client's words: "Very detailed and patient. Brings foresight to run multiple projects. Highly recommended."`,
    followUps: ['lead', 'vendors', 'partner'],
  },
  {
    id: 'lead',
    category: 'lead',
    question: 'How do you lead a project?',
    keywords: ['lead', 'leading', 'leadership', 'manage', 'management', 'project', 'program', 'run', 'deliver', 'delivery', 'process', 'approach', 'stakeholders'],
    answer: `The same way every time, whether the team is interns, vendors or both:

1. **Start with the business.** I work with the people who will use the system to pin down what they actually need and what success looks like.
2. **Make ownership explicit.** Clear scope, owners, milestones and acceptance criteria, for my own team and for vendors.
3. **Ship in small, visible steps,** so stakeholders see progress early and problems surface while they are cheap to fix.
4. **Own the outcome,** including adoption, data that reconciles, and the bill.

That's how I've delivered applications used by hundreds of people at the firm.`,
    followUps: ['vendors', 'cost-wins', 'projects'],
  },
  {
    id: 'vendors',
    category: 'lead',
    question: 'How do you work with vendors and teams?',
    keywords: ['vendor', 'vendors', 'team', 'teams', 'interns', 'mentor', 'mentoring', 'people', 'outsourcing', 'coordinate', 'coordination', 'handle'],
    answer: `I've led a team of four interns and coordinated vendor teams of 7 and 14 people.

With vendors, the job is making sure everyone builds the same thing:

- **Requirements first** — I gather them from the business and turn them into scope a vendor can build against.
- **One place for decisions** — priorities, open issues and changes agreed in the open, not in side conversations.
- **Done means used** — a feature is finished when the people relying on it say it works.

With interns, I give real ownership of small pieces, review closely, and widen the scope as they grow.`,
    followUps: ['lead', 'projects', 'partner'],
  },
  {
    id: 'cost-wins',
    category: 'cost',
    question: 'How do you approach cost optimization?',
    keywords: ['cost', 'costs', 'save', 'saved', 'saving', 'savings', 'cheaper', 'reduce', 'reduced', 'bill', 'spend', 'budget', 'optimization', 'optimize', 'money', 'lakh', 'rupees', 'how much', 'figures', 'numbers'],
    answer: `At ${company} I took on cost optimization alongside engineering, and the savings recur month after month. I keep the exact figures internal to the firm, but I'm happy to walk through the approach:

- **Find where the money actually goes** before cutting anything.
- **Fix the biggest line items first,** because that's where effort pays back fastest.
- **Treat reliability and people's workflows as hard constraints.** A saving that breaks something isn't a saving.

The same discipline carries over to AI: models, tokens and infrastructure are just a new set of line items.`,
    followUps: ['llm-costs', 'lead', 'projects'],
  },
  {
    id: 'llm-costs',
    category: 'cost',
    question: 'How would you reduce our LLM bill?',
    keywords: ['llm cost', 'llm bill', 'token', 'tokens', 'inference', 'api bill', 'openai', 'model cost', 'expensive', 'pricing', 'caching', 'cache', 'routing', 'batch', 'batching'],
    answer: `Here's the playbook I'd start with:

1. **Measure cost per task**, not per month, and find the few flows burning most of the tokens.
2. **Route by difficulty**: send easy requests to small, fast models and escalate only when needed.
3. **Cache aggressively**: prompt caching for long shared context, response caching for repeat questions.
4. **Trim the context**: tighter prompts and better retrieval mean fewer tokens on every call.
5. **Batch what isn't urgent**: batch APIs are far cheaper for offline work.
6. **Guard quality with evals**, so every saving is checked against the same test set.

The goal is a smaller bill with no drop in quality, and the numbers to prove it.`,
    followUps: ['cost-wins', 'ai-focus', 'partner'],
  },
  {
    id: 'projects',
    category: 'work',
    question: 'What have you built?',
    keywords: ['project', 'projects', 'proud', 'portfolio', 'built', 'build', 'case study', 'examples', 'achievements', 'accomplishments', 'systems'],
    answer: `The work I'm proudest of, all at ${company}:

- **Cost optimization** — cutting recurring costs alongside my engineering work.
- **Internal applications with vendors** — gathered requirements and coordinated vendor teams of 7 and 14 people to deliver apps used by hundreds of people at the firm.
- **Finance system** — replicated Business Central finance workflows in a legacy system: invoicing, GST e-invoicing with IRN generation, and customer ledger entries.
- **Expense management** — built an expense management system and integrated our CRM with travel and expense apps.

There's more in [Selected work](#work) below.`,
    followUps: ['finance', 'expenses', 'lead'],
  },
  {
    id: 'finance',
    category: 'work',
    question: 'Tell me about the finance system',
    keywords: ['finance', 'financial', 'business central', 'dynamics', 'invoice', 'invoices', 'invoicing', 'gst', 'irn', 'e-invoicing', 'ledger', 'tax', 'accounting', 'legacy'],
    answer: `I replicated Microsoft Dynamics 365 Business Central's finance workflows inside a legacy system. It covers:

- **Invoicing**
- **GST e-invoicing** — each invoice is reported and receives its IRN (Invoice Reference Number)
- **Customer ledger entries**

It's compliance-critical work: once an invoice has its IRN it's registered, so it has to be right the first time.`,
    followUps: ['expenses', 'projects', 'stack'],
  },
  {
    id: 'expenses',
    category: 'work',
    question: 'Tell me about the expense management system',
    keywords: ['expense', 'expenses', 'expense management', 'crm', 'travel', 'integration', 'integrations', 'reimbursement', 'claims'],
    answer: `I built the firm's expense management system and integrated our CRM with travel and expense apps, so data moves between them instead of being keyed in twice.

It's the kind of workflow I enjoy most: lots of people, lots of small steps, and a real payoff when the busywork disappears.`,
    followUps: ['finance', 'ai-focus', 'lead'],
  },
  {
    id: 'stack',
    category: 'work',
    question: 'What\'s your tech stack?',
    keywords: ['stack', 'tech', 'technologies', 'technology', 'skills', 'languages', 'tools', 'python', 'javascript', 'django', 'flask', 'aws', 'frameworks', 'cloud', 'sql'],
    answer: `The tools I reach for most:

- **Languages** — Python, JavaScript, SQL
- **Backend & data** — Django, Flask, REST APIs, MySQL, SQL Server, Pandas
- **Business systems** — Business Central, GST e-invoicing, CRM and expense integrations
- **Cloud** — AWS, Linux
- **AI / ML** — Keras and OpenCV, and now LLMs and agents

I pick tools for the problem rather than the résumé, but Python is home turf.`,
    followUps: ['projects', 'ai-focus', 'partner'],
  },
  {
    id: 'ai-focus',
    category: 'ai',
    question: 'What are you building with AI agents?',
    keywords: ['ai', 'agent', 'agents', 'agentic', 'llm', 'llms', 'gpt', 'claude', 'genai', 'generative', 'machine learning', 'ml', 'rag', 'automation', 'future', 'next'],
    answer: `AI agents are where I'm heading next, and the systems I build today are where they'll be most useful.

Invoices, e-invoicing, expense claims and CRM updates are full of repetitive checks and data entry. That's the busywork I want agents to take on:

- **Grounded in real data** — the ledger, the CRM, the policy document, not guesses.
- **Checked before they act** — evals, validation and a human sign-off wherever money or compliance is involved.
- **Cost-aware from day one** — the smallest model that does the job, and caching wherever it's safe.

I know these workflows, the people who run them and what they cost. That's what makes an agent useful rather than a demo.`,
    followUps: ['ai-production', 'llm-costs', 'partner'],
  },
  {
    id: 'ai-production',
    category: 'ai',
    question: 'How do you take an LLM app to production?',
    keywords: ['production', 'reliable', 'reliability', 'deploy', 'ship', 'prototype', 'evals', 'evaluation', 'guardrails', 'observability', 'latency', 'hallucination'],
    answer: `The same way I'd ship any business-critical system, with a few LLM-specific twists:

1. **Define success first** with a small evaluation set, before tuning prompts.
2. **Structure the outputs** with schemas, validation and retries, so downstream systems can trust them.
3. **Watch everything**: latency, tokens and cost per request, and how things fail.
4. **Plan for failure** with timeouts, fallbacks to simpler models, and a human hand-off where it matters.
5. **Roll out in small steps** with the people who will use it, not all at once.

Prototypes are easy. Production is observability, budgets and boring reliability.`,
    followUps: ['llm-costs', 'ai-focus', 'lead'],
  },
  {
    id: 'partner',
    category: 'hire',
    question: 'Can we build something together?',
    keywords: ['partner', 'partnership', 'together', 'startup', 'mvp', 'freelance', 'contract', 'consult', 'consulting', 'collaborate', 'collaboration', 'idea', 'founder', 'company', 'hire', 'hiring', 'role', 'job', 'opportunity'],
    answer: `I'd love to hear about it. I don't aim to be "your developer"; I aim to be your **tech partner**:

- **Understand the business** before we write much code
- **Plan the build**: scope, the right tech, and in-house or vendor teams
- **Deliver, then keep costs in check** as it grows

Tell me what you're building: ${email}`,
    followUps: ['lead', 'cost-wins', 'contact'],
  },
  {
    id: 'contact',
    category: 'hire',
    question: 'How can I reach you?',
    keywords: ['contact', 'reach', 'email', 'mail', 'linkedin', 'twitter', 'github', 'call', 'connect', 'talk', 'message', 'touch', 'phone'],
    answer: `Pick whatever's easiest:

- **Email** — ${email}
- **LinkedIn** — [in/amaanabbasi](${profile.links.linkedin})
- **GitHub** — [amaanabbasi](${profile.links.github})
- **X** — [@amaancypy](${profile.links.x})

My full [résumé](/resume) is here too.`,
    followUps: ['partner', 'lead', 'intro'],
  },
]

export const fallbackAnswer = `Good question. I haven't written an answer for that one yet.

These answers cover my story, how I lead, cost optimization, projects, AI and how to work with me. For anything else, email ${email} and I'll reply personally.`

export const fallbackFollowUps = ['intro', 'lead', 'contact']

export const popularIds = ['intro', 'lead', 'cost-wins', 'projects', 'ai-focus']

export const placeholderPrompts = [
  'Ask me anything about my work…',
  'How do you lead a project?',
  'How do you approach cost optimization?',
  'What are you building with AI agents?',
]

export function qaById(id: string) {
  return qas.find(q => q.id === id)
}
