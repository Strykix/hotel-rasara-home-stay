'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Room, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import Modal from './ui/Modal'
import { Users, Maximize, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

interface RoomsProps {
  rooms: Room[]
  settings?: SiteSettings | null
}

const bedTypeLabels: Record<string, string> = {
  king: 'King Size Bed',
  queen: 'Queen Size Bed',
  twin: 'Twin Beds',
  single: 'Single Bed',
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

export default function Rooms({ rooms, settings }: RoomsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!rooms || rooms.length === 0) return null

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      )
    }
  }

  const handleRoomClick = (room: Room, e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }
    e.preventDefault()
    setSelectedRoom(room)
    setCurrentImageIndex(0)
  }

  return (
    <section id="rooms" className="section bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Accommodations"
          subtitle="Our Rooms"
          description="Discover our beautifully appointed rooms, each designed for your comfort and relaxation."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {rooms.map((room) => (
            <motion.div key={room._id} variants={itemVariants} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
              <Link
                href={`/rooms/${room.slug?.current || room._id}`}
                onClick={(e) => handleRoomClick(room, e)}
                className="group block card overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {room.images && room.images[0] && (
                    <Image
                      src={urlFor(room.images[0]).width(600).height(450).url()}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="btn-ghost text-sm">
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-teal-700 transition-colors">
                    {room.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                    {room.capacity && (
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-teal-600" />
                        {room.capacity} guests
                      </span>
                    )}
                    {room.size && (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-teal-600" />
                        {room.size}
                      </span>
                    )}
                  </div>

                  {room.bedType && (
                    <span className="badge-teal text-xs">
                      {bedTypeLabels[room.bedType]}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Room Detail Modal - Desktop only */}
      <Modal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
      >
        {selectedRoom && (
          <div className="bg-white rounded-3xl overflow-hidden">
            {/* Image Gallery */}
            <div className="relative aspect-video">
              <AnimatePresence mode="wait">
                {selectedRoom.images && selectedRoom.images[currentImageIndex] && (
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={urlFor(selectedRoom.images[currentImageIndex])
                        .width(1200)
                        .height(675)
                        .url()}
                      alt={selectedRoom.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {selectedRoom.images && selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-neutral-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-neutral-900" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedRoom.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(idx)
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                {selectedRoom.name}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-6">
                {selectedRoom.capacity && (
                  <span className="flex items-center gap-2 badge">
                    <Users className="w-4 h-4 text-teal-600" />
                    Up to {selectedRoom.capacity} guests
                  </span>
                )}
                {selectedRoom.size && (
                  <span className="flex items-center gap-2 badge">
                    <Maximize className="w-4 h-4 text-teal-600" />
                    {selectedRoom.size}
                  </span>
                )}
                {selectedRoom.bedType && (
                  <span className="badge-teal">
                    {bedTypeLabels[selectedRoom.bedType]}
                  </span>
                )}
              </div>

              {selectedRoom.description && (
                <p className="text-neutral-600 mb-6 leading-relaxed">{selectedRoom.description}</p>
              )}

              {/* Features */}
              {selectedRoom.features && selectedRoom.features.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-heading font-semibold text-neutral-900 mb-4">Room Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="tag"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              {settings?.bookingUrl && (
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-teal w-full justify-center text-base"
                >
                  Book This Room
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
