import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { logError } from '@/utils/logger';

const API = process.env.REACT_APP_BACKEND_URL;
const AUTH = { withCredentials: true };

export function useAdminInbox(user, setError) {
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);

  const fetchInbox = useCallback(async () => {
    setLoading(true);
    try {
      const [c, b] = await Promise.all([
        axios.get(`${API}/api/contacts`, { params: { limit: 500 }, ...AUTH }),
        axios.get(`${API}/api/bookings`, { params: { limit: 500 }, ...AUTH }),
      ]);
      setContacts(c.data);
      setBookings(b.data);
    } catch (err) {
      logError('Inbox', err);
      setError('Failed to load enquiries and bookings.');
    } finally {
      setLoading(false);
    }
  }, [setError]);

  useEffect(() => { if (user) fetchInbox(); }, [user, fetchInbox]);

  useEffect(() => {
    if (!user) return;
    axios.get(`${API}/api/admin/alerts-status`, AUTH)
      .then(({ data }) => setAlerts(data))
      .catch((err) => logError('AlertsStatus', err));
  }, [user]);

  const updateStatus = async (kind, id, status) => {
    const setList = kind === 'contacts' ? setContacts : setBookings;
    try {
      await axios.patch(`${API}/api/${kind}/${id}/status`, { status }, AUTH);
      setList((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    } catch (err) {
      logError('Status', err);
      setError('Failed to update status.');
    }
  };

  const openContacts = contacts.filter((c) => (c.status || 'new') === 'new').length;
  const openBookings = bookings.filter((b) => (b.status || 'pending') === 'pending').length;

  return { contacts, bookings, loading, alerts, updateStatus, openContacts, openBookings };
}
