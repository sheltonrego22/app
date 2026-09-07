import { useEffect } from 'react';
import { Shield, Clock, Star, MapPin } from 'lucide-react';
import { BrandHero, StatStrip, Prose, FeatureGrid, SplitSection, CheckList, CtaBand } from '@/components/brand/BrandKit';

const BOOKING_URL = "https://www.goldcar.com/en-gb/car-rental/locations/dubai/";

const stats = [{ value: "35+", label: "Years of experience" }, { value: "60,000+", label: "Global fleet" }, { value: "100+", label: "Offices worldwide" }, { value: "#1", label: "Low-cost brand in Europe" }];
const strengths = [
  { icon: Shield, title: "High standards of quality", desc: "Over 35 years of proven operational excellence, backed by the standards of the Europcar Mobility Group." },
  { icon: Clock, title: "24-hour customer service", desc: "Round-the-clock roadside assistance means you are never left stranded. Support is one call away, day or night." },
  { icon: Star, title: "5-star vehicle fleet", desc: "A wide selection of well-maintained compact and standard vehicles from a young fleet, run by an ISO-certified operator." },
];
const different = ["Best-in-market rental rates with transparent pricing", "Access to the full Europcar Dubai branch and airport network", "Young, well-maintained fleet of compact and standard vehicles", "The backing of a globally recognised, ISO-certified operator", "Simple, fast booking: online, by phone or at the airport"];

export default function GoldcarPage() {
  useEffect(() => { document.title = "Goldcar Dubai | Smart-Value Car Rental UAE"; }, []);

  return (
    <div data-testid="goldcar-page">
      <BrandHero testid="goldcar-hero" logo="/goldcar-logo.png" chip="Smart-Value Car Rental" title="Smart travel starts here." lead="A value-led self-drive rental offering for customers who want accessible, practical cars with straightforward convenience, across Dubai, the Northern Emirates and a dedicated counter at Sharjah International Airport." image="/brand/goldcar-keys.jpg" position="center 40%"
        ctas={[{ label: 'Book at Best Prices', href: BOOKING_URL, external: true, testid: 'goldcar-hero-book-btn' }, { label: 'Find a Location', href: '/europcar#locations', variant: 'outline' }]} />
      <StatStrip stats={stats} testid="goldcar-stats" />
      <Prose chip="About Goldcar" title="The brand that reinvented affordable car rental." paragraphs={[
        "Goldcar is the largest low-cost car rental brand in Europe, with over 35 years of experience delivering smart, fair, value-for-money travel to millions of customers. It manages more than 60,000 vehicles through 100 offices across Spain, Portugal, Italy, France, Greece, Croatia, Turkey, Malta and beyond.",
        "As a brand of the Europcar Mobility Group, Goldcar customers benefit from the group's operational infrastructure, safety standards and customer service, while enjoying the most competitive rental rates in the market.",
      ]} />
      <FeatureGrid testid="goldcar-strengths" chip="Why Goldcar" title="Affordable car hire. Expertly delivered." items={strengths} itemTestId="goldcar-strength" />
      <SplitSection bg="bg-[#FAFAFA]" chip="Goldcar in the UAE" title="What makes Goldcar different." desc="In the UAE, Goldcar is offered through all Europcar Dubai outlets across Dubai and the Northern Emirates, with an exclusive dedicated counter at Sharjah International Airport, one of the region's fastest-growing aviation hubs." image="/brand/selfie-car.jpg" imageAlt="Happy Goldcar customer in Dubai">
        <CheckList className="mt-6" items={different} />
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#EE5A01]/30 bg-[#FFF4ED] p-4">
          <MapPin className="w-5 h-5 text-[#EE5A01] flex-shrink-0 mt-0.5" />
          <div><p className="font-heading font-bold text-sm text-[#121212]">Exclusive location</p><p className="font-body text-sm text-[#666666]">Sharjah International Airport counter with dedicated Goldcar service for all Sharjah arrivals.</p></div>
        </div>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Book Goldcar at Sharjah Airport</a>
      </SplitSection>
      <CtaBand title="Travel smart. Pay less." desc="Explore the UAE your way with Goldcar: affordable rates, exclusive online offers and quick service." ctas={[{ label: 'Book Goldcar', href: BOOKING_URL, external: true }, { label: 'Contact Us', href: '/contact', variant: 'outline' }]} />
    </div>
  );
}
