import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, Users, CalendarCheck, Route, Car } from 'lucide-react';
import { BrandHero, StatStrip, Prose, FeatureGrid, SplitSection, CheckList, CtaBand, SectionHeader } from '@/components/brand/BrandKit';
import { TransportEnquiryDialog } from '@/components/chauffeur/TransportEnquiryDialog';

const stats = [{ value: "1990", label: "Chauffeur services since" }, { value: "7", label: "Emirates licensed" }, { value: "24/7", label: "Dispatch & flight monitoring" }, { value: "500+", label: "Premium vehicles" }];
const useCases = [
  { icon: Plane, title: "Airport transfers", desc: "Meet-and-greet at DXB, DWC, AUH and SHJ with live flight monitoring, so your chauffeur is there when you land." },
  { icon: Briefcase, title: "Corporate & VIP transport", desc: "Executive sedans and SUVs for board members, delegations and clients, with discreet, professionally trained chauffeurs." },
  { icon: Users, title: "Staff & crew shuttles", desc: "Scheduled, tracked movements for airline crews, hotel teams and corporate offices across the Emirates." },
  { icon: CalendarCheck, title: "Events & hospitality", desc: "Coordinated fleets for conferences, weddings, exhibitions and hospitality programmes, from one car to one hundred." },
  { icon: Route, title: "One-off journeys & tours", desc: "Point-to-point rides, city tours and inter-Emirate transfers booked by the hour or the day." },
  { icon: Car, title: "Managed mobility arrangements", desc: "Longer-term dedicated chauffeur and vehicle programmes for executives and organisations." },
];
const fleet = [
  { name: "Mercedes-Benz E-Class / S-Class", type: "Executive Sedan", pax: "Up to 3", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Cadillac Escalade / GMC Yukon", type: "Luxury SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=600&h=360&fit=crop" },
  { name: "Mercedes V-Class", type: "Executive Van", pax: "Up to 6", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "GMC Denali", type: "Premium SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767285610734-f0858d5248fe?w=600&h=360&fit=crop" },
  { name: "Mercedes Sprinter", type: "Executive Minibus", pax: "Up to 16", img: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=600&h=360&fit=crop" },
];

export default function ChauffeurServicePage() {
  useEffect(() => { document.title = "Eurogulf Premium Chauffeur | Chauffeur & Airport Transfers Dubai, UAE"; }, []);

  return (
    <div data-testid="chauffeur-service-page">
      <BrandHero testid="chauffeur-service-hero" chip="Eurogulf Premium Chauffeur" title="Arrive the way leaders do." lead="Chauffeur-driven and managed transport for business, VIP, airport, staff and event mobility, delivered by Eurogulf Mobility Group across all seven Emirates since 1990." image="/brand/chauffeur-door.jpg" position="center 30%">
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
          <Link to="/book-chauffeur" data-testid="chauffeur-book-online-btn" className="btn-primary">Book Online</Link>
          <TransportEnquiryDialog trigger={<button data-testid="chauffeur-book-modal-btn" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212]">Submit Transport Enquiry</button>} />
          <a href="tel:800364" dir="ltr" className="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-[#121212]">Call 800 364</a>
        </div>
      </BrandHero>
      <StatStrip stats={stats} testid="chauffeur-stats" />
      <Prose chip="Managed Transport" title="Premium chauffeur service, managed by specialists." paragraphs={[
        "Eurogulf Premium Chauffeur delivers premium chauffeur-driven and managed transport solutions for individual and business mobility needs. Simple journeys can be booked online in minutes; complex or recurring requirements are profiled carefully and routed to a specialist team for managed follow-up.",
        "Emirates Taxi and Royal Limousine, the group's original chauffeur businesses, now operate under the Eurogulf Premium Chauffeur name, with the same drivers, standards and licences across the UAE.",
      ]} />
      <FeatureGrid testid="chauffeur-use-cases" chip="Where This Service Fits" title="Every journey that matters." items={useCases} itemTestId="chauffeur-use-case" />
      <SplitSection bg="bg-[#FAFAFA]" reverse chip="Service Approach" title="Details handled before you notice them." desc="Professional, licensed chauffeurs, immaculate vehicles and tailored routing based on your requirement, with flight monitoring and meet-and-greet whenever relevant." image="/brand/cover-limousine-dubai.jpg" imageAlt="Chauffeur with limousine against the Dubai skyline">
        <CheckList className="mt-6" items={["RTA-licensed, background-checked chauffeurs", "Live flight tracking and complimentary waiting time on arrivals", "Bottled water, Wi-Fi and child seats on request", "24/7 dispatch and a single point of contact for corporate accounts"]} />
      </SplitSection>
      <section data-testid="chauffeur-fleet" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader chip="The Fleet" title="From executive sedans to 16-seat minibuses." align="center" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {fleet.map((v, i) => (
              <div key={v.name} data-testid={`chauffeur-fleet-${i}`} className="card-light group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden"><img src={v.img} alt={v.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-4"><h3 className="font-heading font-bold text-sm text-[#121212]">{v.name}</h3><p className="mt-1 font-heading font-bold text-[11px] tracking-wider uppercase text-[#EE5A01]">{v.type} · {v.pax}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Need chauffeur or managed transport support?" desc="Book a single ride online, or submit an enquiry and a specialist will follow up with a tailored proposal." ctas={[{ label: 'Book a Chauffeur Online', href: '/book-chauffeur', testid: 'chauffeur-cta-book' }, { label: 'Submit an Enquiry', href: '/contact', variant: 'outline' }]} />
    </div>
  );
}
