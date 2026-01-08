'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  centered = true,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'section-header',
        centered && 'centered',
        className
      )}
    >
      {subtitle && (
        <span className={cn(
          'eyebrow mb-4',
          light ? 'text-teal-400' : 'text-teal-700',
          light && 'before:bg-teal-400'
        )}>
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-balance',
          light ? 'text-white' : 'text-neutral-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 md:mt-6 text-lg md:text-xl leading-relaxed',
            light ? 'text-neutral-300' : 'text-neutral-600'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
