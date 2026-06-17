import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Shield, AlertTriangle, Car, Truck, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { logError } from '@/utils/logger';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EGMG_LOGO = "/egmg-logo-transparent.png";

const enquiryTypes = [
  "Car Rental: New Booking",
  "Monthly Rental Enquiry",
  "Long-Term Leasing",
  "Chauffeur / Managed Transport",
  "Commercial Fleet (Truckline)",
  "Existing Rental Support",
  "Roadside Assistance",
  "Used Vehicle Enquiry",
  "Corporate Account",
  "General Enquiry",
];

const emirates = ["Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

const contactChannels = [
  {
    icon: Phone,
    title: "Reservations & New Enquiries",
    desc: "For new bookings, rental quotations, and pre-booking support.",
    action: "800 EUROPCAR (800 387 67227)",
    email: "reservations@europcar.ae",
    note: "Main channel for reservations, quotations, and pre-pickup support.",
  },
  {
    icon: Shield,
    title: "Existing Customer Support",
    desc: "For help with an active rental, after-sales support, invoicing, deposits, tolls, fines, or maintenance coordination.",
    action: null,
    email: "customer.service@europcar.ae",
    note: "Assigned to existing rental and after-sales support matters.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Roadside Assistance",
    desc: "For emergencies while on rent, 24/7 roadside assistance. In case of accident: ensure safety, contact emergency services, obtain police report, then call us.",
    action: "800 364 or 800 EUROPCAR (800 387 67227)",
    email: null,
    note: "24/7 emergency support.",
  },
  {
    icon: Truck,
    title: "Leasing, Fleet & Managed Transport",
    desc: "For long-term leasing, personal leasing, corporate fleet requirements, or chauffeur and managed transport services. Submit an enquiry and a specialist team member will follow up.",
    action: null,
    email: null,
    note: "Routed to specialist follow-up rather than generic quoting.",
  },
];

export default function ContactPage() {
  const [channelsRef, channelsVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    enquiry_type: '', name: '', phone: '', email: '', company: '', preferred_time: '', emirate: '', message: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { document.title = "Contact Us | Eurogulf Mobility Group"; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.enquiry_type) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        full_name: form.name,
        phone: form.phone,
        email: form.email,
        company: form.company || '',
        enquiry_type: form.enquiry_type,
        message: `[${form.enquiry_type}] ${form.message || ''}${form.preferred_time ? ` | Preferred contact: ${form.preferred_time}` : ''}${form.emirate ? ` | Emirate: ${form.emirate}` : ''}`,
      });
    } catch (err) {
      logError('ContactForm', err);
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div data-testid="contact-page">
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Contact Us
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Get in touch with Eurogulf Mobility Group and our specialist teams for rental, leasing, chauffeur, fleet, and mobility support. Whether you are making a new booking, managing an existing service, requesting roadside assistance, or submitting a business mobility enquiry, we will direct you to the right team.
          </p>
        </div>
      </section>

      {/* INTENT-BASED CONTACT CHANNELS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={channelsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${channelsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">How Can We Help?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contactChannels.map((ch, i) => (
              <div
                key={ch.title}
                data-testid={`contact-channel-${i}`}
                className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${channelsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <ch.icon className="w-7 h-7 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{ch.title}</h3>
                <p className="font-body text-sm text-[#999] leading-relaxed mb-4">{ch.desc}</p>
                {ch.action && (
                  <a href={`tel:${ch.action.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-[#EE5A01] font-heading text-sm font-bold mb-2">
                    <Phone className="w-4 h-4" /> {ch.action}
                  </a>
                )}
                {ch.email && (
                  <a href={`mailto:${ch.email}`} className="flex items-center gap-2 text-[#EE5A01] font-heading text-sm font-bold mb-2">
                    <Mail className="w-4 h-4" /> {ch.email}
                  </a>
                )}
                <p className="font-mono text-[10px] text-[#666] tracking-wider mt-2">{ch.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART CONTACT FORM */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={formRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${formVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Submit an Enquiry</h2>
            <p className="font-body text-[#666]">Select your enquiry type and we'll route you to the right specialist team.</p>
          </div>

          {!submitted ? (
            <div data-testid="contact-form" className="bg-[#111] border border-white/5 p-8">
              <div className="space-y-5">
                {/* Enquiry Type - FIRST */}
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Enquiry Type *</Label>
                  <Select value={form.enquiry_type} onValueChange={(v) => set('enquiry_type', v)}>
                    <SelectTrigger data-testid="enquiry-type-select" className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-12 text-sm">
                      <SelectValue placeholder="What do you need help with?" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] border-[#333]">
                      {enquiryTypes.map(t => (
                        <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Full Name *</Label>
                    <Input data-testid="contact-name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Mobile Number *</Label>
                    <Input data-testid="contact-phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 XX XXX XXXX" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email Address *</Label>
                    <Input data-testid="contact-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Company Name</Label>
                    <Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Optional" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Preferred Contact Time</Label>
                    <Select value={form.preferred_time} onValueChange={(v) => set('preferred_time', v)}>
                      <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-11 text-sm">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-[#333]">
                        {["Morning (9am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–7pm)", "Any time"].map(t => (
                          <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Pickup / Service Emirate</Label>
                    <Select value={form.emirate} onValueChange={(v) => set('emirate', v)}>
                      <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-11 text-sm">
                        <SelectValue placeholder="Select emirate" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-[#333]">
                        {emirates.map(e => (
                          <SelectItem key={e} value={e} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Message</Label>
                  <Textarea data-testid="contact-message" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us more about your requirement..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[100px] text-sm" />
                </div>

                <button
                  data-testid="contact-submit-btn"
                  onClick={handleSubmit}
                  disabled={submitting || !form.name || !form.phone || !form.email || !form.enquiry_type}
                  className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm tracking-[0.05em] py-4 hover:bg-[#d45000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </div>
          ) : (
            <div data-testid="contact-success" className="bg-[#111] border border-[#EE5A01]/30 p-10 text-center">
              <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">Enquiry Submitted</h3>
              <p className="font-body text-sm text-[#666]">Thank you. A specialist team member will follow up with the appropriate next steps.</p>
            </div>
          )}
        </div>
      </section>

      {/* COVERAGE */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider mb-4">Coverage</h3>
              <p className="font-body text-sm text-[#999] leading-relaxed">
                Europcar Dubai and Northern Emirates supports customers across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Abu Dhabi city, Al Ain, and the Western Region are operated by a separate Europcar franchise, although Abu Dhabi Airport return support is available where applicable.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider mb-4">Location</h3>
              <p className="font-body text-sm text-[#999] leading-relaxed mb-4">
                Headquartered in Al Quoz, Dubai, Eurogulf Mobility Group is supported by a broader network of operating locations across the UAE through the various businesses within its portfolio.
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-[#EEEDE7]">Al Quoz Industrial Area 3, Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8">
          <a href="tel:800364" className="flex items-center gap-2 text-black font-heading font-bold text-sm">
            <Phone className="w-5 h-5" /> 800 364
          </a>
          <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black font-heading font-bold text-sm">
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
          <a href="mailto:wemoveyou@eurogulf.ae" className="flex items-center gap-2 text-black font-heading font-bold text-sm">
            <Mail className="w-5 h-5" /> wemoveyou@eurogulf.ae
          </a>
        </div>
      </section>
    </div>
  );
}
