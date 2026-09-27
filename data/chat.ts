// Pre-written answers for the "Ask me" chat. Answers use a tiny markdown subset:
// blank-line paragraphs, "- " / "1. " lists, **bold** and [links](url).
import type { IconType } from 'react-icons'
import { FiBriefcase, FiCode, FiCpu, FiLayers, FiTrendingDown, FiUser } from 'react-icons/fi'
import { profile } from './profile'

export type CategoryId = 'story' | 'ai' | 'cost' | 'work' | 'stack' | 'hire'

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
  { id: 'ai', label: 'AI & agents', icon: FiCpu },
  { id: 'cost', label: 'Cost optimization', icon: FiTrendingDown },
  { id: 'work', label: 'Projects', icon: FiLayers },
  { id: 'stack', label: 'Tech stack', icon: FiCode },
  { id: 'hire', label: 'Work with me', icon: FiBriefcase },
]

const email = `[${profile.email}](mailto:${profile.email})`
const linkedin = `[LinkedIn](${profile.links.linkedin})`

export const qas: QA[] = [
  {
    id: 'intro',
    category: 'story',
    question: 'Who is Amaan?',
    keywords: ['who', 'about you', 'yourself', 'introduce', 'intro', 'amaan', 'summary', 'hello', 'hi'],
    answer: `Hi! I'm Amaan, a software engineer based in the ${profile.location}.

I've spent the last few years building software across **logistics, cloud infrastructure and enterprise systems**: log pipelines handling tens of millions of events a day, legacy apps rebuilt on modern stacks, and cloud setups that scale without drama.

These days I'm focused on **AI agents and LLM systems**, and on the question most teams ask too late: what will this cost to run?`,
    followUps: ['history', 'ai-focus', 'cost-wins'],
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
- **Most recently** — Software development engineer at Lakshmikumaran & Sridharan.

Along the way I earned a Bachelor's from Jamia Hamdard, a Master's from Westcliff University, and a certification in Cloud Computing with AWS.`,
    followUps: ['projects', 'reputation', 'roles'],
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
    followUps: ['projects', 'partner', 'roles'],
  },
  {
    id: 'ai-focus',
    category: 'ai',
    question: 'What are you building with AI agents and LLMs?',
    keywords: ['ai', 'agent', 'agents', 'agentic', 'llm', 'llms', 'gpt', 'claude', 'genai', 'generative', 'machine learning', 'ml', 'rag', 'focus', 'building'],
    answer: `AI agents and LLM-powered products are where I'm putting my energy. What I focus on:

- **Agents that do real work** — tool use, retrieval and clear guardrails, not demos that break on the second try.
- **Evaluation first** — test sets and metrics before scaling, so quality is measured rather than assumed.
- **Cost-aware design** — the smallest model that does the job, and caching wherever it's safe.

My background in backend systems and cloud infrastructure is what makes this practical: an agent is only as reliable as the APIs, data and infrastructure underneath it.`,
    followUps: ['ai-production', 'llm-costs', 'stack'],
  },
  {
    id: 'ai-production',
    category: 'ai',
    question: 'How do you take an LLM app to production?',
    keywords: ['production', 'reliable', 'reliability', 'deploy', 'ship', 'prototype', 'evals', 'evaluation', 'guardrails', 'observability', 'latency', 'hallucination'],
    answer: `The same way I'd ship any critical system, with a few LLM-specific twists:

1. **Define success first** with a small evaluation set, before tuning prompts.
2. **Structure the outputs** with schemas, validation and retries, so downstream code can trust them.
3. **Watch everything**: latency, tokens and cost per request, and how things fail.
4. **Plan for failure** with timeouts, fallbacks to simpler models, and a human hand-off where it matters.
5. **Stream the UX**, so users feel speed even when the model needs a moment.

Prototypes are easy. Production is observability, budgets and boring reliability, which is exactly what I've been doing for years.`,
    followUps: ['llm-costs', 'ai-focus', 'roles'],
  },
  {
    id: 'cost-wins',
    category: 'cost',
    question: 'How have you cut infrastructure costs?',
    keywords: ['cost', 'costs', 'save', 'saving', 'savings', 'cheaper', 'reduce', 'reduced', 'bill', 'spend', 'budget', 'optimization', 'optimize', 'finops', 'infrastructure', 'money'],
    answer: `Cost optimization is my favorite kind of problem, because the savings show up on the bill every single month. Two examples:

- **Log analytics platform** — re-architected a pipeline processing tens of millions of logs a day, with distributed processing and intelligent caching: **40% lower infrastructure cost**, 10× faster queries and 99.9% uptime.
- **Cloud infrastructure** — replaced always-on capacity with auto-scaling and right-sized workloads: **35% lower cost** and zero downtime during traffic spikes.

The pattern is always the same: measure where the money goes, fix the biggest line item first, and treat performance and reliability as hard constraints.`,
    followUps: ['llm-costs', 'logs', 'roles'],
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
    followUps: ['cost-wins', 'ai-production', 'partner'],
  },
  {
    id: 'projects',
    category: 'work',
    question: 'What projects are you proud of?',
    keywords: ['project', 'projects', 'proud', 'portfolio', 'built', 'case study', 'examples', 'achievements', 'accomplishments'],
    answer: `Three that shaped how I work:

- **Log analytics platform** — scaled log processing to tens of millions of logs a day, with 99.9% uptime and 10× faster queries.
- **Cloud infrastructure optimization** — auto-scaling that absorbed traffic spikes with zero downtime and 35% lower cost.
- **Legacy application migration** — moved an enterprise app to Next.js and TypeScript: 50% faster page loads and 30% fewer bugs.

There's more detail in [Selected work](#work) below.`,
    followUps: ['logs', 'migration', 'stack'],
  },
  {
    id: 'logs',
    category: 'work',
    question: 'Tell me about the log analytics platform',
    keywords: ['log', 'logs', 'logging', 'analytics', 'kafka', 'elasticsearch', 'pipeline', 'streaming', 'data platform'],
    answer: `The legacy system couldn't keep up with growing log volume: queries were slow and data was getting dropped.

I architected a cloud-based replacement:

- **Kafka** for durable, distributed ingestion
- **Elasticsearch** for real-time indexing and search
- **Intelligent caching** for the queries people ran all day
- **AWS**, with services in Node.js and TypeScript

The result: tens of millions of logs a day at **99.9% uptime**, **10× faster queries** and **40% lower infrastructure cost**.`,
    followUps: ['cost-wins', 'migration', 'roles'],
  },
  {
    id: 'migration',
    category: 'work',
    question: 'Tell me about the legacy migration',
    keywords: ['legacy', 'migration', 'migrate', 'modernize', 'modernization', 'next.js', 'nextjs', 'rewrite', 'react', 'frontend'],
    answer: `An enterprise app was stuck on an outdated stack: slow to change and painful to maintain.

I migrated it to **Next.js and TypeScript**, set up modern CI/CD, and improved the developer experience so the team could ship with confidence.

The result: **50% faster page loads**, **30% fewer bugs**, and a more productive team.`,
    followUps: ['projects', 'stack', 'partner'],
  },
  {
    id: 'stack',
    category: 'stack',
    question: 'What\'s your tech stack?',
    keywords: ['stack', 'tech', 'technologies', 'technology', 'skills', 'languages', 'tools', 'python', 'typescript', 'javascript', 'aws', 'django', 'frameworks', 'cloud'],
    answer: `The tools I reach for most:

- **Languages** — Python, TypeScript/JavaScript, SQL
- **Backend** — Django, Flask, Node.js, REST APIs
- **Frontend** — React, Next.js, Tailwind CSS
- **Cloud & infra** — AWS, Docker, Kubernetes, Terraform, Prometheus
- **Data** — Kafka, Elasticsearch, MySQL, SQL Server, Pandas
- **AI / ML** — LLM APIs, Keras, OpenCV

I pick tools for the problem rather than the résumé, but Python and AWS are home turf.`,
    followUps: ['ai-focus', 'projects', 'roles'],
  },
  {
    id: 'roles',
    category: 'hire',
    question: 'Are you open to new roles?',
    keywords: ['hire', 'hiring', 'open', 'role', 'roles', 'job', 'position', 'opportunity', 'opportunities', 'available', 'availability', 'recruit', 'recruiter', 'full-time', 'remote', 'employ'],
    answer: `Yes. I'm open to roles in **AI engineering**, **backend and platform engineering**, and on teams where **cost and reliability** matter as much as features.

What I bring:

- Years of shipping backend and cloud systems that stay up
- A habit of turning ambiguity into a plan, and a plan into working software
- A cost-first mindset that's rare, and increasingly valuable, in the LLM era

The best way to start is a short intro: email ${email} or reach out on ${linkedin}.`,
    followUps: ['partner', 'contact', 'history'],
  },
  {
    id: 'partner',
    category: 'hire',
    question: 'Can we build something together?',
    keywords: ['partner', 'partnership', 'together', 'startup', 'mvp', 'freelance', 'contract', 'consult', 'consulting', 'collaborate', 'collaboration', 'idea', 'founder', 'company'],
    answer: `I'd love to hear about it. I don't aim to be "your developer"; I aim to be your **tech partner**:

- **Validate the idea** before we write much code
- **Architect the solution** and pick the right tech, and the right models
- **Build the MVP** quickly, then **scale** it without surprises on the bill

Tell me what you're building: ${email}`,
    followUps: ['llm-costs', 'projects', 'contact'],
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
- **X** — [@amaancypy](${profile.links.x})`,
    followUps: ['roles', 'partner', 'intro'],
  },
]

export const fallbackAnswer = `Good question. I haven't written an answer for that one yet.

These answers cover my story, AI work, cost optimization, projects and how to work with me. For anything else, email ${email} and I'll reply personally.`

export const fallbackFollowUps = ['intro', 'ai-focus', 'contact']

export const popularIds = ['intro', 'history', 'ai-focus', 'llm-costs', 'roles']

export const placeholderPrompts = [
  'Ask me anything about my work…',
  'How would you reduce our LLM bill?',
  'What are you building with AI agents?',
  'Walk me through your career so far',
]

export function qaById(id: string) {
  return qas.find(q => q.id === id)
}
