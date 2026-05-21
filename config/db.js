const mongoose = require('mongoose');

// Abstracción de la conexión a DB para inyectarla en el entry point
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = conectarDB;