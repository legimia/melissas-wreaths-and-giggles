import React from 'react'

export function Button({ children, className = '', variant = 'default', size='md', asChild=false, ...props }) {
  const Comp = asChild ? 'a' : 'button'
  const base = 'inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition'
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 border-transparent',
    outline: 'bg-white text-neutral-800 hover:bg-neutral-50 border-neutral-300'
  }
  return <Comp className={`${base} ${variants[variant]||variants.default} ${className}`} {...props}>{children}</Comp>
}
