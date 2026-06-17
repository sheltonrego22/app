import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { CarRentalSection, LeasingSection, ChauffeurSection, CoachSection, TruckSection, UsedCarsSection } from '@/components/services/ServiceSections';

const HERO_BG = "https://images.unsplash.com/photo-1459787915554-b34915863013?w=1600&h=900&fit=crop&q=80";
const FLEET_GUIDE_URL = "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf";

const filterTabs = [
  { id: "all", label: "ALL" },
  { id: "rental", label: "RENTAL" },
  { id: "leasing", label: "LEASING" },
  { id: "chauffeur", label: "CHAUFFEUR" },
  { id: "coach", label: "COACH" },
  { id: "freight", label: "FREIGHT" },
  { id: "used", label: "USED CARS" },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => { document.title = "Mobility Solutions — Eurogulf Mobility Group"; }, []);

  const show = (category) => activeFilter === "all" || activeFilter === category;

  return (
    <div data-testid="services-page">
      {/* HERO */}
      <section data-testid="services-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase animate-fade-in">Complete Mobility Solutions</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Mobility Solutions for Every Need
          </h1>
          <p className="font-body text-base text-[#666666] max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From individual travellers to enterprise fleets — Eurogulf Mobility Group delivers the UAE's most comprehensive transport solutions under one roof.
          </p>
          <a href={FLEET_GUIDE_URL} target="_blank" rel="noopener noreferrer" data-testid="fleet-guide-download"
            className="inline-flex items-center gap-2 mt-6 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all animate-fade-in"
            style={{ animationDelay: '0.4s' }}>
            <Download className="w-4 h-4" /> DOWNLOAD FLEET GUIDE (PDF)
          </a>
        </div>
      </section>

      {/* FILTER TABS */}
      <div data-testid="service-filter-tabs" className="bg-[#0a0a0a] border-b border-white/5 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {filterTabs.map((tab) => (
              <button key={tab.id} data-testid={`filter-tab-${tab.id}`} onClick={() => setActiveFilter(tab.id)}
                className={`font-heading font-bold text-xs tracking-[0.1em] px-5 py-2.5 transition-all ${activeFilter === tab.id ? 'bg-[#EE5A01] text-black' : 'text-[#666666] hover:text-[#EEEDE7]'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICE SECTIONS */}
      {show("rental") && <CarRentalSection />}
      {show("leasing") && <LeasingSection />}
      {show("chauffeur") && <ChauffeurSection />}
      {show("coach") && <CoachSection />}
      {show("freight") && <TruckSection />}
      {show("used") && <UsedCarsSection />}

      {/* BOTTOM CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Need a Custom Solution?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Our team can design a bespoke mobility package for your organisation. Get in touch today.</p>
          <Link to="/contact" data-testid="services-contact-btn" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">Contact Our Team</Link>
        </div>
      </section>
    </div>
  );
}
