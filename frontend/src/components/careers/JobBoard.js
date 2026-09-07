import { useState } from 'react';
import { Briefcase, MapPin, ChevronDown, ChevronUp, Send, Linkedin, Search, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { jobs, departments, latestJobs, applyMailto, HQ, LINKEDIN_COMPANY_URL } from '@/data/jobs';
import { ApplyModal } from '@/components/careers/ApplyModal';

const COPY = {
  en: { all: "All", roles: (n) => `${n} open roles across the group`, search: "Search roles...", applyOnline: "Apply Online", apply: "Apply via Email", linkedin: "Follow on LinkedIn", none: "No openings match your search right now.", source: "Also listed on LinkedIn", email: "Applications: careers@eurogulf.ae", latestTitle: "Latest Openings", viewLinkedin: "View on LinkedIn", posted: "Posted" },
  ar: { all: "جميع الأقسام", roles: (n) => `${n} وظيفة شاغرة عبر المجموعة`, search: "ابحث عن وظيفة...", applyOnline: "تقدّم عبر الموقع", apply: "تقدّم عبر البريد الإلكتروني", linkedin: "تابعونا على لينكدإن", none: "لا توجد وظائف مطابقة لبحثك حالياً.", source: "معلن عنها أيضاً على لينكدإن", email: "طلبات التوظيف: careers@eurogulf.ae", latestTitle: "أحدث الوظائف", viewLinkedin: "عرض على لينكدإن", posted: "نُشرت" },
};

const formatDate = (iso, lang) => new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function LatestJobs({ lang, onApply }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const items = latestJobs.map((l) => ({ ...l, job: jobs.find((jb) => jb.id === l.id) })).filter((l) => l.job);

  return (
    <div data-testid={`${isAr ? 'ar-' : ''}latest-jobs`} className="bg-[#111111] border border-[#EE5A01]/30 p-5 mb-8">
      <h3 className="font-heading font-bold text-sm text-[#EEEDE7] flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-[#EE5A01]" /> {c.latestTitle}</h3>
      <div className="space-y-2">
        {items.map(({ id, posted, job }) => (
          <div key={id} data-testid={`latest-job-${id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black border border-white/5 p-4">
            <div>
              <p className="font-heading font-bold text-sm text-[#EEEDE7]">{job[lang].title}</p>
              <p className="font-body text-[10px] text-[#666] mt-1">{departments[job.dept][lang]} · {job.location ? job.location[lang] : HQ[lang]} · {c.posted} {formatDate(posted, lang)}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => onApply(job)} data-testid={`latest-apply-${id}`} className="inline-flex items-center gap-1 bg-[#EE5A01] text-black font-heading font-bold text-[10px] px-3 py-2 hover:bg-[#F17B34]"><FileText className="w-3 h-3" /> {c.applyOnline}</button>
              <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 border border-[#0A66C2]/50 text-[#0A66C2] font-heading font-bold text-[10px] px-3 py-2 hover:bg-[#0A66C2] hover:text-white transition-colors"><ExternalLink className="w-3 h-3" /> {c.viewLinkedin}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobCard({ job, lang, expanded, onToggle, onApply }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const j = job[lang];
  const location = job.location ? job.location[lang] : HQ[lang];
  return (
    <div data-testid={`job-${job.id}`} className="bg-[#111111] border border-white/5 hover:border-[#EE5A01]/20 transition-all">
      <button data-testid={`job-toggle-${job.id}`} className={`w-full flex items-center justify-between p-5 ${isAr ? 'text-right' : 'text-left'}`} onClick={onToggle} aria-expanded={expanded}>
        <div className="flex items-center gap-4">
          <Briefcase className="w-5 h-5 text-[#EE5A01] flex-shrink-0" />
          <div>
            <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{j.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className={`font-mono text-[10px] text-[#EE5A01] ${isAr ? '' : 'tracking-wider uppercase'}`}>{departments[job.dept][lang]}</span>
              <span className="flex items-center gap-1 text-[#666666]"><MapPin className="w-3 h-3" /><span className="font-body text-[10px]">{location}</span></span>
              {job.source === 'LinkedIn' && <span className="flex items-center gap-1 text-[#0A66C2]"><Linkedin className="w-3 h-3" /><span className="font-body text-[10px]">{c.source}</span></span>}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-[#EE5A01] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#666666] flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4">
          <p className="font-body text-sm text-[#999] leading-relaxed mb-4">{j.desc}</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onApply(job)} data-testid={`apply-online-${job.id}`} className={`inline-flex items-center gap-2 bg-[#EE5A01] text-black font-heading font-bold text-xs px-5 py-2.5 hover:bg-[#F17B34] transition-colors ${isAr ? '' : 'tracking-[0.05em]'}`}>
              <FileText className="w-3 h-3" /> {c.applyOnline}
            </button>
            <a href={applyMailto(job.en.title, lang)} data-testid={`apply-${job.id}`} className={`inline-flex items-center gap-2 border border-[#EE5A01]/40 text-[#EE5A01] font-heading font-bold text-xs px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-colors ${isAr ? '' : 'tracking-[0.05em]'}`}>
              <Send className="w-3 h-3" /> {c.apply}
            </a>
            <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 border border-white/10 text-[#EEEDE7] font-heading font-bold text-xs px-5 py-2.5 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors ${isAr ? '' : 'tracking-[0.05em]'}`}>
              <Linkedin className="w-3 h-3" /> {c.linkedin}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const matchesSearch = (job, lang, term) => !term || [job[lang].title, job.en.title].some((t) => t.toLowerCase().includes(term.toLowerCase()));

function JobSearch({ lang, value, onChange }) {
  const isAr = lang === 'ar';
  return (
    <div className="relative max-w-md mx-auto mb-6">
      <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]`} />
      <input data-testid={`${isAr ? 'ar-' : ''}job-search`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={COPY[lang].search}
        className={`w-full bg-[#111] border border-[#333] text-[#EEEDE7] placeholder:text-[#444] py-2.5 text-sm focus:border-[#EE5A01] focus:outline-none transition-colors ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
    </div>
  );
}

function DeptFilters({ lang, active, onSelect }) {
  const isAr = lang === 'ar';
  const entries = [['all', COPY[lang].all, jobs.length], ...Object.entries(departments).map(([k, v]) => [k, v[lang], jobs.filter((j) => j.dept === k).length])];
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {entries.map(([key, label, count]) => (
        <button key={key} data-testid={`dept-filter-${key}`} onClick={() => onSelect(key)}
          className={`font-heading font-bold text-xs px-4 py-2 transition-all ${isAr ? '' : 'tracking-[0.1em] uppercase'} ${active === key ? 'bg-[#EE5A01] text-black' : 'bg-[#111111] text-[#666666] border border-white/10 hover:border-[#EE5A01]/40 hover:text-[#EEEDE7]'}`}>
          {label} <span className="font-mono opacity-70">({count})</span>
        </button>
      ))}
    </div>
  );
}

export function JobBoard({ lang = 'en' }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const [activeDept, setActiveDept] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [applyJob, setApplyJob] = useState(null);

  const filtered = jobs.filter((j) => (activeDept === 'all' || j.dept === activeDept) && matchesSearch(j, lang, search));

  return (
    <div data-testid={`${isAr ? 'ar-' : ''}job-board`}>
      <p className="text-center font-body text-[#666666] mb-8">{c.roles(jobs.length)} · {c.email}</p>
      <LatestJobs lang={lang} onApply={setApplyJob} />
      <JobSearch lang={lang} value={search} onChange={setSearch} />
      <DeptFilters lang={lang} active={activeDept} onSelect={setActiveDept} />
      <div className="space-y-3">
        {filtered.map((job) => <JobCard key={job.id} job={job} lang={lang} expanded={expanded === job.id} onToggle={() => setExpanded(expanded === job.id ? null : job.id)} onApply={setApplyJob} />)}
      </div>
      {filtered.length === 0 && <p data-testid="jobs-empty" className="text-center font-body text-[#666666] py-12">{c.none}</p>}
      <ApplyModal open={applyJob !== null} onClose={() => setApplyJob(null)} role={applyJob?.en.title || ''} roleLabel={applyJob?.[lang].title} lang={lang} />
    </div>
  );
}
