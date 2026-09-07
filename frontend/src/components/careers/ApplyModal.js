import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useApplyForm, MAX_MB } from '@/hooks/useApplyForm';

const COPY = {
  en: { title: "Apply for", sub: "Fill in your details and attach your CV (PDF, DOC or DOCX, max 5 MB). Your application goes straight to our recruitment team.", name: "Full name", email: "Email", phone: "Phone", linkedin: "LinkedIn profile (optional)", message: "Cover note (optional)", cv: "Upload CV", cvHint: "PDF, DOC or DOCX up to 5 MB", submit: "Submit Application", sending: "Submitting...", successTitle: "Application received", successText: "Thank you. Our recruitment team will review your CV and contact shortlisted candidates directly. A confirmation has been sent to your email.", close: "Close", tooBig: `File is larger than ${MAX_MB} MB`, badType: "Please upload a PDF, DOC or DOCX file", failed: "We could not submit your application right now. Please try again or email careers@eurogulf.ae." },
  ar: { title: "التقدم لوظيفة", sub: "أدخل بياناتك وأرفق سيرتك الذاتية (PDF أو DOC أو DOCX، بحد أقصى ٥ ميجابايت). يصل طلبك مباشرة إلى فريق التوظيف.", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف", linkedin: "رابط لينكدإن (اختياري)", message: "رسالة تعريفية (اختياري)", cv: "رفع السيرة الذاتية", cvHint: "PDF أو DOC أو DOCX حتى ٥ ميجابايت", submit: "إرسال الطلب", sending: "جارٍ الإرسال...", successTitle: "تم استلام طلبك", successText: "شكراً لك. سيراجع فريق التوظيف سيرتك الذاتية ويتواصل مباشرة مع المرشحين المختارين. تم إرسال تأكيد إلى بريدك الإلكتروني.", close: "إغلاق", tooBig: `حجم الملف أكبر من ${MAX_MB} ميجابايت`, badType: "يرجى رفع ملف PDF أو DOC أو DOCX", failed: "تعذّر إرسال طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى أو مراسلة careers@eurogulf.ae." },
};

const inputCls = "w-full bg-black border border-[#333] text-[#EEEDE7] placeholder:text-[#555] px-4 py-3 text-sm focus:border-[#EE5A01] focus:outline-none transition-colors";

function ApplySuccess({ c, onClose }) {
  return (
    <div data-testid="apply-success" className="text-center py-8">
      <CheckCircle className="w-12 h-12 text-[#EE5A01] mx-auto mb-4" />
      <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{c.successTitle}</h3>
      <p className="font-body text-sm text-[#999] mb-6">{c.successText}</p>
      <button onClick={onClose} data-testid="apply-close" className="btn-primary">{c.close}</button>
    </div>
  );
}

function CvPicker({ c, cv, onPick }) {
  return (
    <label data-testid="apply-cv-label" className={`flex items-center gap-3 border border-dashed ${cv ? 'border-[#EE5A01]' : 'border-[#444]'} bg-black px-4 py-3 cursor-pointer hover:border-[#EE5A01] transition-colors`}>
      <Upload className="w-4 h-4 text-[#EE5A01] flex-shrink-0" />
      <span className="font-body text-sm text-[#999] truncate">{cv ? cv.name : `${c.cv} · ${c.cvHint}`}</span>
      <input data-testid="apply-cv" type="file" accept=".pdf,.doc,.docx" onChange={onPick} className="hidden" />
    </label>
  );
}

function ApplyForm({ c, state }) {
  const { form, cv, error, submitting, set, pickFile, submit } = state;
  return (
    <form onSubmit={submit} className="space-y-3" data-testid="apply-form">
      <input data-testid="apply-name" required minLength={2} value={form.full_name} onChange={set('full_name')} placeholder={c.name} className={inputCls} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input data-testid="apply-email" type="email" required value={form.email} onChange={set('email')} placeholder={c.email} className={inputCls} dir="ltr" />
        <input data-testid="apply-phone" type="tel" required minLength={5} value={form.phone} onChange={set('phone')} placeholder={c.phone} className={inputCls} dir="ltr" />
      </div>
      <input data-testid="apply-linkedin" type="url" value={form.linkedin_url} onChange={set('linkedin_url')} placeholder={c.linkedin} className={inputCls} dir="ltr" />
      <textarea data-testid="apply-message" rows={3} maxLength={3000} value={form.message} onChange={set('message')} placeholder={c.message} className={inputCls} />
      <CvPicker c={c} cv={cv} onPick={pickFile} />
      {error && <p data-testid="apply-error" role="alert" className="font-body text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3">{error}</p>}
      <button type="submit" data-testid="apply-submit" disabled={submitting} className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> {c.sending}</> : c.submit}
      </button>
    </form>
  );
}

export function ApplyModal({ open, onClose, role, roleLabel, lang = 'en' }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const state = useApplyForm({ role, lang, copy: c });
  const handleClose = () => { onClose(); setTimeout(state.reset, 300); };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent dir={isAr ? 'rtl' : 'ltr'} data-testid="apply-modal" className="bg-[#111] border-[#333] text-[#EEEDE7] rounded-none max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className={isAr ? 'text-right sm:text-right' : ''}>
          <DialogTitle className="font-heading font-black text-xl text-[#EEEDE7]">{c.title}: <span className="text-[#EE5A01]">{roleLabel || role}</span></DialogTitle>
          <DialogDescription className="font-body text-sm text-[#999]">{c.sub}</DialogDescription>
        </DialogHeader>
        {state.done ? <ApplySuccess c={c} onClose={handleClose} /> : <ApplyForm c={c} state={state} />}
      </DialogContent>
    </Dialog>
  );
}
