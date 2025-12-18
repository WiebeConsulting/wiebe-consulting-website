'use client'

import { motion } from 'framer-motion'
import { Database, Clock, Users } from 'lucide-react'

export default function RequirementsSection() {
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
            <span className="text-slate-900 dark:text-white">What We Need </span>
            <span className="gradient-text">From You</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Database,
              title: 'EMR + Messaging Access',
              description: 'Provided within 3 business days',
            },
            {
              icon: Clock,
              title: '45-Min Kickoff + Weekly Calls',
              description: '30 minutes per week for check-ins',
            },
            {
              icon: Users,
              title: 'Team Cooperation',
              description: 'Front desk honors prompts, normal staffing maintained',
            },
          ].map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 text-center"
            >
              <req.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{req.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{req.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-2xl text-center"
        >
          <p className="text-lg text-amber-900 dark:text-amber-100">
            <span className="font-bold">Important:</span> If these requirements aren't met, we'll still do the work, but the guarantee doesn't apply.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
