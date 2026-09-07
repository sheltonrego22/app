import { useState } from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';
import { INPUT_CLS, ERROR_CLS } from '@/components/brand/BrandKit';

const API = process.env.REACT_APP_BACKEND_URL;

export function LeasingLeadForm({ accent = '#EE5A01', enquiryType = 'Europcar Leasing', source = 'Europcar page', title, intro }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: '', enquiry_type: enquiryType, message: `Leasing enquiry from ${source}`,
      });
      setSubmitted(true);
    } catch (err) {
      logError('Leasing', err);
      setSubmitError(submitErrorMessage(err));
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div data-testid="leasing-lead-success" className="rounded-2xl border bg-white p-8 text-center shadow-sm" style={{ borderColor: accent }}>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: accent }}><Check className="w-6 h-6" /></span>
        <p className="mt-4 font-heading font-bold text-base text-[#121212]">Thank you! Our leasing consultant will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div data-testid="leasing-lead-form" className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      <h3 className="font-heading font-black text-xl text-[#121212]">{title || 'Get a leasing quote'}</h3>
      <p className="mt-2 font-body text-sm text-[#666666]">{intro || 'Leave your details and a leasing consultant will call you back with flexible personal and corporate options from 12 to 48 months.'}</p>
      <div className="mt-5 space-y-3">
        <Input data-testid="lease-name" value={form.name} onChange={set('name')} placeholder="Your name" className={INPUT_CLS} />
        <Input data-testid="lease-phone" value={form.phone} onChange={set('phone')} placeholder="Mobile number" className={INPUT_CLS} dir="ltr" />
        <Input data-testid="lease-email" type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={INPUT_CLS} dir="ltr" />
        {submitError && <p data-testid="lease-submit-error" role="alert" className={ERROR_CLS}>{submitError}</p>}
        <button data-testid="lease-submit" disabled={submitting || !form.name || !form.phone || !form.email} onClick={handleSubmit} style={{ background: accent }} className="w-full rounded-lg py-3.5 font-heading font-bold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Request a Callback'}
        </button>
        <p className="font-body text-[11px] text-[#999] text-center">No spam. One consultant, one call.</p>
      </div>
    </div>
  );
}
