import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Star } from 'lucide-react';

const validate = (form) => {
  const errs = {};
  if (form.name.length < 20 || form.name.length > 60) errs.name = 'Name must be 20–60 characters';
  if (form.address.length > 400) errs.address = 'Address must be max 400 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
  if (form.password.length < 8 || form.password.length > 16) errs.password = 'Password must be 8–16 characters';
  if (!/[A-Z]/.test(form.password)) errs.password = (errs.password ? errs.password + '; ' : '') + 'Must include uppercase letter';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) errs.password = (errs.password ? errs.password + '; ' : '') + 'Must include special character';
  return errs;
};

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError(''); setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="text-xs text-slate-400 font-medium mb-1.5 block">{label}</label>
      <input className="input-field" type={type} placeholder={placeholder}
        value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star size={28} className="text-white" fill="white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">Join RateStore today</p>
        </div>
        <div className="card space-y-4">
          {apiError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">{apiError}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {field('name', 'Full Name', 'text', 'Min 20, max 60 characters')}
            {field('email', 'Email', 'email', 'you@example.com')}
            {field('address', 'Address', 'text', 'Your full address')}
            {field('password', 'Password', 'password', '8-16 chars, uppercase + special')}
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
