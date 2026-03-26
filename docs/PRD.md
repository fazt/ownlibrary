# PRD - OwnLibrary

## 1. Resumen del producto

OwnLibrary es un sistema interno de administracion de biblioteca orientado a gestionar libros, articulos academicos, usuarios autenticados y prestamos desde una interfaz web. El producto combina un backend REST en Node.js/Express con MongoDB y un frontend en React con Material UI.

En su estado actual, el sistema ya permite autenticacion con JWT, CRUD de libros, CRUD de articulos a nivel de API, y gestion de prestamos a nivel de API. La experiencia de usuario implementada en frontend cubre principalmente login/registro, visualizacion de libros, filtro por texto y genero, modo oscuro y operacion basica de alta/edicion/eliminacion de libros segun rol.

## 2. Objetivo del documento

Definir el alcance funcional, objetivos del negocio, requisitos y prioridades del producto para ordenar su evolucion desde un MVP operativo hacia una plataforma de gestion bibliotecaria mas completa.

## 3. Problema a resolver

Las bibliotecas pequenas o equipos internos suelen administrar inventario, prestamos y materiales academicos de forma manual o con herramientas dispersas. Esto genera:

- poca visibilidad del catalogo disponible
- errores en el control de copias prestadas y devueltas
- dificultad para aplicar permisos segun rol
- baja trazabilidad sobre usuarios y prestamos
- mantenimiento manual de informacion academica y bibliografica

OwnLibrary busca centralizar estas operaciones en una sola aplicacion web.

## 4. Vision del producto

Construir una plataforma simple, segura y escalable para administrar catalogos bibliograficos y prestamos, con soporte para diferentes roles operativos y una experiencia web clara para bibliotecarios y usuarios.

## 5. Objetivos del negocio

- Reducir el tiempo operativo para registrar y actualizar materiales.
- Disminuir errores en el control de disponibilidad de ejemplares.
- Habilitar una base unica de usuarios, catalogo y prestamos.
- Ofrecer permisos diferenciados para administradores, bibliotecarios y usuarios finales.
- Preparar una base tecnica que permita reportes, reservas y notificaciones en futuras fases.

## 6. Objetivos del producto

- Permitir autenticacion y sesion persistente con roles.
- Gestionar libros y articulos desde una API consistente.
- Registrar prestamos y devoluciones actualizando el stock disponible.
- Mostrar en interfaz el catalogo con acciones segun permisos.
- Mantener una experiencia de uso sencilla desde desktop y navegadores modernos.

## 7. Usuarios objetivo

### 7.1 Administrador

Responsable de la configuracion operativa y del control total del sistema.

Necesidades:

- crear, editar y desactivar libros y articulos
- revisar prestamos
- gestionar usuarios y permisos en futuras fases
- mantener integridad operativa de la biblioteca

### 7.2 Bibliotecario

Responsable del trabajo diario con inventario y prestamos.

Necesidades:

- consultar catalogo
- crear y editar materiales
- registrar prestamos y devoluciones
- validar disponibilidad

### 7.3 Usuario final

Persona que consulta materiales y solicita o gestiona sus prestamos.

Necesidades:

- registrarse e iniciar sesion
- consultar disponibilidad de materiales
- ver sus prestamos
- devolver materiales prestados

## 8. Estado actual del producto

### 8.1 Capacidades ya implementadas

- autenticacion con JWT y persistencia de sesion en frontend
- registro y login de usuarios
- endpoint para obtener usuario autenticado
- roles: admin, librarian, user
- CRUD de libros en API
- CRUD de articulos en API
- soft delete para libros y articulos
- busqueda y filtros basicos para libros y articulos
- registro y devolucion de prestamos en API
- decremento e incremento automatico de copias disponibles
- dashboard web con vista principal de libros
- formulario de alta y edicion de libros
- modo oscuro persistido en localStorage

### 8.2 Brechas actuales detectadas

