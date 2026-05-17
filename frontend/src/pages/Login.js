import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Star, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      const role = data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'store_owner') navigate('/owner');
      else navigate('/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star size={28} className="text-white" fill="white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">RateStore</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="card">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email</label>
              <input className="input-field" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input className="input-field pr-10" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="text-center text-slate-500 text-sm mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
