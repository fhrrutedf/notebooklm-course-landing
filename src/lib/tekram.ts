export const TEKRAM_SELLER_ID = '83d55630-5a52-4c43-92b2-120f67fa5372'
export const DEFAULT_COURSE_PRICE = 22
export const DEFAULT_REGULAR_PRICE = 39

// تسعير المملكة العربية السعودية
export const SAUDI_COURSE_PRICE_SAR = 199
export const SAUDI_REGULAR_PRICE_SAR = 249
export const SAUDI_COURSE_PRICE_USD = 53
export const SAUDI_REGULAR_PRICE_USD = 66

export const COURSE_TITLE = 'كورس الذكاء الاصطناعي للمعلمين'
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://course.manasadigital.com'

declare global {
  interface Window {
    TekramPay?: {
      checkout: (options: {
        amount: number
        seller: string
        desc: string
        merchant_order_id?: string
        webhook_url?: string
        return_url?: string
        onSuccess?: (order: any) => void
        onCancel?: () => void
      }) => void
    }
  }
}

export interface TekramCheckoutOptions {
  amount?: number
  desc?: string
  affiliateRef?: string
  onSuccess?: (order: any) => void
  onCancel?: () => void
}

export function buildTekramDirectUrl(options: {
  amount: number
  seller: string
  desc: string
  merchantOrderId: string
  webhookUrl: string
  returnUrl?: string
}): string {
  const params = new URLSearchParams({
    amount: String(options.amount),
    seller: options.seller,
    desc: options.desc,
    merchant_order_id: options.merchantOrderId,
    webhook_url: options.webhookUrl,
  })
  if (options.returnUrl) {
    params.set('return_url', options.returnUrl)
  }
  return `https://tekrams.com/checkout?${params.toString()}`
}

export function openTekramCheckout({
  amount = DEFAULT_COURSE_PRICE,
  desc = COURSE_TITLE,
  affiliateRef = '',
  onSuccess,
  onCancel,
}: TekramCheckoutOptions = {}) {
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const webhookUrl = `${APP_BASE_URL}/api/webhooks/tekram`
  const returnUrl = `${APP_BASE_URL}/thank-you?order_id=${encodeURIComponent(orderId)}${
    affiliateRef ? `&ref=${encodeURIComponent(affiliateRef)}` : ''
  }`

  const handleSuccess = (order: any) => {
    if (onSuccess) {
      onSuccess(order)
    }
    const resolvedId = order?.id || orderId
    const redirectUrl = `/thank-you?order_id=${encodeURIComponent(resolvedId)}${
      affiliateRef ? `&ref=${encodeURIComponent(affiliateRef)}` : ''
    }`
    window.location.href = redirectUrl
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  if (typeof window !== 'undefined' && window.TekramPay && typeof window.TekramPay.checkout === 'function') {
    try {
      window.TekramPay.checkout({
        amount,
        seller: TEKRAM_SELLER_ID,
        desc,
        merchant_order_id: orderId,
        webhook_url: webhookUrl,
        return_url: returnUrl,
        onSuccess: handleSuccess,
        onCancel: handleCancel,
      })
      return
    } catch (err) {
      console.error('TekramPay checkout failed, redirecting to direct checkout URL:', err)
    }
  }

  // Fallback to direct URL if SDK popup is unavailable or failed
  const directUrl = buildTekramDirectUrl({
    amount,
    seller: TEKRAM_SELLER_ID,
    desc,
    merchantOrderId: orderId,
    webhookUrl,
    returnUrl,
  })
  window.location.href = directUrl
}
