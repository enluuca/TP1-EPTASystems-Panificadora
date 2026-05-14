const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente', // Debe coincidir con el nombre del modelo en Cliente.js
        required: [true, 'La sucursal es obligatoria']
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Debe coincidir con el nombre del modelo en Producto.js
        required: [true, 'El pedido debe tener al menos un producto']
    }],
    estado: {
        type: String,
        enum: ['Pendiente', 'En Producción', 'Despachado', 'Entregado'],
        default: 'Pendiente'
    },
    fecha: {
        type: Date,
        default: Date.now // Mongoose asigna la fecha automáticamente
    }
}, { versionKey: false });

module.exports = mongoose.model('Pedido', pedidoSchema);