'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold gradient-text">
              Wiebe Consulting
            </div>
          </div>
          
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Fit Call</span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
