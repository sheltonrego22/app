import { useEffect, useState } from 'react';
import { Phone, Mail, Globe, MapPin, Instagram, Linkedin, Youtube, Send, MessageCircle, ExternalLink, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const CONTACT_HERO = "https://images.unsplash.com/photo-1735320863905-ed428b59a2eb?w=1200&h=800&fit=crop";
const BOOKING_URL = "https://www.europcar.com/";

const enquiryTypes = [
  "Car Rental", "Chauffeur Booking", "Fleet Lease", "Group Transfer", "Truck / Commercial", "General"
];

const locations = [
  { name: "Dubai HQ", address: "Al Quoz Industrial Area 3, Dubai", hours: "Sun-Thu 8AM-6PM" },
  { name: "Emirates Towers", address: "Sheikh Zayed Road, Dubai", hours: "Daily 8AM-10PM" },
  { name: "Atlantis The Palm", address: "Palm Jumeirah, Dubai", hours: "Daily 8AM-10PM" },
  { name: "Dubai Hills Mall", address: "Dubai Hills Estate, Dubai", hours: "Daily 10AM-10PM" },
  { name: "Dubai Airport T1", address: "Terminal 1, DXB", hours: "24/7" },
  { name: "Dubai Airport T2", address: "Terminal 2, DXB", hours: "24/7" },
  { name: "Dubai Airport T3", address: "Terminal 3, DXB", hours: "24/7" },
  { name: "Al Maktoum Airport", address: "DWC, Dubai South", hours: "Daily 6AM-12AM" },
  { name: "Sharjah Airport", address: "SHJ Airport, Sharjah", hours: "24/7" },
  { name: "Sharjah Office", address: "Industrial Area, Sharjah", hours: "Sun-Thu 8AM-6PM" },
  { name: "Jebel Ali", address: "Jebel Ali Free Zone, Dubai", hours: "Sun-Thu 8AM-6PM" },
  { name: "Ras Al Khaimah", address: "Al Nakheel, RAK", hours: "Sun-Thu 8AM-6PM" },
  { name: "Fujairah", address: "Hamad Bin Abdullah Road, Fujairah", hours: "Sun-Thu 8AM-6PM" },
  { name: "Abu Dhabi", address: "Hamdan Street, Abu Dhabi", hours: "Sun-Thu 8AM-6PM" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '', company: '', email: '', phone: '', enquiry_type: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [locationsRef, locationsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Contact EGMG — Let's Move You Forward"; }, []);

  const validate = () => {
    const e = {};
    if (!formData.full_name.trim()) e.full_name = "Full name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.enquiry_type) e.enquiry_type = "Please select an enquiry type";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setFormData({ full_name: '', company: '', email: '', phone: '', enquiry_type: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="contact-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-black" />
          <div className="relative hidden lg:block">
            <img src={CONTACT_HERO} alt="Dubai" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
          <div className="max-w-xl">
            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
              Let's Move You Forward.
            </h1>
            <p className="font-body text-base text-[#666666] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Our team is available 24/7 to assist with bookings, enquiries, and fleet solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section data-testid="contact-form-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="orange-accent-line mb-6" />
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-8">
                Send Your Enquiry
              </h2>

              {submitted ? (
                <div data-testid="form-success-message" className="bg-[#111111] border border-[#EE5A01]/30 p-10 text-center">
                  <div className="w-16 h-16 bg-[#EE5A01]/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-[#EE5A01]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">Message Sent!</h3>
                  <p className="font-body text-sm text-[#666666]">Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary mt-6 text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="full_name" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Full Name *</Label>
                      <Input
                        id="full_name"
                        data-testid="input-full-name"
                        value={formData.full_name}
                        onChange={(e) => setFormData(p => ({ ...p, full_name: e.target.value }))}
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                        placeholder="John Smith"
                      />
                      {errors.full_name && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.full_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="company" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Company</Label>
                      <Input
                        id="company"
                        data-testid="input-company"
                        value={formData.company}
                        onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                        placeholder="Company Name (Optional)"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="email" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        data-testid="input-email"
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                        placeholder="name@company.com"
                      />
                      {errors.email && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Phone *</Label>
                      <Input
                        id="phone"
                        data-testid="input-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                        placeholder="+971 50 XXX XXXX"
                      />
                      {errors.phone && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="enquiry_type" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Enquiry Type *</Label>
                    <Select
                      value={formData.enquiry_type}
                      onValueChange={(v) => setFormData(p => ({ ...p, enquiry_type: v }))}
                    >
                      <SelectTrigger data-testid="select-enquiry-type" className="bg-black border-[#333] text-[#EEEDE7] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12">
                        <SelectValue placeholder="Select enquiry type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333]">
                        {enquiryTypes.map((t) => (
                          <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.enquiry_type && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.enquiry_type}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Message *</Label>
                    <Textarea
                      id="message"
                      data-testid="input-message"
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none min-h-[120px]"
                      placeholder="Tell us about your requirements..."
                    />
                    {errors.message && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'SENDING...' : 'SEND YOUR ENQUIRY'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* WhatsApp */}
              <a
                href="https://wa.me/97144569900"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-btn"
                className="flex items-center gap-4 bg-[#25D366] p-5 hover:bg-[#1fb855] transition-colors group"
              >
                <MessageCircle className="w-8 h-8 text-white" />
                <div>
                  <p className="font-heading font-bold text-white text-sm">Chat on WhatsApp</p>
                  <p className="text-white/70 text-xs font-body">Instant response during business hours</p>
                </div>
              </a>

              {/* Quick Contact */}
              <div className="bg-[#111111] border border-white/5 p-6 space-y-5">
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] uppercase tracking-wider">Quick Contact</h3>
                <a href="tel:+97144569900" className="flex items-center gap-3 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-body text-sm">
                  <Phone className="w-4 h-4 text-[#EE5A01]" /> +971 4 456 9900
                </a>
                <a href="mailto:info@egmg.ae" className="flex items-center gap-3 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-body text-sm">
                  <Mail className="w-4 h-4 text-[#EE5A01]" /> info@egmg.ae
                </a>
                <a href="https://www.egmg.ae" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#EEEDE7] hover:text-[#EE5A01] transition-colors font-body text-sm">
                  <Globe className="w-4 h-4 text-[#EE5A01]" /> www.egmg.ae
                </a>
                <div className="flex gap-4 pt-3 border-t border-white/5">
                  <a href="https://www.instagram.com/eurogulfmobilitygroup/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/company/eurogulf-mobility-group/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/@eurogulfmobilitygroup" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#EE5A01] hover:text-[#F17B34] transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section data-testid="locations-section" className="bg-black py-20 sm:py-28">
        <div ref={locationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${locationsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              14 Locations Across the UAE
            </h2>
            <p className="font-body text-[#666666]">Find us at airports, malls, and key business districts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map((loc, i) => (
              <div
                key={loc.name}
                data-testid={`location-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all ${locationsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{loc.name}</h3>
                    <p className="font-body text-xs text-[#666666] mb-1">{loc.address}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock className="w-3 h-3 text-[#EE5A01]" />
                      <span className="font-mono text-[10px] text-[#EE5A01]">{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERNATIONAL BOOKINGS ═══ */}
      <section data-testid="international-section" className="bg-[#0a0a0a] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-3">
                Book EGMG Services Worldwide
              </h3>
              <p className="font-body text-[#666666]">
                143 countries, 6,000+ locations, 600+ airports worldwide through our Europcar partnership.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="international-book-btn"
              className="btn-primary flex items-center gap-2 flex-shrink-0"
            >
              Book Internationally <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
