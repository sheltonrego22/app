import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Clock, Car, Wrench, Phone, Calculator, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const personalFeatures = [
  { title: "All-Inclusive Monthly Rate", desc: "Insurance, maintenance, replacement vehicle, and 24/7 roadside assistance included in one predictable payment." },
  { title: "Flexible 12–48 Month Terms", desc: "Choose the duration that suits your lifestyle. No penalties for extending your lease." },
  { title: "New Models Every Year", desc: "Drive the latest 2025/2026 models from Toyota, Nissan, Hyundai, Kia, Audi and BMW." },
  { title: "Zero Down Payment Options", desc: "Get on the road with no upfront cost. First month plus security deposit only." },
  { title: "Free Delivery & Collection", desc: "Complimentary vehicle delivery and collection across Dubai and Sharjah." },
];

const tiers = [
  { months: "12", label: "12 months", saving: "Base Rate", popular: false },
  { months: "24", label: "24 months", saving: "Save 5%", popular: true },
  { months: "36", label: "36 months", saving: "Save 10%", popular: false },
  { months: "48", label: "48 months", saving: "Save 15%", popular: false },
];

const tierFeatures = ["Full CDW insurance", "Maintenance included", "Replacement vehicle", "24/7 roadside assist", "Free delivery"];

const partners = ["Emirates", "Etihad", "Dubai Holding", "ADNOC", "Aldar", "Emaar", "DP World", "Majid Al Futtaim", "Al Tayer", "Chalhoub", "Mashreq", "RTA"];

const vehicleClasses = [
  { value: "economy", label: "Economy (Corolla / Elantra)", monthly: 1750 },
  { value: "midsuv", label: "Mid-size SUV (Tucson / CR-V)", monthly: 2400 },
  { value: "premium", label: "Premium Sedan (Camry / Accord)", monthly: 3060 },
  { value: "fullsuv", label: "Full-size SUV (Patrol / Land Cruiser)", monthly: 4500 },
  { value: "luxury", label: "Luxury (Range Rover / Cadillac)", monthly: 7200 },
];

