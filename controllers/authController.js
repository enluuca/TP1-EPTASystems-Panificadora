const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Validación defensiva de seguridad
if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET no está definido en el archivo .env');
}

// Render de vista login
exports.getLogin = (req, res) => {
    // Si ya está logueado, redirigimos al inicio
    if (req.cookies.token) return res.redirect('/');
    res.render('login', { title: 'Acceso Restringido - La Espiga de Oro' });
};

// Verificación de credenciales, firma de JWT y seteo de HttpOnly Cookie.
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Usuario.findOne({ username });
        
        if (!user) {
            return res.status(401).render('login', { error: 'Credenciales inválidas' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).render('login', { error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
        
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.redirect('/');
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).render('error', { mensaje: 'Error al intentar iniciar sesión' });
    }
};

// Destrucción de sesión por expiración de cookie
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};