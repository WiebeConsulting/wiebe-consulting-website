'use client'

import { motion } from 'framer-motion'
import { Search, Wrench, LineChart } from 'lucide-react'

export default function ProcessSection() {
  const phases = [
    {
      icon: Search,
      number: '01',
      title: 'Diagnose & Design',
      subtitle: 'Week 1-2',
      description: 'We pull baselines from your EMR, map your athlete journey, and set 60-day targets together.',
    },
    {
      icon: Wrench,
      number: '02',
      title: 'Build The System',
      subtitle: 'Week 2-4',
      description: 'Build and install automations, write all SMS/email copy and scripts, launch your first campaigns.',
    },
    {
      icon: LineChart,
      number: '03',
      title: 'Run & Optimize',
      subtitle: 'Week 4-8',
      description: 'Weekly check-ins to review KPIs, ongoing optimization, and final before/after dashboard.',
    },
  ]

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">The </span>
            <span className="gradient-text">60-Day Sprint</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="text-7xl font-bold text-primary-100 dark:text-primary-900/30 absolute top-4 right-4">
                {phase.number}
              </div>
              <phase.icon className="w-12 h-12 text-primary-500 mb-4 relative z-10" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">{phase.title}</h3>
              <p className="text-accent-500 font-semibold mb-4 relative z-10">{phase.subtitle}</p>
              <p className="text-slate-600 dark:text-slate-300 relative z-10">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
