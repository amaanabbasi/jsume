'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowUp, FiSquare, FiX, FiZap } from 'react-icons/fi'
import { type CategoryId, type QA, categories, placeholderPrompts, popularIds, qaById, qas } from '@/data/chat'
import { profile } from '@/data/profile'

function useTypingPlaceholder(active: boolean) {
  const reduceMotion = useReducedMotion()
  const [text, setText] = useState(placeholderPrompts[0])

  useEffect(() => {
    if (!active || reduceMotion) {
      setText(placeholderPrompts[0])
      return
    }
    let index = 0
    let length = placeholderPrompts[0].length
    let mode: 'hold' | 'delete' | 'type' = 'hold'
    let timer = 0
    const step = () => {
      if (mode === 'hold') {
        mode = 'delete'
        timer = window.setTimeout(step, 2400)
        return
      }
      if (mode === 'delete') {
        length -= 1
        setText(placeholderPrompts[index].slice(0, length))
        if (length <= 0) {
          index = (index + 1) % placeholderPrompts.length
          mode = 'type'
        }
        timer = window.setTimeout(step, 18)
        return
      }
      length += 1
      setText(placeholderPrompts[index].slice(0, length))
      if (length >= placeholderPrompts[index].length)
        mode = 'hold'
      timer = window.setTimeout(step, 42)
    }
    timer = window.setTimeout(step, 0)
    return () => window.clearTimeout(timer)
  }, [active, reduceMotion])

  return text
}

interface ComposerProps {
  inputRef: RefObject<HTMLTextAreaElement>
  busy: boolean
  askedIds: Set<string>
  category: CategoryId | null
  panelOpen: boolean
  /** Where the suggestion panel opens: below on the landing view, above once the composer sits at the bottom. */
  placement: 'below' | 'above'
  /** Static placeholder; when omitted the placeholder types out example questions. */
  placeholder?: string
  onPanelChange: (open: boolean, category?: CategoryId | null) => void
  onAsk: (text: string, qa?: QA) => void
  onStop: () => void
}

export default function Composer({
  inputRef,
  busy,
  askedIds,
  category,
  panelOpen,
  placement,
  placeholder,
  onPanelChange,
  onAsk,
  onStop,
}: ComposerProps) {
  const [value, setValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const typedPlaceholder = useTypingPlaceholder(!value && !placeholder)

  const activeCategory = categories.find(c => c.id === category)
  const suggestions = useMemo(() => {
    if (category)
      return qas.filter(qa => qa.category === category)
    const popular = popularIds.map(qaById).filter((qa): qa is QA => Boolean(qa))
    const unasked = popular.filter(qa => !askedIds.has(qa.id))
    return unasked.length ? unasked : popular
  }, [category, askedIds])

  const showPanel = panelOpen && !busy && suggestions.length > 0

  useEffect(() => {
    setActiveIndex(-1)
  }, [category, panelOpen])

  useEffect(() => {
    if (!panelOpen)
      return
    const close = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node))
        onPanelChange(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [panelOpen, onPanelChange])

  useEffect(() => {
    const input = inputRef.current
    if (!input)
      return
    input.style.height = 'auto'
    input.style.height = `${Math.min(input.scrollHeight, 200)}px`
  }, [value, inputRef])

  const submit = () => {
    const text = value.trim()
    if (!text || busy)
      return
    onAsk(text)
    setValue('')
  }

  const pick = (qa: QA) => {
    onAsk(qa.question, qa)
    setValue('')
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showPanel && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex(i => (i + step + suggestions.length) % suggestions.length)
      return
    }
    if (event.key === 'Escape') {
      onPanelChange(false)
      return
    }
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      if (showPanel && activeIndex >= 0)
        pick(suggestions[activeIndex])
      else
        submit()
    }
  }

  const canSend = value.trim().length > 0

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="border-line bg-surface shadow-composer focus-within:border-muted/40 border rounded-[22px] transition-colors">
        <div className="relative">
          {!value && (
            <span aria-hidden className="text-muted pointer-events-none absolute inset-x-5 top-4 truncate text-[16px]">
              {placeholder ?? (
                <>
                  {typedPlaceholder}
                  <span className="bg-muted animate-caret ml-px inline-block h-[1.1em] w-px translate-y-[0.2em]" />
                </>
              )}
            </span>
          )}
          <textarea
            ref={inputRef}
            rows={1}
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => onPanelChange(true)}
            aria-label={`Ask ${profile.firstName} a question`}
            role="combobox"
            aria-expanded={showPanel}
            aria-controls="chat-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={showPanel && activeIndex >= 0 ? `suggestion-${suggestions[activeIndex].id}` : undefined}
            className="text-ink block max-h-[200px] w-full resize-none bg-transparent px-5 pt-4 text-[16px] leading-6 outline-none"
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-2">
          <button
            type="button"
            onClick={() => onPanelChange(!showPanel || category !== null, null)}
            className="border-line text-muted hover:bg-surface-2 hover:text-ink inline-flex items-center gap-1.5 border rounded-lg px-2.5 py-1.5 text-[13px] transition-colors"
          >
            <FiZap className="size-3.5" aria-hidden />
            Suggestions
          </button>
          <button
            type="button"
            onClick={busy ? onStop : submit}
            disabled={!busy && !canSend}
            aria-label={busy ? 'Stop answer' : 'Send question'}
            className="size-9 bg-accent disabled:bg-surface-2 disabled:text-muted grid place-items-center rounded-xl text-white transition-all active:scale-95 disabled:cursor-default hover:brightness-110 disabled:active:scale-100 disabled:hover:brightness-100"
          >
            {busy
              ? <FiSquare className="size-3.5 fill-current" aria-hidden />
              : <FiArrowUp className="size-[18px]" strokeWidth={2.5} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: placement === 'below' ? -6 : 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'below' ? -6 : 6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute inset-x-0 z-30 overflow-hidden rounded-2xl border border-line bg-surface shadow-composer ${placement === 'below' ? 'top-full mt-2' : 'bottom-full mb-2'}`}
          >
            <div className="text-muted flex items-center justify-between px-4 pb-1 pt-3 text-[13px]">
              <span className="inline-flex items-center gap-1.5">
                {activeCategory
                  ? (
                    <>
                      <activeCategory.icon className="size-3.5" aria-hidden />
                      {activeCategory.label}
                    </>
                    )
                  : 'Popular questions'}
              </span>
              <button
                type="button"
                onClick={() => onPanelChange(false)}
                aria-label="Close suggestions"
                className="hover:bg-surface-2 hover:text-ink size-6 grid place-items-center rounded-md transition-colors"
              >
                <FiX className="size-3.5" aria-hidden />
              </button>
            </div>
            <ul id="chat-suggestions" role="listbox" aria-label="Suggested questions" className="p-1.5">
              {suggestions.map((qa, index) => {
                const Icon = categories.find(c => c.id === qa.category)?.icon ?? FiZap
                return (
                  <motion.li
                    key={qa.id}
                    id={`suggestion-${qa.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={event => event.preventDefault()}
                    onClick={() => pick(qa)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors ${index === activeIndex ? 'bg-surface-2 text-ink' : 'text-ink/85'}`}
                  >
                    <Icon className="size-4 text-muted shrink-0" aria-hidden />
                    <span className="flex-1">{qa.question}</span>
                    {askedIds.has(qa.id) && <span className="text-muted text-xs">asked</span>}
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
