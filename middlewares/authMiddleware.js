const jwt = require('jsonwebtoken');

// Validación defensiva de seguridad
if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET no está definido en el archivo .env');
}

// Verificación pasiva de JWT vía Cookie para proteger el router.
module.exports = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos contexto del usuario para uso interno
        res.locals.user = decoded; // Permite que Pug lea 'user.username' automáticamente
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};