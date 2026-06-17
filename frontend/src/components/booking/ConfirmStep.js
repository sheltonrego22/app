import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TIME_SLOTS, formatDate } from '@/components/booking/bookingData';

function BookingSummary({ form, getPrice }) {
  return (
    <div data-testid="booking-summary" className="bg-[#111111] border border-[#222] p-5 sticky top-24">
      <h3 className="font-heading font-bold text-xs text-[#EE5A01] uppercase tracking-[0.2em] mb-5">Booking Summary</h3>
      <div className="space-y-3 text-sm">
        {[
          { label: 'Duration', value: form.duration === '4h' ? 'Half Day (4h)' : 'Full Day (8h)' },
          { label: 'Date', value: form.date ? formatDate(form.date) : '-' },
          { label: 'Time', value: form.time ? TIME_SLOTS.find((t) => t.value === form.time)?.label : '-' },
          { label: 'Pickup', value: form.pickupType === 'airport' ? form.pickupAirport : form.pickupLocation || '-', truncate: true },
          { label: 'Drop-off', value: form.dropoffType === 'airport' ? form.dropoffAirport : form.dropoffLocation || '-', truncate: true },
          { label: 'Vehicle', value: form.vehicle || '-' },
          { label: 'Passengers', value: form.passengers ? `Up to ${form.passengers}` : '-' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between">
            <span className="font-body text-[#666]">{row.label}</span>
            <span className={`font-heading text-[#EEEDE7] ${row.truncate ? 'text-right max-w-[140px] truncate' : ''}`}>{row.value}</span>
          </div>
        ))}
        <div className="border-t border-[#222] pt-3 mt-3 flex justify-between items-center">
          <span className="font-heading font-bold text-[#EEEDE7] uppercase text-xs tracking-wider">Total</span>
          <span className="font-heading font-black text-xl text-[#EE5A01]">AED {getPrice().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function ConfirmStep({ form, errors, set, getPrice }) {
  return (
    <div data-testid="step-confirm" className="animate-fade-in">
      <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">Confirm Your Booking</h2>
      <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">Review your trip details and provide your contact information</p>

      <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-5">
          <div className="orange-accent-line mb-4" />
          <h3 className="font-heading font-bold text-base text-[#EEEDE7] uppercase tracking-wider mb-4">Your Details</h3>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
              <Input data-testid="input-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Smith" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10" />
            </div>
            {errors.name && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
                <Input data-testid="input-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="name@company.com" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10" />
              </div>
              {errors.email && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.email}</p>}
            </div>
            <div>
              <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
                <Input data-testid="input-phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+971 50 XXX XXXX" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10" />
              </div>
              {errors.phone && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Special Requests</Label>
            <Textarea data-testid="input-notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Child seat, extra luggage, specific route preferences..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none min-h-[80px]" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <BookingSummary form={form} getPrice={getPrice} />
        </div>
      </div>
    </div>
  );
}
