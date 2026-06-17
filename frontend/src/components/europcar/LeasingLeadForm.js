import { useState } from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const EUROPCAR_GREEN = "#2d8c3c";

export function LeasingLeadForm({ API }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/contact`, {
        full_name: form.name, phone: form.phone, email: form.email,
        company: '', enquiry_type: 'Europcar Leasing', message: 'Leasing enquiry from Europcar page'
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Leasing:', err);
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-[#111] border p-6 text-center" style={{ borderColor: EUROPCAR_GREEN }}>
        <Check className="w-8 h-8 mx-auto mb-3" style={{ color: EUROPCAR_GREEN }} />
        <p className="font-heading font-bold text-sm text-[#EEEDE7]">Thank you! Our leasing consultant will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div data-testid="leasing-lead-form" className="bg-[#111] border border-white/5 p-6">
      <p className="font-body text-sm text-[#EEEDE7]/80 mb-2">
        Want to find out more about leasing from Europcar? Leave us your details and one of our consultants will get back to you shortly.
      </p>
      <p className="font-body text-xs text-[#666] mb-4 italic">
        Looking for a smarter way to drive long-term in the UAE? Speak to the Europcar leasing team about flexible personal and corporate leasing solutions from 12 to 48 months.
      </p>
      <div className="space-y-3">
        <Input data-testid="lease-name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your Name" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
        <Input data-testid="lease-phone" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Mobile Number" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
        <Input data-testid="lease-email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Email Address" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-11" />
        <button
          data-testid="lease-submit"
          disabled={submitting || !form.name || !form.phone || !form.email}
          onClick={handleSubmit}
          style={{ background: EUROPCAR_GREEN }}
          className="w-full text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Find Out More About Leasing Now'}
        </button>
      </div>
    </div>
  );
}
