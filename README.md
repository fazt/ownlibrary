# Sistema de Administración de Biblioteca

Sistema interno de gestión de biblioteca con backend en Node.js/Express, frontend en React 18/Vite/MUI y base de datos MongoDB. Incluye CRUD completo para libros y artículos académicos, manejo de usuarios con roles, dashboard con dark mode y gestión de préstamos.

## Inicio Rápido

```bash
# 1. Instalar dependencias (desde la raíz del proyecto)
cd backend && npm install && cd ../frontend && npm install && cd ..

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env   # edita con tu MONGODB_URI y JWT_SECRET

# 3. Levantar backend (terminal 1)
cd backend && npm run dev

# 4. Levantar frontend (terminal 2)
cd frontend && npm run dev

# 5. (Opcional) Cargar datos de ejemplo
cd backend
node scripts/createUsers.mjs
node scripts/seedBooks.mjs
```

## Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| Backend | Node.js (ESM), Express, Mongoose, JWT, bcryptjs, multer |
| Frontend | React 18, Vite 4, Material UI v5, Axios, React Router DOM v6 |
| Base de datos | MongoDB |

## Características

- ✅ **Autenticación JWT** — Login/Registro con tokens de 7 días, interceptor Axios automático
- ✅ **Gestión de Libros** — CRUD completo con filtros por texto y género, soft delete
- ✅ **Gestión de Artículos** — Papers académicos con DOI, keywords, URL y abstract
- ✅ **Gestión de Préstamos** — Sistema de préstamos/devoluciones con control de stock automático
- ✅ **Roles** — Admin, Bibliotecario y Usuario con permisos específicos por ruta
- ✅ **Dark Mode** — Tema claro/oscuro persistido en localStorage
- ✅ **Dashboard** — Interfaz MUI con AppBar, Tabs, tablas filtrables y formularios modales
- 🚧 **Tabla de Artículos** — Lógica implementada, UI en progreso
- 🚧 **Subida de archivos** — multer instalado y carpeta `uploads/` disponible, rutas pendientes

## Requisitos Previos

- Node.js v16+
- MongoDB v4.4+
- npm o yarn

## Instalación

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus configuraciones (MONGODB_URI, JWT_SECRET, etc.)
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 3. Seed de datos (opcional)

```bash
cd backend
# Crear usuarios (admin, librarian, user)
node scripts/createUsers.mjs

# Insertar libros de ejemplo
node scripts/seedBooks.mjs
```

## Estructura del Proyecto

```
ownlibrary/
├── backend/
│   ├── scripts/
│   │   ├── createUsers.mjs     # Seed usuarios (admin, librarian, user)
│   │   ├── createUsers.cjs     # Idem en CommonJS
│   │   ├── seedBooks.mjs       # Seed de libros clásicos
│   │   └── deleteAdmin.mjs     # Eliminar usuario admin de la BD
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Conexión MongoDB
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT + roleMiddleware(roles[])
│   │   ├── models/
│   │   │   ├── User.js         # name, email, password (hashed), role, isActive
│   │   │   ├── Book.js         # title, author, isbn, genre, copies, publisher…
│   │   │   ├── Article.js      # title, author, journal, doi, keywords, url…
│   │   │   └── Loan.js         # user, itemType, item (refPath), dueDate, status
│   │   ├── routes/
│   │   │   ├── auth.js         # /register, /login, /me
│   │   │   ├── books.js        # CRUD + filtros search/genre/skip/limit
│   │   │   ├── articles.js     # CRUD + filtro search
│   │   │   └── loans.js        # préstamos y devoluciones
│   │   └── server.js           # Express, cors, rutas, health check, 404/error handler
│   ├── uploads/                # Destino para archivos subidos (multer)
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js       # Axios con interceptors (token, 401 → logout)
│   │   ├── components/
│   │   │   ├── Login.jsx       # Formulario login/registro con toggle
│   │   │   ├── Dashboard.jsx   # AppBar + Tabs Libros/Artículos + tabla filtrable
│   │   │   └── BookForm.jsx    # Modal creación/edición de libros
│   │   └── main.jsx            # App root: sesión, dark mode, ThemeProvider
│   ├── index.html
│   ├── vite.config.js          # Puerto 3000 + proxy /api → localhost:5000
│   └── package.json
└── README.md
```

## API Endpoints

### Utilidades
- `GET /api/health` — Estado del servidor

### Autenticación
- `POST /api/auth/register` — Registrar usuario (devuelve JWT)
- `POST /api/auth/login` — Iniciar sesión (devuelve JWT)
- `GET /api/auth/me` — Datos del usuario autenticado

### Libros
- `GET /api/books` — Listar libros activos (filtros: `search`, `genre`, `skip`, `limit`)
- `GET /api/books/:id` — Obtener libro
- `POST /api/books` — Crear libro (admin/librarian)
- `PUT /api/books/:id` — Actualizar libro (admin/librarian)
- `DELETE /api/books/:id` — Soft delete (admin)

### Artículos
- `GET /api/articles` — Listar artículos (filtro: `search` en título/autor/revista)
- `GET /api/articles/:id` — Obtener artículo
- `POST /api/articles` — Crear artículo (admin/librarian)
- `PUT /api/articles/:id` — Actualizar artículo (admin/librarian)
- `DELETE /api/articles/:id` — Soft delete (admin)

### Préstamos
- `GET /api/loans` — Listar todos los préstamos (admin/librarian, filtro: `status`)
- `GET /api/loans/user/:userId` — Préstamos de un usuario (propio o admin)
- `POST /api/loans` — Crear préstamo (decrementa `availableCopies`)
- `PUT /api/loans/:id/return` — Devolver ítem (incrementa `availableCopies`)

## Roles y Permisos

| Rol | Register | Login | Ver | Crear | Editar | Eliminar | Prestar |
|-----|----------|-------|-----|-------|--------|----------|---------|
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Librarian | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| User | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |

## Variables de Entorno

### Backend (`.env`)
```
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (`.env.local`)
```
VITE_API_URL=http://localhost:5000/api
```

## Usuarios Demo

Al ejecutar `node scripts/createUsers.mjs` se crean estos usuarios:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | `admin@biblioteca.com` | `admin123` |
| Librarian | `librarian@biblioteca.com` | `librarian123` |
| User | `usuario@biblioteca.com` | `usuario123` |

## Desarrollo

### Backend en modo desarrollo
```bash
cd backend
npm run dev     # nodemon
npm test        # jest
```

### Frontend
```bash
cd frontend
npm run dev     # Vite dev server (puerto 3000)
npm run build   # Build de producción
npm run preview # Preview del build
```

### Pruebas E2E (TestSprite)
```bash
# Asegura backend en :5000 y frontend en :5173
cd frontend && npm run dev -- --port 5173

# En otra terminal, desde la raíz del proyecto
npx @testsprite/testsprite-mcp generateCodeAndExecute
```

## Próximos Pasos

- [ ] Implementar tabla de artículos en el Dashboard
- [ ] Agregar rutas de subida de archivos/portadas con multer
- [ ] Agregar componente de gestión de usuarios
- [ ] Implementar gráficos/estadísticas en el dashboard
- [ ] Agregar notificaciones de préstamos vencidos
- [ ] Agregar exportación de reportes (PDF/CSV)
- [ ] Deploy en producción
- [ ] Agregar tests unitarios e integración
- [ ] Implementar sistema de reservas de libros

## Licencia

MIT
