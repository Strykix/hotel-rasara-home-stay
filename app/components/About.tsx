'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Homepage } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import {
  Palmtree,
  Waves,
  Users,
  Heart,
  Sun,
  Utensils,
  Wifi,
  Car,
  Plane,
  MapPin,
  Star,
  ArrowUpRight,
} from 'lucide-react'

interface AboutProps {
  data: Homepage | null
}

const iconMap: Record<string, React.ElementType> = {
  palmtree: Palmtree,
  waves: Waves,
  users: Users,
  heart: Heart,
  pool: Waves,
  sun: Sun,
  utensils: Utensils,
  wifi: Wifi,
  car: Car,
  plane: Plane,
  location: MapPin,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function About({ data }: AboutProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get images array - use aboutImages if available, otherwise fallback to single aboutImage
  const images = data?.aboutImages && data.aboutImages.length > 0
    ? data.aboutImages
    : data?.aboutImage
      ? [data.aboutImage]
      : []

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  if (!data) return null

  return (
    <section id="about" className="section bg-slate-50 overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <span className="eyebrow mb-4 block">About</span>
          <h2 className="text-slate-900 mb-6">{data.aboutTitle || 'Welcome'}</h2>
          {data.aboutDescription && (
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {data.aboutDescription}
            </p>
          )}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Large feature image card with auto-sliding carousel */}
          {images.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            >
              {/* Auto-sliding images */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={urlFor(images[currentImageIndex]).width(1000).height(800).url()}
                    alt={`${data.aboutTitle || 'About'} - ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

              {/* Slide indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-24 md:bottom-28 left-6 md:left-8 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-1.5 bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-2">
                  {data.aboutSubtitle || 'Your Perfect Escape'}
                </h3>
                <p className="text-white/80 max-w-md hidden md:block">
                  Experience luxury and tranquility in our carefully designed spaces
                </p>
              </div>
            </motion.div>
          )}

          {/* Stats card */}
          <motion.div
            variants={itemVariants}
            className="bento-card bg-slate-900 text-white flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-sm text-slate-400">Guest Rating</span>
              </div>
              <div className="font-mono text-5xl md:text-6xl font-bold mb-2">4.9</div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sm">Based on 120+ reviews</span>
            </div>
          </motion.div>

          {/* Location card */}
          <motion.div
            variants={itemVariants}
            className="bento-card bg-gradient-to-br from-azure-500 to-azure-600 text-white flex flex-col justify-between min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-xl font-semibold mb-1">Prime Location</h4>
              <p className="text-white/80 text-sm">Steps from the beach, minutes from everything</p>
            </div>
          </motion.div>

          {/* Highlights cards */}
          {data.aboutHighlights && data.aboutHighlights.slice(0, 3).map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || Heart
            const bgColors = ['bg-coral-500', 'bg-emerald-500', 'bg-slate-800']

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bento-card ${bgColors[index % bgColors.length]} text-white flex flex-col justify-between min-h-[180px]`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.a
            href="#rooms"
            variants={itemVariants}
            className="bento-card bg-white border-2 border-slate-200 hover:border-azure-500 flex items-center justify-between group cursor-pointer min-h-[120px]"
          >
            <div>
              <h4 className="font-heading text-xl font-semibold text-slate-900 mb-1">
                Explore Rooms
              </h4>
              <p className="text-slate-500 text-sm">See all our accommodations</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-azure-500 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
