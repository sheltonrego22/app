import { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';

const API = process.env.REACT_APP_BACKEND_URL;
const MAX_MB = 5;

const COPY = {
  en: { title: "Apply for", sub: "Fill in your details and attach your CV (PDF, DOC or DOCX, max 5 MB). Your application goes straight to our recruitment team.", name: "Full name", email: "Email", phone: "Phone", linkedin: "LinkedIn profile (optional)", message: "Cover note (optional)", cv: "Upload CV", cvHint: "PDF, DOC or DOCX up to 5 MB", submit: "Submit Application", sending: "Submitting...", successTitle: "Application received", successText: "Thank you. Our recruitment team will review your CV and contact shortlisted candidates directly. A confirmation has been sent to your email.", close: "Close", tooBig: `File is larger than ${MAX_MB} MB`, badType: "Please upload a PDF, DOC or DOCX file", failed: "We could not submit your application right now. Please try again or email careers@eurogulf.ae." },
  ar: { title: "التقدم لوظيفة", sub: "أدخل بياناتك وأرفق سيرتك الذاتية (PDF أو DOC أو DOCX، بحد أقصى ٥ ميجابايت). يصل طلبك مباشرة إلى فريق التوظيف.", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف", linkedin: "رابط لينكدإن (اختياري)", message: "رسالة تعريفية (اختياري)", cv: "رفع السيرة الذاتية", cvHint: "PDF أو DOC أو DOCX حتى ٥ ميجابايت", submit: "إرسال الطلب", sending: "جارٍ الإرسال...", successTitle: "تم استلام طلبك", successText: "شكراً لك. سيراجع فريق التوظيف سيرتك الذاتية ويتواصل مباشرة مع المرشحين المختارين. تم إرسال تأكيد إلى بريدك الإلكتروني.", close: "إغلاق", tooBig: `حجم الملف أكبر من ${MAX_MB} ميجابايت`, badType: "يرجى رفع ملف PDF أو DOC أو DOCX", failed: "تعذّر إرسال طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى أو مراسلة careers@eurogulf.ae." },
};

const EMPTY = { full_name: '', email: '', phone: '', linkedin_url: '', message: '' };
const inputCls = "w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#555] px-4 py-3 text-sm focus:border-[#EE5A01] focus:outline-none transition-colors";

export function ApplyModal({ open, onClose, role, roleLabel, lang = 'en' }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const [form, setForm] = useState(EMPTY);
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const pickFile = (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    setError('');
    setCv(null);
    if (!f) return;
    if (!/\.(pdf|docx?)$/i.test(f.name)) return setError(c.badType);
    if (f.size > MAX_MB * 1024 * 1024) return setError(c.tooBig);
    setCv(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!cv) return setError(c.badType);
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('role', role);
      fd.append('lang', lang);
      fd.append('cv', cv);
      await axios.post(`${API}/api/careers/apply`, fd);
      setDone(true);
    } catch (err) {
      logError('Apply', err);
      setError(submitErrorMessage(err, c.failed, lang));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => { onClose(); setTimeout(() => { setForm(EMPTY); setCv(null); setError(''); setDone(false); }, 300); };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent dir={isAr ? 'rtl' : 'ltr'} data-testid="apply-modal" className="bg-[#111] border-[#333] text-[#EEEDE7] rounded-none max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className={isAr ? 'text-right sm:text-right' : ''}>
          <DialogTitle className="font-heading font-black text-xl text-[#EEEDE7]">{c.title}: <span className="text-[#EE5A01]">{roleLabel || role}</span></DialogTitle>
          <DialogDescription className="font-body text-sm text-[#999]">{c.sub}</DialogDescription>
        </DialogHeader>
        {done ? (
          <div data-testid="apply-success" className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-[#EE5A01] mx-auto mb-4" />
            <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{c.successTitle}</h3>
            <p className="font-body text-sm text-[#999] mb-6">{c.successText}</p>
            <button onClick={handleClose} data-testid="apply-close" className="btn-primary">{c.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3" data-testid="apply-form">
            <input data-testid="apply-name" required minLength={2} value={form.full_name} onChange={set('full_name')} placeholder={c.name} className={inputCls} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input data-testid="apply-email" type="email" required value={form.email} onChange={set('email')} placeholder={c.email} className={inputCls} dir="ltr" />
              <input data-testid="apply-phone" type="tel" required minLength={5} value={form.phone} onChange={set('phone')} placeholder={c.phone} className={inputCls} dir="ltr" />
            </div>
            <input data-testid="apply-linkedin" type="url" value={form.linkedin_url} onChange={set('linkedin_url')} placeholder={c.linkedin} className={inputCls} dir="ltr" />
            <textarea data-testid="apply-message" rows={3} maxLength={3000} value={form.message} onChange={set('message')} placeholder={c.message} className={inputCls} />
            <label data-testid="apply-cv-label" className={`flex items-center gap-3 border border-dashed ${cv ? 'border-[#EE5A01]' : 'border-[#444]'} bg-black px-4 py-3 cursor-pointer hover:border-[#EE5A01] transition-colors`}>
              <Upload className="w-4 h-4 text-[#EE5A01] flex-shrink-0" />
              <span className="font-body text-sm text-[#999] truncate">{cv ? cv.name : `${c.cv} · ${c.cvHint}`}</span>
              <input data-testid="apply-cv" type="file" accept=".pdf,.doc,.docx" onChange={pickFile} className="hidden" />
            </label>
            {error && <p data-testid="apply-error" role="alert" className="font-body text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3">{error}</p>}
            <button type="submit" data-testid="apply-submit" disabled={submitting} className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> {c.sending}</> : c.submit}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
