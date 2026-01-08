'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaqItem } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import { ChevronDown, Plus, Minus } from 'lucide-react'

interface FAQProps {
  items: FaqItem[]
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section bg-white">
      <div className="container-custom max-w-3xl">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="FAQ"
          description="Find answers to common questions about your stay at our villa."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'bg-teal-50 border border-teal-200'
                  : 'bg-neutral-50 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-heading font-semibold pr-8 transition-colors ${
                  openIndex === index ? 'text-teal-800' : 'text-neutral-900'
                }`}>
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === index
                    ? 'bg-teal-600 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-neutral-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