export default function LeasingPage() {
  const [featRef, featVisible] = useScrollAnimation();
  const [tiersRef, tiersVisible] = useScrollAnimation();
  const [calcRef, calcVisible] = useScrollAnimation();
  const [fleetSize, setFleetSize] = useState(10);
  const [term, setTerm] = useState("36");
  const [vehicleClass, setVehicleClass] = useState("premium");

  useEffect(() => { document.title = "Corporate & Personal Car Leasing — Eurogulf Mobility"; }, []);

  const vehicle = vehicleClasses.find((v) => v.value === vehicleClass);
  const termMonths = parseInt(term);

  const getTermDiscount = (months) => {
    if (months >= 48) return 0.15;
    if (months >= 36) return 0.10;
    if (months >= 24) return 0.05;
    return 0;
  };
  const getVolumeDiscount = (size) => {
    if (size >= 10) return 0.15;
    if (size >= 5) return 0.08;
    return 0;
  };

  const discount = getTermDiscount(termMonths);
  const volumeDiscount = getVolumeDiscount(fleetSize);
  const totalDiscount = Math.min(discount + volumeDiscount, 0.25);
  const leaseMonthly = vehicle ? Math.round(vehicle.monthly * (1 - totalDiscount)) : 0;
  const leasingTotal = leaseMonthly * termMonths * fleetSize;
  const getBuyMultiplier = (months) => {
    if (months >= 36) return 1.35;
    if (months >= 24) return 1.28;
    return 1.2;
  };
  const buyMultiplier = getBuyMultiplier(termMonths);
  const buyTotal = Math.round(vehicle ? vehicle.monthly * buyMultiplier * termMonths * fleetSize : 0);
  const saving = buyTotal - leasingTotal;
  const savingPct = buyTotal > 0 ? Math.round((saving / buyTotal) * 100) : 0;

  return (
    <div data-testid="leasing-page">
      {/* HERO */}
      <section data-testid="leasing-hero" className="relative min-h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Personal & Corporate Leasing</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Operational Leasing. Engineered for the UAE.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Move from capex to opex, free your balance sheet, and outsource the day-to-day of running a fleet — registration, insurance, servicing, repairs, telematics and replacement vehicles. Trusted by 280+ UAE corporates since 1976.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="btn-primary">Request a Quote</Link>
            <a href="tel:800364" className="btn-ghost">800 364</a>
          </div>
        </div>
      </section>

      {/* PERSONAL LEASING */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={featRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${featVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Your Car, Your Terms. No Commitment Stress.
            </h2>
            <p className="font-body text-[#666] max-w-xl mx-auto">
              Skip the hassle of ownership. Get a brand-new vehicle delivered to your door — maintenance, insurance, and roadside assistance all included in one predictable monthly payment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalFeatures.map((f, idx) => (
              <div key={f.title} className={`bg-[#111] border border-white/5 p-6 hover:border-[#EE5A01]/30 transition-all ${featVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(idx % 4) + 1}`}>
                <Check className="w-6 h-6 text-[#EE5A01] mb-4" />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{f.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
            <div className={`bg-[#EE5A01]/10 border border-[#EE5A01]/30 p-6 flex flex-col items-center justify-center text-center ${featVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-6`}>
              <p className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider mb-2">From</p>
              <p className="font-heading font-black text-4xl text-[#EE5A01]">AED 1,750</p>
              <p className="font-body text-sm text-[#EEEDE7]/70">/month all-inclusive</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEASE TIERS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={tiersRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${tiersVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Choose Your Commitment</h2>
            <p className="font-body text-[#666]">Longer leases mean bigger savings. All plans include insurance, maintenance, and 24/7 support.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((t, i) => (
              <div key={t.months} className={`relative bg-[#111] border p-6 text-center transition-all hover:border-[#EE5A01]/50 ${t.popular ? 'border-[#EE5A01]' : 'border-white/5'} ${tiersVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                {t.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EE5A01] text-black font-heading font-bold text-[10px] tracking-wider uppercase px-3 py-1">Most Popular</span>}
                <h3 className="font-heading font-black text-xl text-[#EEEDE7] mb-1">{t.label}</h3>
                <p className="font-mono text-xs text-[#EE5A01] mb-5">{t.saving}</p>
                <ul className="space-y-2.5 text-left mb-6">
                  {tierFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EE5A01] flex-shrink-0" />
                      <span className="font-body text-xs text-[#EEEDE7]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary w-full text-center text-xs py-2.5">Get Quote</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-[#0a0a0a] py-14 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-mono text-xs tracking-[0.2em] text-[#666] text-center mb-8 uppercase">Trusted by leading UAE organisations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => (
              <span key={p} className="font-heading font-bold text-sm text-[#EEEDE7]/30 hover:text-[#EEEDE7]/70 transition-colors uppercase tracking-wider">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={calcRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${calcVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Corporate ROI Calculator</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">See how much your fleet saves with leasing. Side-by-side comparison vs buying outright.</p>
          </div>

          <div className="bg-[#111] border border-white/5 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Fleet Size</label>
                <input type="range" min="1" max="100" value={fleetSize} onChange={(e) => setFleetSize(parseInt(e.target.value))} className="w-full accent-[#EE5A01]" />
                <p className="font-mono text-sm text-[#EE5A01] mt-1">{fleetSize} vehicles</p>
              </div>
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Term</label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#333]">
                    {["12","24","36","48","60"].map((t) => <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{t} months</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Vehicle Class</label>
                <Select value={vehicleClass} onValueChange={setVehicleClass}>
                  <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#333]">
                    {vehicleClasses.map((v) => <SelectItem key={v.value} value={v.value} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{v.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="font-heading text-xs text-[#666] uppercase tracking-wider mb-1">Estimated {term}-month saving</p>
              <p className="font-heading font-black text-4xl sm:text-5xl text-[#EE5A01]">AED {saving.toLocaleString()}</p>
              <p className="font-mono text-sm text-[#EEEDE7]/70">{savingPct}% saving vs buying</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 text-center">
                <p className="font-heading text-xs text-[#666] uppercase tracking-wider mb-2">Buy Outright</p>
                <p className="font-heading font-bold text-2xl text-[#EEEDE7]">AED {buyTotal.toLocaleString()}</p>
                <p className="font-body text-[10px] text-[#666] mt-1">Depreciation + insurance + maintenance + financing</p>
              </div>
              <div className="bg-[#EE5A01]/10 border border-[#EE5A01]/30 p-5 text-center">
                <p className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider mb-2">Eurogulf Leasing</p>
                <p className="font-heading font-bold text-2xl text-[#EE5A01]">AED {leasingTotal.toLocaleString()}</p>
                <p className="font-body text-[10px] text-[#666] mt-1">AED {leaseMonthly.toLocaleString()}/month · all inclusive</p>
              </div>
            </div>
            <p className="font-body text-[10px] text-[#666] text-center mt-4">Figures are indicative based on UAE market averages. Final pricing tailored to your exact fleet and term.</p>
          </div>

          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary inline-block">Get a Custom Quote for Your Fleet</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Ready to Start Leasing?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Whether it is a single car or a fleet of 500 — we deliver mobility solutions that move your business forward.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors text-center">Talk to Sales</Link>
            <a href="https://wa.me/97145063030" target="_blank" rel="noopener noreferrer" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
