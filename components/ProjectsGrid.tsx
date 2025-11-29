'use client'

import { projects } from '@/data/demo-data'
import ProjectCard from './ProjectCard'
import { useInView } from '@/hooks/useInView'

export default function ProjectsGrid() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="projects" ref={ref as any} className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
          Case Studies
        </h2>
        <p className="text-xl text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Real projects with measurable results
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

