'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, parseISO } from 'date-fns'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TimeSlot {
  time: string
  available: boolean
  dateTime: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  clinicName: string
  phone: string
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    clinicName: '',
    phone: ''
  })

  // Generate week days starting from Sunday
  const getWeekDays = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 0 }) // Sunday = 0
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }

  // Check if date is available (Sunday-Thursday or Friday before 10am)
  const isDateAvailable = (date: Date) => {
    const day = date.getDay()
    // Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5
    return day >= 0 && day <= 5
  }

  // Generate time slots for selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const day = date.getDay()
    const slots: TimeSlot[] = []

    let startHour = 7
    let endHour = day === 5 ? 10 : 16 // Friday ends at 10am, others at 4pm

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const dateTimeString = format(date, 'yyyy-MM-dd') + 'T' + timeString

        slots.push({
          time: format(new Date(`2000-01-01T${timeString}`), 'h:mm a'),
          available: true, // Will be updated by API call
          dateTime: dateTimeString
        })
      }
    }

    return slots
  }

  // Fetch available slots from API
  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/calendar/availability?date=${dateStr}`)

      if (!response.ok) {
        throw new Error('Failed to fetch availability')
      }

      const data = await response.json()
      const slots = generateTimeSlots(date)

      // Mark slots as unavailable based on API response
      const updatedSlots = slots.map(slot => ({
        ...slot,
        available: !data.bookedSlots.includes(slot.dateTime)
      }))

      setAvailableSlots(updatedSlots)
    } catch (error) {
      console.error('Error fetching availability:', error)
      // Fallback: show all slots as available
      setAvailableSlots(generateTimeSlots(date))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date) && date >= new Date()) {
      setSelectedDate(date)
      setSelectedTime(null)
    }
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot.dateTime)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTime || !selectedDate) return

    setSubmitting(true)

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateTime: selectedTime,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          clinicName: formData.clinicName,
          phone: formData.phone,
        }),
      })

      if (!response.ok) {
        throw new Error('Booking failed')
      }

      const result = await response.json()
      setShowConfirmation(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setShowConfirmation(false)
        onClose()
        resetForm()
      }, 5000)

    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('There was an error booking your appointment. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      clinicName: '',
      phone: ''
    })
  }

  const weekDays = getWeekDays()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Book Your Fit Call</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Choose a 30-minute slot that works for you (EST)</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {showConfirmation ? (
                // Confirmation Screen
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CalendarIcon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">You're Booked!</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                    A calendar invite with a Zoom link is on its way to your inbox.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                    <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Next Step:</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Reply to that email with your best guess at your current monthly revenue and how many active patients are in your EMR.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Calendar Section */}
                    <div>
                      {/* Week Navigation */}
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                        </h3>
                        <button
                          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                      </div>

                      {/* Week Days */}
                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {weekDays.map((day, index) => {
                          const isAvailable = isDateAvailable(day) && day >= new Date()
                          const isSelected = selectedDate && isSameDay(day, selectedDate)

                          return (
                            <button
                              key={index}
                              onClick={() => handleDateSelect(day)}
                              disabled={!isAvailable}
                              className={`
                                p-3 rounded-lg text-center transition-all
                                ${isSelected
                                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                                  : isAvailable
                                    ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    : 'bg-slate-50 dark:bg-slate-900 opacity-50 cursor-not-allowed'
                                }
                              `}
                            >
                              <div className={`text-xs mb-1 ${isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                {format(day, 'EEE')}
                              </div>
                              <div className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                {format(day, 'd')}
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Available Times (EST)
                          </h4>
                          {loading ? (
                            <div className="flex items-center justify-center py-12">
                              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                              {availableSlots.map((slot, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleTimeSelect(slot)}
                                  disabled={!slot.available}
                                  className={`
                                    p-3 rounded-lg text-sm font-medium transition-all
                                    ${selectedTime === slot.dateTime
                                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                                      : slot.available
                                        ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through'
                                    }
                                  `}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Form Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Information</h4>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Smith"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="john@clinic.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Clinic Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.clinicName}
                            onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Your Clinic Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Cell Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        {selectedTime && (
                          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Selected Time:
                            </p>
                            <p className="text-primary-600 dark:text-primary-400 font-bold">
                              {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at{' '}
                              {availableSlots.find(s => s.dateTime === selectedTime)?.time} EST
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!selectedTime || submitting}
                          className={`
                            w-full py-4 rounded-lg font-semibold text-white transition-all
                            ${selectedTime && !submitting
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-xl'
                              : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                            }
                          `}
                        >
                          {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Booking...
                            </span>
                          ) : (
                            'Confirm Booking'
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
