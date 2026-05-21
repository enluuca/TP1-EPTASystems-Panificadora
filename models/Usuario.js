const mongoose = require('mongoose');

// Modelo para autenticación del sistema administrativo.
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Usuario', usuarioSchema);