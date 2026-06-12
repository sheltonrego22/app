import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const LOGO_URL = "/egmg-logo-transparent.png";

const aboutLinks = [
  { label: "Who We Are", href: "/about" },
  { label: "Our History & Milestones", href: "/about" },
  { label: "Vision, Mission & Values", href: "/about" },
  { label: "Awards & Certifications", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Leadership", href: "/leadership" },
];

const brandsLinks = [
  { label: "Europcar Dubai", href: "/europcar" },
  { label: "Goldcar Dubai", href: "/goldcar" },
  { label: "Eurogulf Premium Chauffeur", href: "/chauffeur-service" },
  { label: "Truckline Transport", href: "/truckline" },
  { label: "Eurogulf Used Cars", href: "/used-cars" },
  { label: "Eurogulf Auto Garage", href: "/autocare" },
];

const corporateLinks = [
  { label: "Fleet Management", href: "/leasing" },
  { label: "Dubai Municipality Partnership", href: "/dubai-municipality" },
  { label: "Corporate Accounts", href: "/contact" },
  { label: "Major Clients", href: "/partners" },
];

const mediaLinks = [
  { label: "News & Press Releases", href: "/media" },
  { label: "Events", href: "/media?category=Company+Updates" },
  { label: "Awards", href: "/about" },
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT EGMG", href: "/about", hasDropdown: true, dropdownId: "about" },
  { label: "OUR BRANDS", href: "/businesses", hasDropdown: true, dropdownId: "brands" },
  { label: "CORPORATE SOLUTIONS", href: "/services", hasDropdown: true, dropdownId: "corporate" },
  { label: "MEDIA & PRESS", href: "/media", hasDropdown: true, dropdownId: "media" },
  { label: "CAREERS", href: "/careers" },
  { label: "PARTNER WITH US", href: "/partner" },
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
  }, [location.pathname]);

  const getDropdownItems = (id) => {
    if (id === "brands") return brandsLinks;
    if (id === "corporate") return corporateLinks;
    if (id === "about") return aboutLinks;
    if (id === "media") return mediaLinks;
    return [];
  };

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b-2 border-[#EE5A01]'
            : 'bg-black/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" data-testid="nav-logo" className="flex-shrink-0">
              <img src={LOGO_URL} alt="Eurogulf Mobility Group" className="h-12 w-auto" style={{ objectFit: 'contain' }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.dropdownId)}
                  onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    to={link.href}
                    data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`font-heading text-[11px] tracking-[0.08em] px-3 py-2 transition-colors duration-200 flex items-center gap-1 ${
                      location.pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7] hover:text-[#EE5A01]'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {link.hasDropdown && openDropdown === link.dropdownId && (
                    <div
                      data-testid={`${link.dropdownId}-dropdown`}
                      className="absolute top-full left-0 w-60 bg-[#111111] border border-white/10 py-2 z-50"
                    >
                      {getDropdownItems(link.dropdownId).map((sl) => (
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
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a href="tel:800364" className="hidden lg:flex items-center gap-2 font-heading text-xs text-[#EEEDE7] tracking-wider hover:text-[#EE5A01] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#EE5A01]" /> 800 364
              </a>
              <Link
                to="/contact"
                data-testid="nav-book-now-btn"
                className="hidden sm:block bg-[#EE5A01] text-black font-heading font-bold text-xs tracking-[0.05em] px-5 py-2.5 hover:bg-[#d45000] transition-all duration-200"
              >
                GET A QUOTE
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
        <div data-testid="mobile-menu-overlay" className="fixed inset-0 z-40 bg-black overflow-y-auto">
          <button className="absolute top-6 right-6 text-[#EEEDE7] z-50 p-2" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center justify-start gap-5 pt-24 pb-12 px-6 min-h-full">
            {navLinks.filter(l => !l.hasDropdown).map((link) => (
              <Link key={link.label} to={link.href} className={`font-heading text-xl font-bold tracking-[0.1em] transition-colors ${location.pathname === link.href ? 'text-[#EE5A01]' : 'text-[#EEEDE7]'}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
              <span className="font-heading text-[10px] text-[#EE5A01] tracking-[0.25em] uppercase">About EGMG</span>
              {aboutLinks.map((sl) => (
                <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>{sl.label}</Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
              <span className="font-heading text-[10px] text-[#EE5A01] tracking-[0.25em] uppercase">Our Brands</span>
              {brandsLinks.map((sl) => (
                <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>{sl.label}</Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
              <span className="font-heading text-[10px] text-[#EE5A01] tracking-[0.25em] uppercase">Corporate Solutions</span>
              {corporateLinks.map((sl) => (
                <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>{sl.label}</Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs">
              <span className="font-heading text-[10px] text-[#EE5A01] tracking-[0.25em] uppercase">Media & Press</span>
              {mediaLinks.map((sl) => (
                <Link key={sl.label} to={sl.href} className="font-body text-sm text-[#666] hover:text-[#EE5A01]" onClick={() => setMobileOpen(false)}>{sl.label}</Link>
              ))}
            </div>

            <Link to="/contact" className="mt-4 bg-[#EE5A01] text-black font-heading font-bold text-base tracking-[0.05em] px-8 py-3.5 w-full max-w-xs text-center" onClick={() => setMobileOpen(false)}>
              GET A QUOTE
            </Link>
            <a href="tel:800364" className="font-heading text-sm text-[#EEEDE7] tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#EE5A01]" /> 800 364
            </a>
          </div>
        </div>
      )}
    </>
  );
}
