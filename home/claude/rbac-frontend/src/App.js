import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Protected route wrapper
function ProtectedRoute({ children, requiredRole }) {
  const role = sessionStorage.getItem('role');
  const user = sessionStorage.getItem('user');

  if (!user || !role) return <Navigate to="/" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/unauthorized" replace />;
  return children;
}

function Unauthorized() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Syne, sans-serif',
      color: '#fff'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '16px' }}>⛔</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ff4444' }}>403 — Forbidden</h1>
      <p style={{ color: '#888', marginBottom: '24px' }}>You don't have permission to access this page.</p>
      <button
        onClick={() => { sessionStorage.clear(); window.location.href = '/'; }}
        style={{
          background: '#ff4444',
          color: '#fff',
          border: 'none',
          padding: '10px 28px',
          borderRadius: '6px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
