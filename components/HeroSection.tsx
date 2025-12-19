'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface HeroSectionProps {
  onBookingClick: () => void
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            <span className="text-slate-900 dark:text-white">Add </span>
            <span className="gradient-text glow-effect">$30,000+ In 60 Days</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">From Patients You </span>
            <span className="text-accent-500">Already Have</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-6xl mx-auto">
            For owner-led <span className="text-accent-500 font-semibold">sports & ortho PT clinics</span> that want to cut preventable no-shows, get more athletes to finish plans-of-care, and reactivate lapsed patients using the data already sitting in your EMR.
          </p>

          {/* Trust Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl mb-10 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 relative">
              <svg className="w-16 h-16 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="url(#checkGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4 12 14.01l-3-3" stroke="url(#checkGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-lg text-slate-700 dark:text-slate-200 font-medium text-center flex-1">
                We install a DONE-FOR-YOU <span className="text-primary-600 dark:text-primary-400 font-bold">"Revenue & Retention System"</span> in 60 days.<br />
                <span className="text-accent-600 dark:text-accent-400 font-bold">If we don't hit the agreed targets, you don't pay.</span>
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <motion.button
              onClick={onBookingClick}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-accent-500/50 transition-all"
            >
              <span>Book A 15-Minute Fit Call</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Safety Line */}
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            No pressure, no pitch if you're not a fit. We'll review your numbers and tell you if the 60-Day Sprint can work in your clinic.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
