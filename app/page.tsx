'use client'

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

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="grid-background fixed inset-0 -z-10" />
      
      <Navbar />
      
      <HeroSection />
      <ProblemSection />
      <SystemSection />
      <ProcessSection />
      <QualificationSection />
      <PricingSection />
      <RequirementsSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
      
      <Footer />
    </main>
  )
}
