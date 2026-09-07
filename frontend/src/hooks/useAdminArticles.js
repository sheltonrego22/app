import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { logError } from '@/utils/logger';

const API = process.env.REACT_APP_BACKEND_URL;
const AUTH = { withCredentials: true };

export const EMPTY_FORM = { title: '', title_ar: '', body: '', body_ar: '', category: '', image_url: '', video_url: '', pdf_url: '', featured: false, published: true };

function describeApiError(err) {
  const detail = err.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((e) => `${e.loc?.slice(-1)[0] || 'field'}: ${String(e.msg).replace(/^Value error, /, '')}`).join(' ');
  }
  return typeof detail === 'string' ? detail : '';
}

const articleToForm = (a) => ({
  title: a.title, title_ar: a.title_ar || '', body: a.body || '', body_ar: a.body_ar || '', category: a.category,
  image_url: a.image_url || '', video_url: a.video_url || '', pdf_url: a.pdf_url || '',
  featured: a.featured || false, published: a.published !== false,
});

export function useArticleList(user, setError) {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const fetchArticles = useCallback(async () => {
    try {
      const params = {};
      if (filterCat !== 'All') params.category = filterCat;
      if (searchQuery) params.search = searchQuery;
      const { data } = await axios.get(`${API}/api/articles`, { params, ...AUTH });
      setArticles(data.articles);
      setTotal(data.total);
    } catch (err) {
      logError('Articles', err);
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  }, [filterCat, searchQuery, setError]);

  useEffect(() => { if (user) fetchArticles(); }, [user, fetchArticles]);

  return { articles, total, loading, searchQuery, setSearchQuery, filterCat, setFilterCat, fetchArticles };
}

export function useArticleEditor(setError, refresh) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const resetForm = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(false); };
  const openNew = () => { resetForm(); setShowForm(true); };
  const edit = (article) => { setForm(articleToForm(article)); setEditing(article.id); setShowForm(true); window.scrollTo(0, 0); };

  const save = async () => {
    if (!form.title.trim() || !form.category) return;
    try {
      if (editing) await axios.put(`${API}/api/articles/${editing}`, form, AUTH);
      else await axios.post(`${API}/api/articles`, form, AUTH);
      resetForm();
      refresh();
    } catch (err) {
      logError('Save', err);
      const reason = describeApiError(err);
      setError(`${editing ? 'Failed to update article.' : 'Failed to create article.'}${reason ? ` ${reason}` : ''}`);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await axios.delete(`${API}/api/articles/${id}`, AUTH);
      refresh();
    } catch (err) {
      logError('Delete', err);
      setError('Failed to delete article.');
    }
  };

  const upload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await axios.post(`${API}/api/upload`, fd, { ...AUTH, headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((p) => ({ ...p, [field]: `${API}${data.url}` }));
    } catch (err) {
      logError('Upload', err);
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return { editing, showForm, uploading, form, setForm, openNew, resetForm, save, remove, edit, upload };
}

export function useAdminArticles(user, setError) {
  const list = useArticleList(user, setError);
  const editor = useArticleEditor(setError, list.fetchArticles);
  return { ...list, ...editor };
}
