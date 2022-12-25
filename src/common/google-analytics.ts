import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from './constants'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  window.gtag('config', NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: GTagEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const gaScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {page_path: window.location.pathname});
`
