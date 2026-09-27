'use client'

import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { profile } from '@/data/profile'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
]

export function Monogram() {
  return (
    <span aria-hidden className="size-7 bg-accent grid place-items-center rounded-lg text-[15px] text-white font-semibold font-serif">
      {profile.firstName[0]}
    </span>
  )
}

function ThemeToggle() {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
    catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="size-9 text-muted hover:bg-surface-2 hover:text-ink grid place-items-center rounded-lg transition-colors"
    >
      <FiMoon className="size-[18px] dark:hidden" aria-hidden />
      <FiSun className="size-[18px] hidden dark:block" aria-hidden />
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${scrolled ? 'border-line/80 bg-bg/80 backdrop-blur-md' : 'border-transparent'}`}
    >
      <nav className="mx-auto h-16 max-w-5xl flex items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="text-ink flex items-center gap-2.5 text-[15px] font-medium">
          <Monogram />
          {profile.name}
        </a>
        <div className="flex items-center gap-1">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:bg-surface-2 hover:text-ink hidden rounded-lg px-3 py-1.5 text-sm transition-colors sm:block"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#contact"
            className="bg-ink text-bg ml-1 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-85"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
