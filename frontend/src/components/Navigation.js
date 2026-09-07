import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { getNavData, toArPath, toEnPath } from '@/i18n/navData';
import { MobileMenu } from '@/components/nav/MobileMenu';
import { DesktopLinks, NavActions } from '@/components/nav/NavParts';

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
            <DesktopLinks nav={nav} isAr={isAr} pathname={pathname} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavActions labels={nav.labels} isAr={isAr} theme={theme} onToggleTheme={toggle} langTarget={langTarget} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </nav>

      {mobileOpen && <MobileMenu nav={nav} isAr={isAr} pathname={pathname} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
