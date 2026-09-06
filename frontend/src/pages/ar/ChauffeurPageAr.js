import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Building2, Users, Car, MapPin } from 'lucide-react';
import ar from '@/i18n/ar';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const t = ar.chauffeur;

const services = [
  { icon: Plane, label: t.airportTransfers },
  { icon: Building2, label: t.corporateTransfers },
  { icon: Users, label: t.dedicatedChauffeurs },
  { icon: Car, label: t.eventTransport },
  { icon: MapPin, label: t.intercity },
];

export default function ChauffeurPageAr() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { document.title = "خدمة السائق الخاص | مجموعة يوروجلف للتنقل"; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: form.company, enquiry_type: `سائق / نقل مُدار: ${form.type || 'عام'}`, message: form.message,
      });
    } catch (err) { /* silent */ }
    setSubmitted(true);
  };

  return (
    <div dir="rtl" data-testid="chauffeur-page-ar" className="font-body">
      <section data-testid="ar-chauffeur-hero" className="relative min-h-[65vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block">{t.managedTransport}</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] tracking-tight mb-4">{t.arriveInCommand}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">{t.heroSub}</p>
          <Link to="/book-chauffeur" className="btn-primary inline-block">{ar.common.bookNow}</Link>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((s) => (
              <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                <s.icon className="w-6 h-6 text-[#EE5A01] mx-auto mb-2" strokeWidth={1.5} />
                <span className="text-xs text-[#EEEDE7]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] tracking-tight mb-3">{t.formTitle}</h2>
          </div>
          {!submitted ? (
            <form className="bg-[#111] border border-white/5 p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder={ar.contact.fullName} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder={ar.contact.mobile} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder={ar.contact.email} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
              <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder={ar.contact.message} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm min-h-[80px]" />
              <button type="submit" className="w-full btn-primary">{ar.contact.submit}</button>
            </form>
          ) : (
            <div className="bg-[#111] border border-[#EE5A01]/30 p-10 text-center">
              <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">{ar.contact.success}</h3>
              <p className="text-sm text-[#666]">{ar.contact.successMsg}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
