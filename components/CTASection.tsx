'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500 to-accent-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
            Ready To Add $30,000+ In The Next 60 Days?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Book a 15-minute fit call. No pressure, no pitch if you're not a fit. We'll review your numbers and tell you if the 60-Day Sprint can work in your clinic.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-primary-600 rounded-xl font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all"
          >
            <span>Book Your Fit Call Now</span>
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
