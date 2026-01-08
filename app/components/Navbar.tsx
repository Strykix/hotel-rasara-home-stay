'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { Menu, X, ArrowUpRight } from 'lucide-react'

interface NavbarProps {
  settings: SiteSettings | null
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-glass border border-neutral-200/50'
                : 'bg-white/5 backdrop-blur-sm border border-white/10'
            }`}
          >
            {/* Logo */}
            <a href="#" className="relative z-50 flex items-center gap-3">
              {settings?.logo ? (
                <Image
                  src={urlFor(settings.logo).width(120).height(40).url()}
                  alt={settings.siteName || 'Logo'}
                  width={120}
                  height={40}
                  className={isScrolled ? '' : 'brightness-0 invert'}
                />
              ) : (
                <span
                  className={`font-heading text-xl font-semibold ${
                    isScrolled ? 'text-neutral-900' : 'text-white'
                  }`}
                >
                  {settings?.siteName || 'Azure Villa'}
                </span>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isScrolled
                      ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {settings?.bookingUrl && (
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isScrolled
                      ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-button'
                      : 'bg-white text-neutral-900 hover:bg-white/90'
                  }`}
                >
                  Book Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-neutral-900 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-neutral-900 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading font-semibold text-white hover:text-teal-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              {settings?.bookingUrl && (
                <motion.a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                  className="btn-teal mt-6"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky booking bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-xl border-t border-neutral-200 px-4 py-3 safe-area-pb"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-500">Starting from</p>
            <p className="font-mono font-bold text-xl text-neutral-900">
              $120 <span className="text-sm font-normal text-neutral-500">/night</span>
            </p>
          </div>
          {settings?.bookingUrl && (
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[180px] py-3 bg-teal-700 text-white text-center font-medium rounded-full hover:bg-teal-800 transition-colors shadow-button"
            >
              Book Now
            </a>
          )}
        </div>
      </motion.div>
    </>
  )
}
