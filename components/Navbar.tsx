'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const navLinks = [
    { name: 'How It Works', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'About', href: '#about' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Wiebe Consulting"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </a>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="text-slate-700 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book Fit Call</span>
            <span className="sm:hidden">Book Call</span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
