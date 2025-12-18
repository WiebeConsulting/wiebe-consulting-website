'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

export default function FAQSection() {
  const faqs = [
    {
      question: 'Will this spam my patients?',
      answer: 'No. We use helpful education, progress updates, and clear options to reschedule or book. The goal is better outcomes and better communication, not annoyance.',
    },
    {
      question: 'What systems do you work with?',
      answer: 'Most major PT EMRs and common SMS/email tools. On the call, we will confirm what you use and map the fastest way to plug in.',
    },
    {
      question: 'How fast will we see revenue?',
      answer: 'Reactivation and internal promos typically drive wins in the first 30 days. Attendance and completion gains stack over 30-60 days as patterns change.',
    },
    {
      question: 'Is this marketing or operations?',
      answer: 'Both. It is internal marketing plus workflow tweaks aimed at one thing: more completed visits and reactivated patients per month.',
    },
  ]

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
