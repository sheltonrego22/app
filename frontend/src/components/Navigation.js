import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getNavData, toArPath, toEnPath } from '@/i18n/navData';

const LOGO_URL = "/egmg-logo-transparent.png";
const LOGO_LIGHT_URL = "/egmg-logo-dark-text.png";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const isAr = location.pathname.startsWith('/ar');
  const { navLinks, aboutLinks, brandsLinks, corporateLinks, retailLinks, supportLinks, labels } = getNavData(isAr);
  const track = (cls) => (isAr ? '' : cls);
  const langTarget = isAr ? toEnPath(location.pathname) : toArPath(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const mobileTopLinks = navLinks.filter(l => !l.dropdownId);

  const getDropdownItems = (id) => {
    if (id === "brands") return brandsLinks;
    if (id === "about") return aboutLinks;
    if (id === "support") return supportLinks;
    return [];
  };

  const renderDropdown = (dropdownId) => {
    if (dropdownId === "corporate") {
      return (
        <div data-testid="corporate-dropdown" className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#111111] border border-white/10 py-4 px-5 z-50 grid grid-cols-2 gap-6">
          <div>
            <span className={`block font-heading text-[10px] ${track('tracking-[0.2em] uppercase')} text-[#EE5A01] mb-3 px-1`}>{labels.corporateHeader}</span>
            {corporateLinks.map((sl) => (
              <Link key={sl.label} to={sl.href} className="block px-1 py-2 font-body text-sm text-[#EEEDE7] hover:text-[#EE5A01] transition-colors leading-tight">
                {sl.label}
                {sl.sub && <span className="block text-[10px] text-[#666] mt-0.5">{sl.sub}</span>}
              </Link>
            ))}
          </div>
          <div>
            <span className={`block font-heading text-[10px] ${track('tracking-[0.2em] uppercase')} text-[#EE5A01] mb-3 px-1`}>{labels.retailHeader}</span>
            {retailLinks.map((sl) => (
              <Link key={sl.label} to={sl.href} className="block px-1 py-2 font-body text-sm text-[#EEEDE7] hover:text-[#EE5A01] transition-colors leading-tight">
                {sl.label}
                {sl.sub && <span className="block text-[10px] text-[#666] mt-0.5">{sl.sub}</span>}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    const items = getDropdownItems(dropdownId);
    return (
      <div data-testid={`${dropdownId}-dropdown`} className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} w-64 bg-[#111111] border border-white/10 py-2 z-50`}>
        {items.map((sl) => (
          <Link key={sl.label} to={sl.href} className="block px-5 py-2.5 text-sm font-body text-[#EEEDE7] hover:text-[#EE5A01] hover:bg-white/5 transition-colors">{sl.label}</Link>
        ))}
      </div>
    );
  };

  const mobileGroups = [
    { header: labels.aboutHeader, items: aboutLinks },
    { header: labels.brandsHeader, items: brandsLinks },
    { header: labels.corporateHeader, items: corporateLinks },
    { header: labels.retailMobileHeader, items: retailLinks },
    { header: labels.supportHeader, items: supportLinks },
  ];

  return (
    <>
      <nav
        data-testid="main-navigation"
        dir={isAr ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b-2 border-[#EE5A01]'
            : 'bg-black/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={isAr ? '/ar' : '/'} data-testid="nav-logo" className="flex-shrink-0">
              <img src={theme === 'light' ? LOGO_LIGHT_URL : LOGO_URL} alt="Eurogulf Mobility Group" className="h-12 w-auto" style={{ objectFit: 'contain' }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => link.dropdownId && setOpenDropdown(link.dropdownId)}
                  onMouseLeave={() => link.dropdownId && setOpenDropdown(null)}
                >
                  <Link
                    to={link.href}
                    data-testid={`nav-link-${link.id}`}
                    className={`font-heading ${isAr ? 'text-xs font-bold' : 'text-[10px] tracking-[0.06em]'} px-2.5 py-2 transition-colors duration-200 flex items-center gap-0.5 whitespace-nowrap ${
                      location.pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7] hover:text-[#EE5A01]'
                    }`}
                  >
                    {link.label}
                    {link.dropdownId && <ChevronDown className="w-2.5 h-2.5" />}
                  </Link>

                  {link.dropdownId && openDropdown === link.dropdownId && renderDropdown(link.dropdownId)}
                </div>
              ))}
            </div>

            {/* CTA + Theme + Lang + Mobile Toggle */}
            <div className="flex items-center gap-2">
              <button
                data-testid="theme-toggle"
                onClick={toggle}
                className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to={langTarget}
                data-testid="lang-toggle"
                className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-heading text-xs tracking-wider flex items-center gap-1"
                aria-label="Switch language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{labels.langLabel}</span>
              </Link>
              <a href="tel:800364" dir="ltr" className="hidden lg:flex items-center gap-2 font-heading text-xs text-[#EEEDE7] tracking-wider hover:text-[#EE5A01] transition-colors whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-[#EE5A01]" /> {labels.phone}
              </a>
              <Link
                to={labels.quoteHref}
                data-testid="nav-book-now-btn"
                className={`hidden sm:block bg-[#EE5A01] text-black font-heading font-bold text-xs ${track('tracking-[0.05em]')} px-5 py-2.5 hover:bg-[#d45000] transition-all duration-200 whitespace-nowrap`}
              >
                {labels.getQuote}
              </Link>
              <button
                data-testid="mobile-menu-toggle"
                className="xl:hidden text-[#EEEDE7] p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div data-testid="mobile-menu-overlay" dir={isAr ? 'rtl' : 'ltr'} className="fixed inset-0 z-40 bg-black overflow-y-auto">
          <button className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-[#EEEDE7] z-50 p-2`} onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center justify-start gap-5 pt-24 pb-12 px-6 min-h-full">
            {mobileTopLinks.map((link) => (
              <Link key={link.id} to={link.href} className={`font-heading text-xl font-bold ${track('tracking-[0.1em]')} transition-colors ${location.pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7]'}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}

            {mobileGroups.map((g) => (
              <div key={g.header} className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
                <span className={`font-heading text-[10px] text-[#EE5A01] ${track('tracking-[0.25em] uppercase')}`}>{g.header}</span>
                {g.items.map((sl) => (
                  <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>{sl.label}</Link>
                ))}
              </div>
            ))}

            <Link to={labels.quoteHref} className={`mt-4 bg-[#EE5A01] text-black font-heading font-bold text-base ${track('tracking-[0.05em]')} px-8 py-3.5 w-full max-w-xs text-center`} onClick={() => setMobileOpen(false)}>
              {labels.getQuote}
            </Link>
            <a href="tel:800364" dir="ltr" className="font-heading text-sm text-[#EEEDE7] tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#EE5A01]" /> {labels.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
