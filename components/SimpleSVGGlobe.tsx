'use client'

export default function SimpleSVGGlobe() {
  return (
    <div className="relative w-16 h-16">
      {/* SVG Globe */}
      <svg
        className="w-full h-full animate-float"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Globe icon"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="url(#globeGradient)" />
        
        {/* Latitude lines */}
        <ellipse cx="50" cy="30" rx="35" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="40" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
        <ellipse cx="50" cy="70" rx="35" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
        
        {/* Longitude lines */}
        <path
          d="M 15 50 Q 50 30, 85 50"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 15 50 Q 50 50, 85 50"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 15 50 Q 50 70, 85 50"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Orbiting emoji */}
      <span
        className="absolute text-xl animate-orbit"
        style={{
          top: '50%',
          left: '50%',
          transformOrigin: '0 0',
          marginTop: '-10px',
          marginLeft: '-10px',
        }}
        aria-hidden="true"
      >
        🚀
      </span>
    </div>
  )
}

