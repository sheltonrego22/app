import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, Clock, Eye, FileText, Car, ArrowRight, Search } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1669485971006-d1f811a22700?w=1400&h=700&fit=crop";

const advantages = [
  { icon: Shield, title: "Single-Owner Provenance", desc: "Every car came directly from the Europcar Dubai operational lease fleet. No third-party trade-ins, no hidden histories." },
  { icon: FileText, title: "Manufacturer-Approved Service", desc: "Serviced exclusively at Eurogulf Mobility Group-owned workshops using OEM parts. Full digital service record provided at sale." },
  { icon: Check, title: "110-Point Inspection Report", desc: "Every listing carries our branded inspection certificate covering body, mechanical, electrical and compliance." },
  { icon: Eye, title: "Clean RTA & Accident History", desc: "Carfax-equivalent record, current RTA passing, no recorded chassis damage." },
];

const auctionSteps = [
  { num: "1", title: "Stock Refresh", desc: "A new batch of 6–10 ex-fleet vehicles is published every Tuesday at 15:00 GST." },
  { num: "2", title: "Inspect & Decide", desc: "Browse full specs, 4–5 photos per car, inspection grade and complete service history." },
  { num: "3", title: "Silent Bid", desc: "Place a sealed bid in AED 500 increments. You only see your own bids — never others." },
  { num: "4", title: "Cycle Close", desc: "Auction closes every Monday at 12:00 GST. Winners notified within 2 hours." },
];

const sampleVehicles = [
  { name: "Toyota Camry 2.5 SE", year: "2022", type: "Sedan", km: "49k km", color: "Pearl White", grade: "A", bid: "Contact for price" },
  { name: "Hyundai Tucson 1.6T", year: "2023", type: "SUV", km: "32k km", color: "Silver Metallic", grade: "A", bid: "Contact for price" },
  { name: "Nissan Patrol Platinum", year: "2021", type: "Full-Size SUV", km: "72k km", color: "Onyx Black", grade: "A", bid: "AED 145,000" },
  { name: "Toyota Corolla 2.0 SE", year: "2023", type: "Sedan", km: "28k km", color: "Glacier White", grade: "A+", bid: "Contact for price" },
  { name: "Kia Sportage 2.0", year: "2022", type: "Compact SUV", km: "41k km", color: "Steel Grey", grade: "A", bid: "Contact for price" },
  { name: "Nissan X-Trail 2.5 SV", year: "2022", type: "Mid-Size SUV", km: "55k km", color: "Diamond Black", grade: "A", bid: "Contact for price" },
];

function AuctionTimer() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const getNext = () => {
      const now = new Date();
      const day = now.getUTCDay();
      const daysUntilMonday = (8 - day) % 7 || 7;
      const target = new Date(now);
      target.setUTCDate(now.getUTCDate() + daysUntilMonday);
      target.setUTCHours(8, 0, 0, 0);
      return target;
    };
    const tick = () => {
      const diff = getNext() - new Date();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div data-testid="auction-timer" className="flex items-center gap-1 font-mono text-2xl sm:text-3xl text-[#EE5A01] font-bold">
      <span>{String(time.d).padStart(2, '0')}</span><span className="text-[#666] text-lg">D</span>
      <span className="text-[#666]">:</span>
      <span>{String(time.h).padStart(2, '0')}</span><span className="text-[#666] text-lg">H</span>
      <span className="text-[#666]">:</span>
      <span>{String(time.m).padStart(2, '0')}</span><span className="text-[#666] text-lg">M</span>
      <span className="text-[#666]">:</span>
      <span>{String(time.s).padStart(2, '0')}</span><span className="text-[#666] text-lg">S</span>
    </div>
  );
}

export default function UsedCarsPage() {
  const [advRef, advVisible] = useScrollAnimation();
  const [stepsRef, stepsVisible] = useScrollAnimation();
  const [stockRef, stockVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Used Vehicle Sales — Weekly Silent Auction | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="used-cars-page">
      {/* HERO */}
      <section data-testid="used-cars-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Pre-owned vehicles in Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Eurogulf Mobility Used Vehicles Division</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Ex-Europcar Fleet. Sold the Smart Way.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A weekly silent auction of cars retired from the Europcar Dubai operating-lease fleet — single-owner, full service history, inspected, and sold direct to B2B and B2C buyers across the UAE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="btn-primary">View Vehicles for Sale</Link>
            <a href="#how-it-works" className="btn-ghost">How the Auction Works</a>
          </div>
        </div>
      </section>

      {/* AUCTION CYCLE */}
      <section className="bg-[#111] border-y border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-center sm:text-left">
              <div>
                <p className="font-heading text-[10px] text-[#666] uppercase tracking-wider">Stock Published</p>
                <p className="font-heading font-bold text-sm text-[#EEEDE7]">Tue · 15:00 GST</p>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="font-heading text-[10px] text-[#666] uppercase tracking-wider">Bidding Closes</p>
                <p className="font-heading font-bold text-sm text-[#EEEDE7]">Mon · 12:00 GST</p>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="font-heading text-[10px] text-[#666] uppercase tracking-wider">Auction Closes In</p>
                <AuctionTimer />
              </div>
            </div>
            <p className="font-mono text-[10px] text-[#666] tracking-wider">Silent auction · AED 500 increments</p>
          </div>
        </div>
      </section>

      {/* SAMPLE STOCK */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={stockRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${stockVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">This Week's Stock</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleVehicles.map((v, idx) => (
              <div key={v.name} className={`bg-[#111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all ${stockVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(idx % 4) + 1}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#666]">{v.year} · {v.type}</span>
                    <h3 className="font-heading font-bold text-base text-[#EEEDE7]">{v.name}</h3>
                  </div>
                  <span className="bg-[#EE5A01]/10 text-[#EE5A01] font-mono text-[10px] px-2 py-0.5 tracking-wider">Grade {v.grade}</span>
                </div>
                <p className="font-body text-xs text-[#666] mb-3">{v.km} · Automatic · {v.color}</p>
                <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-[10px] text-[#666] uppercase">Starting Bid</p>
                    <p className="font-heading font-bold text-sm text-[#EE5A01]">{v.bid}</p>
                  </div>
                  <Link to="/contact" className="text-[#EE5A01] font-heading text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                    Enquire <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUY */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={advRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${advVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Not Just Used. Ex-Eurogulf-Managed.</h2>
            <p className="font-body text-[#666] max-w-xl mx-auto">Every vehicle in the silent auction came directly from the Europcar Dubai operating-lease fleet — we know every kilometre, every service, and every owner from day one.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {advantages.map((a, i) => (
              <div key={a.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${advVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <a.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{a.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={stepsRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">How the Auction Works</h2>
            <p className="font-body text-[#666]">Wholesale-grade rigour. Retail-grade simplicity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {auctionSteps.map((s, i) => (
              <div key={s.num} className={`text-center ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="w-12 h-12 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-black text-lg text-black">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-xs text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { title: "View Online", desc: "Full inventory, 4–5 photos, specs and inspection grade." },
              { title: "In-Person Inspection", desc: "Book a 30-minute viewing at any Eurogulf Mobility Group branch." },
              { title: "Browse as Guest", desc: "View the full stock without an account. Sign in only to bid." },
            ].map((item) => (
              <div key={item.title} className="bg-[#111] border border-white/5 p-5 text-center">
                <h4 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{item.title}</h4>
                <p className="font-body text-xs text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Browse This Week's Stock</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">New vehicles added every Tuesday. Silent auction closes every Monday at 12:00 GST.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Contact Used Vehicles Division</Link>
        </div>
      </section>
    </div>
  );
}
