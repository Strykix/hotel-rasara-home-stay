'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export default function WhatsAppButton({
  phone,
  message = "Hello! I'm interested in booking...",
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true)
      }, 3000)

      const hideTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 8000)

      return () => {
        clearTimeout(tooltipTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [isVisible])

  if (!phone) return null

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 lg:bottom-6"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-full right-0 mb-3"
              >
                <div className="relative bg-white px-4 py-3 rounded-2xl shadow-card-hover text-sm text-neutral-700 whitespace-nowrap">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-medium">Need help?</span> Chat with us!
                  <div className="absolute bottom-0 right-5 translate-y-full">
                    <div className="border-8 border-transparent border-t-white" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </a>

          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-2xl bg-green-500 animate-ping opacity-20 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
