import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INPUT_CLS, SELECT_CONTENT_CLS, SELECT_ITEM_CLS, LABEL_CLS, SectionHeader } from '@/components/brand/BrandKit';

const VEHICLE_CLASSES = [
  { value: "economy", label: "Economy (Corolla / Elantra)", monthly: 1750 },
  { value: "midsuv", label: "Mid-size SUV (Tucson / CR-V)", monthly: 2400 },
  { value: "premium", label: "Premium Sedan (Camry / Accord)", monthly: 3060 },
  { value: "fullsuv", label: "Full-size SUV (Patrol / Land Cruiser)", monthly: 4500 },
  { value: "luxury", label: "Luxury (Range Rover / Cadillac)", monthly: 7200 },
];

const termDiscount = (m) => (m >= 48 ? 0.15 : m >= 36 ? 0.1 : m >= 24 ? 0.05 : 0);
const volumeDiscount = (n) => (n >= 10 ? 0.15 : n >= 5 ? 0.08 : 0);
const buyMultiplier = (m) => (m >= 36 ? 1.35 : m >= 24 ? 1.28 : 1.2);

export function computeSavings({ fleetSize, term, vehicleClass }) {
  const vehicle = VEHICLE_CLASSES.find((v) => v.value === vehicleClass);
  const months = parseInt(term, 10);
  const discount = Math.min(termDiscount(months) + volumeDiscount(fleetSize), 0.25);
  const leaseMonthly = Math.round(vehicle.monthly * (1 - discount));
  const leasingTotal = leaseMonthly * months * fleetSize;
  const buyTotal = Math.round(vehicle.monthly * buyMultiplier(months) * months * fleetSize);
  const saving = buyTotal - leasingTotal;
  return { leaseMonthly, leasingTotal, buyTotal, saving, savingPct: buyTotal > 0 ? Math.round((saving / buyTotal) * 100) : 0 };
}

export function FleetCalculator() {
  const [fleetSize, setFleetSize] = useState(10);
  const [term, setTerm] = useState("36");
  const [vehicleClass, setVehicleClass] = useState("premium");
  const r = computeSavings({ fleetSize, term, vehicleClass });

  return (
    <section data-testid="fleet-calculator" className="bg-[#EEEDE7] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip="Fleet Savings Calculator" title="See what operational leasing saves your fleet." align="center" desc="Adjust fleet size, term and vehicle class to compare against buying outright. Figures are indicative UAE market averages." />
        <div className="mt-12 rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="fleet-size" className={LABEL_CLS}>Fleet size</label>
              <input id="fleet-size" data-testid="calc-fleet-size" type="range" min="1" max="100" value={fleetSize} onChange={(e) => setFleetSize(parseInt(e.target.value, 10))} className="w-full accent-[#EE5A01]" />
              <p className="mt-1 font-heading font-bold text-sm text-[#EE5A01]">{fleetSize} vehicles</p>
            </div>
            <div>
              <span className={LABEL_CLS}>Term</span>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger data-testid="calc-term" className={INPUT_CLS}><SelectValue /></SelectTrigger>
                <SelectContent className={SELECT_CONTENT_CLS}>{["12", "24", "36", "48", "60"].map((t) => <SelectItem key={t} value={t} className={SELECT_ITEM_CLS}>{t} months</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <span className={LABEL_CLS}>Vehicle class</span>
              <Select value={vehicleClass} onValueChange={setVehicleClass}>
                <SelectTrigger data-testid="calc-vehicle-class" className={INPUT_CLS}><SelectValue /></SelectTrigger>
                <SelectContent className={SELECT_CONTENT_CLS}>{VEHICLE_CLASSES.map((v) => <SelectItem key={v.value} value={v.value} className={SELECT_ITEM_CLS}>{v.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="font-heading font-bold text-[11px] tracking-[0.15em] uppercase text-[#666666]">Estimated {term}-month saving</p>
            <p data-testid="calc-saving" className="mt-1 font-heading font-black text-4xl sm:text-5xl text-[#EE5A01] tracking-tight">AED {r.saving.toLocaleString()}</p>
            <p className="font-body text-sm text-[#666666]">{r.savingPct}% saving vs buying</p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#F5F5F3] p-5 text-center"><p className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#666666]">Buy outright</p><p className="mt-1 font-heading font-bold text-2xl text-[#121212]">AED {r.buyTotal.toLocaleString()}</p><p className="mt-1 font-body text-[11px] text-[#666666]">Depreciation + insurance + maintenance + financing</p></div>
            <div className="rounded-xl border border-[#EE5A01]/30 bg-[#FFF4ED] p-5 text-center"><p className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#EE5A01]">Eurogulf leasing</p><p className="mt-1 font-heading font-bold text-2xl text-[#EE5A01]">AED {r.leasingTotal.toLocaleString()}</p><p className="mt-1 font-body text-[11px] text-[#666666]">AED {r.leaseMonthly.toLocaleString()}/month · all inclusive</p></div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" data-testid="fleet-calculator-cta" className="btn-primary">Customise Your Lease</Link>
          <p className="mt-3 font-body text-xs text-[#666666]">Speak to our fleet specialists for a tailored savings proposal.</p>
        </div>
      </div>
    </section>
  );
}
