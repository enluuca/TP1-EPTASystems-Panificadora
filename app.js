const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const pedidosRoutes = require('./routes/pedidosRoutes');

// Configuración del Motor de Plantillas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos
app.use(express.json()); // Para recibir JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios

// Ruta de prueba
app.get('/', (req, res) => {
    res.render('index', { title: 'La Espiga de Oro - Sistema de Gestión' });
});
app.use('/pedidos', pedidosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});