import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import BookForm from './BookForm';
import './Dashboard.css';

const GENRES = ['Ficción', 'No ficción', 'Ciencia', 'Historia', 'Tecnología', 'Literatura', 'Fantasía'];

export default function Dashboard({ user, onLogout, darkMode, onToggleDarkMode }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('books');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, type: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadBooks();
  }, [search, selectedGenre]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/books', {
        params: { search, genre: selectedGenre },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const itemToDelete = deleteDialog;
    setDeleteDialog({ open: false, id: null, type: '' });

    try {
      if (itemToDelete.type === 'book') {
        await apiClient.delete(`/books/${itemToDelete.id}`);
        setBooks((prev) => prev.filter((b) => b._id !== itemToDelete.id));
        setFeedback({ type: 'success', message: 'Eliminado correctamente' });
        await loadBooks();
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Error al eliminar' });
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingId(null);
    loadBooks();
  };

  const isManager = user?.role === 'admin' || user?.role === 'librarian';

  return (
    <main className="dashboard-page">
      <header className="dash-topbar">
        <div className="dash-brand">OwnLibrary</div>
        <div className="dash-user">
          <span>{user?.name} ({user?.role})</span>
          <button type="button" className="btn-outline" onClick={onToggleDarkMode}>
            {darkMode ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <button type="button" className="btn-outline" onClick={onLogout}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <section className="dash-shell">
        <section className="dash-hero">
          <h1>Panel de control de biblioteca</h1>
          <p>Gestiona libros, revisa disponibilidad y administra operaciones desde una sola vista.</p>
          <div className="dash-badges">
            <span>{books.length} libros</span>
            <span>{isManager ? 'Permisos de gestion' : 'Solo lectura'}</span>
            <span>Vista: {activeTab === 'books' ? 'Libros' : 'Articulos'}</span>
          </div>
        </section>

        {user?.role === 'user' && (
          <p className="dash-info">Permiso limitado: solo lectura y prestamos disponibles para tu rol.</p>
        )}

        {feedback.message && (
          <p className={feedback.type === 'error' ? 'dash-alert error' : 'dash-alert success'}>{feedback.message}</p>
        )}

        <section className="dash-toolbar">
          <div className="dash-tabs">
            <button type="button" className={activeTab === 'books' ? 'active' : ''} onClick={() => setActiveTab('books')}>
              Libros
            </button>
            <button type="button" className={activeTab === 'articles' ? 'active' : ''} onClick={() => setActiveTab('articles')}>
              Articulos
            </button>
          </div>
          {activeTab === 'books' && isManager && (
            <button type="button" className="btn-primary" onClick={() => setShowForm(true)}>
              + Nuevo libro
            </button>
          )}
        </section>

        {showForm && (
          <BookForm
            bookId={editingId}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingId(null);
            }}
          />
        )}

        {activeTab === 'books' && (
          <section className="dash-content">
            <div className="dash-filters">
              <input
                placeholder="Buscar libros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Todos los generos</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <p className="dash-loading">Cargando libros...</p>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Titulo</th>
                      <th>Autor</th>
                      <th>Genero</th>
                      <th>Disponibles</th>
                      {isManager && <th>Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td><span className="genre-pill">{book.genre || 'Sin genero'}</span></td>
                        <td>{book.availableCopies}</td>
                        {isManager && (
                          <td className="table-actions">
                            <button
                              type="button"
                              className="btn-outline"
                              onClick={() => {
                                setEditingId(book._id);
                                setShowForm(true);
                              }}
                            >
                              Editar
                            </button>
                            {user?.role === 'admin' && (
                              <button
                                type="button"
                                className="btn-danger"
                                onClick={() => setDeleteDialog({ open: true, id: book._id, type: 'book' })}
                              >
                                Eliminar
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                    {books.length === 0 && (
                      <tr>
                        <td colSpan={isManager ? 5 : 4} className="no-results">No hay resultados para los filtros actuales.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === 'articles' && (
          <section className="dash-empty">No hay datos para Articulos</section>
        )}
      </section>

      {deleteDialog.open && (
        <div className="dash-modal-overlay" role="presentation" onClick={() => setDeleteDialog({ open: false, id: null, type: '' })}>
          <div className="dash-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar eliminacion</h3>
            <p>Estas seguro de eliminar este elemento?</p>
            <div className="dash-modal-actions">
              <button type="button" className="btn-outline" onClick={() => setDeleteDialog({ open: false, id: null, type: '' })}>
                Cancelar
              </button>
              <button type="button" className="btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
