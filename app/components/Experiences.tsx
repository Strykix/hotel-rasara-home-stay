'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Homepage, Experience } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import { Clock, MapPin } from 'lucide-react'

interface ExperiencesProps {
  data: Homepage | null
  experiences: Experience[]
}

const tagLabels: Record<string, string> = {
  adventure: 'Adventure',
  culture: 'Culture',
  wildlife: 'Wildlife',
  'water-sports': 'Water Sports',
  family: 'Family',
  'food-drink': 'Food & Drink',
  history: 'History',
  photography: 'Photography',
  relaxation: 'Relaxation',
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

export default function Experiences({ data, experiences }: ExperiencesProps) {
  if (!experiences || experiences.length === 0) return null

  return (
    <section id="experiences" className="section bg-white">
      <div className="container-custom">
        <SectionTitle
          title={data?.experiencesTitle || 'Local Experiences'}
          subtitle={data?.experiencesSubtitle || 'Discover'}
          description={data?.experiencesDescription}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience._id}
              variants={itemVariants}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group card overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {experience.image && (
                  <Image
                    src={urlFor(experience.image).width(600).height(450).url()}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />

                {/* Tags */}
                {experience.tags && experience.tags.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {experience.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-neutral-800 rounded-full"
                      >
                        {tagLabels[tag] || tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-3 group-hover:text-teal-700 transition-colors">
                  {experience.title}
                </h3>

                <div className="flex flex-wrap gap-3 mb-4">
                  {experience.duration && (
                    <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                      <Clock className="w-4 h-4 text-teal-600" />
                      {experience.duration}
                    </span>
                  )}
                  {experience.distance && (
                    <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      {experience.distance}
                    </span>
                  )}
                </div>

                {experience.description && (
                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {experience.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
