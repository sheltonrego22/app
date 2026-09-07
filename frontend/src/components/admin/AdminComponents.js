import { Edit2, Trash2, Star, Search, FileText, Video, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES, ArticleMetaFields, ArticleArabicFields, ArticleMediaFields, ArticleEditorActions } from '@/components/admin/ArticleEditorFields';

export function ArticleEditor({ form, setForm, editing, uploading, onSave, onCancel, onUpload }) {
  return (
    <div data-testid="article-form" className="bg-[#111] border border-[#222] p-6 mb-8">
      <h2 className="font-heading font-bold text-base text-[#EEEDE7] uppercase tracking-wider mb-6">{editing ? 'Edit Article' : 'New Article'}</h2>
      <div className="space-y-5">
        <ArticleMetaFields form={form} setForm={setForm} />
        <ArticleArabicFields form={form} setForm={setForm} />
        <ArticleMediaFields form={form} setForm={setForm} onUpload={onUpload} />
        <ArticleEditorActions uploading={uploading} editing={editing} onSave={onSave} onCancel={onCancel} />
      </div>
    </div>
  );
}

export function ArticlesTable({ articles, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="text-center py-16"><p className="font-body text-[#666]">Loading articles...</p></div>;
  }
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 bg-[#111] border border-[#222]">
        <FileText className="w-10 h-10 text-[#333] mx-auto mb-3" />
        <p className="font-heading text-sm text-[#666]">No articles found</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {articles.map((a) => (
        <div key={a.id} data-testid={`admin-article-${a.id}`} className="bg-[#111] border border-[#222] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:border-[#EE5A01]/30 transition-colors">
          {a.image_url && <img src={a.image_url} alt="" className="w-16 h-12 object-cover flex-shrink-0 border border-[#333]" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {a.featured && <Star className="w-3 h-3 text-[#EE5A01] fill-[#EE5A01]" />}
              <h3 className="font-heading font-bold text-sm text-[#EEEDE7] truncate">{a.title}</h3>
              {a.title_ar && <span className="font-mono text-[10px] text-green-400 border border-green-500/30 px-1.5 py-0.5 flex-shrink-0">AR</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider">{a.category}</span>
              <span className="font-mono text-[10px] text-[#666]">{new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              {!a.published && <span className="font-mono text-[10px] text-yellow-500">DRAFT</span>}
              {a.video_url && <Video className="w-3 h-3 text-[#666]" />}
              {a.pdf_url && <File className="w-3 h-3 text-[#666]" />}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => onEdit(a)} className="p-2 text-[#666] hover:text-[#EE5A01] transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => onDelete(a.id)} className="p-2 text-[#666] hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminFilters({ searchQuery, setSearchQuery, filterCat, setFilterCat }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
        <Input data-testid="admin-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search articles..."
          className="bg-[#111] border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 pl-10 text-sm" />
      </div>
      <div className="flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setFilterCat(c)}
            className={`font-heading text-[10px] tracking-wider uppercase px-3 py-1.5 transition-colors ${filterCat === c ? 'bg-[#EE5A01] text-black' : 'bg-[#111] text-[#666] border border-[#333] hover:text-[#EEEDE7]'}`}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export { CATEGORIES };
