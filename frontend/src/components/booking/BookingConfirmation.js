import { Check } from 'lucide-react';
import { formatDate } from '@/components/booking/bookingData';

export function BookingConfirmation({ form, bookingRef, getPrice, onReset }) {
  return (
    <div data-testid="book-chauffeur-page">
      <div className="min-h-[80vh] bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
        <div data-testid="booking-confirmation" className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#EE5A01] flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#121212] uppercase tracking-tight mb-3">
            Booking Received
          </h1>
          <p className="font-body text-[#666666] mb-8">
            Thank you, {form.name}. Our concierge team will confirm your chauffeur booking within 2 hours.
          </p>
          <div className="bg-white border border-black/10 rounded-2xl p-6 text-left space-y-3 mb-8 shadow-sm">
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666666] uppercase">Reference</span>
              <span className="font-mono text-sm text-[#EE5A01]">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666666] uppercase">Vehicle</span>
              <span className="font-heading text-sm text-[#121212]">{form.vehicle}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666666] uppercase">Date</span>
              <span className="font-heading text-sm text-[#121212]">{formatDate(form.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666666] uppercase">Duration</span>
              <span className="font-heading text-sm text-[#121212]">{form.duration === '4h' ? 'Half Day (4 Hours)' : 'Full Day (8 Hours)'}</span>
            </div>
            <div className="border-t border-black/10 pt-3 flex justify-between">
              <span className="font-heading text-sm text-[#121212] uppercase">Total</span>
              <span className="font-heading font-black text-lg text-[#EE5A01]">AED {getPrice().toLocaleString()}</span>
            </div>
          </div>
          <button data-testid="book-another-btn" onClick={onReset} className="btn-primary">Book Another Ride</button>
        </div>
      </div>
    </div>
  );
}
