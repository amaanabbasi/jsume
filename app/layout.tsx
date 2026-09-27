import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { company, education, profile } from '@/data/profile'
import './globals.css'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', display: 'swap', axes: ['opsz'] })

const title = `${profile.name} — ${profile.headline}`
const description = `${profile.headline}. ${profile.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    'Amaan Abbasi',
    'software engineer',
    'technical lead',
    'business systems',
    'cost optimization',
    'vendor management',
    'Business Central',
    'GST e-invoicing',
    'AI agents',
    'Python',
  ],
  authors: [{ name: profile.name, url: profile.site }],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: profile.site,
    siteName: profile.name,
    type: 'profile',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${profile.name}: ${profile.headline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@amaancypy',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F8FA' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
  ],
}

// Runs before paint so the saved or system theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': profile.name,
  'url': profile.site,
  'jobTitle': profile.title,
  'worksFor': { '@type': 'Organization', 'name': company },
  'description': description,
  'email': `mailto:${profile.email}`,
  'sameAs': Object.values(profile.links),
  'knowsAbout': [
    'Technical leadership',
    'Vendor management',
    'Requirements gathering',
    'Cost optimization',
    'Microsoft Dynamics 365 Business Central',
    'GST and e-invoicing',
    'CRM integrations',
    'AI agents',
    'Python',
  ],
  'alumniOf': education.map(item => ({ '@type': 'CollegeOrUniversity', 'name': item.school })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#top"
          className="bg-surface sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
