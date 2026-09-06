import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Phone, Mail, Facebook, MapPin } from 'lucide-react';
import { getNavData } from '@/i18n/navData';

const LOGO_URL = "/egmg-logo-transparent.png";

const socials = [
  { href: "https://www.facebook.com/people/Eurogulf-Mobility-Group/61567335605176/", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/eurogulfmobility", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/105403528/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.youtube.com/@EurogulfMobilityGroup-x1n", label: "YouTube", Icon: Youtube },
];

export default function Footer() {
  const { pathname } = useLocation();
  const isAr = pathname.startsWith('/ar');
  const { brandsLinks, footer: f } = getNavData(isAr);
  const headerCls = `font-heading font-bold text-[#EEEDE7] text-sm ${isAr ? '' : 'tracking-[0.1em] uppercase'} mb-6`;
  const linkCls = "font-body text-sm text-[#666666] hover:text-[#EE5A01] transition-colors";

  return (
    <footer data-testid="main-footer" dir={isAr ? 'rtl' : 'ltr'} className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={LOGO_URL} alt="Eurogulf Mobility Group" className="h-10 w-auto mb-6" style={{ objectFit: 'contain' }} />
            <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">{f.about}</p>
            <p className={`font-heading font-bold text-[#EE5A01] text-lg ${isAr ? '' : 'tracking-[0.05em]'}`}>{f.tagline}</p>
          </div>

          <div>
            <h4 className={headerCls}>{f.quickLinksHeader}</h4>
            <ul className="space-y-2.5">
              {f.quickLinks.map((link) => (
                <li key={link.label}><Link to={link.href} className={linkCls}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headerCls}>{f.brandsHeader}</h4>
            <ul className="space-y-2.5">
              {brandsLinks.map((d) => (
                <li key={d.label}><Link to={d.href} className={linkCls}>{d.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headerCls}>{f.contactHeader}</h4>
            <div className="space-y-4">
              <a href="tel:800364" className={`flex items-center gap-3 ${linkCls}`}>
                <Phone className="w-4 h-4 text-[#EE5A01]" />
                {f.phone}
              </a>
              <a href="mailto:wemoveyou@eurogulf.ae" className={`flex items-center gap-3 ${linkCls}`}>
                <Mail className="w-4 h-4 text-[#EE5A01]" />
                wemoveyou@eurogulf.ae
              </a>
              <a href="https://maps.app.goo.gl/3bzo99DMo9XgkLBq6?g_st=ac" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkCls}`}>
                <MapPin className="w-4 h-4 text-[#EE5A01]" />
                {f.location}
              </a>
              <a
                href="https://wa.me/971800364"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-btn"
                className={`inline-block bg-[#25D366] text-white font-heading font-bold text-xs ${isAr ? '' : 'tracking-wider'} px-5 py-2.5 hover:bg-[#1fb855] transition-colors mt-2`}
              >
                {f.whatsapp}
              </a>
              <div className="flex gap-4 pt-4">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-[#666666]">{f.rights}</p>
          <p className={`font-mono text-xs text-[#666666] ${isAr ? '' : 'tracking-wider'}`}>{f.iso}</p>
        </div>
      </div>
    </footer>
  );
}
