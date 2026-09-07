import { useEffect } from 'react';
import { MapPin, Plane, Download } from 'lucide-react';
import { BrandHero, StatStrip, Prose, SplitSection, CheckList, CompareTable, CtaBand, SectionHeader } from '@/components/brand/BrandKit';
import { LeasingLeadForm } from '@/components/europcar/LeasingLeadForm';

const GREEN = "#2d8c3c";
const BOOKING_URL = "https://www.europcar.com/en-db";
const MONTHLY_URL = "https://www.europcardubai.ae";
const FLEET_GUIDE_URL = "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf";
const greenBtn = "inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 font-heading font-bold text-sm text-white hover:opacity-90 transition-opacity";

const highlights = [
  { label: "Vehicles", value: "5,000+" }, { label: "Average fleet age", value: "1.5 yrs" }, { label: "UAE locations", value: "14" },
  { label: "Corporate clients", value: "500+" }, { label: "A-grade workshops", value: "3" }, { label: "Customer service", value: "24/7" },
];
const rentalRows = [
  ["Duration", "1 to 6 days", "7 to 21 days", "22 to 30 days+"], ["Insurance", "CDW included", "CDW included", "CDW included"],
  ["Mileage", "Unlimited UAE", "Unlimited UAE", "3,000 km/month"], ["Delivery", "AED 52.50/trip", "AED 52.50/trip", "FREE"],
  ["Maintenance", "Included", "Included", "Included"], ["Roadside", "24/7 included", "24/7 included", "24/7 included"],
];
const leaseRows = [
  ["Down payment", "None", "Mandatory"], ["Monthly payments", "Lower, predictable", "Higher"], ["Registration & insurance", "Free", "At your cost"],
  ["Maintenance", "Full maintenance included", "Unexpected costs"], ["Replacement vehicle", "Free", "Additional cost"], ["Resale", "No resale worries", "Depreciation risk"], ["Flexibility", "Lease-to-own options", "Fixed ownership"],
];
const airports = ["Dubai International Airport, Terminal 1", "Dubai International Airport, Terminal 2", "Dubai International Airport, Terminal 3", "Al Maktoum International Airport (DWC)", "Sharjah International Airport"];
const branches = ["Dubai HQ (Al Quoz)", "Dubai Hills Mall", "Atlantis The Palm", "Emirates Towers", "Sharjah Office", "Jebel Ali", "Ras Al Khaimah", "Fujairah", "Abu Dhabi"];
const intlStats = [["143", "Countries"], ["6,000+", "Rental locations"], ["600+", "Airport locations"], ["Global", "Corporate travel partners"]];

function LocationList({ title, items, icon: Icon, accent }) {
  return (
    <div>
      <h3 className="font-heading font-bold text-[11px] tracking-[0.15em] uppercase text-[#EE5A01] mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((loc) => (
          <li key={loc} className="flex items-center gap-3 rounded-lg border border-black/5 bg-white px-4 py-3 font-body text-sm text-[#121212]"><Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />{loc}</li>
        ))}
      </ul>
    </div>
  );
}

