import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminStores from './pages/admin/Stores';

import UserLayout from './pages/user/UserLayout';
import UserStores from './pages/user/Stores';
import UpdatePassword from './pages/user/UpdatePassword';

import OwnerLayout from './pages/owner/OwnerLayout';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerUpdatePassword from './pages/owner/UpdatePassword';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="stores" element={<AdminStores />} />
          </Route>

          <Route path="/" element={
            <ProtectedRoute roles={['user']}><UserLayout /></ProtectedRoute>
          }>
            <Route path="stores" element={<UserStores />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>

          <Route path="/owner" element={
            <ProtectedRoute roles={['store_owner']}><OwnerLayout /></ProtectedRoute>
          }>
            <Route index element={<OwnerDashboard />} />
            <Route path="update-password" element={<OwnerUpdatePassword />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
