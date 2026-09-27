import { Fragment, type ReactNode } from 'react'
import type { Block, Inline } from '@/lib/chat'

function AnswerLink({ href, children }: { href: string, children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

function renderInlines(inlines: Inline[], budget: number) {
  const nodes: ReactNode[] = []
  let used = 0
  for (let i = 0; i < inlines.length && used < budget; i++) {
    const inline = inlines[i]
    const text = inline.text.slice(0, budget - used)
    used += text.length
    if (inline.kind === 'bold')
      nodes.push(<strong key={i}>{text}</strong>)
    else if (inline.kind === 'link')
      nodes.push(<AnswerLink key={i} href={inline.href}>{text}</AnswerLink>)
    else
      nodes.push(<Fragment key={i}>{text}</Fragment>)
  }
  return { nodes, used }
}

function Cursor() {
  return <span aria-hidden className="size-2 bg-accent-bright ml-1 inline-block animate-pulse rounded-full align-middle" />
}

/** Renders the first `limit` visible characters of an answer, with a cursor at the end while streaming. */
export default function RichText({ blocks, limit, streaming }: { blocks: Block[], limit: number, streaming: boolean }) {
  let remaining = limit
  const rendered: ReactNode[] = []
  const cursor = streaming ? <Cursor /> : null

  for (let b = 0; b < blocks.length && remaining > 0; b++) {
    const block = blocks[b]
    if (block.kind === 'p') {
      const { nodes, used } = renderInlines(block.inlines, remaining)
      remaining -= used
      const paragraph = (
        <p key={b}>
          {nodes}
          {remaining <= 0 && cursor}
        </p>
      )
      rendered.push(paragraph)
      continue
    }
    const items: ReactNode[] = []
    for (let i = 0; i < block.items.length && remaining > 0; i++) {
      const { nodes, used } = renderInlines(block.items[i], remaining)
      remaining -= used
      const item = (
        <li key={i}>
          {nodes}
          {remaining <= 0 && cursor}
        </li>
      )
      items.push(item)
    }
    rendered.push(block.kind === 'ul' ? <ul key={b}>{items}</ul> : <ol key={b}>{items}</ol>)
  }

  if (rendered.length === 0 && cursor)
    return <p>{cursor}</p>
  return <>{rendered}</>
}
