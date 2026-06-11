import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const partners = [
  { name: "Europcar Mobility Group", sector: "Global Mobility" },
  { name: "Goldcar", sector: "Global Mobility" },
  { name: "Esaad", sector: "Government Programme" },
  { name: "Fazaa", sector: "Government Programme" },
  { name: "Al Saada Card", sector: "Government Programme" },
  { name: "GIG Insurance", sector: "Insurance" },
  { name: "QIC (Qatar Insurance)", sector: "Insurance" },
  { name: "Oman Insurance", sector: "Insurance" },
  { name: "Tokio Marine", sector: "Insurance" },
  { name: "Noor Takaful", sector: "Insurance" },
];

const customers = {
  "Airlines & Aviation": [
    "Emirates", "Etihad Airways", "Air France", "KLM", "Lufthansa",
    "Cathay Pacific", "Virgin Atlantic", "South African Airways", "dnata"
  ],
  "Hospitality & Tourism": [
    "Atlantis The Palm", "Jumeirah", "Emaar", "The Address", "Hyatt",
    "Sofitel", "Four Seasons", "Hilton", "Desert Adventures", "Sharaf Tours"
  ],
  "Government & Public Sector": [
    "Dubai Municipality", "RTA", "Dubai Police"
  ],
  "Cruise & Events": [
    "Royal Caribbean International", "Carnival", "MSC Cruises", "Cunard",
    "Costa Cruises", "Fred Olsen Cruise Lines", "AIDA", "Cirque du Soleil",
    "DP World", "Expo 2020 Dubai", "Dubai Airshow"
  ],
  "Corporate & Industrial": [
    "General Electric", "Samsung", "Panasonic", "LG", "Daikin", "Kärcher"
  ],
  "Logistics & E-Commerce": [
    "noon", "6thstreet.com", "iMile", "Zajil", "Barakat", "Al Rawabi"
  ],
};

const majorEvents = [
  "Expo 2020 Dubai", "Dubai Airshow", "Dubai Desert Classic", "DP World Tour",
  "PGA Tour", "Cirque du Soleil", "Emirates Dubai Rugby Sevens",
  "Dior Fashion Show", "Women Global Leaders Summit", "RISE Conference"
];

export default function PartnersClientsPage() {
  const [partnersRef, partnersVisible] = useScrollAnimation();
  const [clientsRef, clientsVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Our Partners & Clients — Eurogulf Mobility"; }, []);

  return (
    <div data-testid="partners-clients-page">
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Trusted Partnerships</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Our Partners & Clients
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            For nearly 50 years, Eurogulf Mobility Group has been the mobility partner of choice for the UAE's most respected organisations — from airlines and luxury hotels to government entities and global corporations.
          </p>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={partnersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${partnersVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Partners</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">Strategic alliances and programme partnerships that extend our reach and value to customers across the UAE.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((p, i) => (
              <div key={p.name} className={`bg-[#111] border border-white/5 p-5 text-center hover:border-[#EE5A01]/30 transition-all ${partnersVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 5) + 1}`}>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{p.name}</h3>
                <p className="font-mono text-[10px] text-[#EE5A01] tracking-wider">{p.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS BY SECTOR */}
      <section className="bg-[#f5f2ec] py-20 sm:py-28">
        <div ref={clientsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${clientsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">Our Customers</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">Serving the UAE's most recognised brands across aviation, hospitality, government, and enterprise.</p>
          </div>
          <div className="space-y-10">
            {Object.entries(customers).map(([sector, names]) => (
              <div key={sector}>
                <h3 className="font-heading font-bold text-xs text-[#EE5A01] uppercase tracking-[0.2em] mb-4 text-center">{sector}</h3>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                  {names.map((name) => (
                    <span key={name} className="font-heading text-sm text-black/30 hover:text-black/70 transition-colors uppercase tracking-wider">{name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAJOR EVENTS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28 border-t border-white/5">
        <div ref={eventsRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${eventsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Major Events Served</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">From world-class exhibitions to global sporting events — Eurogulf Mobility Group delivers the transport backbone behind the UAE's largest occasions.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {majorEvents.map((e) => (
              <span key={e} className="bg-[#111] border border-white/5 px-5 py-3 font-heading text-xs text-[#EEEDE7] uppercase tracking-wider hover:border-[#EE5A01]/30 transition-colors">{e}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Become a Partner</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Looking for a trusted mobility partner for your business? Let's discuss how Eurogulf Mobility Group can move your organisation forward.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Contact Our Team</Link>
        </div>
      </section>
    </div>
  );
}
