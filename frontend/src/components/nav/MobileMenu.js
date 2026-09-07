import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone, MessageCircle, Home, Mail } from 'lucide-react';

function AccordionSection({ id, header, items, isOpen, onToggle, onClose, renderItem }) {
  return (
    <div className="border-b border-black/5">
      <button data-testid={`mobile-accordion-${id}`} onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="font-heading font-bold text-base text-[#121212]">{header}</span>
        <span className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${isOpen ? 'bg-[#EE5A01] text-white' : 'bg-[#F5F5F3] text-[#121212]'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-1">{items.map((item) => renderItem(item, onClose))}</div>
        </div>
      </div>
    </div>
  );
}

const renderLink = (item, onClose) => (
  <Link key={item.label} to={item.href} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[#FFF4ED] active:bg-[#FFF4ED]">
    {item.img ? <img src={item.img} alt="" className="h-10 w-14 rounded-md object-cover flex-shrink-0" loading="lazy" /> : <span className="h-1.5 w-1.5 rounded-full bg-[#EE5A01] flex-shrink-0" />}
    <span className="min-w-0">
      <span className="block font-heading font-semibold text-sm text-[#121212]">{item.label}</span>
      {(item.sub || item.desc) && <span className="block font-body text-xs text-[#666666] truncate">{item.sub || item.desc}</span>}
    </span>
  </Link>
);

export function MobileMenu({ nav, isAr, onClose }) {
  const { labels } = nav;
  const [open, setOpen] = useState('brands');
  const sections = [
    { id: 'brands', header: labels.brandsHeader, items: nav.brandsLinks },
    { id: 'business', header: labels.businessHeader, items: nav.businessLinks },
    { id: 'personal', header: labels.personalHeader, items: nav.personalLinks },
    { id: 'about', header: labels.aboutHeader, items: nav.aboutLinks },
    { id: 'support', header: labels.supportHeader, items: nav.supportLinks },
  ];
  const home = nav.navLinks[0];
  const contact = nav.navLinks[nav.navLinks.length - 1];

  return (
    <div data-testid="mobile-menu-overlay" dir={isAr ? 'rtl' : 'ltr'} className="fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto lg:hidden" style={{ paddingBottom: 'calc(88px + env(safe-area-inset-bottom))' }}>
      <div className="flex gap-2 px-4 pt-4 pb-3">
        <Link to={home.href} onClick={onClose} data-testid="mobile-link-home" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5F5F3] py-3 font-heading font-bold text-sm text-[#121212]"><Home className="w-4 h-4 text-[#EE5A01]" /> {home.label}</Link>
        <Link to={contact.href} onClick={onClose} data-testid="mobile-link-contact" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5F5F3] py-3 font-heading font-bold text-sm text-[#121212]"><Mail className="w-4 h-4 text-[#EE5A01]" /> {contact.label}</Link>
      </div>
      {sections.map((s) => (
        <AccordionSection key={s.id} {...s} isOpen={open === s.id} onToggle={() => setOpen(open === s.id ? null : s.id)} onClose={onClose} renderItem={renderLink} />
      ))}
      <div className="px-5 py-6 space-y-3">
        <Link to={labels.quoteHref} onClick={onClose} data-testid="mobile-quote-btn" className="btn-primary w-full">{labels.getQuote}</Link>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:800364" dir="ltr" className="btn-outline !py-3"><Phone className="w-4 h-4" /> {labels.phone}</a>
          <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="btn-outline !py-3 !border-[#25D366] !text-[#128C7E] hover:!bg-[#25D366] hover:!text-white"><MessageCircle className="w-4 h-4" /> {labels.whatsapp}</a>
        </div>
        <p className="text-center font-heading font-black text-[#EE5A01] text-lg pt-2">{labels.tagline}</p>
      </div>
    </div>
  );
}
