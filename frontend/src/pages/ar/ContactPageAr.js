import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send, Check, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import ar from '@/i18n/ar';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const t = ar;
const EGMG_LOGO = "/egmg-logo-transparent.png";

const enquiryTypes = [
  "تأجير سيارة — حجز جديد", "استفسار تأجير شهري", "تأجير طويل الأجل",
  "سائق / نقل مُدار", "أسطول تجاري (تراكلاين)", "دعم تأجير حالي",
  "مساعدة على الطريق", "استفسار سيارات مستعملة", "حساب شركات", "استفسار عام",
];

const emirates = ["دبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين"];

export default function ContactPageAr() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ enquiry_type: '', name: '', phone: '', email: '', company: '', preferred_time: '', emirate: '', message: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { document.title = "اتصل بنا — مجموعة يوروجلف للتنقل"; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.enquiry_type) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        full_name: form.name, phone: form.phone, email: form.email, company: form.company || '',
        enquiry_type: form.enquiry_type,
        message: `[AR] [${form.enquiry_type}] ${form.message || ''}${form.preferred_time ? ` | الوقت: ${form.preferred_time}` : ''}${form.emirate ? ` | الإمارة: ${form.emirate}` : ''}`,
      });
    } catch (err) { if (process.env.NODE_ENV === 'development') console.error('AR Contact:', err); }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div dir="rtl" className="font-body">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="يوروجلف موبيليتي" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] mb-4">{t.contact.title}</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">{t.contact.heroSub}</p>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl text-[#EEEDE7] mb-3">{t.contact.formTitle}</h2>
          </div>

          {!submitted ? (
            <div className="bg-[#111] border border-white/5 p-8 space-y-5">
              <div>
                <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.enquiryType} *</Label>
                <Select value={form.enquiry_type} onValueChange={(v) => set('enquiry_type', v)}>
                  <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-12 text-sm"><SelectValue placeholder="اختر نوع الاستفسار" /></SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#333]">
                    {enquiryTypes.map(t => <SelectItem key={t} value={t} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.fullName} *</Label>
                  <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="الاسم الكامل" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.mobile} *</Label>
                  <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 XX XXX XXXX" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.email} *</Label>
                  <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="البريد الإلكتروني" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
                </div>
                <div>
                  <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.emirate}</Label>
                  <Select value={form.emirate} onValueChange={(v) => set('emirate', v)}>
                    <SelectTrigger className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-11 text-sm"><SelectValue placeholder="اختر الإمارة" /></SelectTrigger>
                    <SelectContent className="bg-[#111] border-[#333]">
                      {emirates.map(e => <SelectItem key={e} value={e} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10">{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] mb-2 block">{t.contact.message}</Label>
                <Textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="أخبرنا المزيد عن متطلباتك..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none min-h-[100px] text-sm" />
              </div>
              <button onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email || !form.enquiry_type}
                className="w-full bg-[#EE5A01] text-black font-heading font-bold text-sm py-4 hover:bg-[#d45000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> {submitting ? 'جاري الإرسال...' : t.contact.submit}
              </button>
            </div>
          ) : (
            <div className="bg-[#111] border border-[#EE5A01]/30 p-10 text-center">
              <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-black" /></div>
              <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">{t.contact.success}</h3>
              <p className="font-body text-sm text-[#666]">{t.contact.successMsg}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8">
          <a href="tel:800364" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Phone className="w-5 h-5" /> 800 364</a>
          <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><MessageCircle className="w-5 h-5" /> واتساب</a>
          <a href="mailto:wemoveyou@eurogulf.ae" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Mail className="w-5 h-5" /> wemoveyou@eurogulf.ae</a>
        </div>
      </section>
    </div>
  );
}
