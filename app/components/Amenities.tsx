'use client'

import { motion } from 'framer-motion'
import { Homepage, AmenityCategory } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import {
  Sun,
  Home,
  Bell,
  Sparkles,
  Utensils,
  Wifi,
  Car,
  Shield,
  Check,
} from 'lucide-react'

interface AmenitiesProps {
  data: Homepage | null
  categories: AmenityCategory[]
}

const iconMap: Record<string, React.ElementType> = {
  sun: Sun,
  home: Home,
  bell: Bell,
  spa: Sparkles,
  utensils: Utensils,
  wifi: Wifi,
  car: Car,
  shield: Shield,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Amenities({ data, categories }: AmenitiesProps) {
  if (!categories || categories.length === 0) return null

  return (
    <section id="amenities" className="section bg-neutral-900 text-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionTitle
          title={data?.amenitiesTitle || 'Villa Amenities'}
          subtitle={data?.amenitiesSubtitle || 'What We Offer'}
          light
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon || 'home'] || Home
            return (
              <motion.div
                key={category._id}
                variants={itemVariants}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] bento-card bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-glow">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">{category.name}</h3>
                </div>

                {category.items && category.items.length > 0 && (
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-neutral-300"
                      >
                        <Check className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
