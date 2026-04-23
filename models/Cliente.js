const fs = require('fs');
const path = require('path');

// Apunta al archivo JSON de clientes
const p = path.join(__dirname, '..', 'data', 'clientes.json');

class Cliente {
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

module.exports = Cliente;