import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Sun, Moon, Globe } from 'lucide-react';
import { NavDropdown } from '@/components/nav/NavDropdown';

export function DesktopLinks({ nav, isAr, pathname, openDropdown, setOpenDropdown }) {
  return (
    <div className="hidden xl:flex items-center gap-0.5">
      {nav.navLinks.map((link) => (
        <div
          key={link.id}
          className="relative group"
          onMouseEnter={() => link.dropdownId && setOpenDropdown(link.dropdownId)}
          onMouseLeave={() => link.dropdownId && setOpenDropdown(null)}
        >
          <Link
            to={link.href}
            data-testid={`nav-link-${link.id}`}
            className={`font-heading ${isAr ? 'text-xs font-bold' : 'text-[10px] tracking-[0.06em]'} px-2.5 py-2 transition-colors duration-200 flex items-center gap-0.5 whitespace-nowrap ${pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7] hover:text-[#EE5A01]'}`}
          >
            {link.label}
            {link.dropdownId && <ChevronDown className="w-2.5 h-2.5" />}
          </Link>
          {link.dropdownId && openDropdown === link.dropdownId && <NavDropdown dropdownId={link.dropdownId} nav={nav} isAr={isAr} />}
        </div>
      ))}
    </div>
  );
}

export function NavActions({ labels, isAr, theme, onToggleTheme, langTarget, mobileOpen, onToggleMobile }) {
  return (
    <div className="flex items-center gap-2">
      <button data-testid="theme-toggle" onClick={onToggleTheme} className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors" aria-label="Toggle theme">
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <Link to={langTarget} data-testid="lang-toggle" className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-heading text-xs tracking-wider flex items-center gap-1" aria-label="Switch language">
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{labels.langLabel}</span>
      </Link>
      <a href="tel:800364" dir="ltr" className="hidden lg:flex items-center gap-2 font-heading text-xs text-[#EEEDE7] tracking-wider hover:text-[#EE5A01] transition-colors whitespace-nowrap">
        <Phone className="w-3.5 h-3.5 text-[#EE5A01]" /> {labels.phone}
      </a>
      <Link to={labels.quoteHref} data-testid="nav-book-now-btn" className={`hidden sm:block bg-[#EE5A01] text-black font-heading font-bold text-xs ${isAr ? '' : 'tracking-[0.05em]'} px-5 py-2.5 hover:bg-[#d45000] transition-all duration-200 whitespace-nowrap`}>
        {labels.getQuote}
      </Link>
      <button data-testid="mobile-menu-toggle" className="xl:hidden text-[#EEEDE7] p-2" onClick={onToggleMobile} aria-label="Toggle menu">
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
}
