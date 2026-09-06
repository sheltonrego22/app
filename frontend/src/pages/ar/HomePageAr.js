import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Truck, Tag, Wrench, ArrowLeft, Shield, Award, CheckCircle } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import ar from '@/i18n/ar';

const t = ar;
const HERO_BG = "https://images.unsplash.com/photo-1459787915554-b34915863013?w=1600&h=900&fit=crop&q=80";
const EGMG_LOGO = "/egmg-logo-transparent.png";

const stats = [
  { value: 1976, suffix: "", label: t.home.statsFoundedLabel, isYear: true },
  { value: 12000, suffix: "+", label: t.home.statsVehiclesLabel },
  { value: 1200, suffix: "+", label: t.home.statsProfessionalsLabel },
  { value: 14, suffix: "", label: t.home.statsLocationsLabel },
  { value: 7, suffix: "", label: t.home.statsEmiratesLabel },
];

const brands = [
  { icon: Car, title: t.brands.europcar, promise: t.brands.europcarDesc, link: "/europcar" },
  { icon: Tag, title: t.brands.goldcar, promise: t.brands.goldcarDesc, link: "/goldcar" },
  { icon: Truck, title: t.brands.truckline, promise: t.brands.trucklineDesc, link: "/truckline" },
  { icon: Crown, title: t.brands.chauffeur, promise: t.brands.chauffeurDesc, link: "/chauffeur-service" },
  { icon: Wrench, title: t.brands.autoGarage, promise: t.brands.autoGarageDesc, link: "/autocare" },
  { icon: Building2, title: t.brands.usedCars, promise: t.brands.usedCarsDesc, link: "/used-cars" },
];

function StatItem({ value, suffix, label, isYear }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCounter(value, 2000, isVisible);
  const displayValue = isYear ? count.toString() : count.toLocaleString('ar-AE');
  return (
    <div ref={ref} className="text-center px-3 py-6">
      <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EE5A01]">{displayValue}{suffix}</div>
      <div className="font-heading text-[10px] sm:text-xs tracking-[0.1em] text-[#EEEDE7] mt-2">{label}</div>
    </div>
  );
}

export default function HomePageAr() {
  const [brandsRef, brandsVisible] = useScrollAnimation();
  const [introRef, introVisible] = useScrollAnimation();

  useEffect(() => { document.title = "مجموعة يوروجلف للتنقل | الشريك الأول للتنقل في الإمارات | منذ ١٩٧٦"; }, []);

  return (
    <div dir="rtl" className="font-body">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
          <img src={EGMG_LOGO} alt="يوروجلف موبيليتي" className="h-14 sm:h-16 w-auto mx-auto mb-6" />
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-6">{t.home.tagline} · {t.home.since}</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-8xl leading-[0.9] text-[#EEEDE7] mb-6">{t.home.heroTitle}</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-2xl mx-auto mb-10 leading-relaxed">{t.home.heroSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ar/brands" className="btn-primary text-center">{t.home.exploreBtn}</Link>
            <Link to="/ar/contact" className="btn-ghost text-center">{t.home.quoteBtn}</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10">
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={introRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${introVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] mb-6">{t.home.legacyTitle}</h2>
            <p className="font-body text-[#999] leading-loose text-lg">{t.home.legacyText1}</p>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={brandsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${brandsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7]">{t.home.brandsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brands.map((b, i) => (
              <Link key={b.title} to={b.link} className={`service-card bg-[#111111] border border-white/5 p-7 group ${brandsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <b.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">{b.promise}</p>
                <span className="inline-flex items-center gap-2 text-[#EE5A01] text-sm font-heading font-bold group-hover:gap-3 transition-all">
                  {t.common.learnMore} <ArrowLeft className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-black mb-2">{t.home.ctaTitle}</h2>
          <p className="font-body text-black/70 mb-6">{t.home.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/europcar" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111111] transition-colors text-center">{t.home.rentBtn}</Link>
            <Link to="/chauffeur-service" className="bg-transparent text-black font-heading font-bold text-sm px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">{t.home.chauffeurBtn}</Link>
            <Link to="/contact" className="bg-transparent text-black font-heading font-bold text-sm px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">{t.home.corporateBtn}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
