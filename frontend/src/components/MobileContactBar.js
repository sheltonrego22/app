import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { getNavData } from '@/i18n/navData';

export default function MobileContactBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  const isAr = pathname.startsWith('/ar');
  const { labels } = getNavData(isAr);
  const item = "flex flex-col items-center justify-center gap-1 py-2 font-heading font-bold text-[11px] transition-colors";

  return (
    <div data-testid="mobile-contact-bar" dir={isAr ? 'rtl' : 'ltr'} className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-white/95 backdrop-blur-md border-t border-black/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-3 h-16">
        <a href="tel:800364" data-testid="mobile-call-btn" className={`${item} text-[#121212] active:bg-[#FFF4ED]`}>
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#121212] text-white"><Phone className="w-4 h-4" /></span>
          {labels.call}
        </a>
        <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" data-testid="mobile-whatsapp-btn" className={`${item} text-[#121212] active:bg-[#FFF4ED]`}>
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#25D366] text-white"><MessageCircle className="w-4 h-4" /></span>
          {labels.whatsapp}
        </a>
        <Link to={labels.quoteHref} data-testid="mobile-quote-bar-btn" className={`${item} bg-[#EE5A01] text-white active:bg-[#D44F00]`}>
          <FileText className="w-5 h-5" />
          {labels.getQuote}
        </Link>
      </div>
    </div>
  );
}
