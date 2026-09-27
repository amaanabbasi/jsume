import ChatHero from '@/components/chat/ChatHero'
import Nav from '@/components/Nav'
import { Contact, Experience, Focus, Footer, Testimonials, Work } from '@/components/sections'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ChatHero />
        <Focus />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
