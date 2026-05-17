import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, Store, Star, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/users/dashboard').then(r => setStats(r.data));
  }, []);

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: Users, color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-400' },
    { label: 'Total Stores', value: stats?.totalStores, icon: Store, color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400' },
    { label: 'Total Ratings', value: stats?.totalRatings, icon: Star, color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-400' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-slate-400 text-sm mt-1">Platform stats at a glance</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.label} className={`card bg-gradient-to-br ${c.color} border-white/10`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium">{c.label}</span>
              <c.icon size={20} className={c.iconColor} />
            </div>
            <div className="font-display text-4xl font-bold text-white">
              {stats ? stats[Object.keys(stats)[cards.indexOf(c)]] : '—'}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 card">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={18} className="text-indigo-400" />
          <h3 className="font-semibold text-white">Quick Actions</h3>
        </div>
        <p className="text-slate-400 text-sm">Use the sidebar to manage users and stores.</p>
      </div>
    </div>
  );
}
