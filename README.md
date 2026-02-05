## Validación y pruebas

- Probé todos los endpoints del backend (registro, login, carga de CSV, listado, descarga y eliminación) usando Postman.
- Verifiqué la autenticación JWT, la validación de datos y el control de acceso por roles.
- Confirmé que la API responde correctamente ante errores y acciones exitosas.

# Full Stack Developer (Node.js & Vue 3)

## Descripción General

Desarrollé una herramienta de gestión de documentos CSV con autenticación, roles de usuario y persistencia de datos. El sistema permite a los usuarios cargar, listar, descargar y (solo admin) eliminar documentos, validando los datos y mostrando feedback claro en la interfaz.

---

## Base de Datos

- **Nombre de la base de datos:** gestion_documentos
- **Motor:** MySQL
- **ORM:** Sequelize
- **Tablas:**
  - usuarios
  - documentos
  - datos_csv
- **Relaciones:**
  - Un usuario puede cargar muchos documentos.
  - Cada documento pertenece a un usuario.
  - Cada documento tiene muchos registros CSV asociados.

### Modelos

- **Usuario** (tabla: usuarios)
  - id, nombre, contraseña (hasheada), rol (user/admin),fecha_creacion,fecha_actualizacion
- **Documento** (tabla: documentos)
  - id, nombre_original, nombre_guardado, cantidad_registros, usuario_id (FK), fecha_carga
- **DatoCSV** (tabla: datos_csv)
  - id, correo, nombre, telefono, ciudad, notas, documento_id (FK)

---

## Backend

- **Framework:** Node.js + Express
- **Estructura de carpetas:**
  - `src/controllers/`: Lógica de negocio (auth, csv, documentos)
  - `src/models/`: Modelos Sequelize (Usuario, Documento, DatoCSV)
  - `src/routes/`: Rutas de la API (auth, csv, documentos)
  - `src/middlewares/`: Middlewares personalizados (verificación JWT, control de rol admin)
  - `src/config/`: Configuración de la base de datos

### Endpoints principales

- **Auth**
  - `POST /auth/registro`: Registro de usuario (nombre, contraseña, rol)
  - `POST /auth/login`: Login y obtención de JWT
- **Documentos**
  - `GET /documentos`: Listar documentos (con usuario y fecha)
  - `DELETE /documentos/:id`: Eliminar documento (solo admin)
- **CSV**
  - `POST /csv/cargar`: Cargar y validar archivo CSV
  - `GET /csv/descargar/:nombre`: Descargar archivo original

### Controladores implementados

- **auth.controller.js:** Registro y login con JWT
- **csv.controller.js:** Carga, validación y almacenamiento de CSV
- **documentos.controller.js:** Listado y eliminación de documentos

### Middlewares

- **middlewares.js:** Verifica y decodifica JWT
- **rolAdmin.js:** Permite acceso solo a admin en rutas protegidas

---

## Frontend

- **Framework:** Vue 3 (Option API)
- **Estilos:** Bootstrap 5 y css
- **Estructura de carpetas:**
  - `src/views/`: Vistas principales (Dashboard, Login, Register, Home)
  - `src/components/`: Componentes reutilizables (Navbar)
  - `src/utils/`: Funciones de API (axios, manejo de JWT)
  - `src/router.js`: Rutas

### Componentes y Vistas

- **Navbar.vue:** Navegación principal
- **Dashboard.vue:** Vista principal, carga y listado de documentos, acciones de descarga y eliminación
- **Login.vue / Register.vue:** Formularios de acceso y registro con validación
- **Home.vue:** Pagina principal

### Funcionalidades implementadas

- Registro y login con validación de campos y rol
- Almacenamiento seguro del JWT
- Carga de archivos CSV con drag & drop y validación de datos
- Tabla de documentos con nombre, usuario, fecha, cantidad de registros y acciones
- Botón de descarga para todos los usuarios
- Botón de eliminar solo visible y habilitado para admin
- Feedback visual claro ante errores de validación o acciones exitosas

---

## Dependencias principales

### Backend

- express
- sequelize
- mysql2
- jsonwebtoken
- bcryptjs
- multer
- csv-parse
- dotenv

### Frontend

- vue@3
- vue-router
- axios
- jwt-decode
- bootstrap@5

---

## Logros y consideraciones

- Implementé autenticación JWT y control de acceso por roles (RBAC).
- Validé los datos del CSV antes de almacenarlos.
- Mostré feedback claro y útil al usuario en cada acción.
- La estructura del código es modular, limpia y fácil de mantener.
- El sistema es seguro: solo usuarios autenticados pueden operar y solo admin puede eliminar documentos.
- El frontend es responsivo y amigable, usando Bootstrap y buenas prácticas de Vue 3 Option API.

---
