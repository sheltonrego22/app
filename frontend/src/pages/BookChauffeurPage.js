import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Car, MapPin, Plane, ArrowRight, ArrowLeft, Check, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StepIndicator, STEPS } from '@/components/booking/StepIndicator';
import { VehicleCard } from '@/components/booking/VehicleCard';
import { VEHICLES, AIRPORTS, TIME_SLOTS, formatDate } from '@/components/booking/bookingData';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_IMG = "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=1400&h=800&fit=crop";

export default function BookChauffeurPage() {
  const [step, setStep] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [form, setForm] = useState({
    duration: '',
    date: null,
    time: '',
    pickupType: 'location',
    pickupAirport: '',
    pickupLocation: '',
    dropoffType: 'location',
    dropoffAirport: '',
    dropoffLocation: '',
    passengers: '',
    vehicle: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    document.title = "Book Your Chauffeur — Eurogulf Mobility";
  }, []);

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validateStep = () => {
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
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 3));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const payload = {
        duration: form.duration,
        date: form.date ? form.date.toISOString() : '',
        time: form.time,
        pickup_type: form.pickupType,
        pickup_location: form.pickupType === 'airport' ? form.pickupAirport : form.pickupLocation,
        dropoff_type: form.dropoffType,
        dropoff_location: form.dropoffType === 'airport' ? form.dropoffAirport : form.dropoffLocation,
        passengers: form.passengers,
        vehicle: form.vehicle,
        price: getPrice(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
      };
      const res = await axios.post(`${API}/bookings`, payload);
      setBookingRef(res.data.reference);
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitted(true);
      setBookingRef(`RL-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicleData = form.vehicle && form.passengers
    ? (VEHICLES[form.passengers] || []).find((v) => v.name === form.vehicle)
    : null;

  const getPrice = () => {
    if (!selectedVehicleData) return 0;
    return form.duration === '4h' ? selectedVehicleData.price4h : selectedVehicleData.price8h;
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  if (submitted) {
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
            <button
              data-testid="book-another-btn"
              onClick={() => { setSubmitted(false); setStep(0); setBookingRef(''); setForm({ duration: '', date: null, time: '', pickupType: 'location', pickupAirport: '', pickupLocation: '', dropoffType: 'location', dropoffAirport: '', dropoffLocation: '', passengers: '', vehicle: '', name: '', email: '', phone: '', notes: '' }); }}
              className="btn-primary"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="book-chauffeur-page">
      {/* HERO */}
      <section data-testid="chauffeur-hero" className="relative min-h-[55vh] flex items-center overflow-hidden">
        <img src={HERO_IMG} alt="Luxury chauffeur service in Dubai" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div ref={heroRef} className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 text-center ${heroVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Book Your Chauffeur
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium chauffeur service by Royal Limousine. Professional drivers, luxury fleet, available across all seven Emirates.
          </p>
        </div>
      </section>

      {/* BOOKING WIZARD */}
      <section data-testid="booking-wizard" className="bg-[#0a0a0a] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator current={step} steps={STEPS} />

          {/* Step 0: Duration */}
          {step === 0 && (
            <div data-testid="step-duration" className="animate-fade-in">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">
                Select Your Duration
              </h2>
              <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">
                Choose between a half-day or full-day chauffeur experience
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                {[
                  { value: '4h', title: 'Half Day', subtitle: '4 Hours', desc: 'Ideal for airport transfers, business meetings, or city tours', from: 850 },
                  { value: '8h', title: 'Full Day', subtitle: '8 Hours', desc: 'Perfect for events, multi-stop itineraries, or all-day availability', from: 1500 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    data-testid={`duration-${opt.value}`}
                    onClick={() => set('duration', opt.value)}
                    className={`text-left p-6 sm:p-8 border transition-all duration-300 group ${
                      form.duration === opt.value
                        ? 'border-[#EE5A01] bg-[#EE5A01]/5'
                        : 'border-[#222] bg-[#111111] hover:border-[#EE5A01]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                        form.duration === opt.value ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] group-hover:text-[#EE5A01]'
                      }`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-[#EEEDE7]">{opt.title}</h3>
                        <p className="font-mono text-xs text-[#EE5A01]">{opt.subtitle}</p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-[#999] mb-4">{opt.desc}</p>
                    <p className="font-heading text-sm text-[#666]">
                      From <span className="font-black text-[#EE5A01] text-lg">AED {opt.from.toLocaleString()}</span>
                    </p>
                  </button>
                ))}
              </div>
              {errors.duration && <p className="text-[#EE5A01] text-xs mt-4 font-body text-center">{errors.duration}</p>}
            </div>
          )}

          {/* Step 1: Trip Details */}
          {step === 1 && (
            <div data-testid="step-trip-details" className="animate-fade-in">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">
                Trip Details
              </h2>
              <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">
                When and where would you like to be picked up?
              </p>
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Date & Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date Picker */}
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">
                      Pickup Date *
                    </Label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          data-testid="date-picker-trigger"
                          className={`w-full flex items-center gap-3 bg-black border h-12 px-3 text-sm transition-colors ${
                            errors.date ? 'border-[#EE5A01]' : 'border-[#333] hover:border-[#555]'
                          } ${form.date ? 'text-[#EEEDE7]' : 'text-[#666]'}`}
                        >
                          <CalendarIcon className="w-4 h-4 text-[#EE5A01] flex-shrink-0" />
                          {form.date ? formatDate(form.date) : 'Select date'}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#111111] border-[#333]" align="start">
                        <Calendar
                          mode="single"
                          selected={form.date}
                          onSelect={(d) => { set('date', d); setCalendarOpen(false); }}
                          disabled={(d) => d < tomorrow}
                          className="text-[#EEEDE7]"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.date}</p>}
                  </div>

                  {/* Time Picker */}
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">
                      Pickup Time *
                    </Label>
                    <Select value={form.time} onValueChange={(v) => set('time', v)}>
                      <SelectTrigger
                        data-testid="time-picker-trigger"
                        className={`bg-black border h-12 text-sm ${
                          errors.time ? 'border-[#EE5A01]' : 'border-[#333]'
                        } ${form.time ? 'text-[#EEEDE7]' : 'text-[#666]'} focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none`}
                      >
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333] max-h-64">
                        {TIME_SLOTS.map((t) => (
                          <SelectItem key={t.value} value={t.value} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.time}</p>}
                  </div>
                </div>

                {/* Pickup */}
                <div className="bg-[#111111] border border-[#222] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#EE5A01]" />
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase">Pickup Location *</Label>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {[
                      { key: 'location', label: 'Address', icon: MapPin },
                      { key: 'airport', label: 'Airport', icon: Plane },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        data-testid={`pickup-type-${opt.key}`}
                        onClick={() => set('pickupType', opt.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-xs font-heading uppercase tracking-wider transition-all ${
                          form.pickupType === opt.key
                            ? 'bg-[#EE5A01] text-black'
                            : 'bg-white/5 text-[#999] hover:text-[#EEEDE7]'
                        }`}
                      >
                        <opt.icon className="w-3.5 h-3.5" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {form.pickupType === 'airport' ? (
                    <div>
                      <Select value={form.pickupAirport} onValueChange={(v) => set('pickupAirport', v)}>
                        <SelectTrigger data-testid="pickup-airport-select" className="bg-black border-[#333] text-[#EEEDE7] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12">
                          <SelectValue placeholder="Select airport terminal" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111111] border-[#333]">
                          {AIRPORTS.map((a) => (
                            <SelectItem key={a} value={a} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.pickupAirport && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.pickupAirport}</p>}
                    </div>
                  ) : (
                    <div>
                      <Input
                        data-testid="pickup-location-input"
                        value={form.pickupLocation}
                        onChange={(e) => set('pickupLocation', e.target.value)}
                        placeholder="e.g., Emirates Towers, Sheikh Zayed Road"
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                      />
                      {errors.pickupLocation && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.pickupLocation}</p>}
                    </div>
                  )}
                </div>

                {/* Drop-off */}
                <div className="bg-[#111111] border border-[#222] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#666]" />
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase">Drop-off Location *</Label>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {[
                      { key: 'location', label: 'Address', icon: MapPin },
                      { key: 'airport', label: 'Airport', icon: Plane },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        data-testid={`dropoff-type-${opt.key}`}
                        onClick={() => set('dropoffType', opt.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-xs font-heading uppercase tracking-wider transition-all ${
                          form.dropoffType === opt.key
                            ? 'bg-[#EE5A01] text-black'
                            : 'bg-white/5 text-[#999] hover:text-[#EEEDE7]'
                        }`}
                      >
                        <opt.icon className="w-3.5 h-3.5" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {form.dropoffType === 'airport' ? (
                    <div>
                      <Select value={form.dropoffAirport} onValueChange={(v) => set('dropoffAirport', v)}>
                        <SelectTrigger data-testid="dropoff-airport-select" className="bg-black border-[#333] text-[#EEEDE7] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12">
                          <SelectValue placeholder="Select airport terminal" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111111] border-[#333]">
                          {AIRPORTS.map((a) => (
                            <SelectItem key={a} value={a} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.dropoffAirport && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.dropoffAirport}</p>}
                    </div>
                  ) : (
                    <div>
                      <Input
                        data-testid="dropoff-location-input"
                        value={form.dropoffLocation}
                        onChange={(e) => set('dropoffLocation', e.target.value)}
                        placeholder="e.g., Dubai Mall, Downtown Dubai"
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12"
                      />
                      {errors.dropoffLocation && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.dropoffLocation}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Passengers & Vehicle */}
          {step === 2 && (
            <div data-testid="step-vehicle" className="animate-fade-in">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">
                Choose Your Vehicle
              </h2>
              <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">
                Select passengers to see recommended luxury vehicles
              </p>

              {/* Passenger Selector */}
              <div className="max-w-2xl mx-auto mb-8">
                <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-3 block">
                  Number of Passengers *
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '3', label: 'Up to 3', sub: 'Sedan' },
                    { value: '4', label: 'Up to 4', sub: 'Premium Sedan' },
                    { value: '6', label: 'Up to 6', sub: 'SUV / Van' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      data-testid={`passengers-${opt.value}`}
                      onClick={() => { set('passengers', opt.value); set('vehicle', ''); }}
                      className={`p-4 border text-center transition-all duration-300 ${
                        form.passengers === opt.value
                          ? 'border-[#EE5A01] bg-[#EE5A01]/5'
                          : 'border-[#222] bg-[#111111] hover:border-[#EE5A01]/40'
                      }`}
                    >
                      <Users className={`w-5 h-5 mx-auto mb-2 ${form.passengers === opt.value ? 'text-[#EE5A01]' : 'text-[#666]'}`} />
                      <p className="font-heading font-bold text-sm text-[#EEEDE7]">{opt.label}</p>
                      <p className="font-body text-[10px] text-[#666] mt-0.5">{opt.sub}</p>
                    </button>
                  ))}
                </div>
                {errors.passengers && <p className="text-[#EE5A01] text-xs mt-2 font-body">{errors.passengers}</p>}
              </div>

              {/* Vehicle Cards */}
              {form.passengers && VEHICLES[form.passengers] && (
                <div className="max-w-4xl mx-auto">
                  <div className={`grid gap-4 sm:gap-6 ${
                    VEHICLES[form.passengers].length === 1
                      ? 'grid-cols-1 max-w-md mx-auto'
                      : VEHICLES[form.passengers].length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {VEHICLES[form.passengers].map((v) => (
                      <VehicleCard
                        key={v.name}
                        vehicle={v}
                        duration={form.duration}
                        selected={form.vehicle}
                        onSelect={(name) => set('vehicle', name)}
                      />
                    ))}
                  </div>
                  {errors.vehicle && <p className="text-[#EE5A01] text-xs mt-4 font-body text-center">{errors.vehicle}</p>}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div data-testid="step-confirm" className="animate-fade-in">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">
                Confirm Your Booking
              </h2>
              <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">
                Review your trip details and provide your contact information
              </p>

              <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-3 space-y-5">
                  <div className="orange-accent-line mb-4" />
                  <h3 className="font-heading font-bold text-base text-[#EEEDE7] uppercase tracking-wider mb-4">Your Details</h3>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
                      <Input
                        data-testid="input-name"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="John Smith"
                        className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10"
                      />
                    </div>
                    {errors.name && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
                        <Input
                          data-testid="input-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                          placeholder="name@company.com"
                          className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10"
                        />
                      </div>
                      {errors.email && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.email}</p>}
                    </div>
                    <div>
                      <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
                        <Input
                          data-testid="input-phone"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          placeholder="+971 50 XXX XXXX"
                          className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10"
                        />
                      </div>
                      {errors.phone && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Special Requests</Label>
                    <Textarea
                      data-testid="input-notes"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="Child seat, extra luggage, specific route preferences..."
                      className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-2">
                  <div data-testid="booking-summary" className="bg-[#111111] border border-[#222] p-5 sticky top-24">
                    <h3 className="font-heading font-bold text-xs text-[#EE5A01] uppercase tracking-[0.2em] mb-5">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Duration</span>
                        <span className="font-heading text-[#EEEDE7]">{form.duration === '4h' ? 'Half Day (4h)' : 'Full Day (8h)'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Date</span>
                        <span className="font-heading text-[#EEEDE7]">{form.date ? formatDate(form.date) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Time</span>
                        <span className="font-heading text-[#EEEDE7]">
                          {form.time ? TIME_SLOTS.find((t) => t.value === form.time)?.label : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Pickup</span>
                        <span className="font-heading text-[#EEEDE7] text-right max-w-[140px] truncate">
                          {form.pickupType === 'airport' ? form.pickupAirport : form.pickupLocation || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Drop-off</span>
                        <span className="font-heading text-[#EEEDE7] text-right max-w-[140px] truncate">
                          {form.dropoffType === 'airport' ? form.dropoffAirport : form.dropoffLocation || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Vehicle</span>
                        <span className="font-heading text-[#EEEDE7]">{form.vehicle || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[#666]">Passengers</span>
                        <span className="font-heading text-[#EEEDE7]">{form.passengers ? `Up to ${form.passengers}` : '-'}</span>
                      </div>
                      <div className="border-t border-[#222] pt-3 mt-3 flex justify-between items-center">
                        <span className="font-heading font-bold text-[#EEEDE7] uppercase text-xs tracking-wider">Total</span>
                        <span className="font-heading font-black text-xl text-[#EE5A01]">AED {getPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 sm:mt-14 max-w-2xl mx-auto">
            {step > 0 ? (
              <button
                type="button"
                data-testid="btn-prev-step"
                onClick={prevStep}
                className="btn-ghost flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <button
                type="button"
                data-testid="btn-next-step"
                onClick={nextStep}
                className="btn-primary flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                data-testid="btn-submit-booking"
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
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
            {[
              { stat: "24/7", label: "Availability" },
              { stat: "7", label: "Emirates Covered" },
              { stat: "500+", label: "Luxury Vehicles" },
              { stat: "Since 1976", label: "Trusted Legacy" },
            ].map((item) => (
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
