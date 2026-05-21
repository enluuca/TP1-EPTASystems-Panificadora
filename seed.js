require('dotenv').config();
const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');
const Producto = require('./models/Producto');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado para sembrar datos...');

        // Limpiamos datos viejos para no duplicar
        await Cliente.deleteMany({});
        await Producto.deleteMany({});
        console.log('Base de datos limpiada...');

        // 1. Insertar Clientes (Sucursales)
        const clientesCargados = await Cliente.insertMany([
            { nombre: "Panadería El Vigilante", direccion: "Av. Corrientes 123" },
            { nombre: "Confitería La Dulce", direccion: "Av. Callao 456" },
            { nombre: "Panadería Don evaristo", direccion: "Calle Florida 789" },
            { nombre: "Cafetería Central", direccion: "Av. Santa Fe 1011" },
            { nombre: "Panadería Bariloche", direccion: "Calle Lavalle 1213" },
            { nombre: "Planta Industrial", direccion: "Parque Industrial S/N" },
        ]);

        // 2. Insertar Productos
        const productosCargados = await Producto.insertMany([
            { nombre: "Pan Francés (kg)", precio: 1200, categoria: "Panificados" },
            { nombre: "Mignon (kg)", precio: 1300, categoria: "Panificados" },
            { nombre: "Pan Integral con Semillas (kilo)", precio: 4500, categoria: "Panificados" },
            { nombre: "Pebetes para sándwich (docena)", precio: 5000, categoria: "Panificados" },
            { nombre: "Facturas Surtidas (docena)", precio: 12000, categoria: "Pastelería" },
            { nombre: "Medialunas de manteca (docena)", precio: 12000, categoria: "Pastelería" },
        ]);

        console.log('✅ Datos cargados con éxito:');
        console.log(`${clientesCargados.length} clientes creados.`);
        console.log(`${productosCargados.length} productos creados.`);

        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error al sembrar:', error);
        process.exit(1);
    }
};

seedDB();