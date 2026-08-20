export const AFFILIATE_STORAGE_KEY = 'course_affiliate_ref'

/**
 * Keeps referral codes safe and readable in a public URL and WhatsApp message.
 * Example: ahmad-teacher, center_homs, sara2026
 */
export function normalizeAffiliateRef(value: string | null): string {
  if (!value) return ''

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 40)
}

export function resolveAffiliateRef(search: string): string {
  const params = new URLSearchParams(search)
  return normalizeAffiliateRef(params.get('ref') || params.get('affiliate'))
}

export function affiliateMessageSuffix(referralCode: string): string {
  if (!referralCode) return ''
  return `\n\nرمز الإحالة: ${referralCode.toUpperCase()}`
}

export function referralHref(path: string, referralCode: string): string {
  if (!referralCode) return path
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}ref=${encodeURIComponent(referralCode)}`
}
