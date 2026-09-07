import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, FileText } from 'lucide-react';
import { ArticleEditor, ArticlesTable, AdminFilters, CATEGORIES } from '@/components/admin/AdminComponents';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const EMPTY_FORM = { title: '', body: '', category: '', image_url: '', video_url: '', pdf_url: '', featured: false, published: true };

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/auth/me`, { withCredentials: true });
      setUser(data);
    } catch (_err) {
      navigate('/admin/login');
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchArticles = useCallback(async () => {
    try {
      const params = {};
      if (filterCat !== 'All') params.category = filterCat;
      if (searchQuery) params.search = searchQuery;
      const { data } = await axios.get(`${API}/api/articles`, { params, withCredentials: true });
      setArticles(data.articles);
      setTotal(data.total);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Articles:', err);
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  }, [filterCat, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { if (user) fetchArticles(); }, [user, fetchArticles]);

  const resetForm = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category) return;
    try {
      if (editing) {
        await axios.put(`${API}/api/articles/${editing}`, form, { withCredentials: true });
      } else {
        await axios.post(`${API}/api/articles`, form, { withCredentials: true });
      }
      resetForm();
      fetchArticles();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Save:', err);
      const detail = err.response?.data?.detail;
      const reason = Array.isArray(detail)
        ? detail.map((e) => `${e.loc?.slice(-1)[0] || 'field'}: ${String(e.msg).replace(/^Value error, /, '')}`).join(' ')
        : typeof detail === 'string' ? detail : '';
      setError(`${editing ? 'Failed to update article.' : 'Failed to create article.'}${reason ? ` ${reason}` : ''}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await axios.delete(`${API}/api/articles/${id}`, { withCredentials: true });
      fetchArticles();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Delete:', err);
      setError('Failed to delete article.');
    }
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title, body: article.body || '', category: article.category,
      image_url: article.image_url || '', video_url: article.video_url || '', pdf_url: article.pdf_url || '',
      featured: article.featured || false, published: article.published !== false,
    });
    setEditing(article.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await axios.post(`${API}/api/upload`, fd, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((p) => ({ ...p, [field]: `${API}${data.url}` }));
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('Upload:', err);
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-black pt-20">
      <div className="bg-[#111] border-b border-[#222] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EE5A01] flex items-center justify-center"><FileText className="w-4 h-4 text-black" /></div>
            <div>
              <h1 className="font-heading font-bold text-sm text-[#EEEDE7] uppercase tracking-wider">Media Center CMS</h1>
              <p className="font-body text-[10px] text-[#666]">{user.email} &middot; {total} articles</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button data-testid="btn-new-article" onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
              <Plus className="w-4 h-4" /> New Article
            </button>
            <button onClick={handleLogout} data-testid="btn-logout" className="text-[#666] hover:text-[#EE5A01] transition-colors p-2"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 mb-6 flex items-center justify-between">
            <p className="font-body text-sm text-red-400">{error}</p>
            <button onClick={() => setError('')} className="text-red-400 text-xs hover:underline">Dismiss</button>
          </div>
        )}
        {showForm && <ArticleEditor form={form} setForm={setForm} editing={editing} uploading={uploading} onSave={handleSave} onCancel={resetForm} onUpload={handleUpload} />}
        <AdminFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterCat={filterCat} setFilterCat={setFilterCat} />
        <ArticlesTable articles={articles} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