- la interfaz de articulos no esta terminada aunque la API existe
- no hay interfaz completa para prestamos ni devoluciones
- no hay gestion visual de usuarios
- no hay subida de archivos aunque existe infraestructura inicial para uploads
- no hay reportes, reservas ni alertas de vencimiento
- no hay pruebas automatizadas funcionales visibles en el proyecto
- la experiencia de errores y estados vacios es basica

## 9. Alcance del MVP actual

### En alcance

- autenticacion y autorizacion por rol
- catalogo de libros
- administracion de libros por roles autorizados
- API de articulos
- API de prestamos y devoluciones
- dashboard web basico
- filtros de busqueda de libros

### Fuera de alcance en la version actual

- reservas de materiales
- notificaciones por vencimiento
- panel de administracion de usuarios
- exportacion PDF o CSV
- analitica avanzada y reportes
- carga de portadas o archivos asociados
- integraciones externas

## 10. Requisitos funcionales

### 10.1 Autenticacion y sesiones

- El sistema debe permitir registro de usuarios con nombre, email y password.
- El sistema debe permitir inicio de sesion con email y password.
- El sistema debe emitir un token JWT valido por 7 dias.
- El sistema debe permitir recuperar la identidad del usuario autenticado.
- El frontend debe persistir la sesion en almacenamiento local.
- El sistema debe cerrar la sesion local cuando reciba respuesta 401.

### 10.2 Gestion de roles y permisos

- El sistema debe soportar roles admin, librarian y user.
- Solo admin y librarian pueden crear o editar libros y articulos.
- Solo admin puede eliminar logicamente libros y articulos.
- Un usuario solo puede consultar sus propios prestamos, salvo admin.

### 10.3 Gestion de libros

- El sistema debe listar libros activos.
- El sistema debe permitir buscar libros por titulo o autor.
- El sistema debe permitir filtrar libros por genero.
- El sistema debe permitir crear libros con datos bibliograficos basicos.
- El sistema debe permitir editar libros existentes.
- El sistema debe impedir ISBN duplicado cuando se informa ISBN.
- El sistema debe realizar soft delete de libros.
- El sistema debe exponer cantidad total y cantidad disponible de copias.

### 10.4 Gestion de articulos

- El sistema debe listar articulos activos.
- El sistema debe permitir buscar articulos por titulo, autor o revista.
- El sistema debe permitir crear, editar y desactivar articulos desde API.
- El sistema debe contemplar campos academicos como journal, doi, keywords, url y abstract.
- El frontend debe incorporar una interfaz dedicada de articulos en una siguiente iteracion.

### 10.5 Gestion de prestamos

- El sistema debe permitir crear prestamos para libros o articulos.
- El sistema debe validar que existan copias disponibles antes de prestar.
- El sistema debe descontar una copia disponible al crear un prestamo.
- El sistema debe permitir devolver un item prestado.
- El sistema debe restaurar una copia disponible al devolver un item.
- El sistema debe permitir listar prestamos por usuario.
- El sistema debe permitir listar todos los prestamos a admin y librarian.

### 10.6 Dashboard y experiencia web

- El sistema debe mostrar el nombre y rol del usuario autenticado.
- El sistema debe permitir cambiar entre modo claro y oscuro.
- El sistema debe mostrar acciones segun permisos del usuario.
- El sistema debe permitir crear y editar libros desde la interfaz.
- El sistema debe incluir confirmacion explicita antes de eliminar un libro.

## 11. Requisitos no funcionales

### 11.1 Seguridad

- Las rutas protegidas deben validar JWT.
- Las contrasenas deben almacenarse hasheadas.
- La autorizacion debe resolverse por middleware de roles.
- Las variables sensibles deben provenir de entorno en produccion.

### 11.2 Rendimiento

- Las consultas listadas deben soportar paginacion basica mediante skip y limit.
- La API debe responder adecuadamente para catalogos pequenos y medianos.
- El frontend debe ofrecer tiempos de carga aceptables en operaciones CRUD comunes.

### 11.3 Mantenibilidad

- El proyecto debe conservar separacion entre modelos, rutas, middleware y configuracion.
- El frontend debe mantener componentes desacoplados por dominio.
- La documentacion funcional debe vivir dentro de docs.

