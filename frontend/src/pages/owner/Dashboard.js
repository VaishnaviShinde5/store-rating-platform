import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StarRating from '../../components/StarRating';
import SortableTable from '../../components/SortableTable';
import { Store, Star } from 'lucide-react';

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stores/owner-dashboard').then(r => { setData(r.data); setLoading(false); });
  }, []);

  const columns = [
    { key: 'userName', label: 'User Name' },
    { key: 'userEmail', label: 'Email' },
    { key: 'value', label: 'Rating', render: v => (
      <div className="flex items-center gap-2">
        <StarRating value={v} readonly size={14} />
        <span className="text-slate-400 text-xs">{v}/5</span>
      </div>
    )},
    { key: 'updatedAt', label: 'Date', render: v => new Date(v).toLocaleDateString() },
  ];

  if (loading) return <div className="pt-16 p-8 text-slate-400">Loading...</div>;

  return (
    <div className="pt-16 p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Store Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">Your store performance overview</p>
      </div>

      {data?.store ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Store size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Store Name</p>
                  <p className="font-semibold text-white">{data.store.name}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">{data.store.address}</p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Star size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Average Rating</p>
                  <p className="font-display text-3xl font-bold text-white">{data.averageRating}</p>
                </div>
              </div>
              <StarRating value={Math.round(data.averageRating)} readonly size={20} />
              <p className="text-xs text-slate-500 mt-2">{data.ratings.length} total ratings</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-display font-bold text-white text-lg mb-1">Customer Ratings</h3>
            <p className="text-slate-400 text-sm">Users who rated your store</p>
          </div>
          <SortableTable columns={columns} data={data.ratings} emptyText="No ratings yet" />
        </>
      ) : (
        <div className="card text-center py-12">
          <Store size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No store assigned to your account yet.</p>
          <p className="text-slate-500 text-sm mt-1">Contact an admin to assign a store.</p>
        </div>
      )}
    </div>
  );
}
