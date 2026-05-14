const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    categoria: {
        type: String,
        enum: ['Panificados', 'Pastelería', 'Otros'],
        default: 'Panificados'
    }
}, { versionKey: false });

module.exports = mongoose.model('Producto', productoSchema);