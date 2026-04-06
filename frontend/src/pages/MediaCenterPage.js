import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SEO } from '@/components/SEO';

const articles = [
  { title: "Corporate Mobility Solutions in the UAE: How Businesses Optimize Transportation", date: "April 5, 2026", category: "Corporate" },
  { title: "Long-Term Vehicle Leasing for Corporate Mobility in the UAE", date: "April 5, 2026", category: "Leasing" },
  { title: "Luxury Chauffeur Services for Corporate Events", date: "April 5, 2026", category: "Chauffeur" },
  { title: "Fleet Vans vs Owned Vehicles for Delivery Businesses", date: "April 5, 2026", category: "Fleet" },
  { title: "Dubai Airport Car Rental on a Budget: What a 1-Week Traveler Should Know", date: "April 5, 2026", category: "Rental" },
  { title: "Short-Term Vs Long-Term Luxury Car Leasing: Which Fits for Expats?", date: "April 5, 2026", category: "Leasing" },
  { title: "Hidden Costs in Van Leasing Contracts in Dubai and How to Avoid Them", date: "April 5, 2026", category: "Leasing" },
  { title: "Fleet Vehicle Leasing in the UAE: How Businesses Reduce Costs", date: "April 5, 2026", category: "Fleet" },
  { title: "Why Buying Pre-Owned Vehicles in Dubai Is a Smart Decision", date: "April 5, 2026", category: "Used Cars" },
  { title: "Short Term Car Rentals in Dubai: Affordable & Flexible Options", date: "April 5, 2026", category: "Rental" },
  { title: "Why Van Leasing Is a Smart Choice for Businesses in Dubai", date: "April 5, 2026", category: "Leasing" },
  { title: "Affordable Car Rental in Dubai: How Goldcar Helps You Save More", date: "April 5, 2026", category: "Rental" },
  { title: "Royal Limousine Service in Dubai: Experience True Luxury on the Road", date: "April 5, 2026", category: "Chauffeur" },
  { title: "Luxury Chauffeur Service in Dubai: What Sets a Premium Experience Apart?", date: "April 5, 2026", category: "Chauffeur" },
  { title: "Monthly Car Rental vs Company Car: Which Saves More for UAE Businesses?", date: "April 5, 2026", category: "Rental" },
  { title: "Driving the Future: EGMG's Commitment to Green Mobility in the UAE", date: "April 5, 2026", category: "Sustainability" },
  { title: "Royal Limousine: Redefining Luxury Chauffeur Travel in Dubai", date: "April 5, 2026", category: "Chauffeur" },
  { title: "Truckline: Your Trusted Partner for Commercial Fleet Leasing in Dubai", date: "April 5, 2026", category: "Fleet" },
  { title: "How Eurogulf Mobility Group is Shaping the Future of Fleet Management", date: "April 5, 2026", category: "Corporate" },
  { title: "Why Long-Term Car Rental in Dubai is the Smart Choice for Expats", date: "April 5, 2026", category: "Rental" },
  { title: "The Future of Chauffeur and Corporate Transport in the UAE", date: "April 5, 2026", category: "Corporate" },
  { title: "How Fleet Leasing Services in UAE Are Helping SMEs Grow", date: "April 5, 2026", category: "Fleet" },
  { title: "The Ultimate Guide to Renting a Car with Europcar in Dubai", date: "April 5, 2026", category: "Rental" },
  { title: "Fleet Management Solutions in Dubai: Maximize Efficiency and Cut Costs", date: "April 5, 2026", category: "Fleet" },
];

const categories = ["All", "Corporate", "Rental", "Leasing", "Chauffeur", "Fleet", "Used Cars", "Sustainability"];

const categoryColors = {
  Corporate: "bg-[#EE5A01]/10 text-[#EE5A01]",
  Rental: "bg-blue-500/10 text-blue-400",
  Leasing: "bg-purple-500/10 text-purple-400",
  Chauffeur: "bg-amber-500/10 text-amber-400",
  Fleet: "bg-green-500/10 text-green-400",
  "Used Cars": "bg-cyan-500/10 text-cyan-400",
  Sustainability: "bg-emerald-500/10 text-emerald-400",
};

export default function MediaCenterPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Media Center — EGMG | News & Insights"; }, []);

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = filter === "All" || a.category === filter;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div data-testid="media-center-page">
      <SEO title="Media Center" description="News, press releases, and updates from Eurogulf Mobility Group — staying connected with the latest from the UAE's leading mobility conglomerate." path="/media" />
      {/* ═══ HERO ═══ */}
      <section data-testid="media-hero" className="bg-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-4 animate-fade-in">News & Insights</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-6 animate-fade-in-up">
            Media Center
          </h1>
          <p className="font-body text-base text-[#666666] max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Stay updated with the latest news, insights, and thought leadership from Eurogulf Mobility Group.
          </p>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="bg-[#0a0a0a] border-b border-white/5 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filters */}
            <div className="flex gap-1 overflow-x-auto min-w-0 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  data-testid={`media-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setFilter(cat)}
                  className={`font-heading font-bold text-xs tracking-[0.05em] px-4 py-2 transition-all flex-shrink-0 ${
                    filter === cat
                      ? 'bg-[#EE5A01] text-black'
                      : 'text-[#666666] hover:text-[#EEEDE7]'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                data-testid="media-search-input"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-[#333] text-[#EEEDE7] text-sm font-body pl-10 pr-4 py-2.5 placeholder:text-[#444] focus:border-[#EE5A01] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLE ═══ */}
      {filter === "All" && !searchQuery && (
        <section data-testid="featured-article" className="bg-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#111111] border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-[#EE5A01]/20 via-[#0a0a0a] to-black flex items-center justify-center">
                <span className="font-heading font-black text-6xl text-[#EE5A01]/20">EGMG</span>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#EE5A01] uppercase mb-3">Featured</span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#EEEDE7] mb-4 leading-tight">
                  {articles[0].title}
                </h2>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-3 h-3 text-[#666666]" />
                  <span className="font-mono text-xs text-[#666666]">{articles[0].date}</span>
                  <span className={`font-mono text-[10px] tracking-wider px-2 py-0.5 ${categoryColors[articles[0].category]}`}>
                    {articles[0].category.toUpperCase()}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-[#EE5A01] text-sm font-heading font-bold cursor-pointer hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ARTICLES GRID ═══ */}
      <section data-testid="articles-grid" className="bg-[#0a0a0a] py-16 sm:py-20">
        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="font-body text-sm text-[#666666]">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </p>
          </div>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading text-xl text-[#666666]">No articles found</p>
              <p className="font-body text-sm text-[#444] mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article, i) => (
                <article
                  key={i}
                  data-testid={`article-card-${i}`}
                  className={`bg-[#111111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/20 transition-all duration-300 ${gridVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
                >
                  {/* Gradient Header */}
                  <div className="h-40 bg-gradient-to-br from-[#EE5A01]/10 via-[#111111] to-[#0a0a0a] flex items-end p-5 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <span className={`font-mono text-[10px] tracking-wider px-2 py-0.5 ${categoryColors[article.category] || 'bg-[#EE5A01]/10 text-[#EE5A01]'}`}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-heading font-black text-5xl text-white/[0.03] absolute bottom-2 left-4">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3 h-3 text-[#666666]" />
                      <span className="font-mono text-[10px] text-[#666666]">{article.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-4 leading-snug line-clamp-3 group-hover:text-[#EE5A01] transition-colors">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[#EE5A01] text-xs font-heading font-bold cursor-pointer group-hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
