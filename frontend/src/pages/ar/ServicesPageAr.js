import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Check, Truck, Wrench, Crown, Tag, Building2 } from 'lucide-react';
import ar from '@/i18n/ar';

const t = ar.services;

export default function ServicesPageAr() {
  useEffect(() => { document.title = "حلول التنقل | مجموعة يوروجلف للتنقل"; }, []);

  const sections = [
    { icon: Car, title: t.carRental, desc: t.carRentalDesc, cta: t.bookRental, link: "/ar/europcar" },
    { icon: Building2, title: t.leasing, desc: t.leasingDesc, cta: t.requestQuote, link: "/ar/leasing" },
    { icon: Crown, title: t.chauffeurTitle, desc: t.chauffeurDesc, cta: t.bookChauffeur, link: "/ar/chauffeur-service" },
    { icon: Car, title: t.coachTitle, desc: t.coachDesc, cta: t.getGroupQuote, link: "/ar/contact" },
    { icon: Truck, title: t.truckTitle, desc: t.truckDesc, cta: t.enquireFleet, link: "/ar/contact" },
    { icon: Wrench, title: t.usedCarsTitle, desc: t.usedCarsDesc, cta: t.browseStock, link: "/used-cars" },
  ];

  return (
    <div dir="rtl" data-testid="services-page-ar" className="font-body">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase">حلول التنقل الشاملة</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] tracking-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base text-[#666666] max-w-xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s) => (
              <div key={s.title} className="bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all">
                <s.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed mb-5">{s.desc}</p>
                <Link to={s.link} className="btn-primary inline-block text-center text-xs">{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black tracking-tight mb-4">{t.customSolution}</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">{t.customDesc}</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">{ar.common.contactUs}</Link>
        </div>
      </section>
    </div>
  );
}
