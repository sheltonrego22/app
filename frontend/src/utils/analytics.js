export function trackPageView(data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'virtual_page_view', ...data });
}

export function trackEvent(event, parameters = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
