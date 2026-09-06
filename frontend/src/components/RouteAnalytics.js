import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

export default function RouteAnalytics() {
  const location = useLocation();
  const previousUrl = useRef(document.referrer);

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = window.location.href;
      trackPageView({
        page_location: url,
        page_title: document.title,
        page_referrer: previousUrl.current,
      });
      previousUrl.current = url;
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}
