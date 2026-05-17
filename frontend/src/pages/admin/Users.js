import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import SortableTable from '../../components/SortableTable';
import { Search, UserPlus, X } from 'lucide-react';

const ROLE_BADGE = {
  admin: 'bg-indigo-500/20 text-indigo-300',
  user: 'bg-emerald-500/20 text-emerald-300',
  store_owner: 'bg-amber-500/20 text-amber-300',
};

const validate = (form) => {
  const e = {};
  if (form.name.length < 20 || form.name.length > 60) e.name = 'Name: 20–60 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
  if (form.address.length > 400 || !form.address) e.address = 'Address required (max 400)';
  if (form.password.length < 8 || form.password.length > 16) e.password = '8–16 chars required';
  return e;
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    const { data } = await api.get('/users', { params });
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, [filters]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError('');
    try {
      await api.post('/users', form);
      setSuccess('User created!'); setShowModal(false);
      setForm({ name: '', email: '', address: '', password: '', role: 'user' });
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setApiError(err.response?.data?.message || 'Failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address', render: (v) => <span className="truncate max-w-[200px] block">{v}</span> },
    { key: 'role', label: 'Role', render: (v) => <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_BADGE[v]}`}>{v.replace('_', ' ')}</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Users</h2>
          <p className="text-slate-400 text-sm mt-1">{users.length} total</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowModal(true)}>
          <UserPlus size={15} /> Add User
        </button>
      </div>

      {success && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 mb-4 text-sm">{success}</div>}

      <div className="card mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['name', 'email', 'address'].map(k => (
            <div key={k} className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input className="input-field pl-8" placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                value={filters[k]} onChange={e => setFilters({ ...filters, [k]: e.target.value })} />
            </div>
          ))}
          <select className="input-field" value={filters.role} onChange={e => setFilters({ ...filters, role: e.target.value })}>
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
          </select>
        </div>
      </div>

      <SortableTable columns={columns} data={users} emptyText="No users found" />

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-white">Add New User</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>
            {apiError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">{apiError}</div>}
            <form onSubmit={handleCreate} className="space-y-3">
              {[['name', 'Name (20-60 chars)'], ['email', 'Email'], ['address', 'Address'], ['password', 'Password']].map(([k, l]) => (
                <div key={k}>
                  <label className="text-xs text-slate-400 mb-1 block">{l}</label>
                  <input className="input-field" type={k === 'password' ? 'password' : 'text'} value={form[k]}
                    onChange={e => setForm({ ...form, [k]: e.target.value })} />
                  {errors[k] && <p className="text-red-400 text-xs mt-1">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Role</label>
                <select className="input-field" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="user">Normal User</option>
                  <option value="admin">Admin</option>
                  <option value="store_owner">Store Owner</option>
                </select>
              </div>
              <button className="btn-primary w-full mt-2">Create User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
