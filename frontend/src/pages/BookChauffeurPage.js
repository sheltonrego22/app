import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StepIndicator, STEPS } from '@/components/booking/StepIndicator';
import { VEHICLES } from '@/components/booking/bookingData';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { DurationStep } from '@/components/booking/DurationStep';
import { TripDetailsStep } from '@/components/booking/TripDetailsStep';
import { VehicleStep } from '@/components/booking/VehicleStep';
import { ConfirmStep } from '@/components/booking/ConfirmStep';
import { validateStep, buildBookingPayload } from '@/utils/bookingValidation';
import { logError } from '@/utils/logger';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const HERO_IMG = "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=1400&h=800&fit=crop";

const INITIAL_FORM = {
  duration: '', date: null, time: '', pickupType: 'location', pickupAirport: '', pickupLocation: '',
  dropoffType: 'location', dropoffAirport: '', dropoffLocation: '', passengers: '', vehicle: '',
  name: '', email: '', phone: '', notes: '',
};

export default function BookChauffeurPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => { document.title = "Book Your Chauffeur | Eurogulf Mobility"; }, []);

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const selectedVehicleData = form.vehicle && form.passengers
    ? (VEHICLES[form.passengers] || []).find((v) => v.name === form.vehicle)
    : null;

  const getPrice = () => {
    if (!selectedVehicleData) return 0;
    return form.duration === '4h' ? selectedVehicleData.price4h : selectedVehicleData.price8h;
  };

  const tryAdvance = () => {
    const e = validateStep(step, form);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, 3));
  };

  const handleSubmit = async () => {
    const e = validateStep(step, form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/bookings`, buildBookingPayload(form, getPrice()));
      setBookingRef(res.data.reference);
      setSubmitted(true);
    } catch (err) {
      logError('Booking', err);
      setErrors({ submit: 'We could not submit your booking right now. Please try again or call 800 364.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => { setSubmitted(false); setStep(0); setBookingRef(''); setForm(INITIAL_FORM); };

  if (submitted) {
    return <BookingConfirmation form={form} bookingRef={bookingRef} getPrice={getPrice} onReset={handleReset} />;
  }

  return (
    <div data-testid="book-chauffeur-page">
      {/* HERO */}
      <section data-testid="chauffeur-hero" className="relative min-h-[55vh] flex items-center overflow-hidden">
        <img src={HERO_IMG} alt="Luxury chauffeur service in Dubai" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div ref={heroRef} className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 text-center ${heroVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">Book Your Chauffeur</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium chauffeur service by Eurogulf Premium Chauffeur. Professional drivers, luxury fleet, available across all seven Emirates.
          </p>
        </div>
      </section>

      {/* BOOKING WIZARD */}
      <section data-testid="booking-wizard" className="bg-[#0a0a0a] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator current={step} steps={STEPS} />
          {step === 0 && <DurationStep form={form} errors={errors} set={set} />}
          {step === 1 && <TripDetailsStep form={form} errors={errors} set={set} />}
          {step === 2 && <VehicleStep form={form} errors={errors} set={set} />}
          {step === 3 && <ConfirmStep form={form} errors={errors} set={set} getPrice={getPrice} />}

          {errors.submit && (
            <p data-testid="booking-submit-error" role="alert" className="mt-8 max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 text-red-400 font-body text-sm p-3">{errors.submit}</p>
          )}
          <div className="flex items-center justify-between mt-10 sm:mt-14 max-w-2xl mx-auto">
            {step > 0 ? (
              <button type="button" data-testid="btn-prev-step" onClick={() => setStep((s) => Math.max(s - 1, 0))} className="btn-ghost flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button type="button" data-testid="btn-next-step" onClick={tryAdvance} className="btn-primary flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" data-testid="btn-submit-booking" onClick={handleSubmit} disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {submitting ? 'SUBMITTING...' : 'Confirm Booking'} {!submitting && <Check className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-black py-12 border-t border-[#222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[{ stat: "24/7", label: "Availability" }, { stat: "7", label: "Emirates Covered" }, { stat: "500+", label: "Luxury Vehicles" }, { stat: "Since 1976", label: "Trusted Legacy" }].map((item) => (
              <div key={item.label}>
                <p className="font-heading font-black text-2xl sm:text-3xl text-[#EE5A01]">{item.stat}</p>
                <p className="font-body text-xs text-[#666] mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
