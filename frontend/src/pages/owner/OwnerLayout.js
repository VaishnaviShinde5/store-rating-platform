import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Lock } from 'lucide-react';

const links = [
  { to: '/owner', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/owner/update-password', label: 'Update Password', icon: Lock },
];

export default function OwnerLayout() {
  return (
    <div className="flex pt-16 min-h-screen">
      <aside className="w-56 fixed left-0 top-16 bottom-0 bg-slate-900/70 border-r border-white/10 p-4">
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}
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
      <main className="ml-56 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
