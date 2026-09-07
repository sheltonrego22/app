const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = [
  (form) => (form.duration ? {} : { duration: "Please select a duration" }),
  (form) => {
    const e = {};
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    Object.assign(e, validateStop(form, 'pickup'), validateStop(form, 'dropoff'));
    return e;
  },
  (form) => {
    const e = {};
    if (!form.passengers) e.passengers = "Select number of passengers";
    if (!form.vehicle) e.vehicle = "Please select a vehicle";
    return e;
  },
  (form) => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    return e;
  },
];

function validateStop(form, kind) {
  const type = form[`${kind}Type`];
  const label = kind === 'pickup' ? 'pickup' : 'drop-off';
  if (type === 'airport' && !form[`${kind}Airport`]) return { [`${kind}Airport`]: "Select airport terminal" };
  if (type === 'location' && !form[`${kind}Location`].trim()) return { [`${kind}Location`]: `Enter ${label} address` };
  return {};
}

export function validateStep(step, form) {
  const validate = validators[step];
  return validate ? validate(form) : {};
}

export function buildBookingPayload(form, price) {
  return {
    duration: form.duration, date: form.date ? form.date.toISOString() : '', time: form.time,
    pickup_type: form.pickupType, pickup_location: form.pickupType === 'airport' ? form.pickupAirport : form.pickupLocation,
    dropoff_type: form.dropoffType, dropoff_location: form.dropoffType === 'airport' ? form.dropoffAirport : form.dropoffLocation,
    passengers: form.passengers, vehicle: form.vehicle, price,
    name: form.name, email: form.email, phone: form.phone, notes: form.notes,
  };
}
