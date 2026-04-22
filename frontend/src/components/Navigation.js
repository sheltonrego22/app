import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/yxpq5nol_Logo1.png";

const serviceLinks = [
  { label: "All Services", href: "/services" },
  { label: "Europcar", href: "/europcar" },
  { label: "Goldcar", href: "/goldcar" },
  { label: "Royal Limousine", href: "/royal-limousine" },
  { label: "Emirates Taxi", href: "/emirates-taxi" },
  { label: "Truckline", href: "/truckline" },
  { label: "Used Cars", href: "/used-cars" },
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "Leadership", href: "/leadership" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about", hasDropdown: true, dropdownId: "about" },
  { label: "SERVICES", href: "/services", hasDropdown: true, dropdownId: "services" },
  { label: "MEDIA", href: "/media" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border-b-2 border-[#EE5A01]'
            : 'bg-black/70 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" data-testid="nav-logo" className="flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="EGMG - Eurogulf Mobility Group"
                className="h-12 w-auto"
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.dropdownId)}
                  onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    to={link.href}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                    className={`font-heading text-sm tracking-[0.1em] px-5 py-2 transition-colors duration-200 flex items-center gap-1 ${
                      location.pathname === link.href
                        ? 'text-[#EE5A01]'
                        : 'text-[#EEEDE7] hover:text-[#EE5A01]'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {link.dropdownId === "services" && openDropdown === "services" && (
                    <div
                      data-testid="services-dropdown"
                      className="absolute top-full left-0 w-56 bg-[#111111] border border-white/10 py-2 z-50"
                    >
                      {serviceLinks.map((sl) => (
                        <Link
                          key={sl.label}
                          to={sl.href}
                          className="block px-5 py-2.5 text-sm font-body text-[#EEEDE7] hover:text-[#EE5A01] hover:bg-white/5 transition-colors"
                        >
                          {sl.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {link.dropdownId === "about" && openDropdown === "about" && (
                    <div
                      data-testid="about-dropdown"
                      className="absolute top-full left-0 w-52 bg-[#111111] border border-white/10 py-2 z-50"
                    >
                      {aboutLinks.map((al) => (
                        <Link
                          key={al.label}
                          to={al.href}
                          className="block px-5 py-2.5 text-sm font-body text-[#EEEDE7] hover:text-[#EE5A01] hover:bg-white/5 transition-colors"
                        >
                          {al.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/book-chauffeur"
                data-testid="nav-book-now-btn"
                className="hidden sm:block bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] px-6 py-3 hover:bg-[#d45000] transition-all duration-200 hover:scale-[1.02]"
              >
                BOOK NOW
              </Link>
              <button
                data-testid="mobile-menu-toggle"
                className="lg:hidden text-[#EEEDE7] p-2"
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
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 z-40 bg-black overflow-y-auto"
        >
          <button
            className="absolute top-6 right-6 text-[#EEEDE7] z-50 p-2"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center justify-start gap-6 pt-24 pb-12 px-6 min-h-full">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                className={`font-heading text-xl sm:text-2xl font-bold tracking-[0.1em] transition-colors ${
                  location.pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7]'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
              <Link to="/businesses" className="font-heading text-lg text-[#666666] hover:text-[#EE5A01] tracking-[0.1em]" onClick={() => setMobileOpen(false)}>OUR BUSINESSES</Link>
              <Link to="/leadership" className="font-heading text-lg text-[#666666] hover:text-[#EE5A01] tracking-[0.1em]" onClick={() => setMobileOpen(false)}>LEADERSHIP</Link>
              <Link to="/sustainability" className="font-heading text-lg text-[#666666] hover:text-[#EE5A01] tracking-[0.1em]" onClick={() => setMobileOpen(false)}>SUSTAINABILITY</Link>
              <Link to="/careers" className="font-heading text-lg text-[#666666] hover:text-[#EE5A01] tracking-[0.1em]" onClick={() => setMobileOpen(false)}>CAREERS</Link>
            </div>
            <div className="flex flex-col items-center gap-2.5 pt-4 border-t border-white/10 w-full max-w-xs">
              <span className="font-heading text-[10px] text-[#EE5A01] tracking-[0.25em] uppercase">Divisions</span>
              {serviceLinks.slice(1).map((sl) => (
                <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>
                  {sl.label}
                </Link>
              ))}
            </div>
            <Link
              to="/book-chauffeur"
              className="mt-4 bg-[#EE5A01] text-black font-heading font-bold text-base tracking-[0.05em] px-8 py-3.5 w-full max-w-xs text-center"
              onClick={() => setMobileOpen(false)}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
