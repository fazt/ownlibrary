import React from 'react';
import './LandingPage.css';

const pillars = [
  {
    id: 'CAT-01',
    title: 'Catalogacion operativa',
    text: 'Busqueda por texto, filtros por genero y tabla lista para decisiones rapidas.',
  },
  {
    id: 'ACL-02',
    title: 'Seguridad por roles',
    text: 'Flujos diferenciados para admin, librarian y user, con permisos claros.',
  },
  {
    id: 'UX-03',
    title: 'Experiencia persistente',
    text: 'Tema visual y sesion pensados para continuidad de trabajo entre jornadas.',
  },
];

const strips = ['React + Vite', 'Node API', 'Auth + JWT', 'CRUD de libros', 'Modo oscuro'];

export default function LandingPage({ onStart }) {
  return (
    <main className="olp-root">
      <div className="olp-noise" aria-hidden="true" />

      <section className="olp-shell">
        <header className="olp-top olp-rise" style={{ animationDelay: '0.06s' }}>
          <p className="olp-brand">OwnLibrary Platform</p>
          <div className="olp-strip-track" aria-hidden="true">
            <div className="olp-strip">
              {[...strips, ...strips].map((item, idx) => (
                <span key={`${item}-${idx}`}>{item}</span>
              ))}
            </div>
          </div>
        </header>

        <section className="olp-hero olp-rise" style={{ animationDelay: '0.14s' }}>
          <div className="olp-hero-main">
            <p className="olp-kicker">Sistema de gestion bibliotecaria</p>
            <h1>Un layout de trabajo para bibliotecas modernas</h1>
            <p>
              Del acceso a la operacion diaria: organiza catalogo, aplica permisos por rol y ejecuta
              flujos de inventario desde una interfaz clara, intensa y enfocada.
            </p>

            <div className="olp-actions">
              <button type="button" className="olp-btn olp-btn-solid" onClick={onStart}>
                Entrar ahora
              </button>
              <button type="button" className="olp-btn olp-btn-outline" onClick={onStart}>
                Ver acceso
              </button>
            </div>
          </div>

          <aside className="olp-hero-aside">
            <article>
              <strong>Tiempo de arranque</strong>
              <span>Inicio inmediato con credenciales activas.</span>
            </article>
            <article>
              <strong>Control de inventario</strong>
              <span>Edicion, alta y baja de libros en flujo continuo.</span>
            </article>
            <article>
              <strong>Modo visual persistente</strong>
              <span>Claro u oscuro se mantiene entre sesiones.</span>
            </article>
          </aside>
        </section>

        <section className="olp-pillar-grid">
          {pillars.map((pillar, idx) => (
            <article
              key={pillar.id}
              className="olp-pillar olp-rise"
              style={{ animationDelay: `${0.24 + idx * 0.1}s` }}
            >
              <p className="olp-code">{pillar.id}</p>
              <h2>{pillar.title}</h2>
              <p>{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="olp-final olp-rise" style={{ animationDelay: '0.56s' }}>
          <div>
            <h3>Listo para migrar de hojas sueltas a control real</h3>
            <p>Centraliza todo el flujo del equipo en una unica consola operativa.</p>
          </div>
          <button type="button" className="olp-btn olp-btn-solid" onClick={onStart}>
            Iniciar gestion
          </button>
        </section>
      </section>
    </main>
  );
}
