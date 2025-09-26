import React, { useState } from 'react'

export function Sheet({ children }) { return <div>{children}</div> }
export function SheetTrigger({ asChild=false, children }) {
  return React.cloneElement(children, { onClick: children.props.onClick })
}
export function SheetContent({ side='right', className='', children }) {
  // Minimal no-JS drawer fallback: just render contents inline
  return <div className={className}>{children}</div>
}
export function SheetHeader({ children }) { return <div className="mb-2">{children}</div> }
export function SheetTitle({ children, className='' }) { return <div className={`text-lg font-semibold ${className}`}>{children}</div> }
