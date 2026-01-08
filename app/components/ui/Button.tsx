'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'gold' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]',
      secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98]',
      teal: 'bg-teal-700 text-white hover:bg-teal-800 active:scale-[0.98] shadow-button',
      gold: 'bg-gold-500 text-white hover:bg-gold-600 active:scale-[0.98]',
      ghost: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 active:scale-[0.98]',
      outline: 'bg-transparent text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-[0.98]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-out',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
