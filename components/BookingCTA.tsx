'use client'

import { useState } from 'react'
import { analytics } from '@/lib/analytics'
import BookingModal from './BookingModal'

interface BookingCTAProps {
  source?: string
  className?: string
  buttonText?: string
}

export default function BookingCTA({
  source = 'blog_cta',
  className = '',
  buttonText = 'Book Free Strategy Call'
}: BookingCTAProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleBookingClick = () => {
    analytics.clickBookCall(source, buttonText)
    analytics.bookingModalOpened(source)
    setIsBookingModalOpen(true)
  }

  return (
    <>
      <button
        onClick={handleBookingClick}
        className={`inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition ${className}`}
      >
        {buttonText}
      </button>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  )
}
