import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bus, Users, Plane, Building2, CalendarCheck, Radio, ShieldCheck, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/home/CoreSections';
import { FinalCta } from '@/components/home/TrustSectionsV2';

const IMG = {
  hero: "/brand/egmg-coach-highway.jpg",
  boarding: "/brand/coach-boarding-dubai.jpg",
  fleet: "/brand/bus-fleet-uae.jpg",
  control: "/brand/control-room-dubai.jpg",
  coach: "/brand/coach-dubai.jpg",
};

const STATS = [
  { value: "800+", label: "Buses & coaches" },
  { value: "5,000+", label: "Daily trips" },
  { value: "7", label: "Emirates covered" },
  { value: "24/7", label: "Control room" },
];

const SERVICES = [
  { icon: Users, title: "Staff & Labour Transportation", desc: "Scheduled shuttle routes for corporates, hospitality groups, industrial zones and free-zone operators, with route optimisation and attendance reporting." },
  { icon: Plane, title: "Airline Crew & Airport Transfers", desc: "Trusted crew-transportation partner to Emirates and dnata: punctual, tracked and compliant with airside security requirements." },
  { icon: Building2, title: "Government & Municipal Contracts", desc: "Long-term managed transport programmes for government entities, including Dubai Municipality operations." },
  { icon: CalendarCheck, title: "Events, Delegations & Tourism", desc: "Luxury coaches for conferences, exhibitions, sporting events, cruise operators and DMCs, from a single coach to a 200-vehicle fleet." },
  { icon: Radio, title: "Live Fleet Tracking", desc: "GPS telematics, in-cabin cameras and a 24/7 control room give clients real-time visibility of every vehicle and every trip." },
  { icon: ShieldCheck, title: "Safety-First Operations", desc: "ISO 9001:2015 processes, RTA-licensed drivers, speed governors and in-house A-grade workshops keeping the fleet at peak condition." },
];

const FLEET = [
  { name: "Luxury Coaches", seats: "45 to 53 seats", desc: "Reclining seats, USB charging, Wi-Fi and onboard restroom options for delegations and long-distance travel." },
  { name: "Midi & Mini Buses", seats: "14 to 35 seats", desc: "Ideal for hotel shuttles, crew transport and school or campus routes across the Emirates." },
  { name: "Staff Buses", seats: "50 to 66 seats", desc: "High-capacity, air-conditioned vehicles built for daily labour and staff movements." },
  { name: "Executive Vans", seats: "7 to 12 seats", desc: "Premium vans for VIP groups, site visits and airport meet-and-greet." },
];

export default function BusCoachPage() {
  useEffect(() => { document.title = "Royal Limousine Coaches | Bus & Coach Transportation UAE | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="bus-coach-page">
      <section data-testid="bus-coach-hero" className="relative overflow-hidden bg-[#121212] text-white">
        <img src={IMG.hero} alt="Eurogulf Mobility Group luxury coach on a UAE highway" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <span className="chip-orange">Royal Limousine Coaches</span>
          <h1 className="mt-5 font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight text-white max-w-3xl">Bus & coach transportation, run like an airline.</h1>
          <p className="mt-6 font-body text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">Over 800 buses and coaches moving airline crews, corporate staff, government teams and event delegations across all seven Emirates, every day since 1998.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contact" data-testid="bus-coach-cta-quote" className="btn-primary">Request a Transport Proposal <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:800364" dir="ltr" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212]"><Phone className="w-4 h-4" /> 800 364</a>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/5">
          {STATS.map((s) => (
            <div key={s.label} className="py-8 px-4 text-center">
              <p className="font-heading font-black text-3xl lg:text-4xl text-[#EE5A01]">{s.value}</p>
              <p className="mt-1 font-body text-xs lg:text-sm text-[#666666]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFAFA] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG.boarding} alt="Guests boarding a Eurogulf coach in Dubai" loading="lazy" className="h-64 w-full rounded-2xl object-cover col-span-2 shadow-[0_24px_60px_rgba(0,0,0,0.12)]" />
            <img src={IMG.fleet} alt="Eurogulf bus and van fleet with the UAE flag" loading="lazy" className="h-44 w-full rounded-2xl object-cover" />
            <img src={IMG.control} alt="Eurogulf 24/7 fleet control room overlooking Dubai" loading="lazy" className="h-44 w-full rounded-2xl object-cover" />
          </div>
          <div>
            <SectionHeader chip="Who We Move" title="The transport backbone behind the UAE's biggest teams." desc="Royal Limousine Coaches began in 1998 as the passenger-transport arm of Eurogulf Mobility Group. Today it is one of the largest privately operated bus and coach fleets in the country, trusted by airlines, hotels, developers and government." />
            <ul className="mt-8 space-y-3">
              {["Airline crew transportation for Emirates and dnata", "Corporate and hospitality staff shuttle networks", "Municipal and government mobility programmes", "Conference, exhibition and cruise-passenger movements"].map((t) => (
                <li key={t} className="flex items-start gap-3 font-body text-sm text-[#121212]"><span className="mt-1.5 h-2 w-2 rounded-sm bg-[#EE5A01] flex-shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-testid="bus-coach-services" className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader chip="Services" title="Managed transport, end to end." align="center" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="card-light p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EE5A01] text-white"><s.icon className="w-5 h-5" /></span>
                <h3 className="mt-4 font-heading font-bold text-base text-[#121212]">{s.title}</h3>
                <p className="mt-2 font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="bus-coach-fleet" className="relative bg-[#EEEDE7] py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionHeader chip="The Fleet" title="From executive vans to 53-seat luxury coaches." desc="Every vehicle is maintained in Eurogulf Auto Garage's A-grade workshops and renewed on strict age cycles, so your passengers always travel in modern, air-conditioned comfort." />
            <img src={IMG.coach} alt="Luxury coach on Sheikh Zayed Road, Dubai" loading="lazy" className="mt-8 h-56 w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)]" />
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FLEET.map((v) => (
              <div key={v.name} className="card-light p-6 flex flex-col">
                <Bus className="w-7 h-7 text-[#EE5A01]" />
                <h3 className="mt-4 font-heading font-bold text-lg text-[#121212]">{v.name}</h3>
                <p className="font-heading font-bold text-xs text-[#EE5A01] tracking-wider uppercase mt-1">{v.seats}</p>
                <p className="mt-3 font-body text-sm text-[#666666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
