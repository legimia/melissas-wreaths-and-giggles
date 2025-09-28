import React from 'react'
export function Card({children,className=''}){return <div className={`rounded-2xl border border-neutral-200 bg-white ${className}`}>{children}</div>}
export function CardHeader({children,className=''}){return <div className={`p-4 ${className}`}>{children}</div>}
export function CardTitle({children,className=''}){return <h3 className={`font-semibold ${className}`}>{children}</h3>}
export function CardContent({children,className=''}){return <div className={`px-4 pb-4 ${className}`}>{children}</div>}