'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Built For </span>
            <span className="gradient-text">Sports PT Owners</span>
            <span className="text-slate-900 dark:text-white">, Not Marketers</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Wiebe Consulting focuses on one thing: helping owner-led sports and ortho PT clinics make more money from the patients they already have, without adding more marketing chaos.
          </p>
          <p className="text-xl text-slate-700 dark:text-slate-200 font-semibold mb-10">
            You're great at getting athletes better. We're great at making sure they show up, finish care, and come back when they need you again.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-accent-500/50 transition-all"
          >
            Book A 15-Minute Fit Call
          </motion.a>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            See if the 60-Day Sports PT Sprint can add $30,000+ to your next 60 days without buying a single new lead.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
