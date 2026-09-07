import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';
import { getNavData } from '@/i18n/navData';
import { SOCIAL } from '@/config/social';

const LOGO_URL = "/egmg-logo-transparent.png";

function FooterColumn({ header, links, testid }) {
  return (
    <div data-testid={testid}>
      <h4 className="font-heading font-bold text-[11px] tracking-[0.2em] text-[#EE5A01] uppercase mb-5">{header}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link to={l.href} className="font-body text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-1 group">
              {l.label}
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all text-[#EE5A01]" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn({ f }) {
  return (
    <div data-testid="footer-contact">
      <h4 className="font-heading font-bold text-[11px] tracking-[0.2em] text-[#EE5A01] uppercase mb-5">{f.contactHeader}</h4>
      <ul className="space-y-3.5 font-body text-sm text-white/65">
        <li><a href="tel:800364" dir="ltr" className="flex items-center gap-3 hover:text-white transition-colors"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#EE5A01] text-white flex-shrink-0"><Phone className="w-4 h-4" /></span>{f.phone}</a></li>
        <li><a href={`mailto:${f.email}`} className="flex items-center gap-3 hover:text-white transition-colors"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#EE5A01] text-white flex-shrink-0"><Mail className="w-4 h-4" /></span>{f.email}</a></li>
        <li><a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#25D366] text-white flex-shrink-0"><MessageCircle className="w-4 h-4" /></span>{f.whatsapp}</a></li>
        <li className="flex items-start gap-3"><span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-white flex-shrink-0"><MapPin className="w-4 h-4" /></span><span className="leading-relaxed">{f.location}</span></li>
      </ul>
    </div>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  const isAr = pathname.startsWith('/ar');
  const nav = getNavData(isAr);
  const f = nav.footer;
  const brandLinks = nav.brandsLinks.map((b) => ({ label: b.label, href: b.href }));
  const solutionLinks = [...nav.businessLinks.slice(0, 4), ...nav.personalLinks.slice(0, 3)].map((l) => ({ label: l.label, href: l.href }));

  return (
    <footer data-testid="main-footer" dir={isAr ? 'rtl' : 'ltr'} className="relative bg-[#121212] text-white pb-24 lg:pb-0">
      <div className="h-[3px] w-full bg-[#EE5A01]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <img src={LOGO_URL} alt="Eurogulf Mobility Group" className="h-14 w-auto mb-6" />
            <p className="font-body text-sm text-white/65 leading-relaxed max-w-sm mb-6">{f.about}</p>
            <p className="font-heading font-black text-2xl text-[#EE5A01] tracking-tight mb-6">{f.tagline}</p>
            <div className="flex gap-2">
              {[[SOCIAL.linkedin, Linkedin, 'LinkedIn'], [SOCIAL.instagram, Instagram, 'Instagram'], [SOCIAL.facebook, Facebook, 'Facebook']].map(([href, Icon, name]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} data-testid={`footer-social-${name.toLowerCase()}`} className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 text-white/70 hover:bg-[#EE5A01] hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterColumn header={f.groupHeader} links={f.groupLinks} testid="footer-group" />
            <FooterColumn header={f.brandsHeader} links={brandLinks} testid="footer-brands" />
            <FooterColumn header={f.solutionsHeader} links={solutionLinks} testid="footer-solutions" />
            <FooterColumn header={f.supportHeader} links={nav.supportLinks} testid="footer-support" />
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8"><ContactColumn f={f} /></div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-2 text-white/45 font-body text-xs">
            <p>{f.iso}</p>
            <p>{f.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
