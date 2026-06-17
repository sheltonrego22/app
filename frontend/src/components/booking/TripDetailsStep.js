import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Plane } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AIRPORTS, TIME_SLOTS, formatDate } from '@/components/booking/bookingData';

function LocationPicker({ prefix, form, errors, set }) {
  const typeKey = `${prefix}Type`;
  const airportKey = `${prefix}Airport`;
  const locationKey = `${prefix}Location`;
  const isPickup = prefix === 'pickup';

  return (
    <div className="bg-[#111111] border border-[#222] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 ${isPickup ? 'bg-[#EE5A01]' : 'bg-[#666]'}`} />
        <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase">{isPickup ? 'Pickup' : 'Drop-off'} Location *</Label>
      </div>
      <div className="flex gap-2 mb-4">
        {[{ key: 'location', label: 'Address', icon: MapPin }, { key: 'airport', label: 'Airport', icon: Plane }].map((opt) => (
          <button key={opt.key} type="button" data-testid={`${prefix}-type-${opt.key}`} onClick={() => set(typeKey, opt.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-heading uppercase tracking-wider transition-all ${form[typeKey] === opt.key ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#999] hover:text-[#EEEDE7]'}`}>
            <opt.icon className="w-3.5 h-3.5" />{opt.label}
          </button>
        ))}
      </div>
      {form[typeKey] === 'airport' ? (
        <div>
          <Select value={form[airportKey]} onValueChange={(v) => set(airportKey, v)}>
            <SelectTrigger data-testid={`${prefix}-airport-select`} className="bg-black border-[#333] text-[#EEEDE7] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12">
              <SelectValue placeholder="Select airport terminal" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#333]">
              {AIRPORTS.map((a) => <SelectItem key={a} value={a} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{a}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors[airportKey] && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors[airportKey]}</p>}
        </div>
      ) : (
        <div>
          <Input data-testid={`${prefix}-location-input`} value={form[locationKey]} onChange={(e) => set(locationKey, e.target.value)}
            placeholder={isPickup ? "e.g., Emirates Towers, Sheikh Zayed Road" : "e.g., Dubai Mall, Downtown Dubai"}
            className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12" />
          {errors[locationKey] && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors[locationKey]}</p>}
        </div>
      )}
    </div>
  );
}

export function TripDetailsStep({ form, errors, set }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <div data-testid="step-trip-details" className="animate-fade-in">
      <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">Trip Details</h2>
      <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">When and where would you like to be picked up?</p>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Pickup Date *</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button type="button" data-testid="date-picker-trigger"
                  className={`w-full flex items-center gap-3 bg-black border h-12 px-3 text-sm transition-colors ${errors.date ? 'border-[#EE5A01]' : 'border-[#333] hover:border-[#555]'} ${form.date ? 'text-[#EEEDE7]' : 'text-[#666]'}`}>
                  <CalendarIcon className="w-4 h-4 text-[#EE5A01] flex-shrink-0" />
                  {form.date ? formatDate(form.date) : 'Select date'}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#111111] border-[#333]" align="start">
                <Calendar mode="single" selected={form.date} onSelect={(d) => { set('date', d); setCalendarOpen(false); }} disabled={(d) => d < tomorrow} className="text-[#EEEDE7]" />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.date}</p>}
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Pickup Time *</Label>
            <Select value={form.time} onValueChange={(v) => set('time', v)}>
              <SelectTrigger data-testid="time-picker-trigger"
                className={`bg-black border h-12 text-sm ${errors.time ? 'border-[#EE5A01]' : 'border-[#333]'} ${form.time ? 'text-[#EEEDE7]' : 'text-[#666]'} focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none`}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-[#333] max-h-64">
                {TIME_SLOTS.map((t) => <SelectItem key={t.value} value={t.value} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.time && <p className="text-[#EE5A01] text-xs mt-1 font-body">{errors.time}</p>}
          </div>
        </div>
        <LocationPicker prefix="pickup" form={form} errors={errors} set={set} />
        <LocationPicker prefix="dropoff" form={form} errors={errors} set={set} />
      </div>
    </div>
  );
}
