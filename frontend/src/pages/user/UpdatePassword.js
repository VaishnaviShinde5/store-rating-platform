import React, { useState } from 'react';
import api from '../../api/axios';
import { Lock, Eye, EyeOff } from 'lucide-react';

const validate = (pw) => {
  if (pw.length < 8 || pw.length > 16) return '8–16 characters required';
  if (!/[A-Z]/.test(pw)) return 'Must include at least one uppercase letter';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) return 'Must include at least one special character';
  return '';
};

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(password);
    if (err) { setError(err); return; }
    setError(''); setLoading(true);
    try {
      await api.put('/auth/update-password', { newPassword: password });
      setSuccess('Password updated successfully!');
      setPassword('');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally { setLoading(false); }
  };

  return (
    <div className="pt-16 min-h-screen p-8 max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Update Password</h2>
        <p className="text-slate-400 text-sm mt-1">Keep your account secure</p>
      </div>
      <div className="card">
        <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <Lock size={16} className="text-indigo-400" />
          <p className="text-indigo-300 text-sm">Must be 8–16 chars with at least one uppercase letter and one special character.</p>
        </div>
        {success && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 mb-4 text-sm">{success}</div>}
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">New Password</label>
            <div className="relative">
              <input className="input-field pr-10" type={show ? 'text' : 'password'}
                placeholder="Enter new password" value={password}
                onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
