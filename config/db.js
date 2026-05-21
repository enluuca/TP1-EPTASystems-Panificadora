const mongoose = require('mongoose');

// Abstracción de la conexión a DB para inyectarla en el entry point
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Se rinde y lanza el error a los 5 segundos (por defecto son 30s)
        });
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = conectarDB;