import { Check } from 'lucide-react';
import { formatDate } from '@/components/booking/bookingData';

export function BookingConfirmation({ form, bookingRef, getPrice, onReset }) {
  return (
    <div data-testid="book-chauffeur-page">
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div data-testid="booking-confirmation" className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#EE5A01] flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">
            Booking Received
          </h1>
          <p className="font-body text-[#666] mb-8">
            Thank you, {form.name}. Our concierge team will confirm your chauffeur booking within 2 hours.
          </p>
          <div className="bg-[#111111] border border-[#222] p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666] uppercase">Reference</span>
              <span className="font-mono text-sm text-[#EE5A01]">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666] uppercase">Vehicle</span>
              <span className="font-heading text-sm text-[#EEEDE7]">{form.vehicle}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666] uppercase">Date</span>
              <span className="font-heading text-sm text-[#EEEDE7]">{formatDate(form.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-[#666] uppercase">Duration</span>
              <span className="font-heading text-sm text-[#EEEDE7]">{form.duration === '4h' ? 'Half Day (4 Hours)' : 'Full Day (8 Hours)'}</span>
            </div>
            <div className="border-t border-[#222] pt-3 flex justify-between">
              <span className="font-heading text-sm text-[#EEEDE7] uppercase">Total</span>
              <span className="font-heading font-black text-lg text-[#EE5A01]">AED {getPrice().toLocaleString()}</span>
            </div>
          </div>
          <button data-testid="book-another-btn" onClick={onReset} className="btn-primary">Book Another Ride</button>
        </div>
      </div>
    </div>
  );
}
