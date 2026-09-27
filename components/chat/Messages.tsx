'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import RichText from './RichText'
import { blocksLength, parseAnswer } from '@/lib/chat'
import { profile } from '@/data/profile'

const CHARS_PER_SECOND = 170

export function UserMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-end"
    >
      <p className="bg-surface-2 text-ink max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed">
        {text}
      </p>
    </motion.div>
  )
}

type Phase = 'typing' | 'streaming' | 'done'

interface AssistantMessageProps {
  answer: string
  /** Only the newest answer streams; earlier ones render in full. */
  animate: boolean
  /** Incremented by the stop button to finish the current answer immediately. */
  stopSignal: number
  onDone: () => void
}

export function AssistantMessage({ answer, animate, stopSignal, onDone }: AssistantMessageProps) {
  const reduceMotion = useReducedMotion()
  const blocks = useMemo(() => parseAnswer(answer), [answer])
  const total = useMemo(() => blocksLength(blocks), [blocks])
  const instant = !animate || reduceMotion
  const [phase, setPhase] = useState<Phase>(instant ? 'done' : 'typing')
  const [shown, setShown] = useState(instant ? total : 0)
  const initialStopSignal = useRef(stopSignal)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (phase !== 'typing')
      return
    const timer = window.setTimeout(() => setPhase('streaming'), 650 + Math.random() * 450)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'streaming')
      return
    let frame = 0
    let last = performance.now()
    let position = 0
    const tick = (now: number) => {
      // Slight jitter so it reads like a person typing fast rather than a progress bar.
      position = Math.min(total, position + ((now - last) / 1000) * CHARS_PER_SECOND * (0.6 + Math.random() * 0.8))
      last = now
      setShown(Math.floor(position))
      if (position >= total)
        setPhase('done')
      else
        frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase, total])

  useEffect(() => {
    if (stopSignal === initialStopSignal.current)
      return
    setShown(total)
    setPhase('done')
  }, [stopSignal, total])

  useEffect(() => {
    if (phase === 'done')
      onDoneRef.current()
  }, [phase])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1 }}
      className="flex gap-3 sm:gap-4"
    >
      <span
        aria-hidden
        className="size-7 bg-accent text-accent-ink grid mt-0.5 shrink-0 place-items-center rounded-full text-sm font-semibold font-serif"
      >
        {profile.firstName[0]}
      </span>
      <div className="min-w-0 flex-1" aria-live="polite" aria-busy={phase !== 'done'}>
        {phase === 'typing'
          ? (
            <p className="text-shimmer pt-1 text-[15px] font-medium">
              {profile.firstName}
              {' '}
              is typing…
            </p>
            )
          : (
            <div className="text-ink prose-chat text-[17px] leading-[1.7] font-serif">
              <RichText blocks={blocks} limit={shown} streaming={phase === 'streaming'} />
            </div>
            )}
      </div>
    </motion.div>
  )
}
