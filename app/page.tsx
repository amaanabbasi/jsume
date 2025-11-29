import Hero from '@/components/Hero'
import ProjectsGrid from '@/components/ProjectsGrid'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import WhyWorkWithMe from '@/components/WhyWorkWithMe'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsGrid />
      <TestimonialsCarousel />
      <WhyWorkWithMe />
      <ContactForm />
      <Footer />
    </main>
  )
}