export default function EuropcarPage() {
  useEffect(() => { document.title = "Europcar Dubai | Premium Car Rental & Operational Leasing UAE"; }, []);

  return (
    <div data-testid="europcar-page">
      <BrandHero
        testid="europcar-hero"
        logo="/europcar-logo.png"
        chip="Car Rental · Monthly · Leasing"
        title="Europcar UAE: premium car rental and long-term leasing."
        lead="One of the world's most established mobility brands since 1949, operated in Dubai and the Northern Emirates by Eurogulf Mobility Group. Daily and weekly rentals, monthly subscriptions and 12 to 48 month leasing."
        image="/brand/hero-dubai-sedan.jpg"
        position="center 70%"
        ctas={[
          { label: 'Book a Car', href: BOOKING_URL, external: true, testid: 'europcar-hero-book-btn', className: greenBtn, style: { background: GREEN } },
          { label: 'Get a Lease Quote', href: '#leasing', className: 'btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212]' },
        ]}
      >
        <a href={FLEET_GUIDE_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-heading font-bold text-xs text-white/75 hover:text-white transition-colors"><Download className="w-4 h-4 text-[#EE5A01]" /> Download the fleet guide (PDF)</a>
      </BrandHero>
      <style>{`[data-testid="europcar-hero-book-btn"], [data-testid="europcar-rental-book"], [data-testid="europcar-monthly-book"], [data-testid="europcar-intl-book"] { background: ${GREEN}; }`}</style>

      <StatStrip stats={highlights} testid="europcar-stats" />

      <Prose chip="About Europcar" title="A global name, delivered locally since 1978." paragraphs={[
        "Europcar is one of the world's most established mobility brands, with origins dating back to Paris in 1949 and decades of international expansion. Through franchise growth and a continuously evolving reservation network, Europcar became a recognised global name in car rental and mobility.",
        "In the UAE, Europcar serves customers across Dubai and the Northern Emirates through short-term rental, monthly mobility solutions and long-term leasing support, positioned as the premium, service-led offering within the Eurogulf Mobility Group ecosystem.",
      ]} />

      <SplitSection testid="europcar-rental" chip="Daily · Weekly · Monthly" title="Short-term rental, ready in hours." desc="A young, well-maintained fleet across airport counters, downtown branches and doorstep delivery within Dubai, Sharjah and Ajman (AED 52.50, 3 to 4 hour lead time), or collect from any of our 14 locations." image="/brand/rental-garage.jpg" imageAlt="Europcar rental fleet in Dubai">
        <div className="mt-6"><CompareTable columns={["", "Daily", "Weekly", "Monthly"]} rows={rentalRows} accent={GREEN} /></div>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-rental-book" className={`${greenBtn} mt-6`}>Book Your Rental Now</a>
      </SplitSection>

      <section className="bg-[#EEEDE7] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader chip="Monthly Rental" title="Monthly rental made easy." align="center" desc="Flexible medium-term mobility with mileage packages from 3,000 km/month (upgrades to 4,000 and 5,000 km on request) and a range from economy to full-size SUVs. Fair value, convenience and consistent service across Dubai and the Northern Emirates." />
          <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-monthly-book" className={`${greenBtn} mt-8`}>Book Your Monthly Rental</a>
        </div>
      </section>

      <section id="leasing" data-testid="europcar-leasing" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader chip="Long-Term Leasing" title="Predictable monthly mobility for 12 to 48 months." desc="A practical alternative to ownership with customised mileage, free registration, insurance and full maintenance, and a replacement vehicle whenever you need one." />
            <div className="mt-6"><CompareTable columns={["Feature", "Leasing", "Buying"]} rows={leaseRows} highlight={1} accent={GREEN} testid="europcar-lease-table" /></div>
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <LeasingLeadForm accent={GREEN} title="Speak to the Europcar leasing team" />
            <CheckList className="mt-6" items={["Leasing expertise since 1976", "ISO 9001:2015 certified operations", "Dedicated fleet management team", "3 A-grade in-house workshops", "24/7 roadside assistance and recovery", "500+ loyal corporate clients"]} />
          </div>
        </div>
      </section>

      <SplitSection reverse bg="bg-[#FAFAFA]" chip="International Car Hire" title="One account. 143 countries. A car wherever you land." desc="As the exclusive UAE operator of the Europcar franchise, Europcar Dubai connects UAE residents and businesses to the world's most comprehensive rental network, from Paris to Sydney." image="/brand/woman-phone-car.jpg" imageAlt="Traveller booking Europcar internationally">
        <div className="mt-6 grid grid-cols-2 gap-3">
          {intlStats.map(([v, l]) => (
            <div key={l} className="rounded-xl border border-black/5 bg-white p-4 text-center"><p className="font-heading font-black text-xl" style={{ color: GREEN }}>{v}</p><p className="mt-1 font-body text-xs text-[#666666]">{l}</p></div>
          ))}
        </div>
        <a href="https://www.europcar.com" target="_blank" rel="noopener noreferrer" data-testid="europcar-intl-book" className={`${greenBtn} mt-6`}>Book International</a>
      </SplitSection>

      <section data-testid="europcar-locations" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader chip="Locations" title="14 locations across the UAE." align="center" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LocationList title="Airport counters" items={airports} icon={Plane} accent={GREEN} />
            <LocationList title="Branch network" items={branches} icon={MapPin} accent="#666666" />
          </div>
        </div>
      </section>

      <CtaBand title="Ready to hit the road?" desc="A weekend getaway or a four-year corporate lease: Europcar UAE has the right vehicle waiting for you." ctas={[
        { label: 'Book Online', href: BOOKING_URL, external: true },
        { label: 'Contact Us', href: '/contact', variant: 'outline' },
      ]} />
    </div>
  );
}
