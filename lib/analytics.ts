// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-P1675Y0J6R'

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific event helpers
export const analytics = {
  // Button clicks
  buttonClick: (buttonName: string, location: string) => {
    trackEvent('button_click', 'engagement', `${buttonName} - ${location}`)
  },

  // Booking funnel events
  bookingModalOpened: (source: string) => {
    trackEvent('booking_modal_opened', 'booking_funnel', source)
  },

  dateSelected: (date: string) => {
    trackEvent('date_selected', 'booking_funnel', date)
  },

  timeSelected: (time: string) => {
    trackEvent('time_selected', 'booking_funnel', time)
  },

  formStarted: () => {
    trackEvent('form_started', 'booking_funnel')
  },

  bookingConfirmed: (dateTime: string) => {
    trackEvent('booking_confirmed', 'conversion', dateTime)
  },

  bookingFailed: (error: string) => {
    trackEvent('booking_failed', 'booking_funnel', error)
  },

  // Section views (scroll tracking)
  sectionViewed: (sectionName: string) => {
    trackEvent('section_viewed', 'engagement', sectionName)
  },

  // CTA clicks
  ctaClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', 'conversion', `${ctaName} - ${location}`)
  },
}
