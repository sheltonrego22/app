import { useState } from 'react';
import axios from 'axios';
import { VEHICLES } from '@/components/booking/bookingData';
import { validateStep, buildBookingPayload } from '@/utils/bookingValidation';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SUBMIT_FALLBACK = 'We could not submit your booking right now. Please try again or call 800 364.';

export const INITIAL_FORM = {
  duration: '', date: null, time: '', pickupType: 'location', pickupAirport: '', pickupLocation: '',
  dropoffType: 'location', dropoffAirport: '', dropoffLocation: '', passengers: '', vehicle: '',
  name: '', email: '', phone: '', notes: '',
};

const selectedVehicle = (form) => (form.vehicle && form.passengers ? (VEHICLES[form.passengers] || []).find((v) => v.name === form.vehicle) : null);

export function useBookingWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const getPrice = () => {
    const v = selectedVehicle(form);
    if (!v) return 0;
    return form.duration === '4h' ? v.price4h : v.price8h;
  };

  const validate = () => {
    const e = validateStep(step, form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 3)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/bookings`, buildBookingPayload(form, getPrice()));
      setBookingRef(res.data.reference);
      setSubmitted(true);
    } catch (err) {
      logError('Booking', err);
      setErrors({ submit: submitErrorMessage(err, SUBMIT_FALLBACK) });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setSubmitted(false); setStep(0); setBookingRef(''); setForm(INITIAL_FORM); };

  return { step, form, errors, submitting, submitted, bookingRef, set, getPrice, next, back, submit, reset };
}
