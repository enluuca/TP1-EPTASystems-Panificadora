require('dotenv').config(); // 1. Cargar variables de entorno
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const conectarDB = require('./config/db');
const pedidosRoutes = require('./routes/pedidosRoutes');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup de la conexión a Mongo.
conectarDB();

// Configuración del engine de vistas.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(requestLogger); 

// Panel principal restaurado. Protegido por middleware.
app.get('/', authMiddleware, (req, res) => {
    res.render('index', { title: 'La Espiga de Oro - Sistema de Gestión' });
});

app.use('/', authRoutes);
app.use('/pedidos', pedidosRoutes);

// Manejo de Error 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).send('404 - Esa ruta no existe en La Espiga de Oro!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});