'use client'

import { FiCheckCircle, FiUsers, FiTarget, FiZap, FiShield } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const features = [
  {
    icon: FiTarget,
    title: 'Outcome-Focused',
    description: 'I don\'t just write code — I deliver measurable business results.',
  },
  {
    icon: FiUsers,
    title: 'Trusted Partner',
    description: 'Clients trust me with their most critical projects and complex challenges.',
  },
  {
    icon: FiZap,
    title: 'Fast Execution',
    description: 'From idea to MVP in weeks, not months. Rapid iteration and delivery.',
  },
  {
    icon: FiShield,
    title: 'Reliable & Scalable',
    description: 'Built systems handling millions of requests. Zero-downtime deployments.',
  },
]

export default function WhyWorkWithMe() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={ref as any} className="py-20 bg-slate-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
          Why Work With Me
        </h2>
        <p className="text-xl text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          What sets me apart as your tech partner
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`opacity-0 transition-opacity duration-600 ${
                  isInView ? 'opacity-100' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

