import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/login`, { email, password }, { withCredentials: true });
      navigate('/admin');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-black" />
          </div>
          <h1 className="font-heading font-black text-2xl text-[#EEEDE7] uppercase tracking-tight">Admin Access</h1>
          <p className="font-body text-xs text-[#666] mt-1">Eurogulf Mobility Group Media Center CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div data-testid="login-error" className="bg-red-500/10 border border-red-500/30 p-3 text-center">
              <p className="font-body text-sm text-red-400">{error}</p>
            </div>
          )}
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
              <Input
                data-testid="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@egmg.ae"
                className="bg-[#111] border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10"
                required
              />
            </div>
          </div>
          <div>
            <Label className="font-heading text-xs tracking-wider text-[#EEEDE7] uppercase mb-2 block">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE5A01]" />
              <Input
                data-testid="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-[#111] border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] focus:ring-[#EE5A01] rounded-none h-12 pl-10"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            data-testid="login-submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
