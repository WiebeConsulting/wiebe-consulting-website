'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, DollarSign } from 'lucide-react'

interface PricingSectionProps {
  onBookingClick: () => void
}

export default function PricingSection({ onBookingClick }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Our </span>
            <span className="gradient-text">"We Get Paid After You Do"</span>
            <span className="text-slate-900 dark:text-white"> Guarantee</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-primary-200 dark:border-primary-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-accent-500 text-white px-6 py-2 text-sm font-bold rounded-bl-2xl">
              FOUNDING COHORT
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">First 3 Clinics Only</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold gradient-text mb-2">$7,500</div>
                <p className="text-slate-600 dark:text-slate-400">Results-based payment</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300"><span className="font-bold">$0 upfront</span> - card on file only</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Pay <span className="font-bold">only if we hit targets</span> by Day 60</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">If not, <span className="font-bold">pay nothing</span> and keep the system</span>
                </li>
              </ul>
              <motion.button
                onClick={onBookingClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <span>Claim Your Spot</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Standard Program</h3>
            <div className="mb-6">
              <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">$10,000</div>
              <p className="text-slate-600 dark:text-slate-400">60-Day Intensive</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">$5,000 on signup</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">$5,000 delayed second payment <span className="font-bold">only if we hit agreed outcomes</span></span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">If we don't hit targets, <span className="font-bold">you don't pay the second $5,000</span></span>
              </li>
            </ul>
            <motion.button
              onClick={onBookingClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
