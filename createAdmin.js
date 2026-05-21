require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/Usuario');

const crearAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a la base de datos para sembrar usuario...');

        // Verificamos si ya existe para no duplicarlo por error
        const existe = await Usuario.findOne({ username: 'admin' });
        if (existe) {
            console.log('⚠️ El usuario "admin" ya existe en la base de datos.');
            return mongoose.connection.close();
        }

        // Encriptamos la contraseña "admin123"
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await Usuario.create({
            username: 'admin',
            password: hashedPassword
        });

        console.log('✅ Usuario administrador creado con éxito. Usuario: admin | Clave: admin123');
    } catch (error) {
        console.error('❌ Error al crear el administrador:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

crearAdmin();
