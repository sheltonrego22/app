import { Image, Video, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const CATEGORIES = ["Mobility News", "Traffic & Authority Updates", "Road & Travel Guides", "Fleet & Corporate Mobility", "Company Updates", "Press Releases", "Awards", "Fleet", "Sustainability"];

const quillModules = {
  toolbar: [[{ header: [2, 3, false] }], ['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image'], ['clean']],
};

const labelCls = "font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block";
const inputCls = "bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-12";
const fileCls = "text-xs text-[#666] file:bg-[#EE5A01] file:text-black file:border-0 file:px-3 file:py-1.5 file:font-heading file:text-xs file:mr-3 file:cursor-pointer";

const setField = (setForm, key) => (value) => setForm((p) => ({ ...p, [key]: value }));

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-[#EE5A01]" />
      <span className="font-heading text-xs text-[#EEEDE7] uppercase tracking-wider">{label}</span>
    </label>
  );
}

export function ArticleMetaFields({ form, setForm }) {
  return (
    <>
      <div>
        <Label className={labelCls}>Title *</Label>
        <Input data-testid="article-title" value={form.title} onChange={(e) => setField(setForm, 'title')(e.target.value)} placeholder="Article title" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className={labelCls}>Category *</Label>
          <Select value={form.category} onValueChange={setField(setForm, 'category')}>
            <SelectTrigger data-testid="article-category" className="bg-black border-[#333] text-[#EEEDE7] rounded-none h-12"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent className="bg-[#111] border-[#333]">
              {CATEGORIES.map((c) => <SelectItem key={c} value={c} className="text-[#EEEDE7] focus:bg-[#EE5A01]/10 focus:text-[#EE5A01]">{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-4">
          <Toggle label="Featured" checked={form.featured} onChange={setField(setForm, 'featured')} />
          <Toggle label="Published" checked={form.published} onChange={setField(setForm, 'published')} />
        </div>
      </div>
      <div>
        <Label className={labelCls}>Body (Rich Text)</Label>
        <div className="quill-dark">
          <ReactQuill theme="snow" value={form.body} onChange={setField(setForm, 'body')} modules={quillModules} placeholder="Write your article content..." />
        </div>
      </div>
    </>
  );
}

export function ArticleArabicFields({ form, setForm }) {
  return (
    <div className="border border-[#EE5A01]/20 bg-[#EE5A01]/5 p-4 space-y-4">
      <p className="font-heading text-xs tracking-wider text-[#EE5A01] uppercase">Arabic Version (shown on /ar/media)</p>
      <div>
        <Label className={labelCls}>Arabic Title</Label>
        <Input data-testid="article-title-ar" dir="rtl" value={form.title_ar || ''} onChange={(e) => setField(setForm, 'title_ar')(e.target.value)} placeholder="عنوان المقالة بالعربية" className={`${inputCls} text-right`} />
      </div>
      <div>
        <Label className={labelCls}>Arabic Body (Rich Text)</Label>
        <div className="quill-dark quill-rtl" data-testid="article-body-ar" dir="rtl">
          <ReactQuill theme="snow" value={form.body_ar || ''} onChange={setField(setForm, 'body_ar')} modules={quillModules} placeholder="اكتب محتوى المقالة بالعربية..." />
        </div>
      </div>
    </div>
  );
}

export function ArticleMediaFields({ form, setForm, onUpload }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <Label className={labelCls}><Image className="w-3 h-3 inline mr-1" /> Image</Label>
        <input type="file" accept="image/*" onChange={(e) => onUpload(e, 'image_url')} className={fileCls} />
        {form.image_url && <p className="text-[10px] text-[#EE5A01] mt-1 truncate">{form.image_url}</p>}
      </div>
      <div>
        <Label className={labelCls}><Video className="w-3 h-3 inline mr-1" /> Video URL</Label>
        <Input value={form.video_url} onChange={(e) => setField(setForm, 'video_url')(e.target.value)} placeholder="https://youtube.com/embed/..." className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-10 text-xs" />
      </div>
      <div>
        <Label className={labelCls}><File className="w-3 h-3 inline mr-1" /> PDF</Label>
        <input type="file" accept=".pdf" onChange={(e) => onUpload(e, 'pdf_url')} className={fileCls} />
        {form.pdf_url && <p className="text-[10px] text-[#EE5A01] mt-1 truncate">{form.pdf_url}</p>}
      </div>
    </div>
  );
}

const saveLabel = (uploading, editing) => {
  if (uploading) return 'Uploading...';
  return editing ? 'Update Article' : 'Publish Article';
};

export function ArticleEditorActions({ uploading, editing, onSave, onCancel }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button onClick={onSave} disabled={uploading} data-testid="btn-save-article" className="btn-primary text-xs py-2.5 px-6 disabled:opacity-50">{saveLabel(uploading, editing)}</button>
      <button onClick={onCancel} className="btn-ghost text-xs py-2.5 px-6">Cancel</button>
    </div>
  );
}
