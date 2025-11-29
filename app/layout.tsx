import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amaan — Your Tech Partner',
  description:
    'Tech partner for building scalable software solutions. Specializing in cloud infrastructure, enterprise systems, and modern web applications.',
  keywords: [
    'software developer',
    'tech partner',
    'full stack developer',
    'cloud infrastructure',
    'enterprise software',
  ],
  authors: [{ name: 'Amaan' }],
  openGraph: {
    title: 'Amaan — Your Tech Partner',
    description:
      'Tech partner for building scalable software solutions. Specializing in cloud infrastructure, enterprise systems, and modern web applications.',
    url: 'https://amaanabbasi.me',
    siteName: 'Amaan Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amaan — Your Tech Partner',
    description:
      'Tech partner for building scalable software solutions. Specializing in cloud infrastructure, enterprise systems, and modern web applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

