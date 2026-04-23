const fs = require('fs');
const path = require('path');

// Apunta al archivo JSON de productos
const p = path.join(__dirname, '..', 'data', 'productos.json');

class Producto {
    // Método síncrono para leer los datos
    static fetchAll() {
        try {
            const fileContent = fs.readFileSync(p, 'utf-8');
            if (fileContent.length === 0) return [];
            return JSON.parse(fileContent);
        } catch (e) {
            return [];
        }
    }
}

module.exports = Producto;