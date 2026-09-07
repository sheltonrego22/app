import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNavData, toArPath, toEnPath } from '@/i18n/navData';
import { MobileMenu } from '@/components/nav/MobileMenu';
import { DesktopLinks, NavActions } from '@/components/nav/NavParts';

const LOGO_URL = "/egmg-logo-dark-text.png";

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const isAr = pathname.startsWith('/ar');
  const nav = getNavData(isAr);
  const langTarget = isAr ? toEnPath(pathname) : toArPath(pathname);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header
        data-testid="main-navigation"
        dir={isAr ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled || mobileOpen ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'border-b border-black/5'}`}
      >
        <div className="h-[3px] w-full bg-[#EE5A01]" />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
          <div className="flex items-center justify-between h-[61px] lg:h-[73px]">
            <Link to={isAr ? '/ar' : '/'} data-testid="nav-logo" className="flex-shrink-0" aria-label="Eurogulf Mobility Group home">
              <img src={LOGO_URL} alt="Eurogulf Mobility Group" className="h-10 lg:h-12 w-auto" style={{ objectFit: 'contain' }} />
            </Link>
            <DesktopLinks nav={nav} isAr={isAr} pathname={pathname} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavActions labels={nav.labels} langTarget={langTarget} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen(!mobileOpen)} />
          </div>
        </nav>
      </header>
      {mobileOpen && <MobileMenu nav={nav} isAr={isAr} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
