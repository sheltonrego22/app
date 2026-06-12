import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Phone, Mail, Facebook, MapPin } from 'lucide-react';

const LOGO_URL = "/egmg-logo-transparent.png";

const divisions = [
  { name: "Europcar Dubai", href: "/europcar" },
  { name: "Goldcar Dubai", href: "/goldcar" },
  { name: "Eurogulf Premium Chauffeur", href: "/chauffeur-service" },
  { name: "Truckline Transport", href: "/truckline" },
  { name: "Eurogulf Used Cars", href: "/used-cars" },
  { name: "Eurogulf Auto Garage", href: "/autocare" },
];

const locations = [
  "Dubai HQ", "Emirates Towers", "Atlantis The Palm", "Dubai Hills Mall",
  "Dubai Airport T1", "Dubai Airport T2", "Dubai Airport T3", "Al Maktoum Airport",
  "Sharjah Airport", "Sharjah Office", "Jebel Ali", "Ras Al Khaimah",
  "Fujairah", "Abu Dhabi"
];

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <img
              src={LOGO_URL}
              alt="EGMG"
              className="h-10 w-auto mb-6"
              style={{ objectFit: 'contain' }}
            />
            <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">
              Eurogulf Mobility Group — UAE's most trusted mobility conglomerate since 1976. 
              From premium chauffeur services to comprehensive fleet solutions.
            </p>
            <p className="font-heading font-bold text-[#EE5A01] text-lg tracking-[0.05em]">
              WE MOVE YOU!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-[#EEEDE7] text-sm tracking-[0.1em] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Businesses", href: "/businesses" },
                { label: "Our Services", href: "/services" },
                { label: "Leadership", href: "/leadership" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Media Center", href: "/media" },
                { label: "Careers", href: "/careers" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-sm text-[#666666] hover:text-[#EE5A01] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Businesses */}
          <div>
            <h4 className="font-heading font-bold text-[#EEEDE7] text-sm tracking-[0.1em] uppercase mb-6">
              Our Brands
            </h4>
            <ul className="space-y-2.5">
              {divisions.map((d) => (
                <li key={d.name}>
                  <Link to={d.href} className="font-body text-sm text-[#666666] hover:text-[#EE5A01] transition-colors">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="font-heading font-bold text-[#EEEDE7] text-sm tracking-[0.1em] uppercase mb-6">
              Contact & Social
            </h4>
            <div className="space-y-4">
              <a href="tel:800364" className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#EE5A01] transition-colors font-body">
                <Phone className="w-4 h-4 text-[#EE5A01]" />
                800 364 (Toll-Free)
              </a>
              <a href="mailto:wemoveyou@eurogulf.ae" className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#EE5A01] transition-colors font-body">
                <Mail className="w-4 h-4 text-[#EE5A01]" />
                wemoveyou@eurogulf.ae
              </a>
              <a href="https://maps.app.goo.gl/3bzo99DMo9XgkLBq6?g_st=ac" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#EE5A01] transition-colors font-body">
                <MapPin className="w-4 h-4 text-[#EE5A01]" />
                Al Quoz Industrial 3, Dubai
              </a>
              <a
                href="https://wa.me/971800364"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-btn"
                className="inline-block bg-[#25D366] text-white font-heading font-bold text-xs tracking-wider px-5 py-2.5 hover:bg-[#1fb855] transition-colors mt-2"
              >
                CHAT ON WHATSAPP
              </a>
              <div className="flex gap-4 pt-4">
                <a href="https://www.facebook.com/people/Eurogulf-Mobility-Group/61567335605176/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/eurogulfmobility" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/105403528/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@EurogulfMobilityGroup-x1n" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-[#666666]">
            &copy; 2026 Eurogulf Mobility Group. All Rights Reserved.
          </p>
          <p className="font-mono text-xs text-[#666666] tracking-wider">
            ISO 9001:2015 &amp; ISO 10002 CERTIFIED
          </p>
        </div>
      </div>
    </footer>
  );
}
