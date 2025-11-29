'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { Project } from '@/data/demo-data'
import { useTilt } from '@/hooks/useTilt'
import { useInView } from '@/hooks/useInView'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const tilt = useTilt({ max: 10, scale: 1.02 })
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref as any}
      className={`opacity-0 transition-opacity duration-600 ${
        isInView ? 'opacity-100' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          ref={tilt.ref}
          style={tilt.style}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col cursor-pointer w-full max-w-sm"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-indigo-100">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 mb-4 flex-1">
              {project.description}
            </p>

            {/* Problem, Solution, Result */}
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs font-semibold text-primary-600 uppercase">
                  Problem
                </span>
                <p className="text-sm text-slate-600">
                  {project.problem}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary-600 uppercase">
                  Solution
                </span>
                <p className="text-sm text-slate-600">
                  {project.solution}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary-600 uppercase">
                  Result
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Read more */}
            <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
              <span>Read more</span>
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

