'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, Users } from 'lucide-react'

export default function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      stat: '10-20%',
      title: 'No-Shows and Late Cancels',
      description: 'Each missed slot is $125-$200 gone forever. That is thousands in lost revenue every month.',
    },
    {
      icon: TrendingDown,
      stat: '3-5 visits',
      title: 'Incomplete Plans',
      description: 'Athletes drop off before finishing care, leaving outcomes and revenue on the table.',
    },
    {
      icon: Users,
      stat: '100s-1000s',
      title: 'Lapsed Patients',
      description: 'Past patients in your EMR who have not been contacted in 6-24+ months.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">The Hidden </span>
            <span className="gradient-text">Profit Leak</span>
            <span className="text-slate-900 dark:text-white"> In Sports PT</span>
          </h2>
          <p className="text-2xl text-slate-600 dark:text-slate-300 font-semibold">
            Your EMR Is Full Of Money You Are Not Collecting
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all"
            >
              <problem.icon className="w-12 h-12 text-primary-500 mb-4" />
              <div className="text-4xl font-bold text-accent-500 mb-2">{problem.stat}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{problem.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border-2 border-primary-200 dark:border-primary-700"
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            You Do Not Need More Leads To Grow
          </h3>
          <p className="text-xl text-slate-700 dark:text-slate-200 mb-6">You need a system that:</p>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <p className="text-slate-700 dark:text-slate-300">Keeps your schedule full with the patients you already have</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
              <p className="text-slate-700 dark:text-slate-300">Gets more athletes to finish the plans you prescribed</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <p className="text-slate-700 dark:text-slate-300">Bring back the ones who drifted away</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-8">
            That is what we install.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
