'use client'

import { motion } from 'framer-motion'
import { SiteSettings } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import { Mail, Phone, MessageCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react'

interface ContactProps {
  settings: SiteSettings | null
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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Contact({ settings }: ContactProps) {
  if (!settings) return null

  return (
    <section id="contact" className="section bg-neutral-50">
      <div className="container-custom max-w-5xl">
        <SectionTitle
          title="Get in Touch"
          subtitle="Contact Us"
          description="Ready to book your stay or have questions? We're here to help."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-glow">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium text-neutral-900 group-hover:text-teal-700 transition-colors">{settings.email}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-teal-600 transition-colors" />
              </a>
            )}

            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-glow">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Phone</p>
                  <p className="font-medium text-neutral-900 group-hover:text-teal-700 transition-colors">{settings.phone}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-teal-600 transition-colors" />
              </a>
            )}

            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello! I'm interested in booking...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">WhatsApp</p>
                  <p className="font-medium text-neutral-900 group-hover:text-green-600 transition-colors">Message us directly</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-green-600 transition-colors" />
              </a>
            )}

            {/* Social Links */}
            {(settings.instagram || settings.facebook) && (
              <div className="flex gap-3 pt-2">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Booking CTA */}
          <motion.div
            variants={itemVariants}
            className="bento-card bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white text-center flex flex-col justify-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Ready to Book?</h3>
              <p className="text-neutral-300 mb-8 max-w-sm mx-auto">
                Secure your tropical getaway today. We offer flexible booking options and personalized service.
              </p>

              <div className="space-y-3">
                {settings.bookingUrl && (
                  <a
                    href={settings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-teal w-full justify-center text-base"
                  >
                    Book on Booking.com
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {settings.airbnbUrl && (
                  <a
                    href={settings.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full justify-center text-base"
                  >
                    Book on Airbnb
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
