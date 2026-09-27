'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowDown, FiArrowUpRight, FiEdit } from 'react-icons/fi'
import Composer from './Composer'
import { AssistantMessage, UserMessage } from './Messages'
import { type CategoryId, type QA, categories, fallbackAnswer, fallbackFollowUps, qaById } from '@/data/chat'
import { profile } from '@/data/profile'
import { FOCUS_CHAT_EVENT, findQA, uid } from '@/lib/chat'

type Message =
  | { id: string, role: 'user', text: string }
  | { id: string, role: 'assistant', qaId: string | null }

function greetingFor(hour: number) {
  if (hour >= 5 && hour < 12)
    return 'Good morning, I’m'
  if (hour >= 12 && hour < 17)
    return 'Good afternoon, I’m'
  if (hour >= 17 && hour < 22)
    return 'Good evening, I’m'
  return 'Hello, night owl. I’m'
}

export default function ChatHero() {
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)
  const [stopSignal, setStopSignal] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [greeting, setGreeting] = useState('Hi, I’m')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const lastQuestionRef = useRef<HTMLDivElement>(null)

  const started = messages.length > 0
  const last = messages[messages.length - 1]
  const lastQuestionIndex = messages.findLastIndex(message => message.role === 'user')
  const askedIds = useMemo(() => new Set(
    messages.flatMap(message => message.role === 'assistant' && message.qaId ? [message.qaId] : []),
  ), [messages])

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()))
  }, [])

  useEffect(() => {
    const focusChat = () => {
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 450)
    }
    window.addEventListener(FOCUS_CHAT_EVENT, focusChat)
    return () => window.removeEventListener(FOCUS_CHAT_EVENT, focusChat)
  }, [])

  useEffect(() => {
    // First question: bring the whole conversation into view. Later ones: pin the new question near the top.
    if (lastQuestionIndex === 0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    else if (lastQuestionIndex > 0)
      lastQuestionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [lastQuestionIndex])

  const onPanelChange = useCallback((open: boolean, nextCategory?: CategoryId | null) => {
    setPanelOpen(open)
    if (nextCategory !== undefined)
      setCategory(nextCategory)
  }, [])

  const ask = useCallback((text: string, qa?: QA) => {
    if (busy)
      return
    const match = qa ?? findQA(text)
    setMessages(previous => [
      ...previous,
      { id: uid(), role: 'user', text },
      { id: uid(), role: 'assistant', qaId: match?.id ?? null },
    ])
    setBusy(true)
    setPanelOpen(false)
  }, [busy])

  const onDone = useCallback(() => setBusy(false), [])

  const reset = () => {
    setMessages([])
    setBusy(false)
    setCategory(null)
    setPanelOpen(false)
  }

  const followUps = useMemo(() => {
    if (busy || !last || last.role !== 'assistant')
      return []
    const ids = last.qaId ? qaById(last.qaId)?.followUps ?? [] : fallbackFollowUps
    return ids.map(qaById).filter((qa): qa is QA => qa !== undefined && !askedIds.has(qa.id))
  }, [busy, last, askedIds])

  return (
    <section id="top" className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[90vh] overflow-hidden -z-10">
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2">
          <div className="bg-accent-bright/[0.14] animate-drift dark:bg-accent-bright/[0.10] h-[380px] w-[min(720px,90vw)] rounded-full blur-[90px]" />
        </div>
        <div className="absolute left-[18%] top-[34%]">
          <div className="animate-drift bg-glow-cool/[0.10] dark:bg-glow-cool/[0.14] [animation-delay:-9s] h-[300px] w-[min(520px,70vw)] rounded-full blur-[100px]" />
        </div>
      </div>

      <div className={`mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-3xl flex-col px-5 ${started ? 'pt-8' : 'justify-center py-14'}`}>
        <AnimatePresence initial={false} mode="popLayout">
          {!started && (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#experience"
                  className="border-line text-muted hover:text-ink bg-surface/70 mb-9 inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5 text-[13px] backdrop-blur transition-colors"
                >
                  <span className="size-2 relative flex">
                    <span className="bg-accent-bright size-full animate-pulse-ring absolute inline-flex rounded-full" />
                    <span className="size-2 bg-accent-bright relative inline-flex rounded-full" />
                  </span>
                  {profile.current}
                </a>
                <p className="text-muted text-2xl font-serif sm:text-[28px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={greeting} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {greeting}
                    </motion.span>
                  </AnimatePresence>
                </p>
                <h1 className="text-ink mt-1 text-[56px] leading-[1.05] tracking-tight font-serif sm:text-7xl">
                  {profile.name}
                </h1>
                <p className="text-muted mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed">
                  {profile.tagline}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {started && (
          <div className="flex-1 pb-8">
            <div className="border-line mb-8 flex items-center justify-between border-b pb-4">
              <p className="text-muted text-sm">
                Chatting with
                {' '}
                <span className="text-ink font-medium">{profile.name}</span>
              </p>
              <button
                type="button"
                onClick={reset}
                className="text-muted hover:bg-surface-2 hover:text-ink inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors"
              >
                <FiEdit className="size-3.5" aria-hidden />
                New chat
              </button>
            </div>
            <div className="space-y-7">
              {messages.map((message, index) => message.role === 'user'
                ? (
                  <div key={message.id} ref={index === lastQuestionIndex ? lastQuestionRef : undefined} className="scroll-mt-24">
                    <UserMessage text={message.text} />
                  </div>
                  )
                : (
                  <AssistantMessage
                    key={message.id}
                    answer={message.qaId ? qaById(message.qaId)?.answer ?? fallbackAnswer : fallbackAnswer}
                    animate={index === messages.length - 1}
                    stopSignal={stopSignal}
                    onDone={onDone}
                  />
                  ))}
            </div>
            {followUps.length > 0 && (
              <div className="mt-6 pl-10 sm:pl-11">
                <p className="text-muted mb-2.5 text-[13px]">Keep exploring</p>
                <div className="flex flex-wrap gap-2">
                  {followUps.map((qa, index) => (
                    <motion.button
                      key={qa.id}
                      type="button"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.06 }}
                      onClick={() => ask(qa.question, qa)}
                      className="border-line bg-surface text-ink hover:border-muted/40 hover:bg-surface-2 group inline-flex items-center gap-1.5 border rounded-xl px-3 py-2 text-left text-sm transition-colors"
                    >
                      {qa.question}
                      <FiArrowUpRight className="size-3.5 text-muted shrink-0 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <motion.div
          layout="position"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={started ? 'sticky bottom-4 z-20 pb-2' : 'mt-10'}
        >
          {started && (
            <div aria-hidden className="from-bg via-bg/95 pointer-events-none absolute inset-x-0 to-transparent bg-gradient-to-t -bottom-4 -top-8 -z-10" />
          )}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Composer
              inputRef={inputRef}
              busy={busy}
              askedIds={askedIds}
              category={category}
              panelOpen={panelOpen}
              placement={started ? 'above' : 'below'}
              placeholder={started ? 'Ask a follow-up…' : undefined}
              onPanelChange={onPanelChange}
              onAsk={ask}
              onStop={() => setStopSignal(signal => signal + 1)}
            />
          </motion.div>
        </motion.div>

        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:-mx-16">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onPanelChange(true, id)}
                  className="border-line text-muted hover:text-ink bg-surface/60 hover:bg-surface inline-flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-[13.5px] transition-colors"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
            <p className="text-muted/80 mt-6 text-center text-xs">
              Answers are pre-written by me and served instantly. Zero LLM calls, $0.00 per question.
            </p>
          </motion.div>
        )}
      </div>

      {!started && (
        <a
          href="#how-i-lead"
          aria-label="Scroll to learn more"
          className="text-muted hover:text-ink absolute bottom-6 left-1/2 hidden transition-colors sm:block -translate-x-1/2"
        >
          <FiArrowDown className="size-5 animate-nudge" aria-hidden />
        </a>
      )}
    </section>
  )
}
