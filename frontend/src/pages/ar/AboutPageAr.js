import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';
import ar from '@/i18n/ar';

const t = ar;
const EGMG_LOGO = "/egmg-logo-transparent.png";
const EUROPCAR_LOGO = "/europcar-logo.png";
const GOLDCAR_LOGO = "/goldcar-logo.png";

const divisions = [
  { name: t.brands.europcar, desc: t.brands.europcarDesc, href: "/europcar", logo: EUROPCAR_LOGO },
  { name: t.brands.goldcar, desc: t.brands.goldcarDesc, href: "/goldcar", logo: GOLDCAR_LOGO },
  { name: t.brands.truckline, desc: t.brands.trucklineDesc, href: "/truckline", logo: EGMG_LOGO },
  { name: t.brands.chauffeur, desc: t.brands.chauffeurDesc, href: "/chauffeur-service", logo: EGMG_LOGO },
  { name: t.brands.autoGarage, desc: t.brands.autoGarageDesc, href: "/autocare", logo: EGMG_LOGO },
  { name: t.brands.usedCars, desc: t.brands.usedCarsDesc, href: "/used-cars", logo: EGMG_LOGO },
];

export default function AboutPageAr() {
  useEffect(() => { document.title = "عن مجموعة يوروجلف للتنقل | منظومة تنقل متصلة"; }, []);

  return (
    <div dir="rtl" className="font-body">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24 pb-16">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">{t.about.heroTitle}</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-2xl mx-auto">{t.about.heroSub}</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl text-[#EEEDE7] mb-6">{t.about.whoWeAre}</h2>
          <p className="font-body text-[#999] leading-loose text-base">{t.about.whoWeAreText}</p>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#EE5A01]" />
              <h2 className="font-heading font-black text-2xl text-[#EEEDE7]">{t.about.uaePresence}</h2>
            </div>
            <p className="font-body text-[#999] leading-relaxed">{t.about.uaePresenceText}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-[#EE5A01]" />
              <h2 className="font-heading font-black text-2xl text-[#EEEDE7]">{t.about.portfolioTitle}</h2>
            </div>
            <p className="font-body text-[#999] leading-relaxed text-sm">{t.about.portfolioText}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl text-[#EEEDE7]">{t.home.brandsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((d) => (
              <Link key={d.name} to={d.href} className="bg-[#111111] border border-white/5 p-6 hover:border-[#EE5A01] transition-all group">
                <img src={d.logo} alt={d.name} className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity mb-4" loading="lazy" />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.name}</h3>
                <p className="font-body text-xs text-[#666666] leading-relaxed mb-3">{d.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#EE5A01] text-xs font-heading font-bold group-hover:gap-2 transition-all">
                  {t.common.learnMore} <ArrowLeft className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
