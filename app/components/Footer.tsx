'use client'

import { motion } from 'framer-motion'
import { SiteSettings } from '@/lib/types'
import { Instagram, Facebook, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#rooms', label: 'Rooms' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              {settings?.siteName || 'Azure Villa'}
            </h3>
            {settings?.tagline && (
              <p className="text-neutral-400 mb-6 leading-relaxed">{settings.tagline}</p>
            )}

            {/* Social Links */}
            {(settings?.instagram || settings?.facebook) && (
              <div className="flex gap-3">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Contact</h4>
            <ul className="space-y-4 text-neutral-400">
              {settings?.address && (
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-400" />
                  <span>
                    {settings.address.line1 && <>{settings.address.line1}<br /></>}
                    {settings.address.city && <>{settings.address.city}, </>}
                    {settings.address.country}
                  </span>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex gap-3 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0 text-teal-400" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="flex gap-3 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0 text-teal-400" />
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Book Your Stay</h4>
            <div className="space-y-3">
              {settings?.bookingUrl && (
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors group"
                >
                  Booking.com
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {settings?.airbnbUrl && (
                <a
                  href={settings.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors group"
                >
                  Airbnb
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {settings?.tripadvisor && (
                <a
                  href={settings.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors group"
                >
                  TripAdvisor
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>
            &copy; {currentYear} {settings?.siteName || 'Azure Villa'}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
