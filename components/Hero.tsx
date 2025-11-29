'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiCode } from 'react-icons/fi'
import SimpleSVGGlobe from './SimpleSVGGlobe'
import { useInView } from '@/hooks/useInView'

export default function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Centered content */}
          <motion.div
            ref={ref as any}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              Hi, I'm Amaan — your future tech partner.
            </h1>

            {/* Globe - centered above notepad */}
            <div className="flex items-center justify-center mb-6">
              <SimpleSVGGlobe />
            </div>

            {/* Notepad-style story container */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg shadow-lg p-6 md:p-8 relative text-left">
              {/* Notepad lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="h-full w-full" style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d97706 31px, #d97706 32px)',
                  backgroundPosition: '0 40px'
                }} />
              </div>
              
              {/* Red margin line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-300 opacity-40" />
              
              {/* Content */}
              <div className="relative z-10 space-y-4 font-serif">
                <p className="text-base md:text-lg text-slate-800 leading-relaxed" style={{ lineHeight: '32px' }}>
                  I've spent the last few years building software for companies across logistics, cloud infrastructure, and enterprise systems. But what truly shaped me wasn't the tech — it was the way people trusted me with their most critical projects.
                </p>
                <p className="text-base md:text-lg text-slate-800 leading-relaxed" style={{ lineHeight: '32px' }}>
                  Clients often describe me as "the calm problem-solver who sees around the corner." Someone who brings patience when projects get chaotic, and clarity when teams are juggling multiple priorities.
                </p>
                <p className="text-base md:text-lg text-slate-800 leading-relaxed" style={{ lineHeight: '32px' }}>
                  Colleagues who've managed me say I'm the "go-getter who can be trusted with the hard problems." The kind of person who doesn't just write code — I take ownership, understand the business, and deliver outcomes that matter.
                </p>
                <p className="text-base md:text-lg text-slate-800 leading-relaxed" style={{ lineHeight: '32px' }}>
                  Over the years, I've improved systems that handle tens of millions of logs, migrated legacy apps into modern frameworks, and built cloud-based solutions that scale without drama. I've learned how to break down ambiguity, simplify complexity, and turn raw ideas into working software.
                </p>
                <p className="text-base md:text-lg text-slate-800 leading-relaxed font-semibold" style={{ lineHeight: '32px' }}>
                  I don't aim to be "your developer." I aim to be your tech partner — the person who helps you validate ideas, architect solutions, pick the right tech, build the MVP, and scale.
                </p>
              </div>
            </div>

            {/* CTA Buttons - centered */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Let's build — Book a quick call
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl border-2 border-primary-600 transition-all duration-300 transform hover:scale-105"
              >
                <FiCode className="mr-2" />
                See my work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

