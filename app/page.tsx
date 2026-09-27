import ChatHero from '@/components/chat/ChatHero'
import Nav from '@/components/Nav'
import { Contact, Experience, Focus, Footer, HowILead, QuickAnswers, Testimonials, Work } from '@/components/sections'
import { qas } from '@/data/chat'
import { plainText } from '@/lib/chat'

// The chat's answers as structured Q&A, so search engines and AI assistants can read them without opening the chat.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': qas.map(qa => ({
    '@type': 'Question',
    'name': qa.question,
    'acceptedAnswer': { '@type': 'Answer', 'text': plainText(qa.answer) },
  })),
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ChatHero />
        <HowILead />
        <Work />
        <Focus />
        <Experience />
        <Testimonials />
        <QuickAnswers />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
