import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import ar from '@/i18n/ar';

const t = ar.leasing;

const vehicleClasses = [
  { value: "economy", label: "اقتصادي (كورولا / إلنترا)", monthly: 1750 },
  { value: "midsuv", label: "SUV متوسط (توسان / CR-V)", monthly: 2400 },
  { value: "premium", label: "سيدان متميز (كامري / أكورد)", monthly: 3060 },
  { value: "fullsuv", label: "SUV كامل (باترول / لاند كروزر)", monthly: 4500 },
  { value: "luxury", label: "فاخر (رينج روفر / كاديلاك)", monthly: 7200 },
];

export default function LeasingPageAr() {
  const [fleetSize, setFleetSize] = useState(10);
  const [term, setTerm] = useState("36");
  const [vehicleClass, setVehicleClass] = useState("premium");

  useEffect(() => { document.title = "التأجير التشغيلي | مجموعة يوروجلف للتنقل"; }, []);

  const vehicle = vehicleClasses.find(v => v.value === vehicleClass);
  const termMonths = parseInt(term);
  const getTermDiscount = m => m >= 48 ? 0.15 : m >= 36 ? 0.10 : m >= 24 ? 0.05 : 0;
  const getVolDiscount = s => s >= 10 ? 0.15 : s >= 5 ? 0.08 : 0;
  const totalDiscount = Math.min(getTermDiscount(termMonths) + getVolDiscount(fleetSize), 0.25);
  const leaseMonthly = vehicle ? Math.round(vehicle.monthly * (1 - totalDiscount)) : 0;
  const leasingTotal = leaseMonthly * termMonths * fleetSize;
  const buyMultiplier = termMonths >= 36 ? 1.35 : termMonths >= 24 ? 1.28 : 1.2;
  const buyTotal = Math.round(vehicle ? vehicle.monthly * buyMultiplier * termMonths * fleetSize : 0);
  const saving = buyTotal - leasingTotal;
  const savingPct = buyTotal > 0 ? Math.round((saving / buyTotal) * 100) : 0;

  return (
    <div dir="rtl" data-testid="leasing-page-ar" className="font-body">
      <section data-testid="ar-leasing-hero" className="relative min-h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block">تأجير شخصي وللشركات</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] tracking-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">{t.heroSub}</p>
          <Link to="/ar/contact" className="btn-primary inline-block">اطلب عرض أسعار</Link>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight mb-4">{t.personalTitle}</h2>
          <p className="text-[#666] max-w-xl mx-auto">{t.personalDesc}</p>
        </div>
      </section>

      {/* Fleet Savings Calculator */}
      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight mb-3">{t.calculatorTitle}</h2>
            <p className="text-[#666] max-w-lg mx-auto">{t.calculatorDesc}</p>
          </div>

          <div className="bg-[#111] border border-white/5 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">{t.fleetSize}</label>
                <input type="range" min="1" max="100" value={fleetSize} onChange={e => setFleetSize(parseInt(e.target.value))} className="w-full accent-[#EE5A01]" />
                <p className="font-mono text-sm text-[#EE5A01] mt-1">{fleetSize} {ar.common.vehicles}</p>
              </div>
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">{t.term}</label>
                <select value={term} onChange={e => setTerm(e.target.value)} className="w-full bg-black border border-[#333] text-[#EEEDE7] p-2.5 text-sm">
                  {["12","24","36","48","60"].map(t => <option key={t} value={t}>{t} {ar.common.months}</option>)}
                </select>
              </div>
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">{t.vehicleClass}</label>
                <select value={vehicleClass} onChange={e => setVehicleClass(e.target.value)} className="w-full bg-black border border-[#333] text-[#EEEDE7] p-2.5 text-sm">
                  {vehicleClasses.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="font-heading text-xs text-[#666] uppercase tracking-wider mb-1">{t.estimatedSaving} {term} شهر</p>
              <p className="font-heading font-black text-4xl sm:text-5xl text-[#EE5A01]">AED {saving.toLocaleString()}</p>
              <p className="font-mono text-sm text-[#EEEDE7]/70">{savingPct}% {ar.common.savingVsBuying}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 text-center">
                <p className="font-heading text-xs text-[#666] uppercase tracking-wider mb-2">{t.buyOutright}</p>
                <p className="font-heading font-bold text-2xl text-[#EEEDE7]">AED {buyTotal.toLocaleString()}</p>
              </div>
              <div className="bg-[#EE5A01]/10 border border-[#EE5A01]/30 p-5 text-center">
                <p className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider mb-2">{t.eurogulfLeasing}</p>
                <p className="font-heading font-bold text-2xl text-[#EE5A01]">AED {leasingTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/ar/contact" className="btn-primary inline-block">{t.customizeLease}</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black tracking-tight mb-4">{t.readyToStart}</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">{t.readyDesc}</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111] transition-colors inline-block">{ar.common.contactUs}</Link>
        </div>
      </section>
    </div>
  );
}
