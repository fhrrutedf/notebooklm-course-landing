export type CtaSource =
  | 'hero_price_card'
  | 'payment_options'
  | 'reference_style_final'
  | 'reference_style_mobile_sticky'
  | 'results_nav'
  | 'results_final_cta'

export function trackWhatsApp(source: CtaSource, extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const payload = { cta_source: source, ...extra }

  // Google Analytics 4
  if (typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', 'whatsapp_click', payload)
  }

  // Meta Pixel
  if (typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('track', 'Lead', payload)
  }

  // Vercel Analytics (imported separately in components)
}
