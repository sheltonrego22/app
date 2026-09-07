import { Link } from 'react-router-dom';
import { Shield, Check, Eye, FileText, ArrowRight } from 'lucide-react';
import { BrandHero, FeatureGrid, CtaBand, SectionHeader } from '@/components/brand/BrandKit';
import { AuctionTimer } from '@/components/usedcars/AuctionTimer';

const advantages = [
  { icon: Shield, title: "Single-owner provenance", desc: "Every car came directly from the Europcar Dubai operational lease fleet. No third-party trade-ins, no hidden histories." },
  { icon: FileText, title: "Manufacturer-approved service", desc: "Serviced exclusively at Eurogulf Auto Garage using OEM parts, with the full digital service record provided at sale." },
  { icon: Check, title: "110-point inspection report", desc: "Every listing carries our inspection certificate covering body, mechanical, electrical and compliance." },
  { icon: Eye, title: "Clean RTA & accident history", desc: "Carfax-equivalent record, current RTA passing and no recorded chassis damage." },
];
const steps = [
  { num: "01", title: "Stock refresh", desc: "A new batch of 6 to 10 ex-fleet vehicles is published every Tuesday at 15:00 GST." },
  { num: "02", title: "Inspect & decide", desc: "Browse full specs, photos, inspection grade and complete service history, online or at a branch." },
  { num: "03", title: "Silent bid", desc: "Place a sealed bid in AED 500 increments. You only ever see your own bids." },
  { num: "04", title: "Cycle close", desc: "Auction closes every Monday at 12:00 GST. Winners are notified within 2 hours." },
];
const options = [["View online", "Full inventory, photos, specs and inspection grade."], ["In-person inspection", "Book a 30-minute viewing at any Eurogulf Mobility Group branch."], ["Browse as guest", "View the full stock without an account. Sign in only to bid."]];
const vehicles = [
  { name: "Toyota Camry 2.5 SE", year: "2022", type: "Sedan", km: "49k km", color: "Pearl White", grade: "A", bid: "Contact for price" },
  { name: "Hyundai Tucson 1.6T", year: "2023", type: "SUV", km: "32k km", color: "Silver Metallic", grade: "A", bid: "Contact for price" },
  { name: "Nissan Patrol Platinum", year: "2021", type: "Full-Size SUV", km: "72k km", color: "Onyx Black", grade: "A", bid: "AED 145,000" },
  { name: "Toyota Corolla 2.0 SE", year: "2023", type: "Sedan", km: "28k km", color: "Glacier White", grade: "A+", bid: "Contact for price" },
  { name: "Kia Sportage 2.0", year: "2022", type: "Compact SUV", km: "41k km", color: "Steel Grey", grade: "A", bid: "Contact for price" },
  { name: "Nissan X-Trail 2.5 SV", year: "2022", type: "Mid-Size SUV", km: "55k km", color: "Diamond Black", grade: "A", bid: "Contact for price" },
];

export function UsedCarsHero() {
  return <BrandHero testid="used-cars-hero" chip="Eurogulf Used Cars" title="Pre-owned vehicles you can trust, backed by 50 years of fleet expertise." lead="Every car sold by Eurogulf Used Cars has been maintained to fleet standards in Eurogulf Auto Garage's A-grade workshops. Low mileage, full history, transparent pricing." image="/brand/handover-couple.jpg" position="center 35%" ctas={[{ label: 'View Vehicles for Sale', href: '#stock', testid: 'used-cars-hero-cta' }, { label: 'How the Auction Works', href: '#how-it-works', variant: 'outline' }]} />;
}

export function AuctionCycleBar() {
  const cell = (label, value) => <div><p className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase text-[#666666]">{label}</p><p className="mt-1 font-heading font-bold text-sm text-[#121212]">{value}</p></div>;
  return (
    <section className="bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-8">
          {cell("Stock published", "Tue · 15:00 GST")}
          {cell("Bidding closes", "Mon · 12:00 GST")}
          <div><p className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase text-[#666666]">Auction closes in</p><AuctionTimer /></div>
        </div>
        <span className="chip-outline">Silent auction · AED 500 increments</span>
      </div>
    </section>
  );
}

export function StockGrid() {
  return (
    <section id="stock" data-testid="used-cars-stock" className="bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip="This Week's Stock" title="Fresh ex-fleet arrivals." align="center" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <div key={v.name} className="card-light p-5">
              <div className="flex items-start justify-between gap-3">
                <div><span className="font-body text-xs text-[#666666]">{v.year} · {v.type}</span><h3 className="font-heading font-bold text-base text-[#121212]">{v.name}</h3></div>
                <span className="chip-outline">Grade {v.grade}</span>
              </div>
              <p className="mt-2 font-body text-xs text-[#666666]">{v.km} · Automatic · {v.color}</p>
              <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                <div><p className="font-heading font-bold text-[10px] uppercase tracking-wider text-[#666666]">Starting bid</p><p className="font-heading font-black text-sm text-[#EE5A01]">{v.bid}</p></div>
                <Link to="/contact" className="inline-flex items-center gap-1 font-heading font-bold text-xs text-[#EE5A01] hover:gap-2 transition-all">Enquire <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyBuy() { return <FeatureGrid chip="Why Buy Ex-Fleet" title="Not just used. Ex-Eurogulf-managed." desc="Every vehicle came directly from the Europcar Dubai operating-lease fleet. We know every kilometre, every service and every owner from day one." items={advantages} cols={2} itemTestId="used-cars-advantage" />; }

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#EEEDE7] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip="How the Auction Works" title="Wholesale-grade rigour. Retail-grade simplicity." align="center" />
        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <li key={s.num} className="card-light p-6"><span className="grid h-12 w-12 place-items-center rounded-lg bg-[#EE5A01] font-heading font-black text-lg text-white">{s.num}</span><h3 className="mt-5 font-heading font-bold text-lg text-[#121212]">{s.title}</h3><p className="mt-2 font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p></li>
          ))}
        </ol>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map(([t, d]) => <div key={t} className="rounded-xl border border-black/5 bg-white p-5 text-center"><h4 className="font-heading font-bold text-sm text-[#121212]">{t}</h4><p className="mt-1 font-body text-xs text-[#666666]">{d}</p></div>)}
        </div>
      </div>
    </section>
  );
}

export function UsedCarsCta() {
  return <CtaBand title="Browse this week's stock." desc="New vehicles added every Tuesday. Silent auction closes every Monday at 12:00 GST." ctas={[{ label: 'Contact Used Vehicles Division', href: '/contact', testid: 'used-cars-cta' }]} />;
}
