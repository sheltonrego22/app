import { Link } from 'react-router-dom';
import { Award, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PARTNER_LOGOS = [
  { name: "Al Khoory Automobiles", url: "/partners/al-khoory-logo.svg" },
  { name: "IMT Dubai", url: "/partners/imt-dubai-logo.svg" },
  { name: "Europcar", url: "/europcar-logo.png" },
  { name: "ADNOC", url: "/partners/adnoc-logo.svg" },
  { name: "Emirates", url: "/partners/emirates-logo.svg" },
  { name: "DP World", url: "/partners/dpworld-logo.svg" },
  { name: "Dubai Holding", url: "/partners/dubai-holding-logo.svg" },
];

const awards = [
  { title: "Car Rental Global Award, Best Performance 2023", sub: "Middle East & Africa Region" },
  { title: "Best Business Performance 2018", sub: "Middle East & Africa Region" },
  { title: "Best Car Rental Company in the Middle East", sub: "Business Travel Awards" },
  { title: "ISO 9001:2015", sub: "Quality Management" },
  { title: "ISO 10002:2014", sub: "Customer Satisfaction" },
];

const municipalityStats = [
  { value: "1,500+", label: "Vehicles Managed" },
  { value: "98.5%", label: "Fleet Uptime" },
  { value: "24/7", label: "Support Coverage" },
  { value: "5", label: "Dedicated Workshops" },
];

export function PartnerShowcase() {
  const [ref, visible] = useScrollAnimation();
  return (
    <section data-testid="partner-logos-section" className="bg-[#0a0a0a] py-16 sm:py-20">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 ${visible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">
            Trusted by the UAE's Most Recognised Names
          </h2>
          <p className="font-body text-sm text-[#666] max-w-2xl mx-auto">
            From global airlines and luxury hospitality groups to government authorities and multinational corporations, the UAE's most demanding organisations have relied on Eurogulf Mobility Group for decades.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center mb-8">
          {PARTNER_LOGOS.map((logo) => (
            <div key={logo.name} data-testid={`partner-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-2 group">
              <div className="h-12 sm:h-14 w-full flex items-center justify-center">
                <img src={logo.url} alt={logo.name} className="max-h-12 sm:max-h-14 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity" loading="lazy" />
              </div>
              <span className="font-body text-[9px] text-[#555] group-hover:text-[#999] transition-colors tracking-wider uppercase">{logo.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/partners" className="font-heading text-xs tracking-wider text-[#EE5A01] uppercase hover:underline">View All Partners & Clients →</Link>
        </div>
      </div>
    </section>
  );
}

export function AwardsSection() {
  return (
    <section data-testid="awards-section" className="bg-[#f5f2ec] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="orange-accent-line mx-auto mb-4" />
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">Recognised for Excellence</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {awards.map((a) => (
            <div key={a.title} className="bg-white border border-black/5 p-5 text-center">
              <div className="w-10 h-10 bg-[#EE5A01]/10 flex items-center justify-center mx-auto mb-3">
                {a.title.startsWith("ISO") ? <CheckCircle className="w-5 h-5 text-[#EE5A01]" /> : <Award className="w-5 h-5 text-[#EE5A01]" />}
              </div>
              <p className="font-heading font-bold text-xs text-black uppercase tracking-wider leading-relaxed">{a.title}</p>
              <p className="font-body text-[10px] text-[#666] mt-1">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MunicipalitySection() {
  const [ref, visible] = useScrollAnimation();
  return (
    <section data-testid="municipality-section" className="bg-[#0a0a0a] py-20 sm:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${visible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Marquee Partnership</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-2 mb-4">
              Proud Partners of Dubai Municipality
            </h2>
            <p className="font-body text-[#999] leading-relaxed mb-4">
              Among the many distinctions that define the group's standing, none speaks more clearly to its operational capability than the partnership with Dubai Municipality, one of the most respected government authorities in the region.
            </p>
            <p className="font-body text-[#999] leading-relaxed mb-6">
              As a proud supplier and strategic partner, Eurogulf Mobility Group provides full fleet management solutions across a fleet exceeding 1,500 vehicles, operated by a dedicated team working directly from Dubai Municipality's Transportation Department.
            </p>
            <Link to="/dubai-municipality" className="btn-primary inline-block">Explore This Partnership</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {municipalityStats.map((s) => (
              <div key={s.label} className="bg-[#111] border border-white/5 p-5 text-center">
                <p className="font-heading font-black text-2xl text-[#EE5A01]">{s.value}</p>
                <p className="font-body text-xs text-[#666] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
