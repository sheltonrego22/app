import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, ArrowRight, Search, Star, Video, FileDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import DOMPurify from 'dompurify';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = ["All", "Mobility News", "Traffic & Authority Updates", "Road & Travel Guides", "Fleet & Corporate Mobility", "Company Updates", "Press Releases", "Awards", "Fleet", "Sustainability"];

const categoryColors = {
  "Press Releases": "bg-[#EE5A01]/10 text-[#EE5A01]",
  "Mobility News": "bg-blue-500/10 text-blue-400",
  "Traffic & Authority Updates": "bg-rose-500/10 text-rose-400",
  "Road & Travel Guides": "bg-cyan-500/10 text-cyan-400",
  "Fleet & Corporate Mobility": "bg-teal-500/10 text-teal-400",
  "Industry News": "bg-blue-500/10 text-blue-400",
  "Company Updates": "bg-purple-500/10 text-purple-400",
  Awards: "bg-amber-500/10 text-amber-400",
  Fleet: "bg-green-500/10 text-green-400",
  Sustainability: "bg-emerald-500/10 text-emerald-400",
};

export default function MediaCenterPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [filter, setFilter] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => { document.title = filter !== "All" ? `${filter} | Eurogulf Mobility Insights` : "Insights & News | Eurogulf Mobility"; }, [filter]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== filter) setFilter(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = { limit: 50 };
        if (filter !== "All") params.category = filter;
        if (searchQuery) params.search = searchQuery;
        const { data } = await axios.get(`${API}/articles`, { params });
        setArticles(data.articles.filter((a) => a.published !== false));
        setTotal(data.total);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') console.error('Articles:', err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchArticles, 300);
    return () => clearTimeout(debounce);
  }, [filter, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div data-testid="media-center-page">
      {/* HERO */}
      <section data-testid="media-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">News & Insights</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Media Center
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The latest from Eurogulf Mobility Group: press releases, industry insights, fleet updates, and awards.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-[#0a0a0a] border-b border-white/5 py-5 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
              <input
                data-testid="media-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#111] border border-[#333] text-[#EEEDE7] placeholder:text-[#444] px-4 py-2.5 pl-10 text-sm font-body focus:border-[#EE5A01] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  data-testid={`filter-${c.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setFilter(c)}
                  className={`font-heading text-[10px] sm:text-xs tracking-[0.1em] uppercase px-3 py-1.5 transition-colors ${
                    filter === c
                      ? 'bg-[#EE5A01] text-black'
                      : 'text-[#666666] hover:text-[#EEEDE7] border border-[#333] bg-transparent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredArticles.length > 0 && (
        <section className="bg-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4 text-[#EE5A01] fill-[#EE5A01]" />
              <span className="font-heading text-xs text-[#EE5A01] uppercase tracking-wider">Featured</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredArticles.map((a) => (
                <ArticleCard key={a.id} article={a} expanded={expandedId === a.id} onToggle={() => setExpandedId(expandedId === a.id ? null : a.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section data-testid="articles-grid" className="bg-[#0a0a0a] py-12 sm:py-16">
        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-[#EE5A01] border-t-transparent animate-spin mx-auto mb-4" />
              <p className="font-body text-sm text-[#666]">Loading articles...</p>
            </div>
          ) : regularArticles.length === 0 && featuredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-heading text-lg text-[#666]">No articles found</p>
              <p className="font-body text-sm text-[#444] mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <p className="font-mono text-xs text-[#666] tracking-wider mb-6">{total} ARTICLE{total !== 1 ? 'S' : ''}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {regularArticles.map((a, i) => (
                  <div key={a.id} className={gridVisible ? 'scroll-visible' : 'scroll-hidden'} style={{ transitionDelay: `${(i % 6) * 0.1}s` }}>
                    <ArticleCard article={a} expanded={expandedId === a.id} onToggle={() => setExpandedId(expandedId === a.id ? null : a.id)} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function ArticleCard({ article, expanded, onToggle }) {
  const a = article;
  const dateStr = new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div
      data-testid={`article-card-${a.id}`}
      className="bg-[#111] border border-white/5 hover:border-[#EE5A01]/30 transition-all group cursor-pointer"
      onClick={onToggle}
    >
      {a.image_url && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-mono text-[10px] tracking-wider px-2 py-0.5 uppercase ${categoryColors[a.category] || 'bg-[#EE5A01]/10 text-[#EE5A01]'}`}>
            {a.category}
          </span>
          {a.featured && <Star className="w-3 h-3 text-[#EE5A01] fill-[#EE5A01]" />}
          {a.video_url && <Video className="w-3 h-3 text-[#666]" />}
        </div>
        <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2 leading-snug group-hover:text-[#EE5A01] transition-colors">
          {a.title}
        </h3>
        <div className="flex items-center gap-2 text-[#666]">
          <Calendar className="w-3 h-3" />
          <span className="font-body text-xs">{dateStr}</span>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#222]">
            {a.body && (() => {
              const sanitizedHtml = { __html: DOMPurify.sanitize(a.body) };
              return <div className="font-body text-sm text-[#999] leading-relaxed article-body" dangerouslySetInnerHTML={sanitizedHtml} />;
            })()}
            {a.video_url && (
              <div className="mt-4 aspect-video">
                <iframe src={a.video_url} title={a.title} className="w-full h-full border border-[#333]" allowFullScreen loading="lazy" />
              </div>
            )}
            {a.pdf_url && (
              <a href={a.pdf_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-[#EE5A01] font-heading text-xs uppercase tracking-wider hover:underline">
                <FileDown className="w-4 h-4" /> Download PDF
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
