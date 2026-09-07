import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, FileText } from 'lucide-react';
import axios from 'axios';
import { ArticleEditor, ArticlesTable, AdminFilters } from '@/components/admin/AdminComponents';
import { AdminTabs, ContactsTable, BookingsTable } from '@/components/admin/InboxComponents';
import { AlertsBanner, ErrorBanner } from '@/components/admin/AdminBanners';
import { useAdminArticles } from '@/hooks/useAdminArticles';
import { useAdminInbox } from '@/hooks/useAdminInbox';
import { logError } from '@/utils/logger';

const API = process.env.REACT_APP_BACKEND_URL;
const TAB_TITLES = { articles: 'Media Center CMS', contacts: 'Enquiries Inbox', bookings: 'Chauffeur Bookings' };

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('articles');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const a = useAdminArticles(user, setError);
  const inbox = useAdminInbox(user, setError);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/auth/me`, { withCredentials: true });
      setUser(data);
    } catch (err) {
      logError('Auth', err);
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const handleLogout = async () => {
    await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    navigate('/admin/login');
  };

  if (!user) return null;

  const counts = { articles: a.total, contacts: inbox.openContacts, bookings: inbox.openBookings };

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-black pt-20">
      <div className="bg-[#111] border-b border-[#222] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EE5A01] flex items-center justify-center"><FileText className="w-4 h-4 text-black" /></div>
            <div>
              <h1 className="font-heading font-bold text-sm text-[#EEEDE7] uppercase tracking-wider">{TAB_TITLES[tab]}</h1>
              <p className="font-body text-[10px] text-[#666]">{user.email} &middot; {a.total} articles &middot; {inbox.contacts.length} enquiries &middot; {inbox.bookings.length} bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {tab === 'articles' && (
              <button data-testid="btn-new-article" onClick={a.openNew} className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
                <Plus className="w-4 h-4" /> New Article
              </button>
            )}
            <button onClick={handleLogout} data-testid="btn-logout" className="text-[#666] hover:text-[#EE5A01] transition-colors p-2"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorBanner error={error} onDismiss={() => setError('')} />
        <AdminTabs tab={tab} setTab={setTab} counts={counts} />
        {tab !== 'articles' && <AlertsBanner alerts={inbox.alerts} />}
        {tab === 'articles' && (
          <>
            {a.showForm && <ArticleEditor form={a.form} setForm={a.setForm} editing={a.editing} uploading={a.uploading} onSave={a.save} onCancel={a.resetForm} onUpload={a.upload} />}
            <AdminFilters searchQuery={a.searchQuery} setSearchQuery={a.setSearchQuery} filterCat={a.filterCat} setFilterCat={a.setFilterCat} />
            <ArticlesTable articles={a.articles} loading={a.loading} onEdit={a.edit} onDelete={a.remove} />
          </>
        )}
        {tab === 'contacts' && <ContactsTable contacts={inbox.contacts} loading={inbox.loading} onStatus={(id, s) => inbox.updateStatus('contacts', id, s)} />}
        {tab === 'bookings' && <BookingsTable bookings={inbox.bookings} loading={inbox.loading} onStatus={(id, s) => inbox.updateStatus('bookings', id, s)} />}
      </div>
    </div>
  );
}
