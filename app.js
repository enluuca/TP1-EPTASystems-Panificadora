require('dotenv').config(); // 1. Cargar variables de entorno
const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');
const pedidosRoutes = require('./routes/pedidosRoutes');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/logger');

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
app.use(requestLogger); 

// Redirección inicial al login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Panel principal (Menú de inicio en nueva ruta para no pisar el login)
app.get('/inicio', (req, res) => {
    res.render('index', { title: 'La Espiga de Oro - Sistema de Gestión' });
});

app.use('/', authRoutes);
app.use('/pedidos', pedidosRoutes);

// Manejo de Error 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).render('error', { 
        mensaje: 'Error 404 - La página que estás buscando no existe en La Espiga de Oro.' 
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});