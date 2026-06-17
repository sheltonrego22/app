import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Building2, Plane, Hotel, MapPin, Calendar, Truck, Wrench, Car, Check, Send, Users, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const EGMG_LOGO = "/egmg-logo-transparent.png";

const whyPartner = [
  "Access a broader mobility ecosystem across self-drive, managed transport, and fleet solutions",
  "Explore partnership models built around real operational and customer needs",
  "Work with a UAE-focused group supporting both business and consumer mobility journeys",
  "Create more seamless transport and service experiences for your customers, guests, teams, or operations",
];

const partnerTypes = [
  { icon: Plane, label: "Travel agencies and destination partners" },
  { icon: Hotel, label: "Hotels, resorts, and serviced apartments" },
  { icon: Building2, label: "Real estate developers and community operators" },
  { icon: Calendar, label: "Event agencies and MICE organisers" },
  { icon: Users, label: "Corporate businesses and staff-mobility stakeholders" },
  { icon: Truck, label: "FMCG and distribution businesses" },
  { icon: Wrench, label: "Garages, workshops, and automotive service providers" },
  { icon: Car, label: "Vehicle dealerships and related commercial partners" },
];

const opportunities = [
  "Guest pickup, drop-off, and airport transfer support for hospitality partners",
  "Private and managed transport for events, launches, exhibitions, and MICE requirements",
  "Business mobility and fleet support for operational teams and commercial users",
  "Property tour and site-linked transport support for real estate businesses",
  "Potential fleet and distribution support discussions for sectors with business-use vehicle requirements",
  "Automotive and vehicle-related collaboration opportunities for relevant service businesses",
];

export default function PartnerWithUsPage() {
  const [whyRef, whyVisible] = useScrollAnimation();
  const [whoRef, whoVisible] = useScrollAnimation();
  const [oppRef, oppVisible] = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', type: '', message: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { document.title = "Partner With Us — Eurogulf Mobility Group"; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: form.company, enquiry_type: `Partnership — ${form.type || 'General'}`,
        message: form.message,
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Partner enquiry:', err);
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div data-testid="partner-page">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="EGMG" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Partner With Us
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We work with businesses across the UAE to create practical mobility, transport, fleet, and service partnerships that improve customer experience, strengthen operations, and unlock new commercial opportunities.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <p className="font-body text-[#999] leading-relaxed text-base">
            At Eurogulf Mobility Group, we believe the right partnership can create value on both sides. We collaborate with businesses that need trusted mobility support, transport capability, fleet solutions, guest-service movement, automotive collaboration, or tailored commercial programs aligned to their operating model.
          </p>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={whyRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${whyVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Why Partner With EGMG</h2>
          </div>
          <div className="space-y-4">
            {whyPartner.map((item, i) => (
              <div key={item} className={`flex items-start gap-4 bg-[#111] border border-white/5 p-5 ${whyVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <Check className="w-5 h-5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-[#EEEDE7]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={whoRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${whoVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Who We Work With</h2>
            <p className="font-body text-[#666] mt-3">We welcome conversations with:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerTypes.map((p, i) => (
              <div key={p.label} data-testid={`partner-type-${i}`} className={`bg-[#111] border border-white/5 p-6 text-center hover:border-[#EE5A01]/30 transition-all ${whoVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <p.icon className="w-7 h-7 text-[#EE5A01] mx-auto mb-3" strokeWidth={1.5} />
                <p className="font-body text-sm text-[#EEEDE7]">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={oppRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${oppVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Example Partnership Opportunities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {opportunities.map((opp, i) => (
              <div key={opp} className={`bg-[#111] border border-white/5 p-5 flex items-start gap-3 ${oppVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <Handshake className="w-5 h-5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-[#EEEDE7]">{opp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP ENQUIRY FORM */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-3">Start the Conversation</h2>
            <p className="font-body text-sm text-[#666]">If your business sees an opportunity to work with EGMG, we would be glad to start the conversation. Share a few details with us, and our team will review the opportunity and come back to you.</p>
          </div>

          {!submitted ? (
            <form data-testid="partner-form" className="bg-[#111] border border-white/5 p-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Full Name *</Label>
                    <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Company *</Label>
                    <Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Company name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Mobile *</Label>
                    <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 XX XXX XXXX" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email *</Label>
                    <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Partnership Type</Label>
                  <Select value={form.type} onValueChange={(v) => set('type', v)}>
                    <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-11 text-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent className="bg-[#111] border-[#333]">
                      {["Hospitality & Tourism", "Real Estate", "Events & MICE", "Corporate Mobility", "Distribution & Fleet", "Automotive Services", "Other"].map(t => (
                        <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Tell us about the opportunity</Label>
                  <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Describe the partnership opportunity..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[100px] text-sm" />
                </div>
                <button
                  data-testid="partner-submit"
                  type="submit"
                  disabled={submitting || !form.name || !form.phone || !form.email}
                  className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-4 hover:bg-[#d45000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Submit Partnership Enquiry'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-[#111] border border-[#EE5A01]/30 p-10 text-center">
              <Check className="w-10 h-10 text-[#EE5A01] mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">Thank You</h3>
              <p className="font-body text-sm text-[#666]">Our team will review the opportunity and come back to you.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
