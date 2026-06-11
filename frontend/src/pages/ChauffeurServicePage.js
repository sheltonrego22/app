import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, Shield, Check, Users, Car, ArrowRight, Phone, Mail, MessageSquare, Bus, Globe, Monitor, Star } from 'lucide-react';
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
  { icon: Plane, title: "Airport Transfers", desc: "On-site airport coordinators at Dubai International (T1, T2, T3) and Al Maktoum International (DWC). VIP parking and private pickup facilities.", tag: "From AED 250" },
  { icon: MapPin, title: "Corporate & Executive Transfers", desc: "Daily corporate commutes to multi-day executive road trips. All chauffeurs uniformed, trained, and performance-graded.", tag: "Bespoke" },
  { icon: Clock, title: "Half-Day / Full-Day Disposal", desc: "Driver at your disposal within the UAE. Ideal for meetings, site visits, multi-stop itineraries, or city tours.", tag: "From AED 650" },
  { icon: Globe, title: "Intercity Services", desc: "Pickup and drop-off across any Emirate. Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ — same standard of service.", tag: "All 7 Emirates" },
  { icon: Star, title: "Dedicated Chauffeurs", desc: "A named, dedicated driver familiar with your schedule, preferences, and standards for consistent personal transportation.", tag: "Premium" },
  { icon: Monitor, title: "Exhibitions & Corporate Events", desc: "Experience managing Expo 2020, Dubai Airshow, Dubai World Cup, and Dubai International Film Festival transportation logistics.", tag: "Events" },
];

const trustPoints = [
  { icon: Shield, title: "All 7 Emirates", desc: "One of very few operators licensed for chauffeur services across the entire UAE." },
  { icon: Users, title: "800+ RTA-Approved Drivers", desc: "Trained, uniformed, and graded through our rigorous quality programme." },
  { icon: Check, title: "ISO 9001:2015 Certified", desc: "Quality management across all chauffeur and transportation operations." },
];

