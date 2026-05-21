# La Espiga de Oro S.R.L. - Sistema de Gestión

Trabajo Práctico integrador para la materia Desarrollo de Sistemas Web (Back End) - IFTS N°29 (Grupo: EPTASystems).  
Este proyecto es un sistema de gestión centralizado para pedidos de panificados, construido bajo la arquitectura **MVC** (Modelo-Vista-Controlador).

## Tecnologías Utilizadas
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB, Mongoose
- **Vistas:** Pug (Motor de plantillas)
- **Seguridad:** JSON Web Tokens (JWT), Bcrypt, Cookies

---

## Novedades  (2° Parcial)
Para esta segunda etapa del proyecto, realizamos una migración profunda de nuestra arquitectura inicial, aplicando los siguientes conceptos técnicos:

1. **Persistencia Real de Datos:** Dejamos de usar la carpeta local `/data` con archivos JSON simulados y migramos exitosamente a un motor de base de datos NoSQL.
2. **Implementación de MongoDB y Mongoose:** 
   - **Modelos (Schemas):** Definimos plantillas estrictas para Pedidos, Clientes y Productos. Si un pedido tiene algún dato inválido (o faltan campos obligatorios), Mongoose bloquea la inserción garantizando la integridad de la base.
   - **Variables de Entorno:** Implementamos el archivo `.env` para ocultar la URL de la base de datos y la clave secreta, mejorando la seguridad.
3. **Asincronismo (`async/await`):** Refactorizamos todos los controladores. Ahora usamos `await` para que el servidor no se bloquee mientras MongoDB busca los datos. Implementamos bloques `try/catch` para manejar los errores (renderizando una vista amigable `error.pug` si algo falla).
4. **Flujo CRUD Completo:**
   - **Alta:** Instanciamos el Modelo de Mongoose y usamos `.save()`.
   - **Lectura:** Usamos `.find()` cruzando datos relacionales con `.populate()`.
   - **Update/Delete:** Implementamos los métodos nativos `findByIdAndUpdate` y `findByIdAndDelete`.
5. **Middlewares y Seguridad:** Mantenemos nuestro logger de auditoría para cada petición HTTP, conservamos el manejo de errores 404, y sumamos un middleware de autenticación por JWT para proteger las rutas.

---

## Guía de Instalación y Ejecución

Para levantar este proyecto en un entorno local, seguí estos pasos:

### 1. Requisitos Previos
- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado y corriendo [MongoDB Community Server](https://www.mongodb.com/try/download/community).

### 2. Instalación de Dependencias
Cloná este repositorio, abrí una terminal en la raíz del proyecto y ejecutá:

    npm install

### 3. Configuración del Entorno
En la raíz del proyecto, creá un archivo llamado .env y definí las siguientes variables:

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/espiga_de_oro
    JWT_SECRET=clave_secreta_super_segura

### 4. Sembrado de la Base de Datos (Seeding)
Como la base de datos local de MongoDB estará vacía en tu equipo, necesitás poblarla ejecutando estos dos scripts en la terminal:
Primero, creamos el usuario administrador (admin / admin123):

    node createAdmin.js

Segundo, cargá los catálogos base de Clientes (Sucursales) y Productos:

    node seed.js

### 5. Iniciar la Aplicación
Una vez cargados los datos, levantá el servidor en modo desarrollo con:

    npm run dev

El servidor estará corriendo en http://localhost:3000. 
Ya podés iniciar sesión con el administrador y gestionar los pedidos!