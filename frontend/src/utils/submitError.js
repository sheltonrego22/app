export const SUBMIT_ERROR_EN = 'We could not submit your enquiry right now. Please try again or call 800 364.';
const RATE_LIMIT_AR = 'تم إرسال عدد كبير من الطلبات من هذا الاتصال. يرجى المحاولة لاحقاً أو الاتصال على 800 364.';

// Surface backend-provided messages (e.g. rate limit 429) and fall back to a friendly default.
export function submitErrorMessage(err, fallback = SUBMIT_ERROR_EN, lang = 'en') {
  const status = err?.response?.status;
  const detail = err?.response?.data?.detail;
  if (status === 429) return lang === 'ar' ? RATE_LIMIT_AR : detail || fallback;
  return lang === 'en' && typeof detail === 'string' && detail ? detail : fallback;
}
