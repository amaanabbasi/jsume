'use client'

import { useEffect, useState } from 'react'
import { testimonials } from '@/data/demo-data'
import { useInView } from '@/hooks/useInView'

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, isInView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section ref={ref as any} className="py-20 bg-slate-100">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">
          What People Say
        </h2>

        <div className="max-w-4xl mx-auto relative">
          <div
            key={currentIndex}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-500"
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-indigo-500/10 backdrop-blur-sm" />
            
            <div className="relative z-10">
              <div className="text-6xl md:text-7xl text-primary-500/30 font-serif leading-none mb-4">
                "
              </div>
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic mb-6">
                {testimonials[currentIndex].text}
              </p>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-primary-600'
                        : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

