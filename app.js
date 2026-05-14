require('dotenv').config(); // 1. Cargar variables de entorno
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // 2. Importar Mongoose
const requestLogger = require('./middlewares/logger');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del Motor de Plantillas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(requestLogger); 

// 3. Función de conexión a Base de Datos (Objetivo: Programación Asincrónica)
const conectarDB = async () => {
    try {
        // La URL viene de tu archivo .env (mongodb://localhost:27017/espiga_de_oro)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado: La Espiga de Oro está online');
    } catch (error) {
        console.error('Error crítico de conexión:', error);
        process.exit(1); // Detiene la app si no hay base de datos
    }
};

conectarDB();

// Rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'La Espiga de Oro - Sistema de Gestión' });
});

app.use('/pedidos', pedidosRoutes);

// Manejo de Error 404 (Sin asteriscos para evitar el PathError)
app.use((req, res) => {
    res.status(404).send('404 - Esa ruta no existe en La Espiga de Oro!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});