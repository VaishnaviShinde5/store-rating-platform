import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import SortableTable from '../../components/SortableTable';
import StarRating from '../../components/StarRating';
import { Search, Plus, X } from 'lucide-react';

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: '', address: '' });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStores = async () => {
    const params = Object.fromEntries(Object.entries(search).filter(([, v]) => v));
    const { data } = await api.get('/stores', { params });
    setStores(data);
  };

  useEffect(() => { fetchStores(); }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.length < 20 || form.name.length > 60) errs.name = 'Name: 20–60 chars';
    if (!form.email) errs.email = 'Required';
    if (!form.address || form.address.length > 400) errs.address = 'Address required (max 400)';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError('');
    try {
      const payload = { ...form };
      if (!payload.ownerId) delete payload.ownerId;
      else payload.ownerId = +payload.ownerId;
      await api.post('/stores', payload);
      setSuccess('Store created!'); setShowModal(false);
      setForm({ name: '', email: '', address: '', ownerId: '' });
      fetchStores();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setApiError(err.response?.data?.message || 'Failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address', render: v => <span className="truncate max-w-[200px] block">{v}</span> },
    { key: 'averageRating', label: 'Rating', render: v => (
      <div className="flex items-center gap-2">
        <StarRating value={Math.round(v)} readonly size={14} />
        <span className="text-slate-400 text-xs">{v || 0}</span>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Stores</h2>
          <p className="text-slate-400 text-sm mt-1">{stores.length} registered</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowModal(true)}>
          <Plus size={15} /> Add Store
        </button>
      </div>

      {success && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 mb-4 text-sm">{success}</div>}

      <div className="card mb-5">
        <div className="grid grid-cols-2 gap-3">
          {['name', 'address'].map(k => (
            <div key={k} className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input className="input-field pl-8" placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                value={search[k]} onChange={e => setSearch({ ...search, [k]: e.target.value })} />
            </div>
          ))}
        </div>
      </div>

      <SortableTable columns={columns} data={stores} emptyText="No stores found" />

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-white">Add New Store</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>
            {apiError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">{apiError}</div>}
            <form onSubmit={handleCreate} className="space-y-3">
              {[['name', 'Store Name (20-60 chars)'], ['email', 'Email'], ['address', 'Address']].map(([k, l]) => (
                <div key={k}>
                  <label className="text-xs text-slate-400 mb-1 block">{l}</label>
                  <input className="input-field" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                  {errors[k] && <p className="text-red-400 text-xs mt-1">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Owner ID (optional)</label>
                <input className="input-field" type="number" placeholder="User ID of store owner" value={form.ownerId}
                  onChange={e => setForm({ ...form, ownerId: e.target.value })} />
              </div>
              <button className="btn-primary w-full mt-2">Create Store</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
