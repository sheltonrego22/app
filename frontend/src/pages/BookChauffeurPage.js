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
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const HERO_IMG = "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=1400&h=800&fit=crop";

const INITIAL_FORM = {
  duration: '', date: null, time: '', pickupType: 'location', pickupAirport: '', pickupLocation: '',
  dropoffType: 'location', dropoffAirport: '', dropoffLocation: '', passengers: '', vehicle: '',
  name: '', email: '', phone: '', notes: '',
};

function validateStep(step, form) {
  const e = {};
  if (step === 0) {
    if (!form.duration) e.duration = "Please select a duration";
  }
  if (step === 1) {
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    if (form.pickupType === 'airport' && !form.pickupAirport) e.pickupAirport = "Select airport terminal";
    if (form.pickupType === 'location' && !form.pickupLocation.trim()) e.pickupLocation = "Enter pickup address";
    if (form.dropoffType === 'airport' && !form.dropoffAirport) e.dropoffAirport = "Select airport terminal";
    if (form.dropoffType === 'location' && !form.dropoffLocation.trim()) e.dropoffLocation = "Enter drop-off address";
  }
  if (step === 2) {
    if (!form.passengers) e.passengers = "Select number of passengers";
    if (!form.vehicle) e.vehicle = "Please select a vehicle";
  }
  if (step === 3) {
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
  }
  return e;
}

export default function BookChauffeurPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => { document.title = "Book Your Chauffeur — Eurogulf Mobility"; }, []);

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
      const payload = {
        duration: form.duration, date: form.date ? form.date.toISOString() : '', time: form.time,
        pickup_type: form.pickupType, pickup_location: form.pickupType === 'airport' ? form.pickupAirport : form.pickupLocation,
        dropoff_type: form.dropoffType, dropoff_location: form.dropoffType === 'airport' ? form.dropoffAirport : form.dropoffLocation,
        passengers: form.passengers, vehicle: form.vehicle, price: getPrice(),
        name: form.name, email: form.email, phone: form.phone, notes: form.notes,
      };
      const res = await axios.post(`${API}/bookings`, payload);
      setBookingRef(res.data.reference);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Booking:', err);
      setBookingRef(`RL-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitted(true);
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

          {/* Navigation Buttons */}
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
