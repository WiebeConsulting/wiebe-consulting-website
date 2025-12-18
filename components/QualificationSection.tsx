'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function QualificationSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Who This Is </span>
            <span className="gradient-text">For</span>
            <span className="text-slate-900 dark:text-white"> (And Not For)</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border-2 border-primary-200 dark:border-primary-700"
          >
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6 flex items-center gap-2">
              <Check className="w-8 h-8" />
              Perfect Fit
            </h3>
            <ul className="space-y-4">
              {[
                'U.S. sports/ortho PT clinics with 2-50 clinicians',
                'Roughly $50k+/month in revenue',
                'At least 300+ active or past patients in your EMR',
                'Owners who want more revenue from patients they already have',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-300 dark:border-slate-600"
          >
            <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-6 flex items-center gap-2">
              <X className="w-8 h-8" />
              Not For
            </h3>
            <ul className="space-y-4">
              {[
                'Clinics without a functioning EMR or messaging system',
                'Cash-only "side hustle" practices with tiny caseloads',
                'Owners unwilling to send at least 3 touches per patient per track',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
