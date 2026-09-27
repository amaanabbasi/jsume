import { qas } from '@/data/chat'
import { certifications, education, experience, profile, skills } from '@/data/profile'

// A plain-text profile for AI assistants and crawlers (https://llmstxt.org), built from the same data as the site.
export const dynamic = 'force-static'

function absoluteLinks(markdown: string) {
  return markdown.replaceAll('](#', `](${profile.site}/#`).replaceAll('](/', `](${profile.site}/`)
}

export function GET() {
  const [current, ...earlier] = experience
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.resumeSummary}`,
    '',
    `${profile.headline}. ${profile.tagline}`,
    '',
    '## Current role',
    '',
    `${current.role}, ${current.company} (current)`,
    '',
    ...(current.points ?? []).map(point => `- ${point}`),
    '',
    '## Earlier roles',
    '',
    ...earlier.map(job => `- ${job.role}, ${job.company} (started ${job.period})`),
    '',
    '## Education and certification',
    '',
    ...education.map(item => `- ${item.degree}, ${item.school}`),
    ...certifications.map(name => `- ${name}`),
    '',
    '## Skills',
    '',
    ...Object.entries(skills).map(([group, items]) => `- ${group}: ${items.join(', ')}`),
    '',
    '## Questions people ask',
    '',
    ...qas.flatMap(qa => [`### ${qa.question}`, '', absoluteLinks(qa.answer), '']),
    '## Links',
    '',
    `- [Website](${profile.site})`,
    `- [Résumé](${profile.site}/resume)`,
    `- [LinkedIn](${profile.links.linkedin})`,
    `- [GitHub](${profile.links.github})`,
    `- [X](${profile.links.x})`,
    `- Email: ${profile.email}`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
