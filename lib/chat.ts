import { type QA, qas } from '@/data/chat'

/** Dispatch on window from anywhere on the page to jump back to the chat and focus it. */
export const FOCUS_CHAT_EVENT = 'focus-chat'

// ---- Matching free-text questions to a pre-written answer ----

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'do',
  'does',
  'did',
  'you',
  'your',
  'yours',
  'i',
  'me',
  'my',
  'we',
  'our',
  'to',
  'of',
  'in',
  'on',
  'for',
  'and',
  'or',
  'with',
  'what',
  'whats',
  'how',
  'who',
  'can',
  'could',
  'would',
  'tell',
  'about',
  'please',
  'any',
  'have',
  'has',
  'it',
  'this',
  'that',
  'be',
  'at',
  'as',
  'so',
  's',
])

function normalize(text: string) {
  return ` ${text.toLowerCase().replace(/[^a-z0-9.\s]/g, ' ').replace(/\s+/g, ' ').trim()} `
}

function contentWords(normalized: string) {
  return normalized.trim().split(' ').filter(word => word && !STOP_WORDS.has(word))
}

/** Best pre-written answer for a typed question, or null when nothing is a confident match. */
export function findQA(input: string): QA | null {
  const text = normalize(input)
  const words = new Set(contentWords(text))
  let best: QA | null = null
  let bestScore = 0

  for (const qa of qas) {
    const question = normalize(qa.question)
    if (question === text)
      return qa

    let score = 0
    for (const keyword of qa.keywords) {
      if (text.includes(normalize(keyword)))
        score += keyword.includes(' ') ? 3 : 2
    }
    for (const word of contentWords(question)) {
      if (words.has(word))
        score += 1
    }
    if (score > bestScore) {
      best = qa
      bestScore = score
    }
  }

  return bestScore >= 2 ? best : null
}

// ---- A tiny markdown subset, parsed once so answers can stream without half-formatted text ----

export type Inline =
  | { kind: 'text', text: string }
  | { kind: 'bold', text: string }
  | { kind: 'link', text: string, href: string }

export type Block =
  | { kind: 'p', inlines: Inline[] }
  | { kind: 'ul' | 'ol', items: Inline[][] }

const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

function parseInline(source: string): Inline[] {
  const inlines: Inline[] = []
  let last = 0
  for (const match of source.matchAll(INLINE_PATTERN)) {
    const start = match.index ?? 0
    if (start > last)
      inlines.push({ kind: 'text', text: source.slice(last, start) })
    if (match[1] !== undefined)
      inlines.push({ kind: 'bold', text: match[1] })
    else
      inlines.push({ kind: 'link', text: match[2], href: match[3] })
    last = start + match[0].length
  }
  if (last < source.length)
    inlines.push({ kind: 'text', text: source.slice(last) })
  return inlines
}

export function parseAnswer(source: string): Block[] {
  return source.trim().split(/\n\s*\n/).map((chunk): Block => {
    const lines = chunk.split('\n').map(line => line.trim()).filter(Boolean)
    if (lines.every(line => line.startsWith('- ')))
      return { kind: 'ul', items: lines.map(line => parseInline(line.slice(2))) }
    if (lines.every(line => /^\d+\.\s/.test(line)))
      return { kind: 'ol', items: lines.map(line => parseInline(line.replace(/^\d+\.\s/, ''))) }
    return { kind: 'p', inlines: parseInline(lines.join(' ')) }
  })
}

export function inlinesLength(inlines: Inline[]) {
  return inlines.reduce((total, inline) => total + inline.text.length, 0)
}

export function blocksLength(blocks: Block[]) {
  return blocks.reduce((total, block) => total + (block.kind === 'p'
    ? inlinesLength(block.inlines)
    : block.items.reduce((sum, item) => sum + inlinesLength(item), 0)), 0)
}

let counter = 0
export function uid() {
  counter += 1
  return `m${counter}`
}
