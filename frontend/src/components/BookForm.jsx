import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import './BookForm.css';

export default function BookForm({ bookId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
    totalCopies: 1,
    publishedYear: new Date().getFullYear(),
    publisher: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookId) {
      loadBook();
    }
  }, [bookId]);

  const loadBook = async () => {
    try {
      const response = await apiClient.get(`/books/${bookId}`);
      setFormData(response.data);
    } catch (err) {
      setError('Error al cargar el libro');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (bookId) {
        await apiClient.put(`/books/${bookId}`, formData);
      } else {
        await apiClient.post('/books', formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-form-card">
      <header>
        <h3>{bookId ? 'Editar libro' : 'Nuevo libro'}</h3>
        <p>Completa la informacion del catalogo para mantener un inventario preciso.</p>
      </header>

      {error && <p className="book-form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="book-form-grid">
        <label>
          <span>Titulo</span>
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          <span>Autor</span>
          <input name="author" value={formData.author} onChange={handleChange} required />
        </label>

        <label>
          <span>ISBN</span>
          <input name="isbn" value={formData.isbn} onChange={handleChange} />
        </label>

        <label>
          <span>Genero</span>
          <input name="genre" value={formData.genre} onChange={handleChange} required />
        </label>

        <label className="book-form-col-span">
          <span>Descripcion</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <label>
          <span>Ano de publicacion</span>
          <input
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Editorial</span>
          <input name="publisher" value={formData.publisher} onChange={handleChange} />
        </label>

        <label>
          <span>Copias totales</span>
          <input
            name="totalCopies"
            type="number"
            value={formData.totalCopies}
            onChange={handleChange}
            required
          />
        </label>

        <div className="book-form-actions book-form-col-span">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button className="btn-outline" type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