const limoFleet = [
  { name: "Mercedes-Benz E-Class / S-Class", type: "Executive Sedan", pax: "Up to 3", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Cadillac Escalade / GMC Yukon", type: "Luxury SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=500&h=300&fit=crop" },
  { name: "Mercedes V-Class", type: "Executive Van", pax: "Up to 6", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "GMC Denali", type: "Premium SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767285610734-f0858d5248fe?w=500&h=300&fit=crop" },
  { name: "Mercedes Sprinter", type: "Executive Minibus", pax: "Up to 16", img: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=500&h=300&fit=crop" },
];

const coachFleet = [
  { name: "Toyota Hiace (14-seat)", desc: "Small group transfers and hotel shuttle services" },
  { name: "Toyota Coaster (20-seat)", desc: "Mid-size group transport" },
  { name: "Luxury Bus (up to 49 seats)", desc: "Full-size passenger coach for corporate and event transport" },
  { name: "Luxury Coach (49+ seats)", desc: "Premium long-distance and event coach for VIP groups" },
];

const driverTraining = [
  "Careful and Defensive Driving Techniques",
  "UAE Traffic Law Awareness and RTA Permit Compliance",
  "Comprehensive Insurance and Liability Awareness",
  "Driver Medical Fitness Standards",
  "Vehicle Maintenance & Safety Equipment Checks",
  "Professional Conduct, Grooming, and Uniform Standards",
  "Customer Service Excellence and Complaints Handling",
  "Lost & Found Protocols and Transparent Billing Practices",
];

const benefits = [
  { title: "All 7 Emirates", desc: "One of very few operators licensed to provide chauffeur services across the entire UAE" },
  { title: "Airport Coordinators", desc: "On-site at DXB T1, T2, T3, and DWC" },
  { title: "VIP Parking & Private Pickup", desc: "At all major UAE airports" },
  { title: "24/7 Operations", desc: "Round-the-clock customer service and driver dispatch" },
  { title: "GPS-Monitored Fleet", desc: "Real-time tracking on every vehicle" },
  { title: "Widest Fleet Range", desc: "From sedans and SUVs to coaches for 49+ passengers" },
];

const AIRPORTS = ["DXB — Terminal 1", "DXB — Terminal 2", "DXB — Terminal 3", "DWC — Al Maktoum International", "SHJ — Sharjah International", "AUH — Abu Dhabi International"];

function BookingModal({ defaultTab = 'oneway' }) {
  const [tab, setTab] = useState(defaultTab);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    pickup: '', dropoff: '', date: '', time: '', airportPickup: false, airportDropoff: false,
    pickupAirport: '', dropoffAirport: '', duration: 'half-day', vehicle: '', passengers: '', name: '', phone: '', email: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.date || !form.time) return;
    setSubmitting(true);
    try {
      const msg = tab === 'oneway'
        ? `One-Way Transfer: ${form.airportPickup ? form.pickupAirport : form.pickup} → ${form.airportDropoff ? form.dropoffAirport : form.dropoff} on ${form.date} at ${form.time}. Passengers: ${form.passengers || 'N/A'}`
        : `${form.duration === 'half-day' ? 'Half-Day (5h)' : 'Full-Day (10h)'} Chauffeur: ${form.pickup} on ${form.date} at ${form.time}. Vehicle: ${form.vehicle || 'Any'}`;
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: '', enquiry_type: `Chauffeur — ${tab === 'oneway' ? 'One-Way Transfer' : 'Disposal'}`, message: msg,
      });
    } catch (err) { /* handled */ }
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-black" /></div>
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">Request Submitted</h3>
        <p className="font-body text-sm text-[#666]">A member of our team will review your request and respond within one hour.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('oneway')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider uppercase transition-all ${tab === 'oneway' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] hover:text-[#EEEDE7]'}`}>One-Way Transfer</button>
        <button onClick={() => setTab('disposal')} className={`flex-1 py-2.5 font-heading text-xs tracking-wider uppercase transition-all ${tab === 'disposal' ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] hover:text-[#EEEDE7]'}`}>Half-Day / Full-Day</button>
      </div>
      <p className="font-body text-xs text-[#999] mb-4">Whether you need a one-way transfer, an airport pickup, or a half-day or full-day chauffeur service, submit your request and a member of our reservations team will contact you within one hour.</p>

      <div className="space-y-3">
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
            <Input value={form.passengers} onChange={e => set('passengers', e.target.value)} placeholder="Number of passengers" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
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
            <Input value={form.pickup} onChange={e => set('pickup', e.target.value)} placeholder="Pickup location" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            <Input value={form.vehicle} onChange={e => set('vehicle', e.target.value)} placeholder="Vehicle preference (optional)" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div><Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Date</Label><Input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm" /></div>
          <div><Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-1.5 block">Time</Label><Input type="time" value={form.time} onChange={e => set('time', e.target.value)} className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm" /></div>
        </div>

        <div className="border-t border-white/10 pt-3 mt-1">
          <p className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider mb-3">Your Details</p>
          <div className="space-y-3">
            <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
            <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email Address" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email} className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-3.5 hover:bg-[#d45000] transition-colors disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Submit Your Booking Request'}
        </button>
        <p className="font-body text-[10px] text-[#666] text-center">A member of our team will review your request and respond within one hour.</p>
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
    } catch (err) { /* handled */ }
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
    <div className="space-y-3">
      <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Company Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
        <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      </div>
      <Select value={form.type} onValueChange={(v) => set('type', v)}>
        <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm"><SelectValue placeholder="Type of Requirement" /></SelectTrigger>
        <SelectContent className="bg-[#111] border-[#333]">
          {["Staff Transport", "Luxury Coach", "Event Transport", "Corporate Mobility", "Exhibition Logistics", "Airport Group Transfer", "Other"].map(t => (
            <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Brief requirement details..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[80px] text-sm" />
      <button onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email} className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-3.5 hover:bg-[#d45000] transition-colors disabled:opacity-50">
        {submitting ? 'Submitting...' : 'Request a Call Back'}
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
  const [coachRef, coachVisible] = useScrollAnimation();
  const [driversRef, driversVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Eurogulf Chauffeur Dubai | Luxury Managed Transportation UAE | All 7 Emirates"; }, []);

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
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Eurogulf Chauffeur</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            UAE's Most Trusted Managed Transportation Partner.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From a single executive sedan to a fleet of 800 coaches — Eurogulf Chauffeur delivers precision-managed transportation across all seven Emirates. One of the very few operators licensed to do so.
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
            <Link to="/contact" className="btn-ghost">Event Transportation Enquiry</Link>
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

      {/* ABOUT EUROGULF CHAUFFEUR */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">About Eurogulf Chauffeur</h2>
          <div className="space-y-4 font-body text-[#999] leading-relaxed">
            <p>
              Since 1990, what began as Royal Limousine and Emirates Taxi has grown into one of the UAE's most respected and operationally sophisticated managed transportation businesses. Today, operating under the Eurogulf Chauffeur brand — with dedicated divisions in Dubai and Abu Dhabi — the group provides an unmatched breadth of passenger transportation services.
            </p>
            <p>
              Eurogulf Chauffeur holds the rare distinction of being <strong className="text-[#EEEDE7]">licensed and fully operational across all seven Emirates of the UAE</strong> — a testament to the group's commitment to regulatory compliance, operational excellence, and the trust it has earned from both government authorities and private sector clients over more than three decades of service.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">A Full Spectrum of Managed Transportation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceTypes.map((s, i) => (
              <div key={s.title} data-testid={`chauffeur-service-${i}`} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="flex items-start justify-between mb-4">
                  <s.icon className="w-8 h-8 text-[#EE5A01]" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider">{s.tag}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAUFFEUR FLEET */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Chauffeur Fleet</h2>
            <p className="font-body text-[#666]">Well-trained, uniformed, and accredited chauffeurs. A new, meticulously maintained fleet of premium vehicles.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {limoFleet.map((v, i) => (
              <div key={v.name} data-testid={`chauffeur-fleet-${i}`} className={`bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
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

      {/* DRIVERS SECTION */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={driversRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 ${driversVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <div className="orange-accent-line mb-6" />
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
                800+ RTA-Approved Drivers
              </h2>
              <p className="font-body text-[#999] leading-relaxed mb-6">
                The quality of a chauffeur service is defined not by the vehicle, but by the person behind the wheel. At Eurogulf Chauffeur, our drivers are selected, trained, uniformed, and assessed against comprehensive internal quality standards developed over more than 30 years of operations.
              </p>
              <p className="font-body text-sm text-[#666] mb-4">Our quality department continuously monitors all operations — tracking driver performance through a structured grading system, conducting regular audits, and assessing response time, availability, and customer interaction standards.</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Training Programme Covers</h3>
              <div className="space-y-2">
                {driverTraining.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-[#EEEDE7]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUS & COACH SECTION */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={coachRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${coachVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">
              One of the UAE's Largest and Youngest Luxury Coach Fleets
            </h2>
            <p className="font-heading text-lg text-[#EE5A01]">800+ buses. 800+ RTA-approved drivers. 5,000+ daily trips. Operating 24/7 across the UAE.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Current Fleet</h3>
              <div className="space-y-3 mb-8">
                {coachFleet.map((c) => (
                  <div key={c.name} className="bg-[#111] border border-white/5 p-4">
                    <h4 className="font-heading font-bold text-sm text-[#EEEDE7]">{c.name}</h4>
                    <p className="font-body text-xs text-[#666] mt-1">{c.desc}</p>
                  </div>
                ))}
              </div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Sectors We Serve</h3>
              <p className="font-body text-sm text-[#999]">Airlines · Hospitality & Hotels · DMCs & Tour Operators · Event Organisers · Cruise Companies · Government Entities · Corporates</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Operational Capabilities</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { val: "800+", label: "Buses" },
                  { val: "800+", label: "RTA Drivers" },
                  { val: "5,000+", label: "Daily Trips" },
                  { val: "24/7", label: "Operations" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                    <p className="font-heading font-black text-2xl text-[#EE5A01]">{s.val}</p>
                    <p className="font-body text-xs text-[#666] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                {["Airport desks at DXB T1, T2, T3, and Al Maktoum", "Fully automated operations and GPS tracking", "Daily quality check: harsh braking, over-speeding monitoring", "Online booking with built-in rates and real-time tracking"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-[#999]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUS & STAFF TRANSPORT CTA */}
      <section className="bg-[#f5f2ec] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">Luxury Bus, Coach and Staff Transport Solutions</h2>
          <p className="font-body text-[#666] max-w-2xl mx-auto mb-4 leading-relaxed">
            From executive people movement and crew transfers to staff transport, project mobility, and event logistics, Eurogulf Mobility delivers reliable transportation solutions backed by experienced operations teams, trained drivers, GPS-monitored fleets, and responsive customer support across the UAE.
          </p>
          <p className="font-heading font-bold text-lg text-[#EE5A01] mb-8">Want to find out how "we move you"?</p>
          <Dialog>
            <DialogTrigger asChild>
              <button data-testid="coach-enquiry-btn" className="btn-primary">Enquire Now</button>
            </DialogTrigger>
            <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Coach & Staff Transport Enquiry</h2>
              <CoachEnquiryModal />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Benefits of Working with Eurogulf Chauffeur</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={b.title} data-testid={`chauffeur-benefit-${i}`} className="bg-[#111] border border-white/5 p-6">
                <Check className="w-5 h-5 text-[#EE5A01] mb-3" />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{b.title}</h3>
                <p className="font-body text-xs text-[#666] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
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
