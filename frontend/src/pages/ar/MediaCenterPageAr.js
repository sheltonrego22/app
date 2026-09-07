import { useEffect, useState } from 'react';
import { Search, Star } from 'lucide-react';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { ArticleCard } from '@/pages/MediaCenterPage';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = [
  { key: "All", label: "الكل" },
  { key: "Mobility News", label: "أخبار التنقل" },
  { key: "Traffic & Authority Updates", label: "تحديثات المرور والهيئات" },
  { key: "Road & Travel Guides", label: "أدلة الطرق والسفر" },
  { key: "Fleet & Corporate Mobility", label: "الأساطيل وتنقل الشركات" },
  { key: "Company Updates", label: "أخبار المجموعة" },
  { key: "Press Releases", label: "بيانات صحفية" },
  { key: "Awards", label: "الجوائز" },
  { key: "Fleet", label: "الأسطول" },
  { key: "Sustainability", label: "الاستدامة" },
];

export default function MediaCenterPageAr() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { document.title = "المركز الإعلامي | الأخبار والرؤى | مجموعة يوروجلف للتنقل"; }, []);

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
        logError('Articles', err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchArticles, 300);
    return () => clearTimeout(debounce);
  }, [filter, searchQuery]);

  const featured = articles.filter((a) => a.featured);
  const regular = articles.filter((a) => !a.featured);
  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div dir="rtl" data-testid="media-center-page-ar" className="font-body">
      <section data-testid="ar-media-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs text-[#EE5A01] mb-4 block">الأخبار والرؤى</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">المركز الإعلامي</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">آخر أخبار مجموعة يوروجلف للتنقل: البيانات الصحفية، ورؤى القطاع، وتحديثات الأسطول، والجوائز.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-b border-white/5 py-5 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
              <input
                data-testid="ar-media-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="w-full bg-[#111] border border-[#333] text-[#EEEDE7] placeholder:text-[#444] px-4 py-2.5 pr-10 text-sm focus:border-[#EE5A01] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  data-testid={`ar-filter-${c.key.toLowerCase().replace(/[\s&]+/g, '-')}`}
                  onClick={() => setFilter(c.key)}
                  className={`font-heading text-xs px-3 py-1.5 transition-colors ${filter === c.key ? 'bg-[#EE5A01] text-black' : 'text-[#666666] hover:text-[#EEEDE7] border border-[#333] bg-transparent'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4 text-[#EE5A01] fill-[#EE5A01]" />
              <span className="font-heading text-xs text-[#EE5A01]">مقالات مميزة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((a) => <ArticleCard key={a.id} article={a} ar expanded={expandedId === a.id} onToggle={() => toggle(a.id)} />)}
            </div>
          </div>
        </section>
      )}

      <section data-testid="ar-articles-grid" className="bg-[#0a0a0a] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-[#EE5A01] border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#666]">جارٍ تحميل المقالات...</p>
            </div>
          ) : regular.length === 0 && featured.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-heading text-lg text-[#666]">لا توجد مقالات</p>
              <p className="text-sm text-[#444] mt-2">جرّب تعديل البحث أو الفلاتر.</p>
            </div>
          ) : (
            <>
              <p className="font-mono text-xs text-[#666] mb-6">{total} مقالة</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {regular.map((a) => <ArticleCard key={a.id} article={a} ar expanded={expandedId === a.id} onToggle={() => toggle(a.id)} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
