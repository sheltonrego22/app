import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, Shield, Check, Users, Car, ArrowRight, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=1400&h=700&fit=crop";

const serviceTypes = [
  { icon: Plane, title: "Airport Transfer", desc: "DXB, DWC, AUH, SHJ — meet and greet included. Flight tracking for delayed arrivals.", tag: "From AED 250" },
  { icon: MapPin, title: "One-Way Trip", desc: "Point-to-point across the UAE. Fixed fare, no surge pricing, no hidden fees.", tag: "From AED 180" },
  { icon: Clock, title: "Half-Day (5h)", desc: "Driver at your disposal within Dubai. Ideal for meetings, site visits, or city tours.", tag: "From AED 650" },
  { icon: Car, title: "Full-Day (10h)", desc: "Cross-city availability with hourly breaks. Perfect for events or multi-stop itineraries.", tag: "From AED 1,200" },
];

const trustPoints = [
  { icon: Shield, title: "Fully Insured", desc: "Comprehensive coverage on every ride. Passengers and luggage fully covered." },
  { icon: Users, title: "Vetted Drivers", desc: "Over 800 RTA-approved, trained, multilingual chauffeurs." },
  { icon: Check, title: "Fixed Fares", desc: "No surge, no hidden fees. The price you see is the price you pay." },
];

