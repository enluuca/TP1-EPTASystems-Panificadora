const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal es obligatorio'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    telefono: {
        type: String
    }
}, { versionKey: false }); // Quitamos el __v que agrega MongoDB por defecto

module.exports = mongoose.model('Cliente', clienteSchema);