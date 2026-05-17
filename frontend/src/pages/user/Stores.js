import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StarRating from '../../components/StarRating';
import { Search, MapPin, Mail, RefreshCw } from 'lucide-react';

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [ratingState, setRatingState] = useState({});
  const [message, setMessage] = useState('');

  const fetchStores = async () => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(search).filter(([, v]) => v));
    const { data } = await api.get('/stores', { params });
    setStores(data);
    setLoading(false);
  };

  useEffect(() => { fetchStores(); }, [search]);

  const handleRate = async (store) => {
    const val = ratingState[store.id];
    if (!val) return;
    try {
      if (store.ratingId) {
        await api.put(`/ratings/${store.ratingId}`, { value: val });
      } else {
        await api.post('/ratings', { storeId: store.id, value: val });
      }
      setMessage('Rating saved!');
      fetchStores();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save rating');
    }
  };

  return (
    <div className="pt-16 min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Browse Stores</h2>
        <p className="text-slate-400 text-sm mt-1">Discover and rate stores on the platform</p>
      </div>

      {message && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 mb-5 text-sm">{message}</div>}

      <div className="card mb-6">
        <div className="flex gap-3">
          {['name', 'address'].map(k => (
            <div key={k} className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input className="input-field pl-8" placeholder={`Search by ${k}`}
                value={search[k]} onChange={e => setSearch({ ...search, [k]: e.target.value })} />
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw size={24} className="text-indigo-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stores.map(store => (
            <div key={store.id} className="card flex flex-col gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-lg leading-tight">{store.name}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                  <Mail size={11} /> {store.email}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                  <MapPin size={11} /> {store.address}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Overall Rating</p>
                  <div className="flex items-center gap-2">
                    <StarRating value={Math.round(store.averageRating)} readonly size={16} />
                    <span className="text-slate-400 text-xs font-medium">{store.averageRating || 0}</span>
                  </div>
                </div>
                {store.userRating && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Your Rating</p>
                    <StarRating value={store.userRating} readonly size={16} />
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-slate-500 mb-2">{store.userRating ? 'Update your rating' : 'Submit your rating'}</p>
                <div className="flex items-center gap-3">
                  <StarRating
                    value={ratingState[store.id] || 0}
                    onChange={v => setRatingState({ ...ratingState, [store.id]: v })}
                    size={22}
                  />
                  <button
                    className="btn-primary !py-1.5 !px-3 text-xs"
                    onClick={() => handleRate(store)}
                    disabled={!ratingState[store.id]}
                  >
                    {store.userRating ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
