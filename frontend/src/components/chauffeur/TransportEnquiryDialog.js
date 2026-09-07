import { useState } from 'react';
import { Check, Phone, Mail, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';
import { INPUT_CLS, SELECT_CONTENT_CLS, SELECT_ITEM_CLS, ERROR_CLS } from '@/components/brand/BrandKit';

const API = process.env.REACT_APP_BACKEND_URL;
const TYPES = ["Airport Transfer", "Corporate/VIP Transport", "Staff/Crew Shuttle", "Event Transport", "Hospitality Transport", "One-Off Journey", "Managed Arrangement", "Other"];

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', type: '', message: '' });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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
      <div data-testid="transport-success" className="text-center py-8">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#EE5A01] text-white"><Check className="w-7 h-7" /></span>
        <h3 className="mt-4 font-heading font-bold text-lg text-[#121212]">Thank you</h3>
        <p className="mt-1 font-body text-sm text-[#666666]">A specialist team member will follow up with the appropriate next steps.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Input data-testid="transport-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name *" className={INPUT_CLS} />
      <Input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" className={INPUT_CLS} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input data-testid="transport-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Mobile number *" className={INPUT_CLS} dir="ltr" />
        <Input data-testid="transport-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email *" className={INPUT_CLS} dir="ltr" />
      </div>
      <Select value={form.type} onValueChange={(v) => set('type', v)}>
        <SelectTrigger data-testid="transport-type" className={INPUT_CLS}><SelectValue placeholder="Requirement type" /></SelectTrigger>
        <SelectContent className={SELECT_CONTENT_CLS}>{TYPES.map((t) => <SelectItem key={t} value={t} className={SELECT_ITEM_CLS}>{t}</SelectItem>)}</SelectContent>
      </Select>
      <Textarea data-testid="transport-message" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Brief requirement details..." className={`${INPUT_CLS} h-auto min-h-[90px]`} />
      {submitError && <p data-testid="transport-submit-error" role="alert" className={ERROR_CLS}>{submitError}</p>}
      <button data-testid="transport-submit" onClick={handleSubmit} disabled={submitting || !form.name || !form.phone || !form.email} className="btn-primary w-full disabled:opacity-50">
        {submitting ? 'Submitting...' : 'Submit Transport Enquiry'}
      </button>
      <div className="flex flex-wrap gap-4 justify-center pt-1 font-body text-xs text-[#666666]">
        <a href="tel:800364" className="inline-flex items-center gap-1.5 hover:text-[#EE5A01]"><Phone className="w-3.5 h-3.5" /> 800 364</a>
        <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#EE5A01]"><MessageSquare className="w-3.5 h-3.5" /> WhatsApp</a>
        <a href="mailto:chauffeur@eurogulf.ae" className="inline-flex items-center gap-1.5 hover:text-[#EE5A01]"><Mail className="w-3.5 h-3.5" /> Email</a>
      </div>
    </div>
  );
}

export function TransportEnquiryDialog({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent data-testid="transport-enquiry-modal" className="bg-white border-black/5 rounded-2xl max-w-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="font-heading font-black text-xl text-[#121212]">Transport enquiry</DialogTitle>
        <DialogDescription className="font-body text-sm text-[#666666]">Share your transport requirement and our specialist team will come back with the appropriate next steps.</DialogDescription>
        <EnquiryForm />
      </DialogContent>
    </Dialog>
  );
}
