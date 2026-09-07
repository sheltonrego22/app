import { Inbox, CalendarCheck, FileText, Phone, Mail, MessageCircle, MapPin, Download, Linkedin, Briefcase } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

export const CONTACT_STATUSES = ['new', 'contacted', 'closed'];
export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const STATUS_STYLES = {
  new: 'bg-[#EE5A01]/15 text-[#EE5A01]', pending: 'bg-[#EE5A01]/15 text-[#EE5A01]',
  contacted: 'bg-blue-500/15 text-blue-400', confirmed: 'bg-blue-500/15 text-blue-400',
  closed: 'bg-[#333] text-[#999]', completed: 'bg-green-500/15 text-green-400', cancelled: 'bg-red-500/15 text-red-400',
};

const fmtDate = (iso) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const fmtDay = (d) => (isNaN(new Date(d)) ? d : new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
const waLink = (phone) => `https://wa.me/${String(phone).replace(/\D/g, '')}`;

export function AdminTabs({ tab, setTab, counts }) {
  const tabs = [
    { id: 'articles', label: 'Articles', Icon: FileText },
    { id: 'contacts', label: 'Enquiries', Icon: Inbox },
    { id: 'bookings', label: 'Bookings', Icon: CalendarCheck },
  ];
  return (
    <div data-testid="admin-tabs" className="flex gap-1 mb-6 border-b border-[#222]">
      {tabs.map(({ id, label, Icon }) => (
        <button key={id} data-testid={`admin-tab-${id}`} onClick={() => setTab(id)}
          className={`flex items-center gap-2 px-4 py-3 font-heading text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${tab === id ? 'border-[#EE5A01] text-[#EE5A01]' : 'border-transparent text-[#666] hover:text-[#EEEDE7]'}`}>
          <Icon className="w-4 h-4" /> {label}
          {counts[id] > 0 && <span className={`font-mono text-[10px] px-1.5 py-0.5 ${tab === id ? 'bg-[#EE5A01] text-black' : 'bg-[#222] text-[#999]'}`}>{counts[id]}</span>}
        </button>
      ))}
    </div>
  );
}

export function StatusSelect({ value, options, onChange, testId }) {
  return (
    <select data-testid={testId} value={value} onChange={(e) => onChange(e.target.value)}
      className={`font-heading text-[10px] uppercase tracking-wider px-2 py-1.5 border border-[#333] bg-black cursor-pointer focus:border-[#EE5A01] focus:outline-none ${STATUS_STYLES[value] || 'text-[#EEEDE7]'}`}>
      {options.map((s) => <option key={s} value={s} className="bg-[#111] text-[#EEEDE7]">{s}</option>)}
    </select>
  );
}

function QuickActions({ phone, email, subject }) {
  return (
    <div className="flex items-center gap-1">
      <a href={`tel:${phone}`} title="Call" className="p-2 text-[#666] hover:text-[#EE5A01] transition-colors"><Phone className="w-4 h-4" /></a>
      <a href={waLink(phone)} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2 text-[#666] hover:text-[#25D366] transition-colors"><MessageCircle className="w-4 h-4" /></a>
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`} title="Email" className="p-2 text-[#666] hover:text-[#EE5A01] transition-colors"><Mail className="w-4 h-4" /></a>
    </div>
  );
}

function EmptyState({ Icon, text }) {
  return (
    <div className="text-center py-16 bg-[#111] border border-[#222]">
      <Icon className="w-10 h-10 text-[#333] mx-auto mb-3" />
      <p className="font-heading text-sm text-[#666]">{text}</p>
    </div>
  );
}

function ApplicationExtras({ contact }) {
  if (!contact.attachment_url) return null;
  return (
    <div data-testid={`admin-application-${contact.id}`} className="flex flex-wrap items-center gap-2 mt-3">
      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-[#EE5A01]/15 text-[#EE5A01]"><Briefcase className="w-3 h-3" /> Job application{contact.role ? ` · ${contact.role}` : ''}</span>
      <a href={`${API}${contact.attachment_url}`} data-testid={`download-cv-${contact.id}`} className="inline-flex items-center gap-1 font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 bg-[#EE5A01] text-black hover:bg-[#F17B34] transition-colors">
        <Download className="w-3 h-3" /> Download CV
      </a>
      {contact.linkedin_url && (
        <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" data-testid={`applicant-linkedin-${contact.id}`} className="inline-flex items-center gap-1 font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 border border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors">
          <Linkedin className="w-3 h-3" /> LinkedIn profile
        </a>
      )}
    </div>
  );
}

export function ContactsTable({ contacts, loading, onStatus }) {
  if (loading) return <div className="text-center py-16"><p className="font-body text-[#666]">Loading enquiries...</p></div>;
  if (contacts.length === 0) return <EmptyState Icon={Inbox} text="No enquiries yet" />;
  return (
    <div className="space-y-2">
      {contacts.map((c) => (
        <div key={c.id} data-testid={`admin-contact-${c.id}`} className="bg-[#111] border border-[#222] p-4 hover:border-[#EE5A01]/30 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{c.full_name}</h3>
                {c.company && <span className="font-body text-xs text-[#999]">· {c.company}</span>}
                <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">{c.enquiry_type}</span>
              </div>
              <p className="font-body text-xs text-[#666] mb-2">{c.email} · {c.phone} · {fmtDate(c.created_at)}</p>
              <p className="font-body text-sm text-[#999] leading-relaxed whitespace-pre-line">{c.message}</p>
              <ApplicationExtras contact={c} />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <QuickActions phone={c.phone} email={c.email} subject={`Re: your ${c.enquiry_type} enquiry to Eurogulf Mobility Group`} />
              <StatusSelect testId={`contact-status-${c.id}`} value={c.status || 'new'} options={CONTACT_STATUSES} onChange={(s) => onStatus(c.id, s)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BookingsTable({ bookings, loading, onStatus }) {
  if (loading) return <div className="text-center py-16"><p className="font-body text-[#666]">Loading bookings...</p></div>;
  if (bookings.length === 0) return <EmptyState Icon={CalendarCheck} text="No chauffeur bookings yet" />;
  return (
    <div className="space-y-2">
      {bookings.map((b) => (
        <div key={b.id} data-testid={`admin-booking-${b.id}`} className="bg-[#111] border border-[#222] p-4 hover:border-[#EE5A01]/30 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#EE5A01] tracking-wider">{b.reference}</span>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{b.name}</h3>
                <span className="font-body text-xs text-[#999]">· {b.vehicle} · {b.duration} · {b.passengers} pax</span>
              </div>
              <p className="font-body text-xs text-[#666] mb-2">{b.email} · {b.phone} · {fmtDay(b.date)} at {b.time} · AED {Number(b.price).toLocaleString()}</p>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 font-body text-xs text-[#999]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#EE5A01]" /> {b.pickup_location}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#666]" /> {b.dropoff_location}</span>
              </div>
              {b.notes && <p className="font-body text-xs text-[#666] mt-2 italic">{b.notes}</p>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <QuickActions phone={b.phone} email={b.email} subject={`Your chauffeur booking ${b.reference} with Eurogulf Mobility Group`} />
              <StatusSelect testId={`booking-status-${b.id}`} value={b.status || 'pending'} options={BOOKING_STATUSES} onChange={(s) => onStatus(b.id, s)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
