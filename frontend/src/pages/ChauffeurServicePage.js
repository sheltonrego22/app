import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, Shield, Check, Users, Car, Globe, Monitor, Star, Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';

const API = process.env.REACT_APP_BACKEND_URL;
const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=1400&h=700&fit=crop";

const useCases = [
  "Airport transfers across UAE airports.",
  "Corporate and VIP transport.",
  "Staff and crew shuttle services.",
  "Event and hospitality transport support.",
  "One-off journeys and longer-term managed mobility arrangements.",
];

const limoFleet = [
  { name: "Mercedes-Benz E-Class / S-Class", type: "Executive Sedan", pax: "Up to 3", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Cadillac Escalade / GMC Yukon", type: "Luxury SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=500&h=300&fit=crop" },
  { name: "Mercedes V-Class", type: "Executive Van", pax: "Up to 6", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "GMC Denali", type: "Premium SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767285610734-f0858d5248fe?w=500&h=300&fit=crop" },
  { name: "Mercedes Sprinter", type: "Executive Minibus", pax: "Up to 16", img: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=500&h=300&fit=crop" },
];

function EnquiryModal() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', type: '', message: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: form.company, enquiry_type: `Chauffeur / Managed Transport: ${form.type || 'General'}`, message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      logError('Transport', err);
      setSubmitError(submitErrorMessage(err));
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-black" /></div>
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">Thank You</h3>
        <p className="font-body text-sm text-[#666]">A specialist team member will follow up with the appropriate next steps.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="font-body text-xs text-[#999] mb-2">Share your transport requirement and our specialist team will come back with the appropriate next steps.</p>
      <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full Name *" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Company Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Mobile Number *" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
        <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email *" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-sm" />
      </div>
      <Select value={form.type} onValueChange={(v) => set('type', v)}>
        <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-10 text-sm"><SelectValue placeholder="Requirement Type" /></SelectTrigger>
        <SelectContent className="bg-[#111] border-[#333]">
          {["Airport Transfer", "Corporate/VIP Transport", "Staff/Crew Shuttle", "Event Transport", "Hospitality Transport", "One-Off Journey", "Managed Arrangement", "Other"].map(t => (
            <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Brief requirement details..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[80px] text-sm" />
      {submitError && <p data-testid="transport-submit-error" role="alert" className="font-body text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3">{submitError}</p>}
      <button data-testid="transport-submit" onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email} className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-3.5 hover:bg-[#d45000] transition-colors disabled:opacity-50">
        {submitting ? 'Submitting...' : 'Submit Transport Enquiry'}
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
  const [useCasesRef, useCasesVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();
  const [serviceRef, serviceVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Premier Chauffeur Services in Dubai | Eurogulf Premium Chauffeur"; }, []);

  return (
    <div data-testid="chauffeur-service-page">
      {/* HERO */}
      <section data-testid="chauffeur-service-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Premium chauffeur service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Eurogulf Premium Chauffeur</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Eurogulf Premium Chauffeur
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Managed transport and driven services for business, VIP, airport, staff, and event mobility.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Dialog>
              <DialogTrigger asChild>
                <button data-testid="chauffeur-book-modal-btn" className="btn-primary">Submit Transport Enquiry</button>
              </DialogTrigger>
              <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Transport Enquiry</h2>
                <EnquiryModal />
              </DialogContent>
            </Dialog>
            <a href="tel:800364" className="btn-ghost">Call 800 364</a>
          </div>
        </div>
      </section>

      {/* MANAGED TRANSPORT INTRO */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">Managed Transport Solutions</h2>
          <p className="font-body text-[#999] leading-relaxed">
            Eurogulf Premium Chauffeur delivers premium chauffeur-driven and managed transport solutions for individual and business mobility needs. These services operate through the wider Eurogulf Mobility Group structure and are handled through specialist follow-up rather than direct self-service quotation.
          </p>
        </div>
      </section>

      {/* WHERE THIS SERVICE FITS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={useCasesRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${useCasesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Where This Service Fits</h2>
          </div>
          <div className="space-y-3">
            {useCases.map((uc, i) => (
              <div key={uc} className={`flex items-start gap-4 bg-[#111] border border-white/5 p-5 ${useCasesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <Check className="w-5 h-5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-[#EEEDE7]">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE APPROACH */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={serviceRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${serviceVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">Service Approach</h2>
            <p className="font-body text-[#999] leading-relaxed">
              Professional drivers, premium service standards, flight monitoring and meet-and-greet where relevant, and tailored routing based on customer requirement. These enquiries are profiled carefully and routed to a specialist team for managed follow-up.
            </p>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Fleet</h2>
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

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Need Chauffeur or Managed Transport Support?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Submit an enquiry and a specialist team member will follow up with the appropriate next steps.</p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Submit an Enquiry</button>
            </DialogTrigger>
            <DialogContent className="bg-[#111] border-[#333] max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="font-heading font-bold text-lg text-[#EEEDE7] mb-4">Transport Enquiry</h2>
              <EnquiryModal />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
