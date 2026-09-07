import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function MenuLink({ item, onClick }) {
  return (
    <Link to={item.href} onClick={onClick} data-testid={`menu-link-${item.label.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')}`} className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-[#FFF4ED] transition-colors">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#EE5A01] flex-shrink-0 group-hover:scale-125 transition-transform" />
      <span>
        <span className="block font-heading font-semibold text-sm text-[#121212] group-hover:text-[#EE5A01] transition-colors">{item.label}</span>
        {item.sub && <span className="block font-body text-xs text-[#666666] mt-0.5">{item.sub}</span>}
      </span>
    </Link>
  );
}

function BrandTile({ brand, onClick }) {
  return (
    <Link to={brand.href} onClick={onClick} data-testid={`brand-menu-${brand.id}`} className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-2.5 hover:border-[#EE5A01]/40 hover:shadow-md transition-all">
      <img src={brand.img} alt="" className="h-12 w-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
      <span className="min-w-0">
        <span className="block font-heading font-bold text-[13px] text-[#121212] leading-tight group-hover:text-[#EE5A01] transition-colors">{brand.label}</span>
        <span className="block font-body text-[11px] text-[#666666] mt-0.5 truncate">{brand.desc}</span>
      </span>
    </Link>
  );
}

const PANEL = "absolute top-full mt-2 rounded-2xl bg-white border border-black/5 shadow-[0_24px_60px_rgba(0,0,0,0.14)] z-50 overflow-hidden";

export function NavDropdown({ dropdownId, nav, isAr, onNavigate }) {
  const { labels } = nav;
  if (dropdownId === 'brands') {
    return (
      <div data-testid="brands-dropdown" className={`${PANEL} ${isAr ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} w-[820px] p-5`}>
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="chip-orange">{labels.brandsHeader}</span>
          <Link to={nav.navLinks[2].href} onClick={onNavigate} className="inline-flex items-center gap-1 font-heading font-bold text-xs text-[#EE5A01] hover:gap-2 transition-all">{labels.viewAllBrands} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} /></Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {nav.brandsLinks.map((b) => <BrandTile key={b.id} brand={b} onClick={onNavigate} />)}
        </div>
      </div>
    );
  }
  const columns = {
    about: [{ header: labels.aboutHeader, items: nav.aboutLinks }],
    business: [{ header: labels.businessHeader, items: nav.businessLinks }],
    personal: [{ header: labels.personalHeader, items: nav.personalLinks }],
  }[dropdownId] || [];
  const wide = dropdownId !== 'about';
  return (
    <div data-testid={`${dropdownId}-dropdown`} className={`${PANEL} ${isAr ? 'right-0' : 'left-0'} ${wide ? 'w-[560px]' : 'w-[300px]'} p-4`}>
      {columns.map((col) => (
        <div key={col.header}>
          <span className="chip-orange mb-3">{col.header}</span>
          <div className={wide ? 'grid grid-cols-2 gap-x-3' : ''}>
            {col.items.map((item) => <MenuLink key={item.label} item={item} onClick={onNavigate} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
