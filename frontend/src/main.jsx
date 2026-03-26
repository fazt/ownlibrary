import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import './styles/app.css';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === null) {
      localStorage.setItem('darkMode', 'true');
      return true;
    }
    return saved === 'true';
  });
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  ) : (
    showAuth ? (
      <Login onLoginSuccess={handleLoginSuccess} onBack={() => setShowAuth(false)} />
    ) : (
      <LandingPage onStart={() => setShowAuth(true)} />
    )
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
