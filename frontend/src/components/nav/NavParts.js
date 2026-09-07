import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Globe } from 'lucide-react';
import { NavDropdown } from '@/components/nav/NavDropdown';

export function DesktopLinks({ nav, isAr, pathname, openDropdown, setOpenDropdown }) {
  const isActive = (link) => pathname === link.href.split('#')[0] || (link.dropdownId && pathname.startsWith(link.href.split('#')[0]) && link.href !== '/');
  return (
    <div className="hidden lg:flex items-center gap-1">
      {nav.navLinks.map((link) => (
        <div
          key={link.id}
          className="relative"
          onMouseEnter={() => link.dropdownId && setOpenDropdown(link.dropdownId)}
          onMouseLeave={() => link.dropdownId && setOpenDropdown(null)}
        >
          <Link
            to={link.href}
            data-testid={`nav-link-${link.id}`}
            aria-haspopup={link.dropdownId ? 'true' : undefined}
            aria-expanded={link.dropdownId ? openDropdown === link.dropdownId : undefined}
            onFocus={() => link.dropdownId && setOpenDropdown(link.dropdownId)}
            className={`relative font-heading font-semibold text-[13px] px-3.5 py-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap transition-colors ${isActive(link) ? 'text-[#EE5A01]' : 'text-[#121212] hover:text-[#EE5A01] hover:bg-[#FFF4ED]'}`}
          >
            {link.label}
            {link.dropdownId && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.dropdownId ? 'rotate-180' : ''}`} />}
            {isActive(link) && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-[#EE5A01]" />}
          </Link>
          {link.dropdownId && openDropdown === link.dropdownId && (
            <NavDropdown dropdownId={link.dropdownId} nav={nav} isAr={isAr} onNavigate={() => setOpenDropdown(null)} />
          )}
        </div>
      ))}
    </div>
  );
}

export function NavActions({ labels, langTarget, mobileOpen, onToggleMobile }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <a href="tel:800364" dir="ltr" data-testid="nav-phone" className="hidden md:inline-flex items-center gap-2 rounded-lg px-3 py-2 font-heading font-bold text-[13px] text-[#121212] hover:bg-[#FFF4ED] hover:text-[#EE5A01] transition-colors">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-[#EE5A01] text-white"><Phone className="w-3.5 h-3.5" /></span>
        {labels.phone}
      </a>
      <Link to={langTarget} data-testid="lang-toggle" aria-label="Switch language" className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-heading font-bold text-xs text-[#121212] hover:bg-[#FFF4ED] hover:text-[#EE5A01] transition-colors">
        <Globe className="w-4 h-4" />
        <span>{labels.langLabel}</span>
      </Link>
      <div className="hidden sm:block">
        <Link to={labels.quoteHref} data-testid="nav-quote-btn" className="btn-primary !py-2.5 !px-5 !text-[13px] whitespace-nowrap">{labels.getQuote}</Link>
      </div>
      <button data-testid="mobile-menu-toggle" className="lg:hidden grid h-11 w-11 place-items-center rounded-lg text-[#121212] hover:bg-[#FFF4ED]" onClick={onToggleMobile} aria-label={mobileOpen ? labels.close : labels.menu} aria-expanded={mobileOpen}>
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
}
