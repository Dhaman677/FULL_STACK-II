import React, { useState, useEffect } from 'react';
import axios from 'axios';

const s = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    fontFamily: 'Syne, sans-serif',
  },
  nav: {
    background: '#111',
    borderBottom: '1px solid #2a1a0d',
    padding: '0 32px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLogo: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '13px',
    color: '#555',
    letterSpacing: '0.1em',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  rolePill: {
    background: '#2a1a0d',
    border: '1px solid #4a2a1a',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontFamily: 'DM Mono, monospace',
    color: '#ff8c42',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #222',
    borderRadius: '6px',
    padding: '6px 14px',
    color: '#666',
    fontFamily: 'Syne, sans-serif',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  body: { padding: '40px 32px', maxWidth: '900px', margin: '0 auto' },
  welcome: {
    marginBottom: '40px',
    animation: 'fadeUp 0.4s ease forwards',
  },
  tag: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '11px',
    color: '#ff8c42',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  heading: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#f0f0f0',
    marginBottom: '8px',
  },
  subtext: { fontSize: '14px', color: '#555' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  card: {
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: '12px',
    padding: '24px',
    animation: 'fadeUp 0.5s ease forwards',
  },
  cardLabel: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '10px',
    color: '#444',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  cardValue: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#f0f0f0',
    marginBottom: '4px',
  },
  cardSub: { fontSize: '12px', color: '#555' },
  section: {
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: '12px',
    padding: '28px',
    marginBottom: '16px',
    animation: 'fadeUp 0.6s ease forwards',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#f0f0f0',
    marginBottom: '6px',
  },
  sectionDesc: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '20px',
  },
  btnRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  btn: {
    padding: '10px 22px',
    background: '#ff8c42',
    border: 'none',
    borderRadius: '7px',
    color: '#0a0a0a',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    padding: '10px 22px',
    background: 'transparent',
    border: '1px solid #3ecf8e44',
    borderRadius: '7px',
    color: '#3ecf8e',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  response: {
    marginTop: '16px',
    background: '#0a0a0a',
    border: '1px solid #1e1e1e',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: '#ff8c42',
    whiteSpace: 'pre-wrap',
  },
  responseGreen: {
    marginTop: '16px',
    background: '#0a0a0a',
    border: '1px solid #1e1e1e',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: '#3ecf8e',
    whiteSpace: 'pre-wrap',
  },
  allAccessBanner: {
    background: '#150e00',
    border: '1px solid #ff8c4233',
    borderRadius: '8px',
    padding: '14px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
  },
  bannerText: { fontSize: '13px', color: '#ff8c42', fontFamily: 'DM Mono, monospace' },
};

function AdminDashboard() {
  const user = sessionStorage.getItem('user');
  const role = sessionStorage.getItem('role');
  const credentials = sessionStorage.getItem('credentials');

  const [adminData, setAdminData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (!user || role !== 'ADMIN') {
      alert('Access Denied — ADMIN role required');
      window.location.href = '/';
    }
  }, [user, role]);

  const fetchWithLoading = async (key, url, setter) => {
    setLoading(l => ({ ...l, [key]: true }));
    setter(null);
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Basic ${credentials}` }
      });
      setter(res.data);
    } catch (err) {
      setter({ error: `${err.response?.status} — ${err.response?.statusText}` });
    } finally {
      setLoading(l => ({ ...l, [key]: false }));
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navLogo}>RBAC / ADMIN DASHBOARD</span>
        <div style={s.navRight}>
          <span style={s.rolePill}>ROLE_ADMIN</span>
          <button style={s.logoutBtn} onClick={logout}
            onMouseEnter={e => { e.target.style.borderColor = '#444'; e.target.style.color = '#aaa'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#222'; e.target.style.color = '#666'; }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={s.body}>
        {/* Welcome */}
        <div style={s.welcome}>
          <div style={s.tag}>⬡ Admin Access</div>
          <h1 style={s.heading}>Admin Panel, {user}</h1>
          <p style={s.subtext}>Full access granted. You can reach all endpoints including admin-only routes.</p>
        </div>

        {/* All access banner */}
        <div style={s.allAccessBanner}>
          <span>🔓</span>
          <span style={s.bannerText}>ROLE_ADMIN — unrestricted access to all API endpoints</span>
        </div>

        {/* Stats */}
        <div style={s.grid}>
          <div style={s.card}>
            <div style={s.cardLabel}>Logged in as</div>
            <div style={s.cardValue}>{user}</div>
            <div style={s.cardSub}>Admin session</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Role</div>
            <div style={{ ...s.cardValue, color: '#ff8c42' }}>ROLE_ADMIN</div>
            <div style={s.cardSub}>Full access</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Endpoints</div>
            <div style={{ ...s.cardValue, color: '#3ecf8e' }}>All</div>
            <div style={s.cardSub}>public + user + admin</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Security</div>
            <div style={{ ...s.cardValue, color: '#4f9eff' }}>Spring</div>
            <div style={s.cardSub}>HTTP Basic Auth</div>
          </div>
        </div>

        {/* Admin endpoint */}
        <div style={s.section}>
          <div style={s.sectionTitle}>GET /api/admin/dashboard</div>
          <div style={s.sectionDesc}>Admin-only endpoint — returns 403 for ROLE_USER.</div>
          <button style={s.btn}
            onClick={() => fetchWithLoading('admin', 'http://localhost:8080/api/admin/dashboard', setAdminData)}
            onMouseEnter={e => e.target.style.background = '#e07a35'}
            onMouseLeave={e => e.target.style.background = '#ff8c42'}>
            {loading.admin ? 'Fetching...' : 'Fetch Admin Dashboard →'}
          </button>
          {adminData && <div style={s.response}>{JSON.stringify(adminData, null, 2)}</div>}
        </div>

        {/* Admin users endpoint */}
        <div style={s.section}>
          <div style={s.sectionTitle}>GET /api/admin/users</div>
          <div style={s.sectionDesc}>Admin-only user management endpoint.</div>
          <button style={s.btn}
            onClick={() => fetchWithLoading('users', 'http://localhost:8080/api/admin/users', setUsersData)}
            onMouseEnter={e => e.target.style.background = '#e07a35'}
            onMouseLeave={e => e.target.style.background = '#ff8c42'}>
            {loading.users ? 'Fetching...' : 'Fetch Users List →'}
          </button>
          {usersData && <div style={s.response}>{JSON.stringify(usersData, null, 2)}</div>}
        </div>

        {/* User endpoint — admin can access too */}
        <div style={s.section}>
          <div style={s.sectionTitle}>GET /api/user/profile</div>
          <div style={s.sectionDesc}>User endpoint — accessible by ROLE_USER and ROLE_ADMIN.</div>
          <button style={s.btnSecondary}
            onClick={() => fetchWithLoading('profile', 'http://localhost:8080/api/user/profile', setProfileData)}>
            {loading.profile ? 'Fetching...' : 'Fetch User Profile →'}
          </button>
          {profileData && <div style={s.responseGreen}>{JSON.stringify(profileData, null, 2)}</div>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
