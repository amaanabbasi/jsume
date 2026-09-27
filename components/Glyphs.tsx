// Small looping illustrations for the focus cards. Animations live in globals.css and stop under reduced motion.

function AgentsGlyph() {
  const route = 'M30 70 L80 22 L130 70 Z'
  return (
    <svg viewBox="0 0 160 92" className="h-full w-full" aria-hidden>
      <path d={route} fill="none" className="stroke-muted/40" strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="30" cy="70" r="9" className="fill-surface stroke-muted/50" strokeWidth="1.5" />
      <circle cx="130" cy="70" r="9" className="fill-surface stroke-muted/50" strokeWidth="1.5" />
      <circle cx="80" cy="22" r="11" className="fill-accent-bright" />
      <circle r="3.5" className="fill-accent-bright glyph-motion">
        <animateMotion dur="3.6s" repeatCount="indefinite" path={route} />
      </circle>
    </svg>
  )
}

function SystemsGlyph() {
  return (
    <svg viewBox="0 0 160 92" className="h-full w-full" aria-hidden>
      <rect x="22" y="10" width="116" height="72" rx="12" className="fill-surface stroke-muted/40" strokeWidth="1.5" />
      <rect className="glyph-bar fill-ink/70" x="38" y="28" width="70" height="6" rx="3" />
      <rect className="glyph-bar fill-muted/50" x="38" y="42" width="84" height="6" rx="3" style={{ animationDelay: '0.35s' }} />
      <rect className="glyph-bar fill-accent-bright" x="38" y="56" width="46" height="6" rx="3" style={{ animationDelay: '0.7s' }} />
    </svg>
  )
}

function CostGlyph() {
  const curve = 'M20 22 C 50 24, 62 42, 84 50 S 118 64, 140 68'
  return (
    <svg viewBox="0 0 160 92" className="h-full w-full" aria-hidden>
      <path d="M20 80 H140" className="stroke-muted/40" strokeWidth="1.5" />
      <path d={`${curve} L140 80 L20 80 Z`} className="glyph-fade fill-accent-bright/15" />
      <path d={curve} pathLength={100} className="glyph-draw stroke-accent-bright" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="140" cy="68" r="4" className="glyph-fade fill-accent-bright" />
    </svg>
  )
}

export default function Glyph({ id }: { id: 'agents' | 'systems' | 'cost' }) {
  const Illustration = { agents: AgentsGlyph, systems: SystemsGlyph, cost: CostGlyph }[id]
  return (
    <div className="bg-surface-2/60 h-28 rounded-xl p-3">
      <Illustration />
    </div>
  )
}
