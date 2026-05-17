import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Star } from 'lucide-react';

const roleLabel = { admin: 'Administrator', user: 'User', store_owner: 'Store Owner' };

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Star size={16} className="text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">RateStore</span>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user.name?.split(' ')[0]}</p>
              <p className="text-xs text-indigo-400">{roleLabel[user.role]}</p>
            </div>
            <button onClick={handleLogout} className="btn-ghost flex items-center gap-2 !px-3 !py-2">
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
