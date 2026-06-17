import { Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { VehicleCard } from '@/components/booking/VehicleCard';
import { VEHICLES } from '@/components/booking/bookingData';

const PASSENGER_OPTIONS = [
  { value: '3', label: 'Up to 3', sub: 'Sedan' },
  { value: '4', label: 'Up to 4', sub: 'Premium Sedan' },
  { value: '6', label: 'Up to 6', sub: 'SUV / Van' },
];

export function VehicleStep({ form, errors, set }) {
  const vehicles = VEHICLES[form.passengers] || [];
  const gridCols = vehicles.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : vehicles.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div data-testid="step-vehicle" className="animate-fade-in">
      <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">Choose Your Vehicle</h2>
      <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">Select passengers to see recommended luxury vehicles</p>

      <div className="max-w-2xl mx-auto mb-8">
        <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-3 block">Number of Passengers *</Label>
        <div className="grid grid-cols-3 gap-3">
          {PASSENGER_OPTIONS.map((opt) => (
            <button key={opt.value} type="button" data-testid={`passengers-${opt.value}`}
              onClick={() => { set('passengers', opt.value); set('vehicle', ''); }}
              className={`p-4 border text-center transition-all duration-300 ${form.passengers === opt.value ? 'border-[#EE5A01] bg-[#EE5A01]/5' : 'border-[#222] bg-[#111111] hover:border-[#EE5A01]/40'}`}>
              <Users className={`w-5 h-5 mx-auto mb-2 ${form.passengers === opt.value ? 'text-[#EE5A01]' : 'text-[#666]'}`} />
              <p className="font-heading font-bold text-sm text-[#EEEDE7]">{opt.label}</p>
              <p className="font-body text-[10px] text-[#666] mt-0.5">{opt.sub}</p>
            </button>
          ))}
        </div>
        {errors.passengers && <p className="text-[#EE5A01] text-xs mt-2 font-body">{errors.passengers}</p>}
      </div>

      {form.passengers && vehicles.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className={`grid gap-4 sm:gap-6 ${gridCols}`}>
            {vehicles.map((v) => (
              <VehicleCard key={v.name} vehicle={v} duration={form.duration} selected={form.vehicle} onSelect={(name) => set('vehicle', name)} />
            ))}
          </div>
          {errors.vehicle && <p className="text-[#EE5A01] text-xs mt-4 font-body text-center">{errors.vehicle}</p>}
        </div>
      )}
    </div>
  );
}
