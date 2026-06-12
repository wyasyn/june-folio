import React from 'react'
import MainNav from '@/components/main-nav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative'>
      <div
        aria-hidden
        className='bg-grid-pattern pointer-events-none fixed inset-0 -z-10'
      />
      <MainNav />
      {children}
    </div>
  )
}
