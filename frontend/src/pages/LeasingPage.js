import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Wallet, CalendarRange, Sparkles, BadgePercent, Truck } from 'lucide-react';
import { BrandHero, StatStrip, FeatureGrid, LogoStrip, CtaBand, SectionHeader, CheckList } from '@/components/brand/BrandKit';
import { LeasingLeadForm } from '@/components/europcar/LeasingLeadForm';
import { FleetCalculator } from '@/components/leasing/FleetCalculator';

const stats = [{ value: "1976", label: "Leasing expertise since" }, { value: "280+", label: "UAE corporate clients" }, { value: "12 to 60", label: "Month terms" }, { value: "AED 1,750", label: "From, per month all-inclusive" }];
const features = [
  { icon: Wallet, title: "All-inclusive monthly rate", desc: "Insurance, maintenance, replacement vehicle and 24/7 roadside assistance in one predictable payment." },
  { icon: CalendarRange, title: "Flexible 12 to 48 month terms", desc: "Choose the duration that suits you. No penalties for extending your lease." },
  { icon: Sparkles, title: "New models every year", desc: "Drive the latest models from Toyota, Nissan, Hyundai, Kia, Audi and BMW." },
  { icon: BadgePercent, title: "Zero down payment options", desc: "Get on the road with no upfront cost. First month plus security deposit only." },
  { icon: Truck, title: "Free delivery & collection", desc: "Complimentary vehicle delivery and collection across Dubai and Sharjah." },
];
const tiers = [
  { label: "12 months", saving: "Base rate" }, { label: "24 months", saving: "Save 5%", popular: true }, { label: "36 months", saving: "Save 10%" }, { label: "48 months", saving: "Save 15%" },
];
const tierFeatures = ["Full CDW insurance", "Maintenance included", "Replacement vehicle", "24/7 roadside assist", "Free delivery"];
const partners = ["Emirates", "Etihad", "Dubai Holding", "ADNOC", "Aldar", "Emaar", "DP World", "Majid Al Futtaim", "Al Tayer", "Chalhoub", "Mashreq", "RTA"];

function Tiers() {
  return (
    <section data-testid="leasing-tiers" className="bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip="Choose Your Commitment" title="Longer leases, bigger savings." align="center" desc="All plans include insurance, maintenance and 24/7 support." />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <div key={t.label} data-testid={`tier-${t.label.split(' ')[0]}`} className={`card-light relative p-6 text-center ${t.popular ? '!border-[#EE5A01] ring-2 ring-[#EE5A01]/20' : ''}`}>
              {t.popular && <span className="chip-orange absolute -top-3 left-1/2 -translate-x-1/2">Most popular</span>}
              <h3 className="font-heading font-black text-2xl text-[#121212]">{t.label}</h3>
              <p className="mt-1 font-heading font-bold text-sm text-[#EE5A01]">{t.saving}</p>
              <ul className="mt-5 space-y-2 text-left">{tierFeatures.map((f) => <li key={f} className="flex items-center gap-2 font-body text-sm text-[#121212]"><Check className="w-4 h-4 text-[#EE5A01] flex-shrink-0" />{f}</li>)}</ul>
              <a href="#lease-quote" className={`mt-6 w-full ${t.popular ? 'btn-primary' : 'btn-outline'}`}>Get Quote</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LeasingPage() {
  useEffect(() => { document.title = "Corporate & Personal Car Leasing UAE | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="leasing-page">
      <BrandHero testid="leasing-hero" chip="Personal & Corporate Leasing" title="Operational leasing, engineered for the UAE." lead="Move from capex to opex and outsource the day-to-day of running vehicles: registration, insurance, servicing, telematics and replacements. Trusted by 280+ UAE corporates since 1976." image="/brand/fleet-bmw-wide.jpg" position="center 60%"
        ctas={[{ label: 'Request a Quote', href: '#lease-quote', testid: 'leasing-hero-cta' }, { label: '800 364', href: 'tel:800364', external: true, variant: 'outline' }]} />
      <StatStrip stats={stats} testid="leasing-stats" />

      <section id="lease-quote" data-testid="leasing-quote-section" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader chip="Personal Leasing" title="Your car, your terms. No ownership stress." desc="Skip the hassle of ownership. Get a brand-new vehicle delivered to your door with maintenance, insurance and roadside assistance included in one predictable monthly payment." />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 rounded-xl border border-black/5 bg-[#FAFAFA] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#EE5A01] text-white flex-shrink-0"><f.icon className="w-5 h-5" /></span>
                  <div><h3 className="font-heading font-bold text-sm text-[#121212]">{f.title}</h3><p className="mt-1 font-body text-xs text-[#666666] leading-relaxed">{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <LeasingLeadForm enquiryType="Long-Term Leasing" source="Leasing page" title="Request a leasing quote" intro="Tell us who you are and a leasing specialist will call back within one working day with personal or corporate options." />
            <CheckList className="mt-6" items={["ISO 9001:2015 certified operations", "Dedicated corporate account manager", "3 A-grade in-house workshops"]} />
          </div>
        </div>
      </section>

      <Tiers />
      <LogoStrip title="Trusted by leading UAE organisations" logos={partners} />
      <FleetCalculator />
      <FeatureGrid bg="bg-white" chip="Corporate Fleet" title="Built for fleets of 5 to 500." items={[
        { title: "Balance-sheet friendly", desc: "Off-balance-sheet operating leases with fixed monthly costs and no residual-value risk." },
        { title: "Fleet management included", desc: "Telematics, utilisation reports, fines and Salik administration handled by your account team." },
        { title: "Replacement guarantee", desc: "A like-for-like replacement whenever a vehicle is in the workshop, so operations never stop." },
      ]} />
      <CtaBand title="Ready to start leasing?" desc="A single car or a fleet of 500: we deliver mobility that moves your business forward." ctas={[{ label: 'Talk to Sales', href: '/contact', testid: 'leasing-cta' }, { label: 'WhatsApp Us', href: 'https://wa.me/971800364', external: true, variant: 'outline' }]} />
      <Link to="/europcar#leasing" className="sr-only">Europcar leasing</Link>
    </div>
  );
}
