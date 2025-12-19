'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon, Clock, Loader2, ChevronUp, ChevronDown } from 'lucide-react'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'
import { analytics, getUTMParams } from '@/lib/analytics'

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
  const [currentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(-1)

  // Calculate the max date (2 weeks from today)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = addDays(today, 14)
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Generate 2 weeks of days starting from Sunday
  const getTwoWeekDays = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 0 })
    return Array.from({ length: 14 }, (_, i) => addDays(start, i))
  }

  // Check if date is available
  const isDateAvailable = (date: Date) => {
    const day = date.getDay()
    const dateOnly = new Date(date)
    dateOnly.setHours(0, 0, 0, 0)
    return day >= 0 && day <= 5 && dateOnly >= today && dateOnly <= maxDate
  }

  // Generate time slots for selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const day = date.getDay()
    const slots: TimeSlot[] = []
    const startHour = 7
    const endHour = day === 5 ? 10 : 16

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const dateTimeString = format(date, 'yyyy-MM-dd') + 'T' + timeString
        slots.push({
          time: format(new Date(`2000-01-01T${timeString}`), 'h:mm a'),
          available: true,
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
      if (!response.ok) throw new Error('Failed to fetch availability')
      const data = await response.json()
      const slots = generateTimeSlots(date)
      const updatedSlots = slots.map(slot => ({
        ...slot,
        available: !data.bookedSlots.includes(slot.dateTime)
      }))
      setAvailableSlots(updatedSlots)
    } catch (error) {
      console.error('Error fetching availability:', error)
      setAvailableSlots(generateTimeSlots(date))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
      setSelectedTime(null)
      setSelectedTimeIndex(-1)
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date)
      analytics.dateSelected(format(date, 'yyyy-MM-dd'))
    }
  }

  const handleTimeSelect = (slot: TimeSlot, index: number) => {
    if (slot.available && selectedDate) {
      setSelectedTime(slot.dateTime)
      setSelectedTimeIndex(index)
      analytics.timeSelected(slot.time, format(selectedDate, 'yyyy-MM-dd'))
      analytics.formStarted()
    }
  }

  // Get visible time slots (one before, selected, one after)
  const getVisibleSlots = () => {
    if (selectedTimeIndex === -1 || availableSlots.length === 0) {
      // Show first 3 available slots
      const available = availableSlots.filter(s => s.available)
      return available.slice(0, 3).map(slot => ({
        slot,
        index: availableSlots.indexOf(slot)
      }))
    }

    const result: { slot: TimeSlot; index: number }[] = []

    // Find previous available slot
    for (let i = selectedTimeIndex - 1; i >= 0; i--) {
      if (availableSlots[i].available) {
        result.push({ slot: availableSlots[i], index: i })
        break
      }
    }

    // Add selected slot
    result.push({ slot: availableSlots[selectedTimeIndex], index: selectedTimeIndex })

    // Find next available slot
    for (let i = selectedTimeIndex + 1; i < availableSlots.length; i++) {
      if (availableSlots[i].available) {
        result.push({ slot: availableSlots[i], index: i })
        break
      }
    }

    return result.sort((a, b) => a.index - b.index)
  }

  const navigateTime = (direction: 'up' | 'down') => {
    if (selectedTimeIndex === -1) return

    const available = availableSlots
      .map((slot, index) => ({ slot, index }))
      .filter(item => item.slot.available)

    const currentAvailableIndex = available.findIndex(item => item.index === selectedTimeIndex)

    if (direction === 'up' && currentAvailableIndex > 0) {
      const prev = available[currentAvailableIndex - 1]
      handleTimeSelect(prev.slot, prev.index)
    } else if (direction === 'down' && currentAvailableIndex < available.length - 1) {
      const next = available[currentAvailableIndex + 1]
      handleTimeSelect(next.slot, next.index)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTime || !selectedDate) return

    setSubmitting(true)
    try {
      const utmParams = getUTMParams()
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateTime: selectedTime,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          clinicName: formData.clinicName,
          phone: formData.phone,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_term: utmParams.utm_term,
          utm_content: utmParams.utm_content,
          first_touch_landing_page: utmParams.first_touch_landing_page,
          first_touch_referrer: utmParams.first_touch_referrer,
        }),
      })

      if (!response.ok) throw new Error('Booking failed')

      setShowConfirmation(true)
      analytics.bookingConfirmed({
        dateTime: selectedTime || '',
        clinicName: formData.clinicName,
        utmParams
      })

      setTimeout(() => {
        setShowConfirmation(false)
        onClose()
        resetForm()
      }, 5000)
    } catch (error) {
      console.error('Error booking appointment:', error)
      analytics.bookingFailed(error instanceof Error ? error.message : 'Unknown error')
      alert('There was an error booking your appointment. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedTimeIndex(-1)
    setFormData({ firstName: '', lastName: '', email: '', clinicName: '', phone: '' })
  }

  const twoWeekDays = getTwoWeekDays()
  const firstWeek = twoWeekDays.slice(0, 7)
  const secondWeek = twoWeekDays.slice(7, 14)
  const visibleSlots = getVisibleSlots()
  const hasTimeSelected = selectedTime !== null

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
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl pointer-events-auto">
              {/* Header */}
              <div className="border-b border-slate-200 dark:border-slate-700 px-8 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Book Your Fit Call</h2>
                  <p className="text-base text-slate-600 dark:text-slate-400">30-minute strategy call (EST)</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {showConfirmation ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You're Booked!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    A calendar invite with a Zoom link is on its way to your inbox.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold">Next Step:</span> Reply with your monthly revenue and active patient count.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Calendar + Time Slots */}
                    <div>
                      {/* Calendar */}
                      <div className="mb-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                          {format(firstWeek[0], 'MMM d')} - {format(firstWeek[6], 'd')}
                        </p>
                        <div className="grid grid-cols-7 gap-2">
                          {firstWeek.map((day, index) => {
                            const isAvailable = isDateAvailable(day)
                            const isSelected = selectedDate && isSameDay(day, selectedDate)
                            return (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(day)}
                                disabled={!isAvailable}
                                className={`p-3 rounded-lg text-center transition-all ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                    : isAvailable
                                      ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                                      : 'opacity-40 cursor-not-allowed'
                                }`}
                              >
                                <div className={`text-xs ${isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {format(day, 'EEE')}
                                </div>
                                <div className={`text-base font-semibold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                  {format(day, 'd')}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                          {format(secondWeek[0], 'MMM d')} - {format(secondWeek[6], 'd')}
                        </p>
                        <div className="grid grid-cols-7 gap-2">
                          {secondWeek.map((day, index) => {
                            const isAvailable = isDateAvailable(day)
                            const isSelected = selectedDate && isSameDay(day, selectedDate)
                            return (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(day)}
                                disabled={!isAvailable}
                                className={`p-3 rounded-lg text-center transition-all ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                    : isAvailable
                                      ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                                      : 'opacity-40 cursor-not-allowed'
                                }`}
                              >
                                <div className={`text-xs ${isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {format(day, 'EEE')}
                                </div>
                                <div className={`text-base font-semibold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                  {format(day, 'd')}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Time Slots - 3 visible */}
                      {selectedDate && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              Select Time
                            </h4>
                            {hasTimeSelected && (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => navigateTime('up')}
                                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                >
                                  <ChevronUp className="w-5 h-5 text-slate-500" />
                                </button>
                                <button
                                  onClick={() => navigateTime('down')}
                                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                >
                                  <ChevronDown className="w-5 h-5 text-slate-500" />
                                </button>
                              </div>
                            )}
                          </div>
                          {loading ? (
                            <div className="flex items-center justify-center py-8">
                              <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              {visibleSlots.map(({ slot, index }) => (
                                <button
                                  key={index}
                                  onClick={() => handleTimeSelect(slot, index)}
                                  disabled={!slot.available}
                                  className={`flex-1 py-3 px-4 rounded-lg text-base font-medium transition-all ${
                                    selectedTime === slot.dateTime
                                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                                      : slot.available
                                        ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 cursor-not-allowed line-through'
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right: Form */}
                    <div>
                      <h4 className="text-base font-medium text-slate-900 dark:text-white mb-4">Your Information</h4>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="First Name *"
                          />
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Last Name *"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Work Email *"
                        />
                        <input
                          type="text"
                          required
                          value={formData.clinicName}
                          onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Clinic Name *"
                        />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Cell Phone *"
                        />

                        {selectedTime && (
                          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-lg p-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              <span className="font-semibold">Selected:</span>{' '}
                              {selectedDate && format(selectedDate, 'EEE, MMM d')} at{' '}
                              {availableSlots.find(s => s.dateTime === selectedTime)?.time} EST
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!selectedTime || submitting}
                          className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all ${
                            selectedTime && !submitting
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-xl'
                              : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                          }`}
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
