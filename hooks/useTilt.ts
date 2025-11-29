'use client'

import { useRef, useState, MouseEvent } from 'react'

interface TiltOptions {
  max?: number
  perspective?: number
  scale?: number
}

export function useTilt(options: TiltOptions = {}) {
  const { max = 15, perspective = 1000, scale = 1.05 } = options
  const [style, setStyle] = useState<React.CSSProperties>({})
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -max
    const rotateY = ((x - centerX) / centerX) * max

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'none',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
      transition: 'transform 0.5s ease-out',
    })
  }

  return {
    ref: cardRef,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}

