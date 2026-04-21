import React, { useState, useEffect } from 'react';
import axios from 'axios';

const s = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    fontFamily: 'Syne, sans-serif',
    padding: '0',
  },
  nav: {
    background: '#111',
    borderBottom: '1px solid #1e1e1e',
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
    background: '#0d2a1a',
    border: '1px solid #1a4a2a',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontFamily: 'DM Mono, monospace',
    color: '#3ecf8e',
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
    color: '#3ecf8e',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
  btn: {
    padding: '10px 22px',
    background: '#3ecf8e',
    border: 'none',
    borderRadius: '7px',
    color: '#0a0a0a',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnDanger: {
    padding: '10px 22px',
    background: '#1a1a1a',
    border: '1px solid #ff444433',
    borderRadius: '7px',
    color: '#ff6666',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  response: {
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
  errorBox: {
    marginTop: '16px',
    background: '#1a0a0a',
    border: '1px solid #ff444433',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: '#ff6666',
  },
  lockBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: '8px',
    padding: '12px 16px',
    marginTop: '16px',
  },
  lockText: { fontSize: '12px', color: '#444', fontFamily: 'DM Mono, monospace' },
};

function UserDashboard() {
  const user = sessionStorage.getItem('user');
  const role = sessionStorage.getItem('role');
  const credentials = sessionStorage.getItem('credentials');

  const [profileData, setProfileData] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (!user) window.location.href = '/';
  }, [user]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    setProfileData(null);
    setProfileError('');
    try {
      const res = await axios.get('http://localhost:8080/api/user/profile', {
        headers: { Authorization: `Basic ${credentials}` }
      });
      setProfileData(res.data);
    } catch (err) {
      setProfileError(`Error ${err.response?.status}: ${err.response?.statusText || 'Request failed'}`);
    } finally {
      setLoadingProfile(false);
    }
  };

  const tryAdminAccess = async () => {
    setAdminError('');
    try {
      await axios.get('http://localhost:8080/api/admin/dashboard', {
        headers: { Authorization: `Basic ${credentials}` }
      });
    } catch (err) {
      setAdminError(`403 Forbidden — You don't have ADMIN role. Access denied by Spring Security.`);
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
        <span style={s.navLogo}>RBAC / USER DASHBOARD</span>
        <div style={s.navRight}>
          <span style={s.rolePill}>ROLE_USER</span>
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
          <div style={s.tag}>● Authenticated</div>
          <h1 style={s.heading}>Welcome, {user}</h1>
          <p style={s.subtext}>You are logged in as a standard user. Some features are restricted.</p>
        </div>

        {/* Stats */}
        <div style={s.grid}>
          <div style={s.card}>
            <div style={s.cardLabel}>Logged in as</div>
            <div style={s.cardValue}>{user}</div>
            <div style={s.cardSub}>Active session</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Role</div>
            <div style={{ ...s.cardValue, color: '#3ecf8e' }}>ROLE_USER</div>
            <div style={s.cardSub}>Standard access</div>
          </div>
          <div style={s.card}>
            <div style={s.cardLabel}>Admin Access</div>
            <div style={{ ...s.cardValue, color: '#ff4444' }}>Restricted</div>
            <div style={s.cardSub}>403 on admin endpoints</div>
          </div>
        </div>

        {/* Fetch Profile */}
        <div style={s.section}>
          <div style={s.sectionTitle}>GET /api/user/profile</div>
          <div style={s.sectionDesc}>This endpoint is accessible to USER and ADMIN roles.</div>
          <button style={s.btn} onClick={fetchProfile}
            onMouseEnter={e => e.target.style.background = '#2ab87a'}
            onMouseLeave={e => e.target.style.background = '#3ecf8e'}>
            {loadingProfile ? 'Fetching...' : 'Fetch My Profile →'}
          </button>
          {profileData && (
            <div style={s.response}>{JSON.stringify(profileData, null, 2)}</div>
          )}
          {profileError && <div style={s.errorBox}>⚠ {profileError}</div>}
        </div>

        {/* Try Admin — will 403 */}
        <div style={s.section}>
          <div style={s.sectionTitle}>GET /api/admin/dashboard</div>
          <div style={s.sectionDesc}>
            Attempt to access an ADMIN-only endpoint. This will return 403 Forbidden.
          </div>
          <button style={s.btnDanger} onClick={tryAdminAccess}>
            Try Admin Endpoint (will fail)
          </button>
          {adminError && <div style={s.errorBox}>⛔ {adminError}</div>}
          <div style={s.lockBox}>
            <span>🔒</span>
            <span style={s.lockText}>Admin panel is restricted to ROLE_ADMIN only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
