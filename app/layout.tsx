import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getSettings } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()

  return {
    title: settings?.seoTitle || settings?.siteName || 'Azure Villa',
    description: settings?.seoDescription || 'A premium villa experience',
    keywords: settings?.seoKeywords?.join(', '),
    openGraph: {
      title: settings?.seoTitle || settings?.siteName,
      description: settings?.seoDescription,
      images: settings?.ogImage ? [urlFor(settings.ogImage).width(1200).height(630).url()] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seoTitle || settings?.siteName,
      description: settings?.seoDescription,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
