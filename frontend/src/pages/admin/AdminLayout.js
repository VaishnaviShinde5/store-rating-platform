import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Store } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/stores', label: 'Stores', icon: Store },
];

export default function AdminLayout() {
  return (
    <div className="flex pt-16 min-h-screen">
      <aside className="w-56 fixed left-0 top-16 bottom-0 bg-slate-900/70 border-r border-white/10 p-4">
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
