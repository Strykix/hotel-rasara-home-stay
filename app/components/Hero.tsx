'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Star, MapPin, ArrowDown, Coffee, Leaf, Wifi, Snowflake, Car, Plane, Gift, Tag, Sun, TreePalm, Flower2, Footprints, UmbrellaBeach } from 'lucide-react'
import { HeroCard } from '@/lib/types'
import { Homepage, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { useRef } from 'react'

interface HeroProps {
  data: Homepage | null
  settings: SiteSettings | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'map-pin': MapPin,
  'umbrella-beach': UmbrellaBeach,
  'footprints': Footprints,
  'tag': Tag,
  'coffee': Coffee,
  'gift': Gift,
  'leaf': Leaf,
  'flower': Flower2,
  'tree-palm': TreePalm,
  'sun': Sun,
  'snowflake': Snowflake,
  'wifi': Wifi,
  'car': Car,
  'plane': Plane,
  'star': Star,
}

const cardStyles: Record<string, { bg: string; border: string; text: string; subtext: string; icon: string }> = {
  location: {
    bg: 'bg-white/95',
    border: 'border-white/50',
    text: 'text-neutral-900',
    subtext: 'text-neutral-600',
    icon: 'text-teal-600',
  },
  offer: {
    bg: 'bg-red-500/90',
    border: 'border-red-400/50',
    text: 'text-white',
    subtext: 'text-red-100',
    icon: 'text-white',
  },
  nature: {
    bg: 'bg-emerald-500/90',
    border: 'border-emerald-400/50',
    text: 'text-white',
    subtext: 'text-emerald-100',
    icon: 'text-white',
  },
  service: {
    bg: 'bg-neutral-800/95',
    border: 'border-neutral-600/50',
    text: 'text-white',
    subtext: 'text-neutral-300',
    icon: 'text-gold-400',
  },
}

export default function Hero({ data, settings }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  if (!data) return null

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[700px] flex items-center md:items-end overflow-hidden bg-neutral-900"
    >
      {/* Background Image with Parallax */}
      {data.heroImage && (
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={urlFor(data.heroImage).width(1920).height(1080).url()}
            alt={data.heroTitle || 'Villa'}
            fill
            priority
            className="object-cover scale-110"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-neutral-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-transparent" />
        </motion.div>
      )}

      {/* Hero Cards - floating on right */}
      <motion.div
        className="absolute top-24 right-4 md:right-8 lg:right-12 z-20 hidden md:flex flex-col gap-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Rating badge */}
        <div className="glass-card px-4 py-2.5 flex items-center gap-3 bg-white/10 backdrop-blur-xl border-white/20 rounded-xl">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="font-mono font-bold text-white text-sm">4.9</span>
          </div>
          <div className="w-px h-5 bg-white/20" />
          <span className="text-xs text-white/80">120+ reviews</span>
        </div>

        {/* Dynamic Hero Cards */}
        {data?.heroCards?.map((card, index) => {
          const style = cardStyles[card.type] || cardStyles.service
          const IconComponent = iconMap[card.icon || 'star'] || Star

          return (
            <motion.div
              key={index}
              className={`px-4 py-2.5 flex items-center gap-3 backdrop-blur-xl border rounded-xl ${style.bg} ${style.border}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <IconComponent className={`w-5 h-5 ${style.icon} flex-shrink-0`} />
              <div className="flex flex-col">
                <span className={`text-sm font-semibold leading-tight ${style.text}`}>
                  {card.text}
                </span>
                {card.subtext && (
                  <span className={`text-xs leading-tight ${style.subtext}`}>
                    {card.subtext}
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full pb-0 md:pb-20"
        style={{ opacity }}
      >
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6"
            >
              <MapPin className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-white/90">{data.heroHeadline || 'Sri Lanka'}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {data.heroTitle}
            </motion.h1>

            {/* Subtitle */}
            {data.heroSubtitle && (
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {data.heroSubtitle}
              </motion.p>
            )}

            {/* CTA Row */}
            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Price tag */}
              <div className="flex items-baseline gap-2 mr-2">
                <span className="text-white/60 text-sm">From</span>
                <span className="font-mono text-4xl md:text-5xl font-bold text-white">$120</span>
                <span className="text-white/60">/night</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {settings?.bookingUrl && (
                  <a
                    href={settings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-teal text-base"
                  >
                    {data.heroCta || 'Book Now'}
                  </a>
                )}

                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-base"
                  >
                    Contact
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Decorative gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
