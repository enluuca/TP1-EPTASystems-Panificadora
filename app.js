const express = require('express');
const path = require('path');
const requestLogger = require('./middlewares/logger'); // (Asegurate de que la ruta coincida con tu carpeta)
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del Motor de Plantillas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos
app.use(express.json()); // Para recibir JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios
app.use(requestLogger); // IMPORTANTE: Agregamos el middleware para que registre las peticiones en consola

// Ruta de prueba
app.get('/', (req, res) => {
    res.render('index', { title: 'La Espiga de Oro - Sistema de Gestión' });
});
app.use('/pedidos', pedidosRoutes);

// Capturar rutas no válidas (Error 404)
app.use('*', (req, res) => {
    res.status(404).send('404 - Esa ruta no existe!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});