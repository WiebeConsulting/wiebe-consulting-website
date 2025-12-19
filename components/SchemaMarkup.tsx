import Script from 'next/script'

export default function SchemaMarkup() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://wiebe-consulting.com/#organization',
    name: 'Wiebe Consulting',
    url: 'https://wiebe-consulting.com',
    logo: 'https://wiebe-consulting.com/logo.png',
    description: 'Done-for-you patient retention system for sports & ortho PT clinics. Cut no-shows, complete more plans of care, reactivate lapsed patients.',
    founder: {
      '@type': 'Person',
      name: 'Ben Wiebe',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: [
      'Physical Therapy Consulting',
      'Patient Retention Systems',
      'Healthcare Marketing Automation',
    ],
    priceRange: '$$$',
    knowsAbout: [
      'Sports Physical Therapy',
      'Orthopedic Physical Therapy',
      'Patient Retention',
      'No-Show Reduction',
      'Patient Reactivation',
      'EMR Data Optimization',
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://wiebe-consulting.com/#service',
    name: 'Sports PT 60-Day Revenue & Retention Sprint',
    provider: {
      '@id': 'https://wiebe-consulting.com/#organization',
    },
    description: 'Done-for-you system that adds $30,000+ in 60 days from patients already in your EMR. Includes attendance guardrails, plan-of-care completion engine, and lapsed patient reactivation.',
    serviceType: 'Physical Therapy Consulting',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consulting Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Founding Cohort',
          description: '$0 upfront, $7,500 results-based payment only if targets are met',
          price: '7500',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          name: 'Standard Program',
          description: '$5,000 on signup, $5,000 delayed payment only if targets are met',
          price: '10000',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Will this spam my patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. We use helpful education, progress updates, and clear options to reschedule or book. The goal is better outcomes and better communication, not annoyance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What systems do you work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most major PT EMRs and common SMS/email tools. On the call, we will confirm what you use and map the fastest way to plug in.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast will we see revenue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reactivation and internal promos typically drive wins in the first 30 days. Attendance and completion gains stack over 30-60 days as patterns change.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this marketing or operations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both. It is internal marketing plus workflow tweaks aimed at one thing: more completed visits and reactivated patients per month.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://wiebe-consulting.com',
      },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://wiebe-consulting.com/#webpage',
    url: 'https://wiebe-consulting.com',
    name: 'Sports PT Consulting | Add $30K in 60 Days | Wiebe Consulting',
    description: 'Done-for-you patient retention system for sports & ortho PT clinics. Cut no-shows, complete more plans of care, reactivate lapsed patients.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://wiebe-consulting.com/#website',
      url: 'https://wiebe-consulting.com',
      name: 'Wiebe Consulting',
      publisher: {
        '@id': 'https://wiebe-consulting.com/#organization',
      },
    },
    about: {
      '@id': 'https://wiebe-consulting.com/#service',
    },
    mainEntity: {
      '@id': 'https://wiebe-consulting.com/#service',
    },
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  )
}
