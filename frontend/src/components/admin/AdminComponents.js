import { Plus, Edit2, Trash2, Star, Eye, EyeOff, LogOut, Search, FileText, Image, Video, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CATEGORIES = ["Mobility News", "Traffic & Authority Updates", "Road & Travel Guides", "Fleet & Corporate Mobility", "Company Updates", "Press Releases", "Awards", "Fleet", "Sustainability"];

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

export function ArticleEditor({ form, setForm, editing, uploading, onSave, onCancel, onUpload }) {
  return (
    <div data-testid="article-form" className="bg-[#111] border border-[#222] p-6 mb-8">
      <h2 className="font-heading font-bold text-base text-[#EEEDE7] uppercase tracking-wider mb-6">
        {editing ? 'Edit Article' : 'New Article'}
      </h2>
      <div className="space-y-5">
        <div>
          <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Title *</Label>
          <Input data-testid="article-title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Article title" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-12" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Category *</Label>
            <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
              <SelectTrigger data-testid="article-category" className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-[#333]">
                {CATEGORIES.map((c) => <SelectItem key={c} value={c} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="accent-[#EE5A01]" />
              <span className="font-heading text-xs text-[#EEEDE7] uppercase tracking-wider">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} className="accent-[#EE5A01]" />
              <span className="font-heading text-xs text-[#EEEDE7] uppercase tracking-wider">Published</span>
            </label>
          </div>
        </div>
        <div>
          <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Body (Rich Text)</Label>
          <div className="quill-dark">
            <ReactQuill theme="snow" value={form.body} onChange={(v) => setForm((p) => ({ ...p, body: v }))} modules={quillModules} placeholder="Write your article content..." />
          </div>
        </div>
        <div className="border border-[#EE5A01]/20 bg-[#EE5A01]/5 p-4 space-y-4">
          <p className="font-heading text-xs tracking-wider text-[#EE5A01] uppercase">Arabic Version (shown on /ar/media)</p>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Arabic Title</Label>
            <Input data-testid="article-title-ar" dir="rtl" value={form.title_ar || ''} onChange={(e) => setForm((p) => ({ ...p, title_ar: e.target.value }))}
              placeholder="عنوان المقالة بالعربية" className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-12 text-right" />
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Arabic Body (Rich Text)</Label>
            <div className="quill-dark quill-rtl" data-testid="article-body-ar" dir="rtl">
              <ReactQuill theme="snow" value={form.body_ar || ''} onChange={(v) => setForm((p) => ({ ...p, body_ar: v }))} modules={quillModules} placeholder="اكتب محتوى المقالة بالعربية..." />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block"><Image className="w-3 h-3 inline mr-1" /> Image</Label>
            <input type="file" accept="image/*" onChange={(e) => onUpload(e, 'image_url')} className="text-xs text-[#666] file:bg-[#EE5A01] file:text-black file:border-0 file:px-3 file:py-1.5 file:font-heading file:text-xs file:mr-3 file:cursor-pointer" />
            {form.image_url && <p className="text-[10px] text-[#EE5A01] mt-1 truncate">{form.image_url}</p>}
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block"><Video className="w-3 h-3 inline mr-1" /> Video URL</Label>
            <Input value={form.video_url} onChange={(e) => setForm((p) => ({ ...p, video_url: e.target.value }))} placeholder="https://youtube.com/embed/..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-xs" />
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block"><File className="w-3 h-3 inline mr-1" /> PDF</Label>
            <input type="file" accept=".pdf" onChange={(e) => onUpload(e, 'pdf_url')} className="text-xs text-[#666] file:bg-[#EE5A01] file:text-black file:border-0 file:px-3 file:py-1.5 file:font-heading file:text-xs file:mr-3 file:cursor-pointer" />
            {form.pdf_url && <p className="text-[10px] text-[#EE5A01] mt-1 truncate">{form.pdf_url}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={onSave} disabled={uploading} data-testid="btn-save-article" className="btn-primary text-xs py-2.5 px-6 disabled:opacity-50">
            {uploading && 'Uploading...'}
            {!uploading && editing && 'Update Article'}
            {!uploading && !editing && 'Publish Article'}
          </button>
          <button onClick={onCancel} className="btn-ghost text-xs py-2.5 px-6">Cancel</button>
        </div>
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
