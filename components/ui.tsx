'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { FOCUS_CHAT_EVENT } from '@/lib/chat'

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode, delay?: number, className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Counts a metric like "−40%" or "99.9%" up from zero when it first becomes visible. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match || !inView || reduceMotion)
      return
    const [, prefix, digits, suffix] = match
    const target = Number.parseFloat(digits)
    const decimals = digits.split('.')[1]?.length ?? 0
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
      if (progress < 1)
        frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, value])

  return <span ref={ref} className="tabular-nums">{display}</span>
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string, title: string, intro?: string }) {
  return (
    <Reveal>
      <p className="text-accent-text text-sm font-medium">{eyebrow}</p>
      <h2 className="text-ink mt-3 max-w-2xl text-balance text-4xl leading-[1.1] tracking-tight font-serif sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">{intro}</p>}
    </Reveal>
  )
}

export function AskChatButton({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(FOCUS_CHAT_EVENT))}>
      {children}
    </button>
  )
}
