import { Check } from 'lucide-react';

export function VehicleCard({ vehicle, duration, selected, onSelect }) {
  const price = duration === '4h' ? vehicle.price4h : vehicle.price8h;
  const isSelected = selected === vehicle.name;

  return (
    <button
      type="button"
      data-testid={`vehicle-card-${vehicle.name.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onSelect(vehicle.name)}
      className={`w-full text-left group transition-all duration-300 border ${
        isSelected
          ? 'border-[#EE5A01] bg-[#EE5A01]/5'
          : 'border-[#222] bg-[#111111] hover:border-[#EE5A01]/40'
      }`}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-[#EE5A01] flex items-center justify-center">
            <Check className="w-5 h-5 text-black" />
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#EEEDE7]">{vehicle.name}</h3>
            <p className="font-body text-xs text-[#666] mt-0.5">{vehicle.type}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-heading font-black text-lg sm:text-xl text-[#EE5A01]">AED {price.toLocaleString()}</p>
            <p className="font-mono text-[10px] text-[#666]">{duration === '4h' ? '4 Hours' : '8 Hours'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {vehicle.features.map((f) => (
            <span key={f} className="font-body text-[10px] sm:text-xs text-[#999] bg-white/5 px-2 py-1">
              {f}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
