export interface Testimonial {
  id: string
  text: string
}

export interface Project {
  slug: string
  title: string
  description: string
  problem: string
  solution: string
  result: string
  tech: string[]
  image: string
  featured: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    text: 'Very detailed and patient. Brings foresight to run multiple projects. Highly recommended.',
  },
  {
    id: '2',
    text: 'Consistently handles critical projects. A go-getter we trust with the hard problems.',
  },
]

export const projects: Project[] = [
  {
    slug: 'log-analytics-platform',
    title: 'Log Analytics Platform',
    description: 'Scalable log processing system handling tens of millions of logs daily',
    problem: 'Legacy system couldn\'t handle increasing log volume, causing performance bottlenecks and data loss.',
    solution: 'Architected a cloud-based solution with distributed processing, real-time indexing, and intelligent caching.',
    result: '99.9% uptime, 10x faster query performance, reduced infrastructure costs by 40%.',
    tech: ['AWS', 'Kafka', 'Elasticsearch', 'Node.js', 'TypeScript'],
    image: '/screenshot-1.png',
    featured: true,
  },
  {
    slug: 'legacy-migration',
    title: 'Legacy Application Migration',
    description: 'Modernized enterprise application from legacy framework to Next.js',
    problem: 'Outdated tech stack made maintenance difficult and limited feature development.',
    solution: 'Migrated to Next.js with TypeScript, implemented modern CI/CD, and improved developer experience.',
    result: '50% faster page loads, 30% reduction in bugs, improved developer productivity.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
    image: '/screenshot-2.png',
    featured: true,
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure Optimization',
    description: 'Multi-cloud infrastructure setup with auto-scaling and monitoring',
    problem: 'Unpredictable traffic spikes caused downtime and high infrastructure costs.',
    solution: 'Designed auto-scaling architecture with intelligent load balancing and cost optimization strategies.',
    result: 'Zero downtime during traffic spikes, 35% cost reduction, improved reliability.',
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
    image: '/screenshot-1.png',
    featured: true,
  },
]

