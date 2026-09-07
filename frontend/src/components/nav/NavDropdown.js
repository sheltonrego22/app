import { Link } from 'react-router-dom';

function DropdownColumn({ header, items, track }) {
  return (
    <div>
      <span className={`block font-heading text-[10px] ${track('tracking-[0.2em] uppercase')} text-[#EE5A01] mb-3 px-1`}>{header}</span>
      {items.map((sl) => (
        <Link key={sl.label} to={sl.href} className="block px-1 py-2 font-body text-sm text-[#EEEDE7] hover:text-[#EE5A01] transition-colors leading-tight">
          {sl.label}
          {sl.sub && <span className="block text-[10px] text-[#666] mt-0.5">{sl.sub}</span>}
        </Link>
      ))}
    </div>
  );
}

export function NavDropdown({ dropdownId, nav, isAr }) {
  const track = (cls) => (isAr ? '' : cls);
  if (dropdownId === 'corporate') {
    return (
      <div data-testid="corporate-dropdown" className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#111111] border border-white/10 py-4 px-5 z-50 grid grid-cols-2 gap-6">
        <DropdownColumn header={nav.labels.corporateHeader} items={nav.corporateLinks} track={track} />
        <DropdownColumn header={nav.labels.retailHeader} items={nav.retailLinks} track={track} />
      </div>
    );
  }
  const items = { brands: nav.brandsLinks, about: nav.aboutLinks, support: nav.supportLinks }[dropdownId] || [];
  return (
    <div data-testid={`${dropdownId}-dropdown`} className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} w-64 bg-[#111111] border border-white/10 py-2 z-50`}>
      {items.map((sl) => (
        <Link key={sl.label} to={sl.href} className="block px-5 py-2.5 text-sm font-body text-[#EEEDE7] hover:text-[#EE5A01] hover:bg-white/5 transition-colors">{sl.label}</Link>
      ))}
    </div>
  );
}
