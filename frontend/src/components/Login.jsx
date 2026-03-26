import React, { useState } from 'react';
import apiClient from '../api/client';
import './Login.css';

export default function Login({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role: 'user',
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-promo">
          <p className="auth-kicker">Acceso seguro</p>
          <h1>Bienvenido a OwnLibrary</h1>
          <p>
            Entra para gestionar catalogo, permisos y disponibilidad en un flujo rapido,
            enfocado en operacion diaria.
          </p>
          <ul>
            <li>CRUD completo de libros</li>
            <li>Control por roles</li>
            <li>Tema oscuro persistente</li>
          </ul>
          <button type="button" className="auth-link-btn" onClick={onBack}>
            Volver al inicio
          </button>
        </aside>

        <form className="auth-card" onSubmit={showRegister ? handleRegister : handleLogin}>
          <h2>{showRegister ? 'Crea tu cuenta' : 'Iniciar sesion'}</h2>
          <p className="auth-subtitle">
            {showRegister ? 'Registrate en segundos para entrar al sistema.' : 'Introduce tus credenciales para continuar.'}
          </p>

          {error && <p className="auth-error">{error}</p>}

          {showRegister && (
            <label className="auth-field">
              <span>Nombre</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </label>
          )}

          <label className="auth-field">
            <span>Correo electronico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </label>

          <label className="auth-field">
            <span>Contrasena</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contrasena"
              required
            />
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : showRegister ? 'Registrarse' : 'Entrar'}
          </button>

          <p className="auth-switch">
            {showRegister ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setShowRegister(!showRegister);
                setError('');
              }}
            >
              {showRegister ? 'Inicia sesion' : 'Registrate'}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
