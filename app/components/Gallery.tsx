'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import Modal from './ui/Modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryProps {
  images: GalleryImage[]
}

const categoryLabels: Record<string, string> = {
  villa: 'Villa',
  pool: 'Pool',
  rooms: 'Rooms',
  interior: 'Interior',
  garden: 'Garden',
  views: 'Views',
  surroundings: 'Surroundings',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  if (!images || images.length === 0) return null

  const uniqueCategories = Array.from(new Set(images.map((img) => img.category).filter((c): c is string => Boolean(c))))
  const categories: string[] = ['all', ...uniqueCategories]

  const filteredImages =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter)

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1
      )
    }
  }

  return (
    <section id="gallery" className="section bg-neutral-50">
      <div className="container-custom">
        <SectionTitle
          title="Gallery"
          subtitle="Visual Tour"
          description="Explore our stunning villa through our curated collection of photographs."
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-neutral-900 text-white shadow-lg'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {category === 'all' ? 'All' : categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl group ${
                  image.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={urlFor(image.image)
                      .width(image.featured ? 800 : 400)
                      .height(image.featured ? 800 : 400)
                      .url()}
                    alt={image.alt || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category && (
                      <span className="badge-teal text-xs">
                        {categoryLabels[image.category] || image.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={selectedIndex !== null} onClose={closeModal}>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <div className="relative flex items-center justify-center min-h-[50vh] bg-neutral-900 p-4">
            <Image
              src={urlFor(filteredImages[selectedIndex].image)
                .width(1400)
                .fit('max')
                .url()}
              alt={filteredImages[selectedIndex].alt || 'Gallery image'}
              width={1400}
              height={1050}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
              style={{ width: 'auto', height: 'auto' }}
            />

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-mono">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
