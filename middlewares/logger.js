const requestLogger = (req, res, next) => {
    console.log(`[LOG] Método: ${req.method} | Ruta: ${req.originalUrl}`);
    next(); 
};

module.exports = requestLogger;