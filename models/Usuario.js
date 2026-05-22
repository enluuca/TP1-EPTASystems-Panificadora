const mongoose = require('mongoose');

// Modelo básico de Usuario sin encriptación
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Usuario', usuarioSchema);