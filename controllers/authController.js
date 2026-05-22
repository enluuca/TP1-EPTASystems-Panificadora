const Usuario = require('../models/Usuario');

// GET: Renderizar vista de registro
exports.getRegistro = (req, res) => {
    res.render('registro', { title: 'Registro de Usuario' });
};

// GET: Renderizar vista de login
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
};

// POST: Procesar el registro (ALTA)
exports.postRegistrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).render('error', { mensaje: 'Todos los campos son obligatorios para el registro.' });
        }

        // Instanciamos el modelo y guardamos la contraseña en texto plano
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        res.redirect('/login');
    } catch (error) {
        console.error("Error en postRegistrar:", error);
        res.status(500).render('error', { mensaje: 'Error interno al intentar registrar el usuario en la base de datos.' });
    }
};

// POST: Procesar el login (LECTURA SIMPLE)
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Búsqueda exacta del documento coincidiendo email y password en texto plano
        const usuario = await Usuario.findOne({ email: email, password: password });

        if (!usuario) {
            return res.status(401).render('login', { title: 'Iniciar Sesión', error: 'Credenciales inválidas. El usuario o la contraseña no coinciden.' });
        }

        // Autenticación exitosa (stateless): redirigimos al tablero principal
        res.redirect('/inicio');
    } catch (error) {
        console.error("Error en postLogin:", error);
        res.status(500).render('error', { mensaje: 'Error interno al intentar validar las credenciales.' });
    }
};