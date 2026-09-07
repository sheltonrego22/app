import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, Car, Briefcase, Users, Plane, Wrench, Bus } from 'lucide-react';
import { SectionHeader } from '@/components/brand/BrandKit';
import { ContactForm } from '@/components/contact/ContactForm';

const channels = [
  { icon: Phone, title: "Toll-free", value: "800 364", sub: "24/7 rental & roadside", href: "tel:800364" },
  { icon: MessageSquare, title: "WhatsApp", value: "Chat with us", sub: "Fast replies, 8am to 10pm", href: "https://wa.me/971800364", external: true },
  { icon: Mail, title: "Email", value: "wemoveyou@eurogulf.ae", sub: "Reply within one working day", href: "mailto:wemoveyou@eurogulf.ae" },
  { icon: MapPin, title: "Head office", value: "Al Quoz Industrial Area 1", sub: "Europcar Head Office, Dubai", href: "https://maps.google.com/?q=Europcar+Head+Office+Al+Quoz+Dubai", external: true },
];
const teams = [
  { icon: Car, name: "Rental & Reservations", contact: "800 364 · reservations@eurogulf.ae" },
  { icon: Briefcase, name: "Corporate Leasing", contact: "leasing@eurogulf.ae" },
  { icon: Users, name: "Chauffeur & Managed Transport", contact: "chauffeur@eurogulf.ae" },
  { icon: Bus, name: "Bus & Coach", contact: "coaches@eurogulf.ae" },
  { icon: Wrench, name: "Auto Garage", contact: "autocare@eurogulf.ae" },
  { icon: Plane, name: "Airport Counters", contact: "DXB T1 · T2 · T3 · DWC · SHJ" },
];
const hours = [["Reservations & roadside", "24 hours, 7 days"], ["Head office", "Sat to Thu, 8:00 to 18:00"], ["Airport counters", "24 hours"], ["Workshops", "Sat to Thu, 8:00 to 19:00"]];

export default function ContactPage() {
  useEffect(() => { document.title = "Contact Us | Eurogulf Mobility Group | 800 364"; }, []);

  return (
    <div data-testid="contact-page">
      <section data-testid="contact-hero" className="relative overflow-hidden bg-[#121212] text-white">
        <img src="/brand/control-room-dubai.jpg" alt="Eurogulf Mobility Group control room in Dubai" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <span className="chip-orange">Contact</span>
          <h1 className="mt-5 font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight text-white max-w-3xl">Let us move you forward.</h1>
          <p className="mt-5 font-body text-base sm:text-lg text-white/80 max-w-xl">One form for every enquiry: rentals, leasing, chauffeur, coaches, fleets, workshops and pre-owned cars. A specialist replies within one working day.</p>
        </div>
      </section>

      <section className="relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {channels.map((c) => (
            <a key={c.title} href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined} data-testid={`contact-channel-${c.title.toLowerCase().replace(/\s+/g, '-')}`} className="card-light p-4 sm:p-5 flex flex-col gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#EE5A01] text-white"><c.icon className="w-5 h-5" /></span>
              <p className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase text-[#666666]">{c.title}</p>
              <p className="font-heading font-bold text-sm text-[#121212] break-words" dir="ltr">{c.value}</p>
              <p className="font-body text-xs text-[#666666]">{c.sub}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFAFA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader chip="Send an Enquiry" title="Tell us what you need." desc="Fields marked * are required. Your details are only used to respond to this enquiry." />
            <div className="mt-8"><ContactForm /></div>
          </div>
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <h3 className="font-heading font-bold text-[11px] tracking-[0.15em] uppercase text-[#EE5A01]">Specialist teams</h3>
              <ul className="mt-4 divide-y divide-black/5">
                {teams.map((t) => (
                  <li key={t.name} className="flex items-center gap-3 py-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#FFF4ED] text-[#EE5A01] flex-shrink-0"><t.icon className="w-4 h-4" /></span><div><p className="font-heading font-bold text-sm text-[#121212]">{t.name}</p><p className="font-body text-xs text-[#666666]" dir="ltr">{t.contact}</p></div></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <h3 className="font-heading font-bold text-[11px] tracking-[0.15em] uppercase text-[#EE5A01] flex items-center gap-2"><Clock className="w-4 h-4" /> Opening hours</h3>
              <ul className="mt-4 space-y-2">{hours.map(([k, v]) => <li key={k} className="flex justify-between gap-4 font-body text-sm"><span className="text-[#666666]">{k}</span><span className="font-semibold text-[#121212] text-right">{v}</span></li>)}</ul>
            </div>
            <div className="rounded-2xl bg-[#121212] p-6 text-white">
              <p className="font-heading font-black text-lg">Prefer to book a car right now?</p>
              <p className="mt-1 font-body text-sm text-white/70">Europcar and Goldcar bookings are instant online, and chauffeur rides can be booked in four steps.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/europcar" className="btn-primary !py-2.5 !px-4 !text-xs">Rent a Car</Link>
                <Link to="/book-chauffeur" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212] !py-2.5 !px-4 !text-xs">Book a Chauffeur</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