### 11.4 Compatibilidad

- El frontend debe funcionar en navegadores modernos.
- El entorno de desarrollo debe ejecutarse localmente con Node.js, npm y MongoDB.

## 12. Flujos principales

### 12.1 Registro e inicio de sesion

1. El usuario abre la aplicacion.
2. El usuario elige registrarse o iniciar sesion.
3. El backend valida credenciales.
4. El sistema devuelve token y datos del usuario.
5. El frontend guarda token y estado de sesion.
6. El usuario accede al dashboard.

### 12.2 Alta de libro por bibliotecario o admin

1. El usuario autenticado abre el dashboard.
2. Selecciona la accion Nuevo Libro.
3. Completa el formulario bibliografico.
4. El frontend envia la solicitud al backend.
5. El backend valida permisos y datos requeridos.
6. El sistema crea el libro y actualiza el listado.

### 12.3 Prestamo de material

1. Un usuario autenticado solicita un prestamo.
2. El sistema valida item, disponibilidad y fecha de vencimiento.
3. El backend crea el registro de prestamo.
4. El backend decrementa las copias disponibles.
5. El sistema retorna el prestamo creado.

### 12.4 Devolucion de material

1. El usuario o administrador localiza el prestamo.
2. El sistema valida permisos.
3. El backend marca el prestamo como returned.
4. El backend incrementa las copias disponibles del item.
5. El sistema confirma la devolucion.

## 13. Indicadores de exito

- Tiempo promedio para alta de un libro menor a 2 minutos.
- Tasa de errores por disponibilidad inconsistente cercana a 0.
- 100 por ciento de operaciones sensibles protegidas por autenticacion.
- Adopcion del flujo completo de login y consulta de catalogo sin asistencia manual.
- Cobertura funcional de frontend sobre libros y, en siguiente fase, articulos y prestamos.

## 14. Roadmap propuesto

### Fase 1 - Consolidacion del MVP

- completar UI de articulos
- construir UI de prestamos y devoluciones
- mejorar estados de carga, vacio y error
- agregar validaciones de formulario mas completas

### Fase 2 - Operacion bibliotecaria

- panel de gestion de usuarios
- filtros y vistas avanzadas de prestamos
- alertas de vencimiento
- historial operativo por usuario

### Fase 3 - Escalamiento funcional

- reservas de libros
- reportes y exportacion
- carga de archivos y portadas
- dashboard con metricas y estadisticas

## 15. Riesgos y limitaciones

- La interfaz no refleja aun todo lo soportado por la API.
- No se observan pruebas automatizadas suficientes para proteger regresiones.
- El manejo de errores es uniforme pero poco especifico para el usuario final.
- La sesion en frontend redirige a /login tras 401, aunque la aplicacion no utiliza enrutamiento dedicado para esa vista.
- No hay evidencia de auditoria o trazabilidad historica para cambios administrativos.

## 16. Supuestos

- El sistema se utilizara inicialmente en un entorno interno o de baja escala.
- MongoDB sera la fuente principal de datos en todas las fases iniciales.
- Los roles actuales son suficientes para el MVP.
- La evolucion del producto continuara sobre la arquitectura actual de Express y React.

## 17. Dependencias tecnicas

- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, multer
- Frontend: React 18, Vite, Material UI, Axios
- Base de datos: MongoDB
- Infraestructura local de desarrollo con variables de entorno para backend y frontend

## 18. Anexos

### Endpoints actuales relevantes

#### Autenticacion

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

#### Libros

- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- DELETE /api/books/:id

#### Articulos

- GET /api/articles
- GET /api/articles/:id
- POST /api/articles
- PUT /api/articles/:id
- DELETE /api/articles/:id

#### Prestamos

- GET /api/loans
- GET /api/loans/user/:userId
- POST /api/loans
- PUT /api/loans/:id/return

---

Documento generado el 25 de marzo de 2026 a partir del estado actual del proyecto ownlibrary.