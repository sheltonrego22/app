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
  if (typeof detail === 'string') return detail;
  return '';
}

export function useAdminArticles(user, setError) {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

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

  const resetForm = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(false); };
  const openNew = () => { resetForm(); setShowForm(true); };

  const save = async () => {
    if (!form.title.trim() || !form.category) return;
    try {
      if (editing) await axios.put(`${API}/api/articles/${editing}`, form, AUTH);
      else await axios.post(`${API}/api/articles`, form, AUTH);
      resetForm();
      fetchArticles();
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
      fetchArticles();
    } catch (err) {
      logError('Delete', err);
      setError('Failed to delete article.');
    }
  };

  const edit = (article) => {
    setForm({
      title: article.title, title_ar: article.title_ar || '', body: article.body || '', body_ar: article.body_ar || '', category: article.category,
      image_url: article.image_url || '', video_url: article.video_url || '', pdf_url: article.pdf_url || '',
      featured: article.featured || false, published: article.published !== false,
    });
    setEditing(article.id);
    setShowForm(true);
    window.scrollTo(0, 0);
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

  return {
    articles, total, loading, editing, searchQuery, setSearchQuery, filterCat, setFilterCat,
    showForm, uploading, form, setForm, openNew, resetForm, save, remove, edit, upload,
  };
}
