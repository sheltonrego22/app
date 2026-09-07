import { useState } from 'react';
import axios from 'axios';
import { logError } from '@/utils/logger';
import { submitErrorMessage } from '@/utils/submitError';

const API = process.env.REACT_APP_BACKEND_URL;
export const MAX_MB = 5;
const EMPTY = { full_name: '', email: '', phone: '', linkedin_url: '', message: '' };

const fileProblem = (file, copy) => {
  if (!/\.(pdf|docx?)$/i.test(file.name)) return copy.badType;
  if (file.size > MAX_MB * 1024 * 1024) return copy.tooBig;
  return '';
};

export function useApplyForm({ role, lang, copy }) {
  const [form, setForm] = useState(EMPTY);
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const pickFile = (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    setCv(null);
    const problem = f ? fileProblem(f, copy) : '';
    setError(problem);
    if (f && !problem) setCv(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!cv) return setError(copy.badType);
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries({ ...form, role, lang }).forEach(([k, v]) => fd.append(k, v));
      fd.append('cv', cv);
      await axios.post(`${API}/api/careers/apply`, fd);
      setDone(true);
    } catch (err) {
      logError('Apply', err);
      setError(submitErrorMessage(err, copy.failed, lang));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setForm(EMPTY); setCv(null); setError(''); setDone(false); };

  return { form, cv, error, submitting, done, set, pickFile, submit, reset };
}
