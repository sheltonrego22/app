import { Link } from 'react-router-dom';
import { X, Phone } from 'lucide-react';

export function MobileMenu({ nav, isAr, pathname, onClose }) {
  const track = (cls) => (isAr ? '' : cls);
  const { navLinks, labels } = nav;
  const topLinks = navLinks.filter((l) => !l.dropdownId);
  const groups = [
    { header: labels.aboutHeader, items: nav.aboutLinks },
    { header: labels.brandsHeader, items: nav.brandsLinks },
    { header: labels.corporateHeader, items: nav.corporateLinks },
    { header: labels.retailMobileHeader, items: nav.retailLinks },
    { header: labels.supportHeader, items: nav.supportLinks },
  ];

  return (
    <div data-testid="mobile-menu-overlay" dir={isAr ? 'rtl' : 'ltr'} className="fixed inset-0 z-40 bg-black overflow-y-auto">
      <button className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-[#EEEDE7] z-50 p-2`} onClick={onClose} aria-label="Close menu">
        <X className="w-8 h-8" />
      </button>
      <div className="flex flex-col items-center justify-start gap-5 pt-24 pb-12 px-6 min-h-full">
        {topLinks.map((link) => (
          <Link key={link.id} to={link.href} className={`font-heading text-xl font-bold ${track('tracking-[0.1em]')} transition-colors ${pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7]'}`} onClick={onClose}>
            {link.label}
          </Link>
        ))}

        {groups.map((g) => (
          <div key={g.header} className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
            <span className={`font-heading text-[10px] text-[#EE5A01] ${track('tracking-[0.25em] uppercase')}`}>{g.header}</span>
            {g.items.map((sl) => (
              <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={onClose}>{sl.label}</Link>
            ))}
          </div>
        ))}

        <Link to={labels.quoteHref} className={`mt-4 bg-[#EE5A01] text-black font-heading font-bold text-base ${track('tracking-[0.05em]')} px-8 py-3.5 w-full max-w-xs text-center`} onClick={onClose}>
          {labels.getQuote}
        </Link>
        <a href="tel:800364" dir="ltr" className="font-heading text-sm text-[#EEEDE7] tracking-wider flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#EE5A01]" /> {labels.phone}
        </a>
      </div>
    </div>
  );
}
