import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Handshake, Plane, Hotel, Building2, Calendar, Users, Truck, Wrench, Car, Send } from 'lucide-react';
import ar from '@/i18n/ar';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';

const API = process.env.REACT_APP_BACKEND_URL;
const t = ar.partnerWithUs;

const partnerIcons = [Plane, Hotel, Building2, Calendar, Users, Truck, Wrench, Car];

export default function PartnerPageAr() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { document.title = "شراكة معنا | مجموعة يوروجلف للتنقل"; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.message.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: form.company, enquiry_type: `شراكة: ${form.type || 'عام'}`, message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      logError('AR Partner', err);
      setSubmitError(submitErrorMessage(err, ar.contact.submitError, 'ar'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl" data-testid="partner-page-ar" className="font-body">
      <section data-testid="ar-partner-hero" className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] tracking-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight">{t.whyTitle}</h2>
          </div>
          <div className="space-y-4">
            {t.whyPoints.map((item) => (
              <div key={item} className="flex items-start gap-4 bg-[#111] border border-white/5 p-5">
                <Check className="w-5 h-5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#EEEDE7]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight">{t.whoTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.partnerTypes.map((p, i) => {
              const Icon = partnerIcons[i];
              return (
                <div key={p} className="bg-[#111] border border-white/5 p-6 text-center hover:border-[#EE5A01]/30 transition-all">
                  <Icon className="w-7 h-7 text-[#EE5A01] mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-[#EEEDE7]">{p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] tracking-tight mb-3">{t.formTitle}</h2>
            <p className="text-sm text-[#666]">{t.formDesc}</p>
          </div>

          {!submitted ? (
            <form className="bg-[#111] border border-white/5 p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder={ar.contact.fullName} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
                <input value={form.company} onChange={e => set('company', e.target.value)} placeholder={ar.contact.company} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder={ar.contact.mobile} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder={ar.contact.email} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm" />
              </div>
              <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full bg-black border border-[#333] text-[#EEEDE7] p-3 text-sm">
                <option value="">{t.partnershipType}</option>
                {["ضيافة وسياحة", "عقارات", "فعاليات ومؤتمرات", "تنقل الشركات", "توزيع وأساطيل", "خدمات سيارات", "أخرى"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder={t.tellUs} className="w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm min-h-[100px]" />
              {submitError && <p data-testid="ar-partner-submit-error" role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3">{submitError}</p>}
              <button type="submit" disabled={submitting || !form.name || !form.phone || !form.email || !form.message.trim()}
                className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm py-4 hover:bg-[#d45000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> {submitting ? '...' : t.submitBtn}
              </button>
            </form>
          ) : (
            <div className="bg-[#111] border border-[#EE5A01]/30 p-10 text-center">
              <Check className="w-10 h-10 text-[#EE5A01] mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">{t.thankYou}</h3>
              <p className="text-sm text-[#666]">{t.thankYouMsg}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
