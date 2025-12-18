'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Zap } from 'lucide-react'

export default function SystemSection() {
  const pillars = [
    {
      icon: Shield,
      title: 'Attendance Guardrails',
      features: [
        'Multi-touch SMS/email reminders at the right times',
        '"You missed today, let us get you rebooked" automations',
        'Simple front-desk scripts to save drop-offs and reschedule faster',
      ],
    },
    {
      icon: Target,
      title: 'Plan-of-Care Completion Engine',
      features: [
        'Progress/education sequences at key visit milestones',
        '"You are overdue, here is why finishing matters" nudges when gaps appear',
        'Front-desk prompts to call or text when an athlete goes quiet',
      ],
    },
    {
      icon: Zap,
      title: 'Lapsed-Athlete Reactivation',
      features: [
        '30-day reactivation campaign to 6-24 month inactive patients',
        'Offer: performance check-in/movement screen to get them back',
        'Internal deadline-driven "Fast Cash" promo to fill high-margin programs',
      ],
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">The Sports PT </span>
            <span className="gradient-text">Revenue & Retention</span>
            <span className="text-slate-900 dark:text-white"> System</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Three pillars that work together to maximize the value of every patient in your EMR
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <pillar.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{pillar.title}</h3>
              <ul className="space-y-3 text-left inline-block">
                {pillar.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-2 border-primary-300 dark:border-primary-600 rounded-2xl"
        >
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            Everything is DONE-FOR-YOU: strategy, copy, automations, and front-desk scripts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
