import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';
import { INPUT_CLS, SELECT_CONTENT_CLS, SELECT_ITEM_CLS, LABEL_CLS, ERROR_CLS } from '@/components/brand/BrandKit';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const ENQUIRY_TYPES = ["Car Rental: New Booking", "Monthly Rental Enquiry", "Long-Term Leasing", "Chauffeur / Managed Transport", "Bus & Coach Transportation", "Commercial Fleet (Truckline)", "Existing Rental Support", "Roadside Assistance", "Used Vehicle Enquiry", "Vehicle Service (Auto Garage)", "Corporate Account", "General Enquiry"];
const EMIRATES = ["Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Abu Dhabi"];
const TIMES = ["Morning (9am to 12pm)", "Afternoon (12pm to 4pm)", "Evening (4pm to 7pm)", "Any time"];

function Field({ label, children }) {
  return <div><span className={LABEL_CLS}>{label}</span>{children}</div>;
}

function SelectField({ testid, value, onChange, placeholder, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger data-testid={testid} className={INPUT_CLS}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent className={SELECT_CONTENT_CLS}>{options.map((o) => <SelectItem key={o} value={o} className={SELECT_ITEM_CLS}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );
}

export function ContactForm({ defaultType = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ enquiry_type: defaultType, name: '', phone: '', email: '', company: '', preferred_time: '', emirate: '', message: '' });
  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: v?.target ? v.target.value : v }));
  const ready = form.name && form.phone && form.email && form.enquiry_type;

  const handleSubmit = async () => {
    if (!ready) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await axios.post(`${API}/contact`, {
        full_name: form.name, phone: form.phone, email: form.email, company: form.company || '', enquiry_type: form.enquiry_type,
        message: `[${form.enquiry_type}] ${form.message || ''}${form.preferred_time ? ` | Preferred contact: ${form.preferred_time}` : ''}${form.emirate ? ` | Emirate: ${form.emirate}` : ''}`,
      });
      setSubmitted(true);
    } catch (err) {
      logError('ContactForm', err);
      setSubmitError(submitErrorMessage(err));
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div data-testid="contact-success" className="rounded-2xl border border-[#EE5A01]/30 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#EE5A01] text-white"><Check className="w-8 h-8" /></span>
        <h3 className="mt-5 font-heading font-black text-2xl text-[#121212]">Enquiry submitted</h3>
        <p className="mt-2 font-body text-sm text-[#666666]">Thank you. A specialist team member will follow up with the appropriate next steps.</p>
      </div>
    );
  }

  return (
    <div data-testid="contact-form" className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] space-y-5">
      <Field label="Enquiry type *"><SelectField testid="enquiry-type-select" value={form.enquiry_type} onChange={set('enquiry_type')} placeholder="What do you need help with?" options={ENQUIRY_TYPES} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name *"><Input data-testid="contact-name" value={form.name} onChange={set('name')} placeholder="Your full name" className={INPUT_CLS} /></Field>
        <Field label="Mobile number *"><Input data-testid="contact-phone" value={form.phone} onChange={set('phone')} placeholder="+971 XX XXX XXXX" className={INPUT_CLS} dir="ltr" /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email address *"><Input data-testid="contact-email" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={INPUT_CLS} dir="ltr" /></Field>
        <Field label="Company name"><Input data-testid="contact-company" value={form.company} onChange={set('company')} placeholder="Optional" className={INPUT_CLS} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Preferred contact time"><SelectField testid="contact-time" value={form.preferred_time} onChange={set('preferred_time')} placeholder="Select time" options={TIMES} /></Field>
        <Field label="Pickup / service emirate"><SelectField testid="contact-emirate" value={form.emirate} onChange={set('emirate')} placeholder="Select emirate" options={EMIRATES} /></Field>
      </div>
      <Field label="Message"><Textarea data-testid="contact-message" value={form.message} onChange={set('message')} placeholder="Tell us more about your requirement..." className={`${INPUT_CLS} h-auto min-h-[110px]`} /></Field>
      {submitError && <p data-testid="contact-submit-error" role="alert" className={ERROR_CLS}>{submitError}</p>}
      <button data-testid="contact-submit-btn" onClick={handleSubmit} disabled={submitting || !ready} className="btn-primary w-full disabled:opacity-50">
        <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Submit Enquiry'}
      </button>
    </div>
  );
}
