export type CtaSource =
  | 'hero_price_card'
  | 'payment_options'
  | 'reference_style_final'
  | 'reference_style_mobile_sticky'
  | 'results_nav'
  | 'results_mid_cta'
  | 'results_final_cta'
  | 'results_mobile_sticky'

// Debounce guard: prevent duplicate Contact events from a single click
let _lastContactTs = 0

export function trackWhatsApp(source: CtaSource, extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  const now = Date.now()
  const isDuplicate = now - _lastContactTs < 1000
  _lastContactTs = now

  // Google Analytics 4
  if (typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', 'whatsapp_click', { cta_source: source, ...extra })
  }

  // Meta Pixel — fire Contact only once per click (guard against double-firing)
  if (!isDuplicate && typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('track', 'Contact', {
      content_name: 'AI Course for Teachers - WhatsApp Inquiry',
      content_category: 'Course Registration',
      cta_source: source,
      ...extra,
    })
  }

  // Vercel Analytics (imported separately in components)
}
