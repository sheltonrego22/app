import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getNavData, toArPath, toEnPath } from '@/i18n/navData';
import { NavDropdown } from '@/components/nav/NavDropdown';
import { MobileMenu } from '@/components/nav/MobileMenu';

const LOGO_URL = "/egmg-logo-transparent.png";
const LOGO_LIGHT_URL = "/egmg-logo-dark-text.png";

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const scrolled = useScrolled();
  const isAr = pathname.startsWith('/ar');
  const nav = getNavData(isAr);
  const { navLinks, labels } = nav;
  const track = (cls) => (isAr ? '' : cls);
  const langTarget = isAr ? toEnPath(pathname) : toArPath(pathname);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      <nav
        data-testid="main-navigation"
        dir={isAr ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b-2 border-[#EE5A01]' : 'bg-black/80 backdrop-blur-md border-b border-white/5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={isAr ? '/ar' : '/'} data-testid="nav-logo" className="flex-shrink-0">
              <img src={theme === 'light' ? LOGO_LIGHT_URL : LOGO_URL} alt="Eurogulf Mobility Group" className="h-12 w-auto" style={{ objectFit: 'contain' }} />
            </Link>

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
                    className={`font-heading ${isAr ? 'text-xs font-bold' : 'text-[10px] tracking-[0.06em]'} px-2.5 py-2 transition-colors duration-200 flex items-center gap-0.5 whitespace-nowrap ${pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7] hover:text-[#EE5A01]'}`}
                  >
                    {link.label}
                    {link.dropdownId && <ChevronDown className="w-2.5 h-2.5" />}
                  </Link>
                  {link.dropdownId && openDropdown === link.dropdownId && <NavDropdown dropdownId={link.dropdownId} nav={nav} isAr={isAr} />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button data-testid="theme-toggle" onClick={toggle} className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link to={langTarget} data-testid="lang-toggle" className="p-2 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-heading text-xs tracking-wider flex items-center gap-1" aria-label="Switch language">
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{labels.langLabel}</span>
              </Link>
              <a href="tel:800364" dir="ltr" className="hidden lg:flex items-center gap-2 font-heading text-xs text-[#EEEDE7] tracking-wider hover:text-[#EE5A01] transition-colors whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-[#EE5A01]" /> {labels.phone}
              </a>
              <Link to={labels.quoteHref} data-testid="nav-book-now-btn" className={`hidden sm:block bg-[#EE5A01] text-black font-heading font-bold text-xs ${track('tracking-[0.05em]')} px-5 py-2.5 hover:bg-[#d45000] transition-all duration-200 whitespace-nowrap`}>
                {labels.getQuote}
              </Link>
              <button data-testid="mobile-menu-toggle" className="xl:hidden text-[#EEEDE7] p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && <MobileMenu nav={nav} isAr={isAr} pathname={pathname} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
