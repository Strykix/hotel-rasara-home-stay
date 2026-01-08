'use client'

import { motion } from 'framer-motion'
import { Homepage, Season, Extra } from '@/lib/types'
import { formatCurrency, getUnitLabel } from '@/lib/utils'
import SectionTitle from './ui/SectionTitle'
import { Check, Star, Sparkles } from 'lucide-react'

interface PricingProps {
  data: Homepage | null
  seasons: Season[]
  extras: Extra[]
  currency?: string
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

export default function Pricing({ data, seasons, extras, currency = 'USD' }: PricingProps) {
  if (!seasons || seasons.length === 0) return null

  return (
    <section id="pricing" className="section bg-white">
      <div className="container-custom">
        <SectionTitle
          title={data?.pricingTitle || 'Rates & Packages'}
          subtitle={data?.pricingSubtitle || 'Pricing'}
          description={data?.pricingDescription}
        />

        {/* Season Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {seasons.map((season) => (
            <motion.div
              key={season._id}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                season.isPopular
                  ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white ring-2 ring-gold-400 shadow-glow-gold'
                  : 'bg-neutral-50 text-neutral-900 hover:shadow-card-hover'
              }`}
            >
              {season.isPopular && (
                <div className="absolute top-0 right-0 flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-400 text-neutral-900 px-4 py-1.5 text-xs uppercase tracking-wide font-semibold rounded-bl-2xl">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Most Popular
                </div>
              )}

              <div className="p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold mb-2">{season.name}</h3>

                {season.period && (
                  <p className={`text-sm mb-6 ${season.isPopular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {season.period}
                  </p>
                )}

                <div className="mb-6">
                  <span className="font-mono text-4xl md:text-5xl font-bold">
                    {formatCurrency(season.pricePerNight, currency)}
                  </span>
                  <span className={`text-sm ${season.isPopular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {' '}/ night
                  </span>
                </div>

                {season.minNights && (
                  <p className={`text-sm mb-4 flex items-center gap-2 ${season.isPopular ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    Minimum {season.minNights} nights
                  </p>
                )}

                {season.description && (
                  <p className={`text-sm leading-relaxed ${season.isPopular ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {season.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Inclusions */}
        {data?.pricingInclusions && data.pricingInclusions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200/50 mb-12"
          >
            <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-6 text-center">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.pricingInclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Extras */}
        {extras && extras.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-6 text-center">
              Additional Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {extras.map((extra) => (
                <div
                  key={extra._id}
                  className="flex justify-between items-center p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-neutral-900">{extra.name}</p>
                    {extra.description && (
                      <p className="text-sm text-neutral-500 truncate">{extra.description}</p>
                    )}
                  </div>
                  <p className="text-teal-700 font-mono font-semibold whitespace-nowrap ml-4">
                    {formatCurrency(extra.price, currency)}
                    {extra.unit && (
                      <span className="text-sm text-neutral-500 font-normal">
                        {getUnitLabel(extra.unit)}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notes */}
        {data?.pricingNotes && data.pricingNotes.length > 0 && (
          <div className="mt-12 text-center">
            {data.pricingNotes.map((note, index) => (
              <p key={index} className="text-sm text-neutral-500">
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
