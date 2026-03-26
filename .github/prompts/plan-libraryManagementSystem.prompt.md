## Plan: Sistema de Administración de Biblioteca

Crear un sistema interno de gestión de biblioteca con backend en Node.js/Express, frontend en React/Vite, base de datos MongoDB. Incluye CRUD completo para libros y artículos (papers académicos), manejo de usuarios con roles administrables, dashboard avanzado y gestión de préstamos.

**Pasos**
1. Configurar el proyecto: Crear estructura de carpetas (backend/, frontend/), inicializar repositorios con package.json, configurar MongoDB.
2. Desarrollar backend: Implementar modelos (Usuario, Libro, Articulo, Prestamo), rutas CRUD con autenticación JWT, middleware de roles.
3. Desarrollar frontend: Crear componentes React para dashboard, formularios CRUD, tablas de datos, navegación con roles.
4. Integrar backend y frontend: Configurar API calls, autenticación, manejo de estados.
5. Agregar gestión de préstamos: Funcionalidades para prestar/devolver libros/artículos, tracking de usuarios.
6. Testing y validación: Ejecutar tests unitarios, integración, verificar build y linting.

**Archivos relevantes**
- `backend/package.json` — Dependencias y scripts para Express, Mongoose, JWT.
- `backend/models/User.js`, `backend/models/Book.js`, `backend/models/Article.js`, `backend/models/Loan.js` — Modelos de datos.
- `backend/routes/auth.js`, `backend/routes/books.js`, `backend/routes/articles.js`, `backend/routes/loans.js` — Rutas API.
- `frontend/package.json` — Dependencias React, Vite, Axios, Material-UI para dashboard.
- `frontend/src/components/Dashboard.jsx`, `frontend/src/components/BookForm.jsx`, `frontend/src/components/UserManagement.jsx` — Componentes principales.

**Verificación**
1. Ejecutar `npm test` en backend y frontend para tests unitarios.
2. Verificar build con `npm run build` en ambos.
3. Probar CRUD manualmente: Crear, leer, actualizar, eliminar libros/artículos.
4. Validar autenticación: Login con diferentes roles, acceso restringido.
5. Revisar gestión de préstamos: Prestar/devolver, verificar estados.

**Decisiones**
- Usar MongoDB para flexibilidad en datos NoSQL.
- Roles: Administrador (full access), Bibliotecario (CRUD libros/artículos), Usuario (solo vista y préstamos).
- Campos libros: título, autor, ISBN, género, cantidad disponible.
- Campos artículos: título, autor, revista, fecha publicación, abstract.
- Gestión de préstamos: Sí, incluir tracking de fechas y usuarios.
- UI: Dashboard con gráficos (e.g., libros disponibles), tablas filtrables, formularios modales.
