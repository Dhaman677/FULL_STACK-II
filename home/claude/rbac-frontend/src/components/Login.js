import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Syne, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    opacity: 0.4,
  },
  card: {
    background: '#111',
    border: '1px solid #222',
    borderRadius: '16px',
    padding: '48px',
    width: '100%',
    maxWidth: '420px',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeUp 0.5s ease forwards',
  },
  badge: {
    display: 'inline-block',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '11px',
    fontFamily: 'DM Mono, monospace',
    color: '#888',
    letterSpacing: '0.08em',
    marginBottom: '24px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#f0f0f0',
    lineHeight: 1.1,
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '36px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontFamily: 'DM Mono, monospace',
    color: '#666',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    background: '#0a0a0a',
    border: '1px solid #222',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#f0f0f0',
    fontFamily: 'DM Mono, monospace',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '20px',
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: '#4f9eff',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px',
  },
  btnLoading: {
    background: '#2a5a99',
    cursor: 'not-allowed',
  },
  error: {
    background: '#1a0a0a',
    border: '1px solid #ff444433',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#ff6666',
    fontFamily: 'DM Mono, monospace',
    fontSize: '13px',
    marginBottom: '20px',
  },
  hint: {
    marginTop: '28px',
    padding: '16px',
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: '8px',
  },
  hintTitle: {
    fontSize: '11px',
    fontFamily: 'DM Mono, monospace',
    color: '#444',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  hintRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    borderBottom: '1px solid #1a1a1a',
  },
  hintLabel: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: '#666',
  },
  hintValue: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: '#4f9eff',
  },
  roleBadge: {
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '10px',
    fontFamily: 'DM Mono, monospace',
  }
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use HTTP Basic Auth — same as Postman
      const res = await axios.post(
        'http://localhost:8080/api/auth/login',
        { username, password }
      );

      if (res.status === 200) {
        const role = res.data.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER';
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('credentials', btoa(`${username}:${password}`));

        window.location.href = role === 'ADMIN' ? '/admin' : '/user';
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('Cannot connect to server. Make sure Spring Boot is running on port 8080.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') login();
  };

  return (
    <div style={styles.page}>
      <div style={styles.grid} />
      <div style={styles.card}>
        <div style={styles.badge}>EXPERIMENT 7 — RBAC</div>
        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.subtitle}>Role-based access control demo</p>

        {error && <div style={styles.error}>⚠ {error}</div>}

        <label style={styles.label}>Username</label>
        <input
          style={styles.input}
          placeholder="user1 or admin1"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={e => e.target.style.borderColor = '#4f9eff'}
          onBlur={e => e.target.style.borderColor = '#222'}
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={e => e.target.style.borderColor = '#4f9eff'}
          onBlur={e => e.target.style.borderColor = '#222'}
        />

        <button
          style={{ ...styles.btn, ...(loading ? styles.btnLoading : {}) }}
          onClick={login}
          disabled={loading}
          onMouseEnter={e => { if (!loading) e.target.style.background = '#3a8aee'; }}
          onMouseLeave={e => { if (!loading) e.target.style.background = '#4f9eff'; }}
        >
          {loading ? 'Authenticating...' : 'Sign In →'}
        </button>

        {/* Test credentials hint */}
        <div style={styles.hint}>
          <div style={styles.hintTitle}>Test Credentials</div>
          <div style={styles.hintRow}>
            <span style={styles.hintLabel}>user1 / user123</span>
            <span style={{ ...styles.roleBadge, background: '#0d2a1a', color: '#3ecf8e', border: '1px solid #1a4a2a' }}>ROLE_USER</span>
          </div>
          <div style={{ ...styles.hintRow, borderBottom: 'none' }}>
            <span style={styles.hintLabel}>admin1 / admin123</span>
            <span style={{ ...styles.roleBadge, background: '#2a1a0d', color: '#ff8c42', border: '1px solid #4a2a1a' }}>ROLE_ADMIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
