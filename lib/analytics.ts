// Comprehensive Analytics & Tracking Utility
// Supports: GA4, GTM dataLayer, Meta Pixel, LinkedIn Insight Tag

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void
    dataLayer: Array<Record<string, unknown>>
    fbq: (
      command: string,
      event: string,
      params?: Record<string, unknown>
    ) => void
    lintrk: (
      command: string,
      params: Record<string, unknown>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-P1675Y0J6R'
export const GTM_ID = 'GTM-K83T3NPQ'

// Push event to GTM dataLayer (works with GA4, Meta, LinkedIn via GTM)
export const pushToDataLayer = (event: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  }
}

// Track event via gtag (direct GA4)
export const trackEvent = (
  action: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
  // Also push to dataLayer for GTM
  pushToDataLayer({
    event: action,
    ...params
  })
}

// ============================================
// UTM & Attribution Tracking
// ============================================

export interface UTMParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  first_touch_landing_page: string | null
  first_touch_referrer: string | null
  session_landing_page: string | null
  session_referrer: string | null
}

// Get UTM params from URL
export const getUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      first_touch_landing_page: null,
      first_touch_referrer: null,
      session_landing_page: null,
      session_referrer: null
    }
  }

  const urlParams = new URLSearchParams(window.location.search)

  // Get current session data
  const sessionLandingPage = window.location.href
  const sessionReferrer = document.referrer || null

  // Check for stored first-touch data
  let firstTouchLandingPage = localStorage.getItem('wc_first_touch_landing_page')
  let firstTouchReferrer = localStorage.getItem('wc_first_touch_referrer')

  // Store first-touch if not already set
  if (!firstTouchLandingPage) {
    firstTouchLandingPage = sessionLandingPage
    localStorage.setItem('wc_first_touch_landing_page', firstTouchLandingPage)
  }
  if (!firstTouchReferrer && sessionReferrer) {
    firstTouchReferrer = sessionReferrer
    localStorage.setItem('wc_first_touch_referrer', firstTouchReferrer)
  }

  // Store UTM params if present (first-touch attribution)
  const utmSource = urlParams.get('utm_source')
  const utmMedium = urlParams.get('utm_medium')
  const utmCampaign = urlParams.get('utm_campaign')
  const utmTerm = urlParams.get('utm_term')
  const utmContent = urlParams.get('utm_content')

  // Store UTMs on first visit with UTMs
  if (utmSource && !localStorage.getItem('wc_utm_source')) {
    localStorage.setItem('wc_utm_source', utmSource)
    if (utmMedium) localStorage.setItem('wc_utm_medium', utmMedium)
    if (utmCampaign) localStorage.setItem('wc_utm_campaign', utmCampaign)
    if (utmTerm) localStorage.setItem('wc_utm_term', utmTerm)
    if (utmContent) localStorage.setItem('wc_utm_content', utmContent)
  }

  return {
    utm_source: localStorage.getItem('wc_utm_source') || utmSource,
    utm_medium: localStorage.getItem('wc_utm_medium') || utmMedium,
    utm_campaign: localStorage.getItem('wc_utm_campaign') || utmCampaign,
    utm_term: localStorage.getItem('wc_utm_term') || utmTerm,
    utm_content: localStorage.getItem('wc_utm_content') || utmContent,
    first_touch_landing_page: firstTouchLandingPage,
    first_touch_referrer: firstTouchReferrer,
    session_landing_page: sessionLandingPage,
    session_referrer: sessionReferrer
  }
}

// ============================================
// Core Analytics Events
// ============================================

export const analytics = {
  // ---- CONVERSION EVENTS (mark as conversions in GA4) ----

  // Primary conversion: Lead generated (form submitted, booking confirmed)
  generateLead: (leadData: {
    form_name: string
    lead_source: string
    value?: number
  }) => {
    trackEvent('generate_lead', {
      event_category: 'conversion',
      form_name: leadData.form_name,
      lead_source: leadData.lead_source,
      value: leadData.value || 0,
      currency: 'USD'
    })

    // Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: leadData.form_name,
        content_category: leadData.lead_source
      })
    }

    // LinkedIn
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: 'lead' })
    }
  },

  // Call scheduled (booking confirmed)
  callScheduled: (bookingData: {
    date_time: string
    clinic_name?: string
    lead_source: string
  }) => {
    trackEvent('call_scheduled', {
      event_category: 'conversion',
      date_time: bookingData.date_time,
      clinic_name: bookingData.clinic_name,
      lead_source: bookingData.lead_source
    })

    // Meta Pixel - Schedule event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule')
    }
  },

  // ---- HIGH-INTENT BEHAVIOR EVENTS ----

  // CTA button clicks
  clickBookCall: (location: string, buttonText: string) => {
    trackEvent('click_book_call', {
      event_category: 'engagement',
      click_location: location,
      button_text: buttonText
    })
  },

  // ---- BOOKING FUNNEL EVENTS ----

  bookingModalOpened: (source: string) => {
    trackEvent('booking_modal_opened', {
      event_category: 'booking_funnel',
      funnel_step: 1,
      source: source
    })

    // Meta Pixel - InitiateCheckout equivalent for service booking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout')
    }
  },

  dateSelected: (date: string) => {
    trackEvent('date_selected', {
      event_category: 'booking_funnel',
      funnel_step: 2,
      selected_date: date
    })
  },

  timeSelected: (time: string, date: string) => {
    trackEvent('time_selected', {
      event_category: 'booking_funnel',
      funnel_step: 3,
      selected_time: time,
      selected_date: date
    })
  },

  formStarted: () => {
    trackEvent('form_started', {
      event_category: 'booking_funnel',
      funnel_step: 4
    })
  },

  bookingConfirmed: (bookingData: {
    dateTime: string
    clinicName: string
    utmParams: UTMParams
  }) => {
    trackEvent('booking_confirmed', {
      event_category: 'conversion',
      funnel_step: 5,
      date_time: bookingData.dateTime,
      clinic_name: bookingData.clinicName,
      ...bookingData.utmParams
    })

    // Also fire generate_lead and call_scheduled
    analytics.generateLead({
      form_name: 'booking_form',
      lead_source: bookingData.utmParams.utm_source || 'direct'
    })

    analytics.callScheduled({
      date_time: bookingData.dateTime,
      clinic_name: bookingData.clinicName,
      lead_source: bookingData.utmParams.utm_source || 'direct'
    })

    // Meta Pixel - CompleteRegistration
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Fit Call Booking',
        status: 'confirmed'
      })
    }
  },

  bookingFailed: (error: string) => {
    trackEvent('booking_failed', {
      event_category: 'booking_funnel',
      error_message: error
    })
  },

}
