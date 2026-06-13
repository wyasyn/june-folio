import React from 'react'
import MainNav from '@/components/main-nav'
import Footer from '@/components/main/footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative flex min-h-dvh flex-col'>
      <div
        aria-hidden
        className='bg-grid-pattern pointer-events-none fixed inset-0 -z-10'
      />
      <MainNav />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
