'use client'

import { useState } from 'react'
import { analytics } from '@/lib/analytics'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import SystemSection from '@/components/SystemSection'
import ProcessSection from '@/components/ProcessSection'
import QualificationSection from '@/components/QualificationSection'
import PricingSection from '@/components/PricingSection'
import RequirementsSection from '@/components/RequirementsSection'
import AboutSection from '@/components/AboutSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleBookingClick = (source: string) => {
    analytics.bookingModalOpened(source)
    setIsBookingModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="grid-background fixed inset-0 -z-10" />

      <Navbar onBookingClick={() => handleBookingClick('navbar')} />

      <HeroSection onBookingClick={() => handleBookingClick('hero')} />
      <ProblemSection />
      <SystemSection />
      <ProcessSection />
      <QualificationSection />
      <PricingSection onBookingClick={() => handleBookingClick('pricing')} />
      <RequirementsSection />
      <AboutSection />
      <FAQSection />
      <CTASection onBookingClick={() => handleBookingClick('cta_section')} />

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </main>
  )
}