const fleet = [
  { name: "Lexus ES 350 / Tesla Model Y", type: "Executive Sedan", pax: "Up to 3", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Audi A8 / BMW 7 Series", type: "Premium Sedan", pax: "Up to 4", img: "https://images.pexels.com/photos/37098542/pexels-photo-37098542.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Mercedes V-Class", type: "Executive Van", pax: "Up to 6", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "GMC Denali / Suburban", type: "Premium SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=500&h=300&fit=crop" },
  { name: "Mercedes Sprinter", type: "Executive Minibus", pax: "Up to 16", img: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=500&h=300&fit=crop" },
];

const steps = [
  { num: "01", title: "Choose Your Service", desc: "One-way transfer, half-day, or full-day disposal." },
  { num: "02", title: "Select Vehicle & Time", desc: "Pick your preferred vehicle class and schedule." },
  { num: "03", title: "Confirm & Ride", desc: "Your professional chauffeur arrives on time." },
];

const AIRPORTS = ["DXB — Terminal 1", "DXB — Terminal 2", "DXB — Terminal 3", "DWC — Al Maktoum International", "SHJ — Sharjah International", "AUH — Abu Dhabi International"];

function BookingModal({ defaultTab = 'oneway' }) {
  const [tab, setTab] = useState(defaultTab);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    pickup: '', dropoff: '', date: '', time: '', airportPickup: false, airportDropoff: false,
    pickupAirport: '', dropoffAirport: '', duration: 'half-day', name: '', phone: '', email: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.date || !form.time) return;
    setSubmitting(true);
    try {
      const msg = tab === 'oneway'
        ? `One-Way Transfer: ${form.airportPickup ? form.pickupAirport : form.pickup} → ${form.airportDropoff ? form.dropoffAirport : form.dropoff} on ${form.date} at ${form.time}`
        : `${form.duration === 'half-day' ? 'Half-Day (5h)' : 'Full-Day (10h)'} Chauffeur: ${form.pickup} on ${form.date} at ${form.time}`;
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: '', enquiry_type: `Chauffeur — ${tab === 'oneway' ? 'One-Way Transfer' : 'Disposal'}`, message: msg,
      });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-black" /></div>
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">Request Submitted</h3>
        <p className="font-body text-sm text-[#666]">Our team will respond within one hour.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tab Selector */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('oneway')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider uppercase transition-all ${tab === 'oneway' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] hover:text-[#EEEDE7]'}`}>
          One-Way Transfer
        </button>
        <button onClick={() => setTab('disposal')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider uppercase transition-all ${tab === 'disposal' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] hover:text-[#EEEDE7]'}`}>
          Half-Day / Full-Day
        </button>
      </div>

      <div className="space-y-4">
        {tab === 'oneway' ? (
          <>
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Pickup</Label>
              <div className="flex gap-2 mb-2">
                <button onClick={() => set('airportPickup', false)} className={`text-[10px] font-heading uppercase tracking-wider px-3 py-1.5 ${!form.airportPickup ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Address</button>
                <button onClick={() => set('airportPickup', true)} className={`text-[10px] font-heading uppercase tracking-wider px-3 py-1.5 ${form.airportPickup ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Airport</button>
              </div>
              {form.airportPickup ? (
                <Select value={form.pickupAirport} onValueChange={(v) => set('pickupAirport', v)}>
                  <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm"><SelectValue placeholder="Select airport" /></SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#333]">{AIRPORTS.map(a => <SelectItem key={a} value={a} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{a}</SelectItem>)}</SelectContent>
                </Select>
              ) : (
                <Input value={form.pickup} onChange={e => set('pickup', e.target.value)} placeholder="e.g. Emirates Towers, Sheikh Zayed Road" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
              )}
            </div>
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Drop-off</Label>
              <div className="flex gap-2 mb-2">
                <button onClick={() => set('airportDropoff', false)} className={`text-[10px] font-heading uppercase tracking-wider px-3 py-1.5 ${!form.airportDropoff ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Address</button>
                <button onClick={() => set('airportDropoff', true)} className={`text-[10px] font-heading uppercase tracking-wider px-3 py-1.5 ${form.airportDropoff ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Airport</button>
              </div>
              {form.airportDropoff ? (
                <Select value={form.dropoffAirport} onValueChange={(v) => set('dropoffAirport', v)}>
                  <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm"><SelectValue placeholder="Select airport" /></SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#333]">{AIRPORTS.map(a => <SelectItem key={a} value={a} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{a}</SelectItem>)}</SelectContent>
                </Select>
              ) : (
                <Input value={form.dropoff} onChange={e => set('dropoff', e.target.value)} placeholder="e.g. Dubai Mall, Downtown" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Duration</Label>
              <div className="flex gap-2">
                <button onClick={() => set('duration', 'half-day')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider ${form.duration === 'half-day' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Half-Day (5h)</button>
                <button onClick={() => set('duration', 'full-day')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider ${form.duration === 'full-day' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666]'}`}>Full-Day (10h)</button>
              </div>
            </div>
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Pickup Location</Label>
              <Input value={form.pickup} onChange={e => set('pickup', e.target.value)} placeholder="e.g. Your hotel or office address" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Date</Label>
            <Input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm" />
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Time</Label>
            <Input type="time" value={form.time} onChange={e => set('time', e.target.value)} className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 mt-2">
          <p className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider mb-3">Your Details</p>
          <div className="space-y-3">
            <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email Address" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !form.name || !form.phone || !form.email}
          className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-3.5 hover:bg-[#d45000] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
        <p className="font-body text-[10px] text-[#666] text-center">Submit your request and our team will respond within one hour.</p>
      </div>
    </div>
  );
}

function CoachEnquiryModal() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', type: '', message: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: form.company, enquiry_type: `Coach / Staff Transport — ${form.type || 'General'}`, message: form.message,
      });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-black" /></div>
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">Thank You</h3>
        <p className="font-body text-sm text-[#666]">Our managed transportation team will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-[#EEEDE7]/70">Tell us about your transport requirement and we'll come back with a tailored proposal.</p>
      <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
        <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      </div>
      <Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Company Name (optional)" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <Select value={form.type} onValueChange={(v) => set('type', v)}>
        <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm"><SelectValue placeholder="Requirement Type" /></SelectTrigger>
        <SelectContent className="bg-[#111] border-[#333]">
          {["Staff Transport", "Event Transport", "Exhibition Logistics", "Corporate Shuttle", "Luxury Coach Hire", "Airport Group Transfer", "Other"].map(t => (
            <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Brief requirement details..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[80px] text-sm" />
      <button onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email} className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-3.5 hover:bg-[#d45000] transition-colors disabled:opacity-50">
        {submitting ? 'Submitting...' : 'Contact Us Now'}
      </button>
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <a href="tel:800364" className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#EE5A01]"><Phone className="w-3 h-3" /> 800 364</a>
        <a href="https://wa.me/97145063030" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#EE5A01]"><MessageSquare className="w-3 h-3" /> WhatsApp</a>
        <a href="mailto:chauffeur@eurogulf.ae" className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#EE5A01]"><Mail className="w-3 h-3" /> Email</a>
      </div>
    </div>
  );
}

export default function ChauffeurServicePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();
  const [stepsRef, stepsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Chauffeur Service Dubai — Airport & City Transfers | Eurogulf Mobility"; }, []);

  return (
    <div data-testid="chauffeur-service-page">
      {/* HERO */}
      <section data-testid="chauffeur-service-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Chauffeur service in Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Eurogulf Chauffeur · Royal Limousine</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Skip the Wheel. We'll Drive.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Chauffeur-driven airport transfers, half-day and full-day rides across the UAE. Fixed fares, no surge pricing, over 800 RTA-approved professional drivers in premium vehicles. ISO 9001:2015 certified.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Dialog>
              <DialogTrigger asChild>
                <button data-testid="chauffeur-book-modal-btn" className="btn-primary">Book Now</button>
              </DialogTrigger>
              <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Book Your Chauffeur</h2>
                <BookingModal />
              </DialogContent>
            </Dialog>
            <a href="tel:800364" className="btn-ghost">Call 800 364</a>
          </div>
        </div>
      </section>

      {/* TRUST POINTS */}
      <section className="bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-center gap-4 py-6 px-6 justify-center">
              <t.icon className="w-6 h-6 text-[#EE5A01] flex-shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{t.title}</h3>
                <p className="font-body text-xs text-[#666]">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Our Chauffeur Services</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">From airport arrivals to full-day corporate disposals. Every ride is fixed-fare, fully insured, and driven by a licensed professional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {serviceTypes.map((s, i) => (
              <div key={s.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="flex items-start justify-between mb-4">
                  <s.icon className="w-8 h-8 text-[#EE5A01]" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-[#EE5A01] tracking-wider">{s.tag}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={stepsRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className={`text-center ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="w-14 h-14 bg-[#EE5A01] flex items-center justify-center mx-auto mb-5">
                  <span className="font-heading font-black text-lg text-black">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Chauffeur Fleet</h2>
            <p className="font-body text-[#666]">Premium vehicles maintained to the highest standards. Your comfort is our priority.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {fleet.map((v, i) => (
              <div key={v.name} className={`bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{v.name}</h3>
                  <p className="font-mono text-[10px] text-[#EE5A01] tracking-wider mt-0.5">{v.type} · {v.pax}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY BUS / COACH / STAFF TRANSPORT ENQUIRY */}
      <section className="bg-[#f5f2ec] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">Luxury Buses, Coaches & Staff Transport</h2>
          <p className="font-body text-[#666] max-w-2xl mx-auto mb-4">
            One of the UAE's largest and youngest fleets of luxury buses and coaches. From staff transport and corporate shuttles to exhibition logistics and event mobility — Eurogulf Mobility delivers at scale.
          </p>
          <p className="font-heading font-bold text-lg text-[#EE5A01] mb-8">Want to find out how "we move you"?</p>
          <Dialog>
            <DialogTrigger asChild>
              <button data-testid="coach-enquiry-btn" className="btn-primary">Contact Us Now</button>
            </DialogTrigger>
            <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Coach & Staff Transport Enquiry</h2>
              <CoachEnquiryModal />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Ready to Ride?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Book your chauffeur in under 60 seconds. Fixed fares, no surge, professional drivers.</p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Book Your Chauffeur</button>
            </DialogTrigger>
            <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Book Your Chauffeur</h2>
              <BookingModal />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
